import { IonItem, IonItemGroup, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useState } from "react";
import  "../pages/Home.css"

const LocalizacionTrabajo: React.FC = () => {
    const [gender, setGender] = useState<string>();
    return (
        <IonItemGroup>
           
            <IonItem>
                <IonLabel>Gender</IonLabel>
                <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
                    <IonSelectOption value="female">Female</IonSelectOption>
                    <IonSelectOption value="male">Male</IonSelectOption>
                </IonSelect>
            </IonItem>
            
        </IonItemGroup>
    )

}
export default LocalizacionTrabajo;
