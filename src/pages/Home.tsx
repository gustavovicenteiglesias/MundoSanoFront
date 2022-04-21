import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader,  IonIcon,  IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    
      
      <IonContent>
    <IonGrid>
      <IonRow>
        <IonCol size='4'>ion-col</IonCol>
        <IonCol size='8'>ion-col</IonCol>
       
      </IonRow>

      
    </IonGrid>
  </IonContent>
   
    
  );
};

export default Home;
