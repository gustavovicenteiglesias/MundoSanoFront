import { IonButton, IonItem, IonItemGroup, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import "../pages/Home.css"
import Consulta from "../data/data";
interface Pais {
    ubicacion: {
        pais:
        {
            nombre: string,
            parajes?: string[]
        }[]
    }
}
const LocalizacionTrabajo: React.FC<any> = ({paises}) => {
    const [pais, setPais] = useState<string>();
   
    
    
   
    return (
        <>
       {/* <IonItemGroup>
            <IonItem>
                <IonLabel>PAÍS</IonLabel>
                <IonSelect value={pais} placeholder="opcion" onIonChange={e => setPais(e.detail.value)}>
                    {paises?.map((data:any,i:any)=>{
                        return(
                            <IonSelectOption key={i} value={data.nombre}>{data.nombre}</IonSelectOption>
                        )
                    })

                    }
                   
                </IonSelect>
            </IonItem>
            
                </IonItemGroup>*/}
        <IonButton expand='block' routerLink="/personas" color="secondary">Continuar</IonButton>
        </>
    )

}
export default LocalizacionTrabajo;
