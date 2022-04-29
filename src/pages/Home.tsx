import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader,  IonIcon,  IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    
      
      <IonContent className='content-border'>
    <IonGrid>
      <IonRow>
        <IonCol sizeMd='4' sizeSm='12' sizeXs='12'><div className='content-div'>ion-col</div> </IonCol>
        <IonCol sizeMd='8' sizeSm='12' sizeXs='12'><div className='content-div'>ion-col</div></IonCol>
       
      </IonRow>

      
    </IonGrid>
  </IonContent>
   
    
  );
};

export default Home;
