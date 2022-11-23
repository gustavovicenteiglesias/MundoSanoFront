import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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


setupIonicReact();

const App: React.FC = () => {
  const [paises,setPaises]=useState<any>([]);
  let sqlite = useSQLite()

 
  
  useEffect(()=>{
    const testDatabaseCopyFromAssets = async (): Promise<any> => {
      try {
      sqlite.copyFromAssets();
      let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
      await db.open();
      let res: any = await db.query("SELECT * FROM paises");
      let personas:any=await db.query("SELECT p.nombre,p.apellido FROM ubicaciones u INNER JOIN personas p ON p.id_persona=u.id_persona WHERE u.id_pais=12 AND u.id_area=3 AND u.id_paraje=17 ")
      console.log(`@@@ res.values.length ${res.values.length}`)
      console.log(`@@@ res ${res}`)
      console.log(`@@@ res.values ${JSON.stringify(res.values) }`)
      console.log(`@@@ personas.values ${JSON.stringify(personas.values) }`)
      setPaises( res.values);
      res.values.map((data:any)=>{
        
        return(
          console.log(data.nombre)
        )
        
      })
      
     // setPaises(JSON.parse(res.values) )
     db.close()
      await sqlite.closeConnection("triplefrontera")
      return true;
    }
   catch (error:any) {
    return false;
  }
  } 
    testDatabaseCopyFromAssets()
}, [])

  return (

    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home paises={paises}/>
          </Route>
          <Route exact path="/personas">
            <Personas />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
