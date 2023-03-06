
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonContent, IonDatetime, IonInput, IonItem, IonLabel, IonNote, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { useSQLite } from "react-sqlite-hook"
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useHistory } from "react-router";

interface antecedentes {
    id_antecedente?: number,
    id_persona?: number,
    id_control?: number,
    edad_primer_embarazo?: number | null,
    fecha_ultimo_embarazo?: string | null,
    gestas?: number | 0,
    partos?: number | 0,
    cesareas?: number | 0,
    abortos?: number | 0,
    planificado?: number | null,
    fum?: string | null,
    fpp?: string | null,
    fecha?: Date,
    id_app: number | null,
    id_mac: number | null

}
interface antecedentesPersona {
    persona: persona
}
interface persona {
    id_persona?: number,
    apellido?: string,
    nombre?: string,
    documento?: string,
    fecha_nacimiento?: string,
    id_origen?: number,
    nacionalidad?: number,
    sexo?: string,
    madre?: number | null,
    alta?: number,
    nacido_vivo?: number | null,
    pais_residencia?: number,
    area_residencia?: number,
    paraje_residencia?: number,
    num_vivienda?: number,
    latitud?: number | null,
    longitud?: number | null,
    formLLeno?: boolean

}
const FormNuevaEmbAtecedentes: React.FC<any> = ({ datos }) => {
    const [datapicker, setDataPicker] = useState<boolean>(false)
    const [datapicker1, setDataPicker1] = useState<boolean>(false)
    const [datapicker2, setDataPicker2] = useState<boolean>(false)
   const [macs, setMacs] = useState<any>([])
    const [apps, setApps] = useState<any>([])
    const [ante, setAnte] = useState<any>()
    const [paciente,setPaciente]= useState<any>()
   const [error, setError] = useState<string>("")

    const history = useHistory()
    const ref = useRef("")
    const GuardarOnSutmit = async (data:antecedentes): Promise<any> => {
        try {
            let respConection = await sqlite.isConnection("triplefrontera")
            
            if (respConection.result) {
                await sqlite.closeConnection("triplefrontera")

            }
            let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
            await db.open();
            let res: any = await db.query(`UPDATE antecedentes SET edad_primer_embarazo=${data.edad_primer_embarazo},fecha_ultimo_embarazo="${data.fecha_ultimo_embarazo}",
            gestas=${data.gestas},partos=${data.partos},cesareas=${data.cesareas},abortos=${data.abortos},planificado=${data.planificado},
            fum="${data.fum}",fpp="${data.fpp}" WHERE id_antecedente=${data.id_antecedente}`)
            console.log("opdate "+ JSON.stringify(res))
           
            if (datos.antecedentes.id_app===null) {

                let insert_ante=datos.id_app===data.id_app?null: await db.query(`INSERT INTO antecedentes_apps(id_antecedente, id_app) VALUES (${data.id_antecedente},${data.id_app})`)
                
            }else{
                const res_app_antecedentes=data.id_app!==null?await db.query(`UPDATE antecedentes_apps SET id_app=${data.id_app} WHERE  id_antecedente=${data.id_antecedente}`):null
            
            }

            if (datos.antecedentes.id_mac===null) {
                
                let insert_antes=datos.id_mac===data.id_mac?null:await db.query(`INSERT INTO antecedentes_macs(id_antecedente, id_mac) VALUES (${data.id_antecedente},${data.id_mac})`)
                console.log("etmis_insert"+JSON.stringify(insert_antes))
            }else{
               let res_mac_antecedentes=data.id_mac!==null?await db.query(`UPDATE antecedentes_macs SET id_mac=${data.id_mac} WHERE  id_antecedente=${data.id_antecedente}`):null
                console.log("etmis_update"+JSON.stringify(res_mac_antecedentes))
            }

            
            db.close()
            await sqlite.closeConnection("triplefrontera")
            return true;
        }
        catch (error: any) {
            return false;
        }
    }
    
    const fechaNacimiento = (e: any) => {
        const dia = moment(e.detail.value).format("YYYY-MM-DD")
        
        setDataPicker(false)
        //setFecha(e.detail.value)
        //setFecha1(dia)
        const { name, value } = e.target;
        setAnte((prevProps:any) => ({ ...prevProps, [name]: dia }));
        
    }
    const fecha_FUM = (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        
        setDataPicker1(false)
        const { name, value } = e.target;
        setAnte((prevProps:any) => ({ ...prevProps, [name]: value }));
    }

    const fecha_FPP = (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        setDataPicker2(false)
         const { name, value } = e.target;
        setAnte((prevProps:any) => ({ ...prevProps, [name]: value }));
    }

    const calculoFPP = (e: any) => {
        const dia = moment(ante?.fum).add(280, 'days').format("YYYY-MM-DD")
        setAnte((prevProps:any) => ({ ...prevProps, fpp: dia }));
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAnte((prevProps:any) => ({ ...prevProps, [name]: value }));
    }

    const onSubmit = (e: any) => {
        e.preventDefault()


        
        
        
        if (ante?.abortos !== undefined &&ante?.cesareas!== undefined && ante?.partos!== undefined && ante?.gestas !== undefined) {
            if ((Number(ante?.abortos) + Number(ante?.cesareas) + Number(ante?.partos)) > (Number(ante?.gestas) - 1)) {

                setError("La suma de abortos , cesareas y partos no puede superar la cantidad de gestaciones ")
            } else {
                let data_antecedentes = ante;

                data_antecedentes.fecha = new Date()
               
                if (ante.planificado) {
                    data_antecedentes.planificado = 1
                } else {
                    data_antecedentes.planificado = 0
                }
                //let persona = paciente
               // persona.antecedentes=data_antecedentes
                GuardarOnSutmit(data_antecedentes)
                history.push("/personas")
                window.location.reload()
                setError("")
            }
        }
    }

    let sqlite = useSQLite()
    useEffect(() => {

        const testDatabaseCopyFromAssets = async (): Promise<any> => {
            try {
                let respConection = await sqlite.isConnection("triplefrontera")
                
                if (respConection.result) {
                    await sqlite.closeConnection("triplefrontera")

                }
                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
                await db.open();
                let res: any = await db.query("SELECT * FROM macs")
                
                setMacs(res.values)
                let resAPP: any = await db.query("SELECT * FROM apps")
                
                setApps(resAPP.values)
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
        setAnte(datos.antecedentes)
        setPaciente(datos)
    }, [])

    useEffect(() => {

    }, [error])
   // console.log("datos "+JSON.stringify(datos))
   //console.log("ante   "+JSON.stringify(ante))
    return (
        <IonContent>
            <form onSubmit={(e) => onSubmit(e)}>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Edad 1er Parto</IonLabel>
                            <IonInput name="edad_primer_embarazo" required onIonChange={(e) => handleInputChange(e)} value={ante?.edad_primer_embarazo}></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Fecha de último parto</IonLabel>
                            <IonInput onClick={() => setDataPicker(true)} name="fecha_ultimo_embarazo" value={ante?.fecha_ultimo_embarazo}></IonInput>

                            {datapicker && <IonDatetime presentation="date" name="fecha_ultimo_embarazo" onIonChange={(e) => fechaNacimiento(e)} value={ante?.fecha_ultimo_embarazo}></IonDatetime>}
                        </IonItem>

                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Gestaciones</IonLabel>
                            <IonInput type="number" name="gestas" required onIonChange={(e) => handleInputChange(e)} value={ante?.gestas}></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Partos</IonLabel>
                            <IonInput type="number" name="partos" required onIonChange={(e) => handleInputChange(e)} value={ante?.partos}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Cesareas</IonLabel>
                            <IonInput type="number" name="cesareas" required onIonChange={(e) => handleInputChange(e)} value={ante?.cesareas}></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Abortos</IonLabel>
                            <IonInput type="number" name="abortos" required onIonChange={(e) => handleInputChange(e)} value={ante?.abortos}></IonInput>
                        </IonItem>
                    </IonCol>

                </IonRow>
                <IonCol>
                    <div className="ion-text-center"><IonLabel color="warning"> {error} </IonLabel></div>
                </IonCol>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">APPs</IonLabel>
                            <IonSelect name="id_app" onIonChange={(e) => handleInputChange(e)} value={ante?.id_app}>

                                {apps?.map((data: any, i: any) => {
                                    return (
                                        <IonSelectOption value={data.id_app} key={i}>{data.nombre}</IonSelectOption>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">MACs</IonLabel>
                            <IonSelect name="id_mac" onIonChange={(e) => handleInputChange(e)} value={ante?.id_mac}>
                                {macs?.map((data: any, i: any) => {

                                    return (
                                        <IonSelectOption value={data.id_mac} key={i}>{data.nombre}</IonSelectOption>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRadioGroup allowEmptySelection={true} name="planificado" onIonChange={(e) => handleInputChange(e)} >
                    <IonItem lines="full" >
                        <IonLabel className="ion-text-wrap">Embarazo Planificado</IonLabel>
                        <IonRadio slot="end" value={true} ></IonRadio>
                    </IonItem>
                </IonRadioGroup>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Fecha Última Menstruación</IonLabel>
                            <IonInput onClick={() => setDataPicker1(true)} name="fum" >{ante?.fum}</IonInput>

                            {datapicker1 && <IonDatetime presentation="date" name="fum" onIonChange={(e) => fecha_FUM(e)} value={moment(ante?.fum).format("YYYY-MM-DD")}></IonDatetime>}

                        </IonItem>
                        <IonButton expand="block" fill="outline" onClick={(e) => calculoFPP(e)}>Calcular Fecha Probable de Parto</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Fecha Probable de Parto</IonLabel>
                            <IonInput onClick={() => setDataPicker2(true)} name="fpp">{ante?.fpp}</IonInput>

                            {datapicker2 && <IonDatetime presentation="date" name="fpp" onIonChange={(e) => fecha_FPP(e)} value={moment(ante?.fpp).format("YYYY-MM-DD")}></IonDatetime>}
                        </IonItem>

                    </IonCol>
                </IonRow>
                <IonButton type="submit" expand="block">Enviar </IonButton>
            </form>
        </IonContent>
    )
}
export default FormNuevaEmbAtecedentes