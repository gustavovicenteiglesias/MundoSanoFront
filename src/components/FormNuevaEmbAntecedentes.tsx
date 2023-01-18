
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonContent, IonDatetime, IonInput, IonItem, IonLabel, IonNote, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSQLite } from "react-sqlite-hook"
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

interface antecedentes{
    id_antecedente?:number,
    id_persona?:number,
    id_control?:number,
    edad_primer_embarazo?:number|null,
    fecha_ultimo_embarazo?:string|null,
    gestas?:number|0,
    partos?:number|0,
    cesareas?:number|0,
    abortos?:number|0,
    planificado?:number|null,
    fum?:string|null,
    fpp?:string|null	
}
interface antecedentesPersona{
    persona:persona
}
interface persona {
    id_persona?:number,
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
    paraje_residencia?:number,
    num_vivienda?:number,
    latitud?: number | null,
    longitud?: number | null,
    formLLeno?:boolean

}
const FormNuevaEmbAtecedentes: React.FC<antecedentesPersona> = (persona) => {
    const [datapicker, setDataPicker] = useState<boolean>(false)
    const [datapicker1, setDataPicker1] = useState<boolean>(false)
    const [datapicker2, setDataPicker2] = useState<boolean>(false)
    const [fecha, setFecha] = useState<string>()
    const [fecha1, setFecha1] = useState<string>()
    const [fechaFUM, setFechaFUM] = useState<string>()
    const [fechaFUM1, setFechaFUM1] = useState<string>()
    const [fechaFPP, setFechaFPP] = useState<string>()
    const [fechaFPP1, setFechaFPP1] = useState<string>()
    const [macs, setMacs] = useState<any>([])
    const [apps, setApps] = useState<any>([])
    const [ante,setAnte]=useState<antecedentes>()
    const [plani,setPlani]=useState<boolean>(false)
    const [paciente,setPaciente]=useState<persona>()

    const fechaNacimiento = (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        console.log(dia)
        setDataPicker(false)
        setFecha(e.detail.value)
        setFecha1(dia)
    }
    const fecha_FUM= (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        console.log(dia)
        setDataPicker1(false)
        setFechaFUM(e.detail.value)
        setFechaFUM1(dia)
    }

    const fecha_FPP= (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        console.log(dia)
        setDataPicker2(false)
        setFechaFPP(e.detail.value)
        setFechaFPP1(dia)
    }

    const calculoFPP=(e: any)=>{
        const dia = moment(fechaFUM).add(280, 'days')
        console.log(dia.format())
        setFechaFPP(dia.format())
        setFechaFPP1(dia.format("DD-MM-YYYY"))
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAnte((prevProps) => ({ ...prevProps, [name]: value }));
    }
    
    const onSubmit = async (e: any) => {
        e.preventDefault()
        
        console.log(ante)
       


    }

    let sqlite = useSQLite()
    useEffect(() => {

        const testDatabaseCopyFromAssets = async (): Promise<any> => {
            try {
                let respConection = await sqlite.isConnection("triplefrontera")
                console.log("conection " + JSON.stringify(respConection))
                if (respConection.result) {
                    await sqlite.closeConnection("triplefrontera")

                }
                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
                await db.open();
                let res: any = await db.query("SELECT * FROM macs")
                console.log(res.values)
                setMacs(res.values)
                let resAPP: any = await db.query("SELECT * FROM apps")
                console.log(resAPP.values)
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
    useEffect(()=>{
        setPaciente(persona.persona)
    },[])
    console.log(`@@@@ Paciente ${JSON.stringify(paciente)}`)
    return (
        <IonContent>
            <form onSubmit={(e) => onSubmit(e)}>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Edad 1er Parto</IonLabel>
                            <IonInput name="edad_primer_embarazo" onIonChange={(e) => handleInputChange(e)}></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Fecha de Nacimiento</IonLabel>
                            <IonInput onClick={() => setDataPicker(true)} name="fecha_nacimiento">{fecha1}</IonInput>

                            {datapicker && <IonDatetime presentation="date" onIonChange={(e) => fechaNacimiento(e)} value={fecha}></IonDatetime>}
                        </IonItem>

                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Gestaciones</IonLabel>
                            <IonInput type="number" name="gestas" onIonChange={(e) => handleInputChange(e)}></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Partos</IonLabel>
                            <IonInput type="number" name="partos" onIonChange={(e) => handleInputChange(e)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Cesareas</IonLabel>
                            <IonInput type="number" name="cesareas" onIonChange={(e) => handleInputChange(e)}></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Abortos</IonLabel>
                            <IonInput type="number" name="abortos" onIonChange={(e) => handleInputChange(e)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">APPs</IonLabel>
                            <IonSelect name="app" onIonChange={(e) => handleInputChange(e)}>
                           
                                {macs?.map((data: any, i: any) => {
                                    return (
                                        <IonSelectOption value={data.id_mac} key={i}>{data.nombre}</IonSelectOption>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">MACs</IonLabel>
                            <IonSelect name="mac" onIonChange={(e) => handleInputChange(e)}>
                                {apps?.map((data: any, i: any) => {
                                       
                                    return (
                                        <IonSelectOption value={data.id_app} key={i}>{data.nombre}</IonSelectOption>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRadioGroup allowEmptySelection={true}   name="planificado" onIonChange={(e) => handleInputChange(e)} >
                    <IonItem lines="full" >
                        <IonLabel className="ion-text-wrap">Embarazo Planificado</IonLabel>
                        <IonRadio slot="end" value={true} ></IonRadio>
                    </IonItem>
                </IonRadioGroup>
                <IonRow>
                <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Fecha Última Menstruación</IonLabel>
                            <IonInput onClick={() => setDataPicker1(true)} name="fum" >{fechaFUM1}</IonInput>

                            {datapicker1 && <IonDatetime presentation="date" onIonChange={(e) => fecha_FUM(e)} value={fechaFUM}></IonDatetime>}
                        
                        </IonItem>
                        <IonButton expand="block" fill="outline" onClick={(e) => calculoFPP(e)}>Calcular Fecha Probable de Parto</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Fecha Probable de Parto</IonLabel>
                            <IonInput onClick={() => setDataPicker2(true)} name="fpp">{fechaFPP1}</IonInput>

                            {datapicker2 && <IonDatetime presentation="date"  onIonChange={(e) => fecha_FPP(e)} value={fechaFPP}></IonDatetime>}
                        </IonItem>

                    </IonCol>          
                </IonRow>
                <IonButton type="submit" expand="block">Enviar </IonButton>
            </form>
        </IonContent>
    )
}
export default FormNuevaEmbAtecedentes