import { IonBackButton, IonButtons, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import FormularioNuevaEmbarazada from "../components/FormularioNuevaEmbarazada"
import { animationBuilder } from "../components/AnimationBuilder"
import { useHistory, useLocation } from "react-router"
import FormEditAntecedentes from "../components/FormEditAntecedentes"
import { useState } from "react"



const EditarAntecedentes:React.FC=()=>{
    const location = useLocation();
    const [paciente, setPaciente] = useState<any>(location.state);
    const history=useHistory()
    
    return(
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                   <IonButtons slot="start" >
                        <IonBackButton defaultHref="/personas" routerAnimation={animationBuilder} />
                    </IonButtons>
                   <IonLabel >Antecedentes de {paciente?.nombre} {paciente?.apellido}</IonLabel>
                </IonToolbar>
            </IonHeader>
            <FormEditAntecedentes datos={paciente}></FormEditAntecedentes>
        </IonPage>
    )
}
export default EditarAntecedentes