import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import FormularioNuevaEmbarazada from "../components/FormularioNuevaEmbarazada"
import { animationBuilder } from "../components/AnimationBuilder"
import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import FormNuevaEmbAtecedentes from "../components/FormNuevaEmbAntecedentes"


const NuevaEmbarazada:React.FC=()=>{
   

    /*const HandleOnsutmitcallBack=(e:any)=>{
        console.log("Paciente"+JSON.stringify( e) );
        setPaciente(e)
    }*/
   

    return(
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                   
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/personas" routerAnimation={animationBuilder} />
                    </IonButtons>
                   
                </IonToolbar>
            </IonHeader>
            <FormularioNuevaEmbarazada></FormularioNuevaEmbarazada>
            
        </IonPage>
    )
}
export default NuevaEmbarazada