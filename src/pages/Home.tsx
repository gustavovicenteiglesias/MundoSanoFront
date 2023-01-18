import { IonButton,  IonCol, IonContent, IonGrid,  IonPage,  IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import { SQLiteDBConnection, useSQLite } from 'react-sqlite-hook';

import LocalizacionTrabajo from '../components/LocalizacionTrabajo';

//import './Home.css';


const Home: React.FC<any>= () => {


let sqlite = useSQLite()

  const [paises,setPaises]=useState<any>([]);
  
useEffect(()=>{
  const testDatabaseCopyFromAssets = async (): Promise<any> => {
    try {
      let existe:any= await sqlite.isDatabase("triplefrontera")
      if(!existe.result)sqlite.copyFromAssets();
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

    <IonPage>
    <IonContent className='content-border'>
      <IonGrid>
        <IonRow>
         
          <IonCol >
            <div className='content-div'>
              <h3>Seleccione localización de trabajo</h3>
              
              <LocalizacionTrabajo paises={paises}/>
              
            </div>
          </IonCol>

        </IonRow>


      </IonGrid>
    </IonContent>
    </IonPage>

  );
};

export default Home;
