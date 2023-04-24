import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import { SQLiteDBConnection, useSQLite } from 'react-sqlite-hook';

import LocalizacionTrabajo from '../components/LocalizacionTrabajo';
import Personas from './Personas';
import React from 'react';
import { datos } from '../data/exportar';
//import './Home.css';
import { Device } from '@capacitor/device';

const Home: React.FC<any> = () => {


  let sqlite = useSQLite()

  const [paises, setPaises] = useState<any>([]);

  const exportJson = async () => {
    try {

      let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
      await db.open();
      let res: any = await db.exportToJson("partial")

      console.log(`@@@ export ${JSON.stringify(res)}`)


      // setPaises(JSON.parse(res.values) )
      db.close()
      await sqlite.closeConnection("triplefrontera")
      return true;
    }
    catch (error: any) {
      return false;
    }
  }

  useEffect(() => {
    const testDatabaseCopyFromAssets = async (): Promise<any> => {
      try {
      
        let existe: any = await sqlite.isDatabase("triplefrontera")
        console.log(`Existe ${JSON.stringify(existe)}`)
        const Jasondato=JSON.parse(JSON.stringify(datos))
        console.log(Jasondato)
        if (!existe.result) {
         // await sqlite.copyFromAssets()
          await sqlite.importFromJson(JSON.stringify(datos))
          .then(async(res)=>{
            console.log("Cambios"+res.changes)
            let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
            await db.open();
            let rescrate: any = await db.createSyncTable();
            console.log(`Create Table ${JSON.stringify(rescrate.changes)}`)
            const d = new Date();    
            await db.setSyncDate(d.toISOString());
            
          
           await db.close()
          })
         .catch((error)=>console.log(error))
          
        }

        let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
        await db.open();
       
        let res: any = await db.query("SELECT * FROM paises");
        let personas: any = await db.query("SELECT p.nombre,p.apellido FROM ubicaciones u INNER JOIN personas p ON p.id_persona=u.id_persona WHERE u.id_pais=12 AND u.id_area=3 AND u.id_paraje=17 ")
        console.log(`@@@ res.values.length ${res.values.length}`)
        console.log(`@@@ res ${res}`)
        console.log(`@@@ res.values ${JSON.stringify(res.values)}`)
        console.log(`@@@ personas.values ${JSON.stringify(personas.values)}`)
        setPaises(res.values);
        res.values.map((data: any) => {

          return (
            console.log(data.nombre)
          )

        })

        // setPaises(JSON.parse(res.values) )
        db.close()
        await sqlite.closeConnection("triplefrontera")
        return true;
      }
      catch (error: any) {
        return false;
      }
    }
    testDatabaseCopyFromAssets()
  }, [])
 
  return (

    <IonPage>
      <IonContent className='content-border'>
        <IonGrid>
          <IonRow>

            <IonCol >
              <div className='content-div'>
                <h3>Seleccione localización de trabajo</h3>

                <LocalizacionTrabajo paises={paises} />

              </div>
              {/*<IonButton onClick={()=>exportJson()}>Exportar</IonButton>*/}
            </IonCol>
         
          </IonRow>


        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

export default Home;
