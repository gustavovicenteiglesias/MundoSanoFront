import { IonButton, IonItem, IonItemGroup, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import "../pages/Home.css"
import Consulta from "../data/data";
interface Pais {
    ubicacion: {
        pais:
        {
            nombre: string,
            parajes: string[]
        }[]
    }
}
const LocalizacionTrabajo: React.FC = () => {
    const [pais, setPais] = useState<string>();
    const [response, setResponse] = useState<Pais>();

    useEffect(() => {
        setResponse(Consulta.data)
    }, [])
    const continuar=()=>{

        console.log("continuar")
    }
    return (
        <>
        <IonItemGroup>
            <IonItem>
                <IonLabel>PAÍS</IonLabel>
                <IonSelect value={pais} placeholder="opcion" onIonChange={e => setPais(e.detail.value)}>
                    {response?.ubicacion.pais.map((data,i)=>{
                        return(
                            <IonSelectOption key={i} value={data.nombre}>{data.nombre}</IonSelectOption>
                        )
                    })

                    }
                   
                </IonSelect>
            </IonItem>
            
        </IonItemGroup>
        <IonButton expand='block' routerLink="/personas">Continuar</IonButton>
        </>
    )

}
export default LocalizacionTrabajo;
