import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Personas from './pages/Personas';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
//Sqlite

import { SQLiteConnection, capSQLiteOptions, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';
import { useEffect, useRef, useState } from 'react';
import DetallePaciente from './pages/DetallePaciente';
import { animationBuilder } from './components/AnimationBuilder';
import NuevaEmbarazada from './pages/NuevaEmbarazada';
import NuevaEmbarazadaAntecedentes from './pages/NuevaEmbarazadaAntecedentes';
import NuevaEmbarazadaControl from './pages/NuevaEmbarazadaControl';
import EditarAntecedentes from './pages/EditarAntecedentes';
import EditControlEmbrazada from './pages/EditControlEmbarazada';

setupIonicReact();

const App: React.FC = () => {
 


  return (

    <IonApp>
      <IonPage>
      
      <IonReactRouter >
        <IonRouterOutlet animation={animationBuilder}>
        <Route exact path="/detallePaciente">
            <DetallePaciente/>
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/personas">
            <Personas />
          </Route>
          <Route exact path="/nuevaembarazada">
            <NuevaEmbarazada />
          </Route>
          <Route exact path="/nuevaembarazadaantecedentes">
            <NuevaEmbarazadaAntecedentes />
          </Route>
          <Route exact path="/editantecedentes">
            <EditarAntecedentes />
          </Route>
          <Route exact path="/nuevaembarazadacontrol">
            <NuevaEmbarazadaControl />
          </Route>
          <Route exact path="/editcontrol">
            <EditControlEmbrazada />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      </IonPage>
    </IonApp>
  );
}
export default App;
