import { IonButton, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSelect, IonSelectOption, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5"
import { SQLiteDBConnection, useSQLite } from "react-sqlite-hook"


const FilterComponent: React.FC<any> = ({ onFilter, onClear, filterText }) => {
    let sqlite = useSQLite()
    const [comboetmi, setComboEtmi] = useState<any>([])
    const [paises, setPaises] = useState<any>([])
    const [area, setArea] = useState<any>([])
    const [areas, setAreas] = useState<any>([])
    const [paraje, setParaje] = useState<any>([])
    const [parajes, setParajes] = useState<any>([])
    const [showArea, setShowArea] = useState<boolean>(true)
    const [showParaje, setShowParaje] = useState<boolean>(true)



    useEffect(() => {
        const testDatabaseCopyFromAssets = async (): Promise<any> => {
            try {
                let respConection = await sqlite.isConnection("triplefrontera")

                
                 
                await sqlite.closeConnection("triplefrontera")


           

                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")

                await db.open();

                let resEtmi = await db.query(`SELECT * FROM etmis`)
                let respais: any = await db.query("SELECT * FROM paises")
                setPaises(respais.values)

                let resArea: any = await db.query(`SELECT * FROM areas `)
                setArea(resArea.values)

                let resParaje: any = await db.query(`SELECT * FROM parajes `)
                setParaje(resParaje.values)


                setComboEtmi(resEtmi.values)

                db.close()
                await sqlite.closeConnection("triplefrontera")
                return true;
            }
            catch (error: any) {
                console.log("error conexion")
                return false;
            }
        }

        testDatabaseCopyFromAssets()
    }, [])

    const onHandlePais = async (e: any) => {
        onFilter(e)
        if (e.target.value !== "") {
            let id_pais = 0
            setShowArea(false)
            switch (e.target.value) {
                case "Argentina":
                    id_pais = 12
                    break;
                case "Bolivia":
                    id_pais = 27
                    break;
                case "Brasil":
                    id_pais = 31
                    break;
                case "Chile":
                    id_pais = 43
                    break;
                case "Colombia":
                    id_pais = 46
                    break;
                case "Ecuador":
                    id_pais = 47
                    break;
                case "Paraguay":
                    id_pais = 177
                    break;
                case "Peru":
                    id_pais = 178
                    break;
                case "Venezuela":
                    id_pais = 243
                    break;
                default:
                    id_pais = 0
                    break;
            }
            setAreas(area.filter((item: any) => item.id_pais === id_pais))
        } else {
            setShowArea(true)
            setShowParaje(true)
        }
    }
    const onHandleArea = (e: any) => {

        onFilter(e)

        if (e.target.value !== "") {
            let id_area = 0
            setShowParaje(false)
            switch (e.target.value) {
                case "BOLIVIA":
                    id_area = 1
                    break;
                case "PARAGUAY":
                    id_area = 2
                    break;
                case "SANTA VICTORIA ESTE":
                    id_area = 3
                    break;
                case "ALTO LA SIERRA":
                    id_area = 4
                    break;

                default:
                    id_area = 0
                    break;
            }
            setParajes(paraje.filter((item: any) => item.id_area === id_area))
        } else {
            setShowParaje(true)
        }
    }
    //useEffect(()=>{},[area])
    return (
        <>
            <IonGrid>

                <IonRow>

                    <IonCol size-xs="12" size-sm="4">
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating" >Paises</IonLabel>
                                <IonSelect onIonChange={e => onHandlePais(e)} >
                                    <IonSelectOption value="">Ver todos</IonSelectOption>
                                    {paises.map((data: any, i: any) => {
                                        return (
                                            <IonSelectOption key={i} value={data.nombre}>{data.nombre}</IonSelectOption>
                                        )

                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonCol>
                    <IonCol size-xs="12" size-sm="4">
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating" >Area</IonLabel>
                                <IonSelect onIonChange={e => onHandleArea(e)} disabled={showArea} >
                                    <IonSelectOption value="">Ver todos</IonSelectOption>
                                    {areas.map((data: any, i: any) => {
                                        return (
                                            <IonSelectOption key={i} value={data.nombre}>{data.nombre}</IonSelectOption>
                                        )

                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonCol>
                    <IonCol size-xs="12" size-sm="4">
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating" >Paraje</IonLabel>
                                <IonSelect onIonChange={e => onFilter(e)} disabled={showParaje}>
                                    <IonSelectOption value="">Ver todos</IonSelectOption>
                                    {parajes.map((data: any, i: any) => {
                                        return (
                                            <IonSelectOption key={i} value={data.nombre}>{data.nombre}</IonSelectOption>
                                        )

                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonCol>


                    <IonCol size-xs="12" size-sm="4">
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating" >ETMI</IonLabel>
                                <IonSelect onIonChange={e => onFilter(e)} >
                                    <IonSelectOption value="">Ver todos</IonSelectOption>
                                    {comboetmi.map((data: any, i: any) => {
                                        return (
                                            <IonSelectOption key={i} value={data.nombre}>{data.nombre}</IonSelectOption>
                                        )

                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonCol>
                    <IonCol>

                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonSearchbar showClearButton="focus" onIonChange={e => onFilter(e)} animated={true} placeholder="Nombre o Apellido" onIonClear={e => onClear(e)}></IonSearchbar>
        </>
    )
}
export default FilterComponent