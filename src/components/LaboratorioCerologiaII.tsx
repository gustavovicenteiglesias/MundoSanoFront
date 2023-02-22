import { Input } from "@ionic/core/dist/types/components/input/input";
import { IonCard, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow } from "@ionic/react"
import { useState } from "react"



const LaboratorioCerologia: React.FC<any> = ({titulo,radio,radioname,radioOpcionName,radioOpcion,radioOpcionValue,inputvalue,inputname}) => {

    const [show,setshow]=useState<boolean>(false);
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        radioOpcionValue(e)
    }

    const handleInputChangeCheck = (e: any) => {
        const { name, value } = e.target;
        if (e.detail.checked) {
            setshow(true)
        }else{
            setshow(false)
        }
        radio(e)
    }

    const handleInputChangeInput = (e: any) => {
        const { name, value } = e.target;
        inputvalue(e)
    }

    return (
        <>
        <IonCard>
            <IonRow>
            <IonCol sizeXs="6">
                <IonItem>
                    <IonLabel className="ion-text-wrap">{titulo}</IonLabel>
                    <IonCheckbox slot="start" onIonChange={e=>handleInputChangeCheck(e)} name={radioname}></IonCheckbox>
                </IonItem>
            </IonCol>
            {show&&<IonCol sizeXs="6">
                <IonRadioGroup  name={radioOpcionName} onIonChange={e => handleInputChange(e)}>
                    <IonItem>
                        <IonLabel>Solicitado</IonLabel>
                        <IonRadio slot="end" value={radioOpcion[0]}></IonRadio>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Resultado</IonLabel>
                        <IonRadio slot="end" value={radioOpcion[1]}></IonRadio>
                    </IonItem>
                </IonRadioGroup>
                <IonItem>
                    <IonLabel position="floating">Ingrese Valor</IonLabel>
                    <IonInput type="number" name={inputname} onIonChange={e => handleInputChangeInput(e)}></IonInput>
                </IonItem>
            </IonCol>}
            </IonRow>
            </IonCard>
        </>
    )
}

export default LaboratorioCerologia