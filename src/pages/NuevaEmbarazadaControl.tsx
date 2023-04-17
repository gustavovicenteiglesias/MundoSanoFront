import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { animationBuilder } from "../components/AnimationBuilder"
import { useHistory, useLocation } from "react-router"
import LaboratorioCerologia from "../components/LaboratorioCerologia";
import { useSQLite } from "react-sqlite-hook"
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import moment from "moment";
import LaboratorioCerologiaII from "../components/LaboratorioCerologiaII";
import LaboratorioCerologiaIII from "../components/LaboratorioCerologiaIII";
import { maximo, minimo } from "../components/constantes";

const inicial_control = {
    ecografia: "N",
    hpv: "N",
    pap: "N",
    agripal: "N",
    db: "N",
    tba: "N",
    vhb: "N",
    clinico: "N",
    ecografia_resultado: "R",
    hpv_resultado: "R",
    pap_resultado: "R",
    eco_observaciones: "",
    observaciones: "",
    detalle_eco: "",
    CHAGAS: false,
    ESTREPTOCOCO_BETA_HEMOLÍTICO: false,
    GLUCEMIA: false,
    GRUPO_FACTOR: false,
    HB: false,
    HIV: false,
    SIFILIS: false,
    VHB: false,
    resp_sifilis: "N",
    resp_hiv: "N",
    resp_chagas: "N",
    resp_vhb: "N",
    resp_ESTREPTOCOCO_BETA_HEMOLÍTICO: "N",
    resp_hb: "S",
    resp_glucemia: "S",
    motivo: 9,
    derivada: 0,
    gestas: 0

}

const NuevaEmbarazadaControl: React.FC = () => {

    const location = useLocation();
    const [paciente, setPaciente] = useState<any>(location.state);
    const [control, setControl] = useState<any>(inicial_control)
    const [diferencia, setDiferencia] = useState<any>()
    const [showEcografia, setShowEcografia] = useState<boolean>(false)
    const [eco_observa, setshowEco_observa] = useState<boolean>(false)
    const [showHpv, setShowHpv] = useState<boolean>(false)
    const [showPap, setShowPap] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [motivos, setMotivos] = useState<any>([])

    const hoy = moment()
    // const fum = moment(paciente.control?.fum)
    // console.log("fum" +paciente.control?.fum)
    let sqlite = useSQLite()
    let history = useHistory()
    useEffect(() => {
        if (paciente.control?.fum !== null) {
            setControl((prevProps: any) => ({ ...prevProps, gestas: hoy.diff(paciente.control?.fum, "weeks") }));
        }

    }, [])

    useIonViewWillEnter(() => {

        const testDatabaseCopyFromAssets = async (): Promise<any> => {
            try {
                let respConection = await sqlite.isConnection("triplefrontera")

                if (respConection.result) {
                    await sqlite.closeConnection("triplefrontera")

                }
                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
                await db.open();
                let res: any = await db.query("SELECT * FROM motivos_derivacion")
                console.log("Motivos " + JSON.stringify(res.values))
                setMotivos(res.values)

                db.close()
                await sqlite.closeConnection("triplefrontera")
                return true;
            }
            catch (error: any) {
                return false;
            }
        }
        testDatabaseCopyFromAssets()
    }, [])




    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
    }

    const handleInputChangeEcografia = (e: any) => {
        const { name, value } = e.target;
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
        if (value === "T") {
            setShowEcografia(true)
        } else {
            setShowEcografia(false)
        }

    }
    const handleInputChangeEco_Observa = (e: any) => {
        const { name, value } = e.target;
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
        if (value === "P") {
            setshowEco_observa(true)
        } else {
            setshowEco_observa(false)
        }

    }
    const handleInputChangeHpv = (e: any) => {
        const { name, value } = e.target;
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
        if (value === "S") {
            setShowHpv(true)
        } else {
            setShowHpv(false)
        }

    }

    const handleInputChangePap = (e: any) => {
        const { name, value } = e.target;
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
        if (value === "S") {
            setShowPap(true)
        } else {
            setShowPap(false)
        }

    }

    const handleInpuTChecks = (e: any) => {
        const name = e.target.name;
        const value = e.detail.checked
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
    }

    const OnSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        /*Tabla control_embarazo */
        const control_embarazo: any = {};
        control_embarazo.edad_gestacional = control.gestas;
        if (control.ecografia === "S") {
            control_embarazo.eco = "S"
        } else {
            control_embarazo.eco = control.ecografia === "N" ? "N" : control.ecografia_resultado;
        }

        control_embarazo.detalle_eco = control.eco_observaciones;
        control_embarazo.hpv = control.hpv === "N" ? "N" : control.hpv_resultado;
        control_embarazo.pap = control.pap === "N" ? "N" : control.pap_resultado;
        control_embarazo.sistolica = control.sistolica;
        control_embarazo.diastolica = control.diastolica;
        control_embarazo.clinico = control.clinico;
        control_embarazo.observaciones = control.observaciones;
        control_embarazo.motivo = control.motivo
        control_embarazo.derivada = control.derivada


        /*Laboratorio y cerologia */
        const laboratorios: any = {};
        //laboratorios.sifilis
        //Insert tabla personas

        let ultimo_id_persona = await consulta(`SELECT id_persona FROM personas WHERE id_persona BETWEEN  ${minimo} AND ${maximo} ORDER BY id_persona DESC LIMIT 1`)
        await consulta(`INSERT INTO personas(id_persona,apellido,nombre,documento,fecha_nacimiento,id_origen,nacionalidad,sexo,madre,alta,nacido_vivo) 
       VALUES  (${Number(ultimo_id_persona[0].id_persona) + 1},"${paciente.paciente.apellido}","${paciente.paciente.nombre}",
       "${paciente.paciente.documento}","${paciente.paciente.fecha_nacimiento}",2,12,"F",${paciente.paciente.madre},${paciente.paciente.alta},${paciente.paciente.nacido_vivo})`
        )
        //INsert tabla ubicacion

        let ultimo_id_ubicacion = await consulta(`SELECT id_ubicacion FROM ubicaciones WHERE id_persona BETWEEN ${minimo} AND ${maximo} ORDER BY id_persona DESC LIMIT 1`)

        ultimo_id_persona = await consulta(`SELECT id_persona FROM personas WHERE id_persona BETWEEN ${minimo} AND ${maximo} ORDER BY id_persona DESC LIMIT 1`)

        await consulta(`INSERT INTO ubicaciones(id_ubicacion, id_persona, id_paraje,id_area,num_vivienda,fecha, georeferencia, id_pais) 
        VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_persona[0].id_persona)},${paciente.paciente.paraje_residencia},
        ${paciente.paciente.area_residencia},"${paciente.paciente.num_vivienda}","${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${paciente.paciente.latitud},${paciente.paciente.longitud}",${paciente.paciente.pais_residencia})`)
        ultimo_id_ubicacion = await consulta(`SELECT id_ubicacion FROM ubicaciones WHERE id_persona ${minimo} AND ${maximo} ORDER BY id_persona DESC LIMIT 1`)

        //Insert control

        let resp_numero_control = []
        //id_persona=${ultimo_id_persona[0].id_persona}
        resp_numero_control = await consulta(`SELECT control_numero FROM controles WHERE id_control BETWEEN ${minimo} AND ${maximo}  ORDER BY id_control DESC LIMIT 1`)

        let ultimo_id_control = await consulta(`SELECT id_control FROM controles WHERE id_control BETWEEN ${minimo} AND ${maximo} ORDER BY id_control DESC LIMIT 1`)
        let c = Number(ultimo_id_control[0].id_control) + 1

        if (resp_numero_control.length === 0) {

            await consulta(`INSERT INTO controles(id_control,fecha,id_persona,control_numero,id_estado)
             VALUES (${c},"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
             ${Number(ultimo_id_persona[0].id_persona)},1,1)`)
            //
        } else {
            await consulta(`INSERT INTO controles(id_control,fecha,id_persona,control_numero,id_estado)
            VALUES (${c},"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
            ${Number(ultimo_id_persona[0].id_persona)},${Number(resp_numero_control[0].control_numero) + 1},1)`)
        }

        //insert antecedentes
        ultimo_id_control = await consulta(`SELECT id_control FROM controles WHERE id_control BETWEEN ${minimo} AND ${maximo} ORDER BY id_control DESC LIMIT 1`)
        let ultimo_id_antecedentes = await consulta(`SELECT id_antecedente FROM antecedentes WHERE id_antecedente BETWEEN ${minimo} AND ${maximo} ORDER BY id_antecedente DESC LIMIT 1`)
        let insertfum=paciente.control?.fum === null ? null :"\""+ moment(paciente.control.fum).format("YYYY-MM-DD")+"\""
        console.log("insert "+insertfum)
        let insert_fecha_ultimo_embarazo = paciente?.control.fecha_ultimo_embarazo === null || paciente?.control.fecha_ultimo_embarazo === "null" ? null : "\"" + paciente?.control.fecha_ultimo_embarazo + "\""
        let insertfpp=paciente.control?.fpp === null ? null : "\""+moment(paciente.control.fpp).format("YYYY-MM-DD")+"\""
        
        let antecedentes = await consulta(`INSERT INTO antecedentes(id_antecedente,id_persona,id_control,edad_primer_embarazo,
            fecha_ultimo_embarazo,gestas,partos,cesareas, abortos, planificado, fum, fpp) 
            VALUES (${Number(ultimo_id_antecedentes[0]?.id_antecedente) + 1},${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},
            ${paciente.control.edad_primer_embarazo},${insert_fecha_ultimo_embarazo},${paciente.control.gestas},
            ${paciente.control.partos},${paciente.control.cesareas},${paciente.control.abortos},${paciente.control.planificado},
            ${insertfum},${insertfpp})`)
        console.log("@@@ antecedentes " + antecedentes)
        //si hay apps insertar en la tabla antecedentes_apps
        console.log("paciente control app "+paciente.control.app)
        if (paciente.control.app !== undefined) {
            ultimo_id_antecedentes = await consulta(`SELECT id_antecedente FROM antecedentes WHERE id_antecedente BETWEEN ${minimo} AND ${maximo} ORDER BY id_antecedente DESC LIMIT 1`)
            let apps_antecedentes = await consulta(`INSERT INTO antecedentes_apps(id_antecedente, id_app)
                 VALUES (${Number(ultimo_id_antecedentes[0]?.id_antecedente)},${paciente.control.app})`)

        } else {
            let apps_antecedentes1 = await consulta(`INSERT INTO antecedentes_apps(id_antecedente, id_app)
                 VALUES (${Number(ultimo_id_antecedentes[0]?.id_antecedente)},10)`)

        }

        //si hay macs insertar en la tabla de antecedentes_macs
        if (paciente.control.mac !== undefined) {
            let macs_antecedente = await consulta(`INSERT INTO antecedentes_macs(id_antecedente, id_mac)
                 VALUES (${Number(ultimo_id_antecedentes[0]?.id_antecedente)},${paciente.control.mac})`)

        } else {
            let macs_antecedente1 = await consulta(`INSERT INTO antecedentes_macs(id_antecedente, id_mac)
            VALUES (${Number(ultimo_id_antecedentes[0]?.id_antecedente)},6)`)

        }



        //insert control embarazada
        let ultimo_id_control_embarazada = await consulta(`SELECT id_control_embarazo FROM control_embarazo WHERE id_control_embarazo BETWEEN ${minimo} AND ${maximo} ORDER BY id_control_embarazo DESC LIMIT 1`)
        let resp_control_embrarazo = await consulta(`INSERT INTO control_embarazo(id_control_embarazo,id_control,edad_gestacional,eco,detalle_eco,hpv,pap,sistolica,diastolica, clinico, observaciones,motivo,derivada) 
        VALUES (${Number(ultimo_id_control_embarazada[0].id_control_embarazo) + 1},${Number(ultimo_id_control[0].id_control)},${control_embarazo.edad_gestacional},
        "${control_embarazo.eco}","${control_embarazo.detalle_eco}","${control_embarazo.hpv}","${control_embarazo.pap}",
        ${control_embarazo.sistolica},${control_embarazo.diastolica},"${control_embarazo.clinico}","${control_embarazo.observaciones}","${control_embarazo.motivo}",${control_embarazo.derivada})`)

        console.log("@@@@@ Insert control_embarazada ", JSON.stringify(resp_control_embrarazo))

        //Insert inmunizaciones

        let AGRIPAL = await consulta(`INSERT INTO inmunizaciones_control(id_persona,id_control,id_inmunizacion,estado)
         VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},2,"${control.agripal}")`)
        let DB = await consulta(`INSERT INTO inmunizaciones_control(id_persona,id_control,id_inmunizacion,estado)
        VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},3,"${control.db}")`)
        let TBA = await consulta(`INSERT INTO inmunizaciones_control(id_persona,id_control,id_inmunizacion,estado)
        VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},1,"${control.tba}")`)
        let VHB = await consulta(`INSERT INTO inmunizaciones_control(id_persona,id_control,id_inmunizacion,estado)
        VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},4,"${control.vhb}")`)





        //Insert Laboratorio
        //Sifilis
        if (control.SIFILIS) {
            let Resp_Sifilis = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},1,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
             "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${control.resp_sifilis}",3)`)

            if (control.resp_sifilis === "P") {
                let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                VALUES (${Number(ultimo_id_persona[0].id_persona)},3,${Number(ultimo_id_control[0].id_control)},1)`)

            }
        }
        //HIV
        if (control.HIV) {
            let resp_HIV = await consulta(`INSERT INTO laboratorios_realizados
                (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
                 VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},2,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
                "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${control.resp_hiv}",2)`)

            if (control.resp_hiv === "P") {
                let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                    VALUES (${Number(ultimo_id_persona[0].id_persona)},2,${Number(ultimo_id_control[0].id_control)},1)`)

            }
        }
        //CHAGAS
        if (control.CHAGAS) {
            let resp_CHAGAS = await consulta(`INSERT INTO laboratorios_realizados
                (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
                 VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},4,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
                "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${control.resp_chagas}",1)`)

            if (control.resp_chagas === "P") {
                let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                    VALUES (${Number(ultimo_id_persona[0].id_persona)},1,${Number(ultimo_id_control[0].id_control)},1)`)

            }
        }
        //VHB
        if (control.VHB) {
            let resp_VHB = await consulta(`INSERT INTO laboratorios_realizados
                (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
                 VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},5,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
                "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${control.resp_vhb}",4)`)

            if (control.resp_vhb === "P") {
                let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                    VALUES (${Number(ultimo_id_persona[0].id_persona)},4,${Number(ultimo_id_control[0].id_control)},1)`)

            }
        }

        //ESTREPTOCOCO_BETA_HEMOLÍTICO

        if (control.ESTREPTOCOCO_BETA_HEMOLÍTICO) {

            let resp_EBH = await consulta(`INSERT INTO laboratorios_realizados
                (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
                 VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},8,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
                "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${control.resp_ESTREPTOCOCO_BETA_HEMOLÍTICO}",0)`)


        }

        //Hb
        if (control.HB) {
            let respuesta = control.resp_hb === "S" ? "S" : control.valor_hb
            let resp_HB = await consulta(`INSERT INTO laboratorios_realizados
                (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
                 VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},7,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
                "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${respuesta}",0)`)


        }

        //Glucemia resp_glucemia
        if (control.GLUCEMIA) {
            let respuesta = control.resp_glucemia === "S" ? "S" : control.valor_glucemia
            let resp_GLUCEMIA = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},6,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
            "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${respuesta}",0)`)


        }
        //GRUPO_FACTOR
        if (control.GRUPO_FACTOR) {
            let respuesta = control.resp_grupo_factor === "S" ? "S" : control.valor_grupo_factor
            let resp_GRUPO_FACTOR = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${Number(ultimo_id_persona[0].id_persona)},${Number(ultimo_id_control[0].id_control)},9,1,"${moment(paciente.control.fecha).format("YYYY-MM-DD")}",
            "${moment(paciente.control.fecha).format("YYYY-MM-DD")}","${respuesta}",0)`)


        }


        setTimeout(() => {
           setLoading(false)
          history.push("/personas")
        }, 1000)
    }


    //console.log("@@@@@@control " + JSON.stringify(control))
    const consulta = async (query: string): Promise<any> => {
        try {
            let respConection = await sqlite.isConnection("triplefrontera")

            if (respConection.result) {
                await sqlite.closeConnection("triplefrontera")

            }
            let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
            await db.open();
            let res: any = await db.query(query)


            db.close()
            await sqlite.closeConnection("triplefrontera")
            return res.values;
        }
        catch (error: any) {
            return false;
        }
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/personas" disabled={isLoading} routerAnimation={animationBuilder} />
                    </IonButtons>
                    <IonLabel >Controles de {paciente?.paciente.nombre} {paciente?.paciente.apellido}</IonLabel>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={OnSubmit}>
                    <IonItem>
                        <IonLabel position="floating">Edad Gestacional (FUM {moment(paciente.control?.fum).format("LL")})</IonLabel>
                        <IonInput type="number" defaultValue={diferencia} value={control?.gestas} name="gestas" onIonChange={e => handleInputChange(e)} ></IonInput>
                    </IonItem>
                    {/* Ecografia */}
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Ecografía</IonCardTitle>
                        </IonCardHeader>
                        <IonRow>
                            <IonCol>
                                <IonList>

                                    <IonRadioGroup onIonChange={e => handleInputChangeEcografia(e)} name="ecografia" value={control.ecografia}>
                                        <IonItem>
                                            <IonLabel>Si</IonLabel>
                                            <IonRadio slot="end" value="T"></IonRadio>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Solicitada</IonLabel>
                                            <IonRadio slot="end" value="S"></IonRadio>
                                        </IonItem>


                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                            <IonCol>
                                {showEcografia &&
                                    <IonList>
                                        <IonRadioGroup onIonChange={e => handleInputChangeEco_Observa(e)} name="ecografia_resultado" value={control.ecografia_resultado}>
                                            <IonItem>
                                                <IonLabel>Normal</IonLabel>
                                                <IonRadio slot="end" value="R"></IonRadio>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel color="danger">Patológica</IonLabel>
                                                <IonRadio slot="end" value="P"></IonRadio>
                                            </IonItem>


                                        </IonRadioGroup>
                                    </IonList>}
                            </IonCol>
                            <IonCol>
                                {eco_observa && showEcografia &&
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">Observaciones</IonLabel>
                                            <IonInput name="eco_observaciones" onIonChange={e => handleInputChange(e)}></IonInput>
                                        </IonItem>
                                    </IonList>
                                }
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>TESTS</IonCardTitle>
                        </IonCardHeader>
                        <IonRow>
                            <IonCol>
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel>HPV</IonLabel>
                                    </IonListHeader>
                                    <IonRadioGroup onIonChange={e => handleInputChangeHpv(e)} name="hpv" value={control.hpv}>
                                        <IonItem>
                                            <IonLabel>Si</IonLabel>
                                            <IonRadio slot="end" value="S"></IonRadio>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>

                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                            <IonCol>
                                {showHpv &&
                                    <IonList>
                                        <IonListHeader>
                                            <IonLabel></IonLabel>
                                        </IonListHeader>
                                        <IonRadioGroup onIonChange={e => handleInputChange(e)} name="hpv_resultado" value={control.hpv_resultado}>
                                            <IonItem>
                                                <IonLabel>Normal</IonLabel>
                                                <IonRadio slot="end" value="R"></IonRadio>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel color="danger">Patológica</IonLabel>
                                                <IonRadio slot="end" value="P"></IonRadio>
                                            </IonItem>


                                        </IonRadioGroup>
                                    </IonList>}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel>PAP</IonLabel>
                                    </IonListHeader>
                                    <IonRadioGroup onIonChange={e => handleInputChangePap(e)} name="pap" value={control.pap}>
                                        <IonItem>
                                            <IonLabel>Si</IonLabel>
                                            <IonRadio slot="end" value="S"></IonRadio>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>

                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                            <IonCol>
                                {showPap &&
                                    <IonList>
                                        <IonListHeader>
                                            <IonLabel></IonLabel>
                                        </IonListHeader>
                                        <IonRadioGroup onIonChange={e => handleInputChange(e)} name="pap_resultado" value={control.pap_resultado}>
                                            <IonItem>
                                                <IonLabel>Normal</IonLabel>
                                                <IonRadio slot="end" value="R"></IonRadio>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel color="danger">Patológica</IonLabel>
                                                <IonRadio slot="end" value="P"></IonRadio>
                                            </IonItem>


                                        </IonRadioGroup>
                                    </IonList>}
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Inmunizaciones</IonCardTitle>
                        </IonCardHeader>
                        <IonRow>
                            <IonCol >
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel>A GRIPAL</IonLabel>
                                    </IonListHeader>
                                    <IonRadioGroup onIonChange={e => handleInputChange(e)} name="agripal" value={control.agripal}>
                                        <IonItem>
                                            <IonLabel>Si</IonLabel>
                                            <IonRadio slot="end" value="S"></IonRadio>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>

                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                            <IonCol>
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel>DB</IonLabel>
                                    </IonListHeader>
                                    <IonRadioGroup onIonChange={e => handleInputChange(e)} name="db" value={control.db}>
                                        <IonItem>
                                            <IonLabel>Previa</IonLabel>
                                            <IonRadio slot="end" value="P"></IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Colocada</IonLabel>
                                            <IonRadio slot="end" value="C"></IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>

                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                            <IonCol>
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel>TBA</IonLabel>
                                    </IonListHeader>
                                    <IonRadioGroup onIonChange={e => handleInputChange(e)} name="tba" value={control.tba}>
                                        <IonItem>
                                            <IonLabel>Si</IonLabel>
                                            <IonRadio slot="end" value="S"></IonRadio>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>
                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                            <IonCol>
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel>VHB</IonLabel>
                                    </IonListHeader>
                                    <IonRadioGroup onIonChange={e => handleInputChange(e)} name="vhb" value={control.vhb}>
                                        <IonItem>
                                            <IonLabel>Previa</IonLabel>
                                            <IonRadio slot="end" value="P"></IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Colocada</IonLabel>
                                            <IonRadio slot="end" value="C"></IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>No</IonLabel>
                                            <IonRadio slot="end" value="N"></IonRadio>
                                        </IonItem>

                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonCard color="light">
                        <IonCardHeader>
                            <IonCardTitle>Cargar Laboratorios / Serologías del:</IonCardTitle>
                        </IonCardHeader>
                        <LaboratorioCerologia titulo="SIFILIS" radio={(e: any) => handleInpuTChecks(e)} radioname="SIFILIS" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_sifilis" radioOpcionValue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologia titulo="HIV" radio={(e: any) => handleInpuTChecks(e)} radioname="HIV" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_hiv" radioOpcionValue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologia titulo="CHAGAS" radio={(e: any) => handleInpuTChecks(e)} radioname="CHAGAS" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_chagas" radioOpcionValue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologia titulo="VHB" radio={(e: any) => handleInpuTChecks(e)} radioname="VHB" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_vhb" radioOpcionValue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologia titulo="ESTREPTOCOCO BETA HEMOLÍTICO" radio={(e: any) => handleInpuTChecks(e)} radioname="ESTREPTOCOCO_BETA_HEMOLÍTICO" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_ESTREPTOCOCO_BETA_HEMOLÍTICO" radioOpcionValue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologiaII titulo="Hb" radio={(e: any) => handleInpuTChecks(e)} radioname="HB" radioOpcion={["S", "R"]} radioOpcionName="resp_hb" radioOpcionValue={(e: any) => handleInputChange(e)} inputname="valor_hb" inputvalue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologiaII titulo="GLUCEMIA" radio={(e: any) => handleInpuTChecks(e)} radioname="GLUCEMIA" radioOpcion={["S", "R"]} radioOpcionName="resp_glucemia" radioOpcionValue={(e: any) => handleInputChange(e)} inputname="valor_glucemia" inputvalue={(e: any) => handleInputChange(e)} />
                        <LaboratorioCerologiaIII titulo="GRUPO Y FACTOR" radio={(e: any) => handleInpuTChecks(e)} radioname="GRUPO_FACTOR" radioOpcion={["S", "R"]} radioOpcionName="resp_grupo_factor" radioOpcionValue={(e: any) => handleInputChange(e)} inputname="valor_grupo_factor" inputvalue={(e: any) => handleInputChange(e)} />
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonLabel>Presìon Arterial</IonLabel>
                        </IonCardHeader>
                        <IonItem>
                            <IonLabel position="floating">Sistólica</IonLabel>
                            <IonInput type="number" name="sistolica" onIonChange={(e: any) => handleInputChange(e)} required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Diastólica</IonLabel>
                            <IonInput type="number" name="diastolica" onIonChange={(e: any) => handleInputChange(e)} required></IonInput>
                        </IonItem>
                    </IonCard>

                    <IonCard>
                        <IonCardHeader>
                            <IonLabel>Control Clínico</IonLabel>
                        </IonCardHeader>

                        <IonList>

                            <IonRadioGroup onIonChange={e => handleInputChange(e)} name="clinico" value={control.clinico}>

                                <IonItem>
                                    <IonLabel>Normal</IonLabel>
                                    <IonRadio slot="end" value="N"></IonRadio>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Patologico</IonLabel>
                                    <IonRadio slot="end" value="P"></IonRadio>
                                </IonItem>
                            </IonRadioGroup>
                        </IonList>
                        <IonList>
                            <IonListHeader>
                                <IonLabel>Derivada</IonLabel>
                            </IonListHeader>
                            <IonRadioGroup onIonChange={e => handleInputChangeEcografia(e)} name="derivada" value={control.derivada}>
                                <IonItem>
                                    <IonLabel>Si</IonLabel>
                                    <IonRadio slot="end" value={1}></IonRadio>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>No</IonLabel>
                                    <IonRadio slot="end" value={0}></IonRadio>
                                </IonItem>
                            </IonRadioGroup>

                            <IonRadioGroup>
                                <IonItem>
                                    <IonLabel>Motivos de Derivacíon</IonLabel>
                                    <IonSelect name="motivo" onIonChange={e => handleInputChange(e)}>

                                        {motivos.map((data: any, i: any) => {
                                            return (
                                                <IonSelectOption value={data.id_motivo} key={i}>{data.nombre}</IonSelectOption>
                                            )
                                        })}
                                    </IonSelect>
                                </IonItem>
                            </IonRadioGroup>
                            <IonItem>
                                <IonLabel position="floating">Observaciones</IonLabel>
                                <IonTextarea name="observaciones" onIonChange={e => handleInputChange(e)}></IonTextarea>
                            </IonItem>
                        </IonList>
                    </IonCard>
                    <IonButton expand="block" fill="outline" type="submit" disabled={isLoading}>{isLoading ? "Guardando" : "Guardar"}</IonButton>
                </form>
            </IonContent>
        </IonPage>


    )

}

export default NuevaEmbarazadaControl