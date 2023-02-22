import { DatetimeChangeEventDetail, IonButton, IonContent, IonDatetime, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption } from "@ionic/react"
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment"
import { useEffect, useState } from "react";
import { SQLiteConnection, capSQLiteOptions, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';
import { Geolocation } from '@capacitor/geolocation';

const FormularioNuevaPuerpera: React.FC = () => {
    const [datapicker, setDataPicker] = useState<boolean>(false)
    const [fecha, setFecha] = useState<string>()
    const [fecha1, setFecha1] = useState<string>()
    const [origen, setOrigen] = useState<any>([])
    const [paises, setPaises] = useState<any>([])
    const [paisRecidencia,setPaisRecidencia]=useState<any>()
    const [area,setArea]=useState<any>([])
    const [areaResidencia,setAreaResidencia]=useState<any>()
    const [parajes,setParaje]=useState<any>([])
    const [parajeesidencia,setParajeResidencia]=useState<any>()
    const [latitud,setLatitud]=useState<any>()
    const [longitud,setLongitud]=useState<any>()

    let sqlite = useSQLite()
    const fechaNacimiento = (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        
        setDataPicker(false)
        setFecha(e.detail.value)
        setFecha1(dia)
    }

    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition()
                            .then((resp)=>{
                                setLatitud(resp.coords.latitude)
                                setLongitud(resp.coords.longitude)
                            })
        
      };

      const onSubmit=(e:any)=>{
        e.preventDefault()
        
      }

    useEffect(()=>{
        printCurrentPosition()
    },[])

    useEffect(() => {

        const testDatabaseCopyFromAssets = async (): Promise<any> => {
            try {
                let respConection = await sqlite.isConnection("triplefrontera")
                
                if (respConection.result) {
                    await sqlite.closeConnection("triplefrontera")

                }
                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
                await db.open();
                let res: any = await db.query("SELECT * FROM origenes")
                setOrigen(res.values)
                let respais: any = await db.query("SELECT * FROM paises")
                setPaises(respais.values)
                let resArea: any = await db.query(`SELECT * FROM areas WHERE id_pais=${paisRecidencia}`)
                setArea(resArea.values)
                let resParaje: any = await db.query(`SELECT * FROM parajes WHERE id_area=${areaResidencia}`)
                setParaje(resParaje.values)
                
                
                
                db.close()
                await sqlite.closeConnection("triplefrontera")
                return true;
            }
            catch (error: any) {
                return false;
            }
        }
        testDatabaseCopyFromAssets()
    }, [paisRecidencia,areaResidencia])
    
    return (
        <IonContent>
            <form onSubmit={(e)=>onSubmit(e)}>
            <IonList>
                <IonItem>
                    <IonLabel position="stacked">Nombre</IonLabel>
                    <IonInput placeholder="Nombre" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Apellido</IonLabel>
                    <IonInput placeholder="Apellido" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Documento</IonLabel>
                    <IonInput placeholder="Documento" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Fecha de Nacimiento</IonLabel>
                    <IonInput onClick={() => setDataPicker(true)} >{fecha1}</IonInput>
                    {datapicker && <IonDatetime presentation="date" onIonChange={(e) => fechaNacimiento(e)} value={fecha}></IonDatetime>}
                </IonItem>
                <IonItem>
                <IonLabel position="stacked">Origen</IonLabel>
                    <IonSelect placeholder="Origen" >
                        {origen.map((data: any, i: any) => {
                            return <IonSelectOption value={data.nombre} key={i}>{data.nombre}</IonSelectOption>
                        })}

                    </IonSelect>
                </IonItem>
                <IonItem>
                <IonLabel position="stacked">Nacionalidad</IonLabel>
                    <IonSelect placeholder="Nacionalidad">
                        {paises.map((data: any, i: any) => {
                            return <IonSelectOption value={data.nombre} key={i}>{data.nombre}</IonSelectOption>
                        })}

                    </IonSelect>
                </IonItem>
                
            </IonList>
            <IonList>
                <IonListHeader color="secondary">
                    <IonLabel>Ubicación</IonLabel>
                </IonListHeader>
            <IonItem>
                <IonLabel position="stacked">Pais</IonLabel>
                    <IonSelect placeholder="Pais" onIonChange={e => setPaisRecidencia(e.detail.value)}>
                        <IonSelectOption value="12" >Argentina</IonSelectOption>
                        <IonSelectOption value="27" >Bolivia</IonSelectOption>
                        <IonSelectOption value="177" >Paraguay</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                <IonLabel position="stacked">Area</IonLabel>
                    <IonSelect placeholder="Area" onIonChange={e => setAreaResidencia(e.detail.value)}>
                        {area.map((data: any, i: any) => {
                            return <IonSelectOption value={data.id_area} key={i}>{data.nombre}</IonSelectOption>
                        })}

                    </IonSelect>
                </IonItem>
                <IonItem>
                <IonLabel position="stacked">Paraje</IonLabel>
                    <IonSelect placeholder="Paraje" onIonChange={e => setParajeResidencia(e.detail.value)}>
                        {parajes.map((data: any, i: any) => {
                            return <IonSelectOption value={data.id_paraje} key={i}>{data.nombre}</IonSelectOption>
                        })}

                    </IonSelect>
                </IonItem>
            </IonList>
            <IonList>
                <IonListHeader color="secondary">Geolocalización</IonListHeader>
                <IonItem>
                    <IonLabel>Latitud</IonLabel>
                    <IonLabel>{latitud}</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Longitud</IonLabel>
                    <IonLabel>{longitud}</IonLabel>
                </IonItem>
            </IonList>
            <IonButton type="submit" expand="block">Enviar </IonButton>
            </form>
        </IonContent>
    )
}
export default FormularioNuevaPuerpera