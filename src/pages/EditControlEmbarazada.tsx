import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SQLiteDBConnection, useSQLite } from "react-sqlite-hook";
import { animationBuilder } from "../components/AnimationBuilder";
import EditLaboratorio from "../components/EditLaboratorio";
import LaboratorioCerologiaII from "../components/LaboratorioCerologiaII";
import LaboratorioCerologiaIII from "../components/LaboratorioCerologiaIII";
import EditLaboratorioII from "../components/EditLaboratorioII";
import EditLaboratorioIII from "../components/EditLaboratorioIII";

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
    valor_hb: "",
    valor_glucemia: "",
    valor_grupo_factor: "",
    resp_grupo_factor: "S",
    motivo:9,
    derivada:0


}


const EditControlEmbrazada: React.FC = () => {
    const location = useLocation();
    const datos = location.state
    const [dato, setDato] = useState<any>(datos);
    const [paciente, setPaciente] = useState<any>();
    const [control, setControl] = useState<any>(inicial_control)
    const [diferencia, setDiferencia] = useState<any>()
    const [showEcografia, setShowEcografia] = useState<boolean>(false)
    const [eco_observa, setshowEco_observa] = useState<boolean>(false)
    const [showHpv, setShowHpv] = useState<boolean>(false)
    const [showPap, setShowPap] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [inmunizaciones, setInmunizaciones] = useState<any>([])
    const [motivos, setMotivos] = useState<any>([])
    //const [checkSifilis, setCheckSifilis] = useState<boolean>(false)
    //const [checkHVI, setCheckHVI] = useState<boolean>(false)

    const hoy = moment()
    //const fum = moment(paciente?.paciente.control.fum)
    //console.log("fecha "+hoy.format("YYYY-MM-DD"))
    let sqlite = useSQLite()
    let history = useHistory()
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setControl((prevProps: any) => ({ ...prevProps, [name]: value }));
    }

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

    useEffect(() => {
        setPaciente(dato.data)
        setControl(dato.data.data.controlembarazada)

        dato.data.data?.inmunizaciones.map((data: any, i: any) => {
            switch (data.id_inmunizacion) {

                case 3:

                    setControl((prevProps: any) => ({ ...prevProps, db: data.estado }));

                    break;
                case 1:
                    return setControl((prevProps: any) => ({ ...prevProps, tba: data.estado }));
                    break;
                case 2:
                    return setControl((prevProps: any) => ({ ...prevProps, agripal: data.estado }));
                    break;
                case 4:
                    return setControl((prevProps: any) => ({ ...prevProps, vhb: data.estado }));
                    break;
                default:
                    return "No"
                    break;
            }
        })
        dato.data.data?.laboratorios.map((data: any, i: any) => {
            switch (data.nombre) {

                case "SÍFILIS":
                    setControl((prevProps: any) => ({ ...prevProps, resp_sifilis: data.resultado }));
                    setControl((prevProps: any) => ({ ...prevProps, SIFILIS: true }));
                    break;
                case "HIV":
                    setControl((prevProps: any) => ({ ...prevProps, resp_hiv: data.resultado }));
                    setControl((prevProps: any) => ({ ...prevProps, HIV: true }));
                    break;
                case "CHAGAS":
                    setControl((prevProps: any) => ({ ...prevProps, resp_chagas: data.resultado }));
                    setControl((prevProps: any) => ({ ...prevProps, CHAGAS: true }));
                    break;
                case "VHB":
                    setControl((prevProps: any) => ({ ...prevProps, resp_vhb: data.resultado }));
                    setControl((prevProps: any) => ({ ...prevProps, VHB: true }));
                    break;
                case "ESTREPTOCOCO BETA HEMOLÍTICO":
                    setControl((prevProps: any) => ({ ...prevProps, resp_ESTREPTOCOCO_BETA_HEMOLÍTICO: data.resultado }));
                    setControl((prevProps: any) => ({ ...prevProps, ESTREPTOCOCO_BETA_HEMOLÍTICO: true }));
                    break;
                case "Hb":
                    if (data.resultado !== "S") {
                        setControl((prevProps: any) => ({ ...prevProps, valor_hb: data.resultado }));
                        setControl((prevProps: any) => ({ ...prevProps, resp_hb: "R" }));
                    } else {
                        setControl((prevProps: any) => ({ ...prevProps, resp_hb: "S" }));
                    }

                    setControl((prevProps: any) => ({ ...prevProps, Hb: true }));
                    break;
                case "GLUCEMIA":
                    if (data.resultado !== "S") {
                        setControl((prevProps: any) => ({ ...prevProps, valor_glucemia: data.resultado }));
                        setControl((prevProps: any) => ({ ...prevProps, resp_glucemia: "R" }));
                    } else {
                        setControl((prevProps: any) => ({ ...prevProps, resp_glucemia: "S" }));
                    }

                    setControl((prevProps: any) => ({ ...prevProps, GLUCEMIA: true }));
                    break;
                case "GRUPO Y FACTOR":
                    if (data.resultado !== "S") {
                        setControl((prevProps: any) => ({ ...prevProps, valor_grupo_factor: data.resultado }));
                        setControl((prevProps: any) => ({ ...prevProps, resp_grupo_factor: "R" }));
                    } else {
                        setControl((prevProps: any) => ({ ...prevProps, resp_grupo_factor: "S" }));
                    }

                    setControl((prevProps: any) => ({ ...prevProps, GRUPO_FACTOR: true }));
                    break;
                default:
                    setControl((prevProps: any) => ({ ...prevProps, SIFILIS: false }));
                    setControl((prevProps: any) => ({ ...prevProps, HIV: false }));
                    setControl((prevProps: any) => ({ ...prevProps, CHAGAS: false }));
                    setControl((prevProps: any) => ({ ...prevProps, VHB: false }));
                    setControl((prevProps: any) => ({ ...prevProps, ESTREPTOCOCO_BETA_HEMOLÍTICO: false }));
                    setControl((prevProps: any) => ({ ...prevProps, Hb: false }));
                    setControl((prevProps: any) => ({ ...prevProps, GLUCEMIA: false }));
                    setControl((prevProps: any) => ({ ...prevProps, GRUPO_FACTOR: false }));
                    break;
            }
        })
        if (dato.data.data?.controlembarazada?.eco === "S") {
            setControl((prevProps: any) => ({ ...prevProps, ecografia: "S" }));
        }
        if (dato.data.data?.controlembarazada?.eco === "N") {
            setControl((prevProps: any) => ({ ...prevProps, ecografia: "N" }));
        }

        if (dato.data.data?.controlembarazada?.eco === "R" || dato.data.data?.controlembarazada?.eco === "P") {
            setControl((prevProps: any) => ({ ...prevProps, ecografia_resultado: dato.data.data?.controlembarazada?.eco }));
            setControl((prevProps: any) => ({ ...prevProps, ecografia: "T" }));
            setControl((prevProps: any) => ({ ...prevProps, eco_observaciones: dato.data.data?.controlembarazada?.detalle_eco }));
            if (dato.data.data?.controlembarazada?.eco === "P") {
                setshowEco_observa(true)
            } else {
                setshowEco_observa(false)
            }

        }

        if (dato.data.data?.controlembarazada?.hpv === "R" || dato.data.data?.controlembarazada?.hpv === "P") {
            setControl((prevProps: any) => ({ ...prevProps, hpv_resultado: dato.data.data?.controlembarazada?.hpv }));
            setControl((prevProps: any) => ({ ...prevProps, hpv: "S" }));

        }

        if (dato.data.data?.controlembarazada?.pap === "R" || dato.data.data?.controlembarazada?.pap === "P") {
            setControl((prevProps: any) => ({ ...prevProps, pap_resultado: dato.data.data?.controlembarazada?.pap }));
            setControl((prevProps: any) => ({ ...prevProps, pap: "S" }));

        }
        setControl((prevProps: any) => ({ ...prevProps, edad_gestacional: hoy.diff(dato.data.paciente?.antecedentes.fum, "weeks") }));
    }, [])


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
        control_embarazo.edad_gestacional = control.edad_gestacional;
        control_embarazo.motivo = control.motivo;

        /*Laboratorio y cerologia */
        const laboratorios: any = {};







        //update control embarazada

        let resp_control_embrarazo = await consulta(`UPDATE control_embarazo SET edad_gestacional=${Number(control_embarazo.edad_gestacional)},eco="${control_embarazo.eco}",detalle_eco="${control_embarazo.detalle_eco}",
        hpv="${control_embarazo.hpv}",pap="${control_embarazo.pap}",sistolica=${Number(control_embarazo.sistolica)},diastolica=${Number(control_embarazo.diastolica)},
        clinico="${control_embarazo.clinico}",observaciones="${control_embarazo.observaciones}",motivo=${control_embarazo.motivo} WHERE id_control_embarazo=${control.id_control_embarazo}`)

        //Insert inmunizaciones

        let AGRIPAL = await consulta(`UPDATE inmunizaciones_control SET estado="${control.agripal}"
        WHERE id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control} AND id_inmunizacion=2`)


        let DB = await consulta(`UPDATE inmunizaciones_control SET estado="${control.db}"
        WHERE id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control} AND id_inmunizacion=3`)

        let TBA = await consulta(`UPDATE inmunizaciones_control SET estado="${control.tba}"
        WHERE id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control} AND id_inmunizacion=1`)

        let VHB = await consulta(`UPDATE inmunizaciones_control SET estado="${control.vhb}"
        WHERE id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control} AND id_inmunizacion=4`)





        //Insert Laboratorio
        //Sifilis
        if (control.SIFILIS) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_etmi=3 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            console.log("id_laboratorio " + id_laboratorio)
            if (Object.keys(id_laboratorio).length !== 0) {
                console.log(" hay id ")
                let Resp_Sifilis = await consulta(`UPDATE laboratorios_realizados SET resultado="${control.resp_sifilis}",fecha_resultados="${hoy.format("YYYY-MM-DD")}"
             WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)

                if (control.resp_sifilis === "P") {

                    let etmis = await consulta(`UPDATE etmis_personas SET confirmada=1 WHERE id_persona=${paciente.data.id_persona} AND id_etmi=3 AND id_control=${paciente.data.id_control} `)

                }
            } else {
                console.log("no  hay id ")
                let Resp_Sifilis = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${paciente.data.id_persona},${paciente.data.id_control},1,1,"${hoy.format("YYYY-MM-DD")}",
             "${hoy.format("YYYY-MM-DD")}","${control.resp_sifilis}",3)`)

                if (control.resp_sifilis === "P") {
                    let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                VALUES (${paciente.data.id_persona},3,${paciente.data.id_control},1)`)

                }
            }

        }
        //HIV

        if (control.HIV) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_etmi=2 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            console.log("id_laboratorio hiv " + Object.keys(id_laboratorio).length)
            if (Object.keys(id_laboratorio).length !== 0) {
                let resp_HIV = await consulta(`UPDATE laboratorios_realizados SET resultado="${control.resp_hiv}"
            WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)

                if (control.resp_hiv === "P") {
                    let etmis = await consulta(`UPDATE etmis_personas SET confirmada=1 WHERE id_persona=${paciente.data.id_persona} AND id_etmi=2 AND id_control=${paciente.data.id_control} `)

                }
            } else {
                console.log("no  hay id ")
                let Resp_hiv = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${paciente.data.id_persona},${paciente.data.id_control},2,1,"${hoy.format("YYYY-MM-DD")}",
             "${hoy.format("YYYY-MM-DD")}","${control.resp_hiv}",2)`)

                if (control.resp_sifilis === "P") {
                    let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                VALUES (${paciente.data.id_persona},2,${paciente.data.id_control},1)`)

                }
            }




        }

        //CHAGAS
        if (control.CHAGAS) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_etmi=1 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            if (Object.keys(id_laboratorio).length !== 0) {
                let resp_CHAGAS = await consulta(`UPDATE laboratorios_realizados SET resultado="${control.resp_chagas}"
            WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)


                if (control.resp_chagas === "P") {
                    let etmis = await consulta(`UPDATE etmis_personas SET confirmada=1 WHERE id_persona=${paciente.data.id_persona} AND id_etmi=1 AND id_control=${paciente.data.id_control} `)
                }
            } else {
                console.log("no  hay id ")
                let Resp_CHAGAS = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${paciente.data.id_persona},${paciente.data.id_control},4,1,"${hoy.format("YYYY-MM-DD")}",
             "${hoy.format("YYYY-MM-DD")}","${control.resp_chagas}",1)`)

                if (control.resp_chagas === "P") {
                    let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                VALUES (${paciente.data.id_persona},1,${paciente.data.id_control},1)`)

                }
            }
        }

        //VHB
        if (control.VHB) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_etmi=4 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            if (Object.keys(id_laboratorio).length !== 0) {
                let resp_VHB = await consulta(`UPDATE laboratorios_realizados SET resultado="${control.resp_vhb}"
            WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)

                if (control.resp_vhb === "P") {
                    let etmis = await consulta(`UPDATE etmis_personas SET confirmada=1 WHERE id_persona=${paciente.data.id_persona} AND id_etmi=4 AND id_control=${paciente.data.id_control} `)

                }
            } else {
                console.log("no  hay id ")
                let Resp_VHB = await consulta(`INSERT INTO laboratorios_realizados
            (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
             VALUES (${paciente.data.id_persona},${paciente.data.id_control},5,1,"${hoy.format("YYYY-MM-DD")}",
             "${hoy.format("YYYY-MM-DD")}","${control.resp_vhb}",4)`)

                if (control.resp_vhb === "P") {
                    let etmis = await consulta(`INSERT INTO etmis_personas(id_persona,id_etmi,id_control,confirmada) 
                VALUES (${paciente.data.id_persona},4,${paciente.data.id_control},1)`)

                }
            }
        }

        //ESTREPTOCOCO_BETA_HEMOLÍTICO

        if (control.ESTREPTOCOCO_BETA_HEMOLÍTICO) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_laboratorio=8 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            if (Object.keys(id_laboratorio).length !== 0) {

                let resp_EBH = await consulta(`UPDATE laboratorios_realizados SET resultado="${control.resp_ESTREPTOCOCO_BETA_HEMOLÍTICO}"
            WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)


            } else {
                console.log("no  hay id ")
                let Resp_VHB = await consulta(`INSERT INTO laboratorios_realizados
        (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
         VALUES (${paciente.data.id_persona},${paciente.data.id_control},8,1,"${hoy.format("YYYY-MM-DD")}",
         "${hoy.format("YYYY-MM-DD")}","${control.resp_ESTREPTOCOCO_BETA_HEMOLÍTICO}",0)`)

            }
        }

        //Hb

        if (control.Hb) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_laboratorio=6 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            console.log("id_laboratorio " + id_laboratorio)
            if (Object.keys(id_laboratorio).length !== 0) {
                let respuesta = control.resp_hb === "S" ? "S" : control.valor_hb
                let resp_HB = await consulta(`UPDATE laboratorios_realizados SET resultado="${respuesta}"
            WHERE id_laboratorio=${id_laboratorio[0]?.id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)


            } else {
                console.log("no  hay id ")
                let respuesta = control.resp_hb === "S" ? "S" : control.valor_hb
                let Resp_VHB = await consulta(`INSERT INTO laboratorios_realizados
        (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
         VALUES (${paciente.data.id_persona},${paciente.data.id_control},6,1,"${hoy.format("YYYY-MM-DD")}",
         "${hoy.format("YYYY-MM-DD")}","${respuesta}",0)`)

            }
        }

        //Glucemia resp_glucemia

        if (control.GLUCEMIA) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_laboratorio=7 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            if (Object.keys(id_laboratorio).length !== 0) {
                let respuesta = control.resp_glucemia === "S" ? "S" : control.valor_glucemia
                let resp_GLUCEMIA = await consulta(`UPDATE laboratorios_realizados SET resultado="${respuesta}"
            WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)


            } else {
                console.log("no  hay id ")
                let respuesta = control.resp_glucemia === "S" ? "S" : control.valor_glucemia
                let Resp_VHB = await consulta(`INSERT INTO laboratorios_realizados
        (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
         VALUES (${paciente.data.id_persona},${paciente.data.id_control},7,1,"${hoy.format("YYYY-MM-DD")}",
         "${hoy.format("YYYY-MM-DD")}","${respuesta}",0)`)

            }
        }
        //GRUPO_FACTOR

        if (control.GRUPO_FACTOR) {
            let id_laboratorio = await consulta(`SELECT * FROM laboratorios_realizados WHERE id_laboratorio=9 AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)
            if (Object.keys(id_laboratorio).length !== 0) {
                let respuesta = control.resp_grupo_factor === "S" ? "S" : control.valor_grupo_factor
                let resp_GRUPO_FACTOR = await consulta(`UPDATE laboratorios_realizados SET resultado="${respuesta}"
            WHERE id_laboratorio=${id_laboratorio[0].id_laboratorio} AND id_persona=${paciente.data.id_persona} AND id_control=${paciente.data.id_control}`)


            } else {
                console.log("no  hay id ")
                let respuesta = control.resp_grupo_factor === "S" ? "S" : control.valor_grupo_factor
                let Resp_VHB = await consulta(`INSERT INTO laboratorios_realizados
        (id_persona,id_control,id_laboratorio,trimestre,fecha_realizado,fecha_resultados,resultado, id_etmi)
         VALUES (${paciente.data.id_persona},${paciente.data.id_control},9,1,"${hoy.format("YYYY-MM-DD")}",
         "${hoy.format("YYYY-MM-DD")}","${respuesta}",0)`)

            }
        }

        console.log("@@@@@@control " + JSON.stringify(control))
        setTimeout(() => {
            setLoading(false)
            history.push("/personas")
            window.location.reload()
        }, 1000)
    }



    const consulta = async (query: string): Promise<any> => {
        try {
            let respConection = await sqlite.isConnection("triplefrontera")

            if (respConection.result) {
                await sqlite.closeConnection("triplefrontera")

            }
            let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
            await db.open();
            let res: any = await db.query(query)
            setTimeout(() => {
                
            }, 1000)

            db.close()
            await sqlite.closeConnection("triplefrontera")

            return res.values;
        }
        catch (error: any) {
            return false;
        }
    }
    console.log("@@@@@ paciente" + JSON.stringify(paciente))
    return (
        <>
            <IonPage>
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start" >
                            <IonBackButton defaultHref="/personas" routerAnimation={animationBuilder} />
                        </IonButtons>
                        <IonLabel >Control {control?.id_control_embarazo} de {paciente?.paciente.nombre} {paciente?.paciente.apellido} / Fecha: {moment(paciente?.data.fecha).format("LL")}</IonLabel>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form onSubmit={OnSubmit}>
                        <IonItem>
                            <IonLabel position="floating">Edad Gestacional ({control?.edad_gestacional}Semanas )</IonLabel>
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

                                        <IonRadioGroup onIonChange={e => handleInputChangeEcografia(e)} name="ecografia" value={control?.ecografia}>
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
                                            <IonRadioGroup onIonChange={e => handleInputChangeEco_Observa(e)} name="ecografia_resultado" value={control?.ecografia_resultado}>
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
                                                <IonInput name="eco_observaciones" onIonChange={e => handleInputChange(e)} value={control.eco_observaciones}></IonInput>
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
                                        <IonRadioGroup onIonChange={e => handleInputChangeHpv(e)} name="hpv" value={control?.hpv}>
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
                                            <IonRadioGroup onIonChange={e => handleInputChange(e)} name="hpv_resultado" value={control?.hpv_resultado}>
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
                                        <IonRadioGroup onIonChange={e => handleInputChangePap(e)} name="pap" value={control?.pap}>
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
                                            <IonRadioGroup onIonChange={e => handleInputChange(e)} name="pap_resultado" value={control?.pap_resultado}>
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
                                        <IonRadioGroup onIonChange={e => handleInputChange(e)} name="agripal" value={control?.agripal}>
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
                                        <IonRadioGroup onIonChange={e => handleInputChange(e)} name="db" value={control?.db}>
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
                                        <IonRadioGroup onIonChange={e => handleInputChange(e)} name="tba" value={control?.tba}>
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
                                        <IonRadioGroup onIonChange={e => handleInputChange(e)} name="vhb" value={control?.vhb}>
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
                            <EditLaboratorio titulo="SIFILIS" radio={(e: any) => handleInpuTChecks(e)} checked={control?.SIFILIS} radioname="SIFILIS" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_sifilis" radioOpcionValue={(e: any) => handleInputChange(e)} checkedResp={control?.resp_sifilis} />
                            <EditLaboratorio titulo="HIV" radio={(e: any) => handleInpuTChecks(e)} radioname="HIV" checked={control?.HIV} radioOpcion={["S", "P", "N"]} radioOpcionName="resp_hiv" radioOpcionValue={(e: any) => handleInputChange(e)} checkedResp={control?.resp_hiv} />
                            <EditLaboratorio titulo="CHAGAS" radio={(e: any) => handleInpuTChecks(e)} checked={control?.CHAGAS} radioname="CHAGAS" radioOpcion={["S", "P", "N"]} radioOpcionName="resp_chagas" radioOpcionValue={(e: any) => handleInputChange(e)} checkedResp={control?.resp_chagas} />
                            <EditLaboratorio titulo="VHB" radio={(e: any) => handleInpuTChecks(e)} radioname="VHB" checked={control?.VHB} radioOpcion={["S", "P", "N"]} radioOpcionName="resp_vhb" radioOpcionValue={(e: any) => handleInputChange(e)} checkedResp={control?.resp_vhb} />
                            <EditLaboratorio titulo="ESTREPTOCOCO BETA HEMOLÍTICO" radio={(e: any) => handleInpuTChecks(e)} radioname="ESTREPTOCOCO_BETA_HEMOLÍTICO" checked={control?.ESTREPTOCOCO_BETA_HEMOLÍTICO} radioOpcion={["S", "P", "N"]} radioOpcionName="resp_ESTREPTOCOCO_BETA_HEMOLÍTICO" radioOpcionValue={(e: any) => handleInputChange(e)} checkedResp={control?.resp_ESTREPTOCOCO_BETA_HEMOLÍTICO} />
                            <EditLaboratorioII titulo="Hb" radio={(e: any) => handleInpuTChecks(e)} radioname="Hb" checked={control?.Hb} radioOpcion={["S", "R"]} radioOpcionName="resp_hb" checkedResp={control?.resp_hb} radioOpcionValue={(e: any) => handleInputChange(e)} inputname="valor_hb" inputvalue={(e: any) => handleInputChange(e)} checkedNumber={control?.valor_hb} />
                            <EditLaboratorioII titulo="GLUCEMIA" radio={(e: any) => handleInpuTChecks(e)} radioname="GLUCEMIA" checked={control?.GLUCEMIA} radioOpcion={["S", "R"]} radioOpcionName="resp_glucemia" checkedResp={control?.resp_glucemia} radioOpcionValue={(e: any) => handleInputChange(e)} inputname="valor_glucemia" inputvalue={(e: any) => handleInputChange(e)} checkedNumber={control?.valor_glucemia} />
                            <EditLaboratorioIII titulo="GRUPO Y FACTOR" radio={(e: any) => handleInpuTChecks(e)} radioname="GRUPO_FACTOR" checked={control?.GRUPO_FACTOR} radioOpcion={["S", "R"]} radioOpcionName="resp_grupo_factor" checkedResp={control?.resp_grupo_factor} radioOpcionValue={(e: any) => handleInputChange(e)} inputname="valor_grupo_factor" inputvalue={(e: any) => handleInputChange(e)} checkedNumber={control?.valor_grupo_factor} />
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonLabel>Presìon Arterial</IonLabel>
                            </IonCardHeader>
                            <IonItem>
                                <IonLabel position="floating">Sistólica</IonLabel>
                                <IonInput type="number" name="sistolica" onIonChange={(e: any) => handleInputChange(e)} required value={control?.sistolica}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Diastólica</IonLabel>
                                <IonInput type="number" name="diastolica" onIonChange={(e: any) => handleInputChange(e)} required value={control?.diastolica}></IonInput>
                            </IonItem>
                        </IonCard>

                        <IonCard>
                            <IonCardHeader>
                                <IonLabel>Control Clínico</IonLabel>
                            </IonCardHeader>

                            <IonList>

                                <IonRadioGroup onIonChange={e => handleInputChange(e)} name="clinico" value={control?.clinico}>
                                    <IonItem>
                                        <IonLabel>Normal</IonLabel>
                                        <IonRadio slot="end" value="N"></IonRadio>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Patologico</IonLabel>
                                        <IonRadio slot="end" value="P"></IonRadio>
                                    </IonItem>
                                </IonRadioGroup>
                                <IonRadioGroup>
                                    <IonItem>
                                        <IonLabel>Motivos de Derivacíon</IonLabel>
                                        <IonSelect name="motivo" onIonChange={e => handleInputChange(e)} value={control?.motivo}>
                                            
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
                                    <IonTextarea name="observaciones" onIonChange={e => handleInputChange(e)} value={control?.observaciones}></IonTextarea>
                                </IonItem>
                            </IonList>
                        </IonCard>
                        <IonButton expand="block" fill="outline" type="submit" disabled={isLoading}>{isLoading ? "Guardando" : "Guardar"}</IonButton>
                    </form>
                </IonContent>
            </IonPage>
        </>
    )
}
export default EditControlEmbrazada