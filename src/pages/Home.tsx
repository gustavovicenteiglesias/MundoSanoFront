import { IonButton,  IonCol, IonContent, IonGrid,  IonRow } from '@ionic/react';

import LocalizacionTrabajo from '../components/LocalizacionTrabajo';

import './Home.css';

const Home: React.FC = () => {

  
  return (


    <IonContent className='content-border'>
      <IonGrid>
        <IonRow>
          <IonCol sizeMd='4' sizeSm='12' sizeXs='12' className='ion-justify-content-between'>
           <div className='content-div-1'>
           
            <img src="https://www.mundosano.org/wp-content/themes/mundosano/img/logo.svg" alt="mundo sano"  />
           
            
              <img src="https://unsada.edu.ar/images/headers/unsada_logo_400.jpg" alt="unsada"  />
            
           
            <img src="https://www.adesar.org.ar/wp-content/uploads/2021/09/logo_adesar-alta-01-01-740x167-1.png" alt="AdeSar"  />
           
            </div>
             </IonCol>
          <IonCol sizeMd='8' sizeSm='12' sizeXs='12'>
            <div className='content-div'>
              <h3>Seleccione localización de trabajo</h3>
              <div className='line-separator'></div>
              <div className='item-center'>
              <LocalizacionTrabajo />
              
              
              </div>
              
            </div>
          </IonCol>

        </IonRow>


      </IonGrid>
    </IonContent>


  );
};

export default Home;
