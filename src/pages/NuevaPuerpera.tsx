import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import FormularioNuevaEmbarazada from "../components/FormularioNuevaEmbarazada"
import { animationBuilder } from "../components/AnimationBuilder"
import { useHistory } from "react-router"



const NuevaPuerpera:React.FC=()=>{
    const history=useHistory()

    return(
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                   
                    <IonButtons slot="start" >
                        <IonBackButton defaultHref="/personas" routerAnimation={animationBuilder} />
                    </IonButtons>
                   
                </IonToolbar>
            </IonHeader>
            {/*<FormularioNuevaEmbarazada></FormularioNuevaEmbarazada>*/}
        </IonPage>
    )
}
export default NuevaPuerpera