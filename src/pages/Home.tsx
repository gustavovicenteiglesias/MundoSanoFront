import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import {  useSQLite } from 'react-sqlite-hook';
import { downloadOutline } from 'ionicons/icons';
import LocalizacionTrabajo from '../components/LocalizacionTrabajo';
import Personas from './Personas';
import React from 'react';
import { datos } from '../data/exportarIII';
//import './Home.css';
import { Device } from '@capacitor/device';
import moment from 'moment';
import axios from "axios";
import logoAdesar from "../assest/adesar.png";
import logoUnsada from "../assest/unsada.png";
import logoMundoSano from "../assest/mundosano.png";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';


const Home: React.FC<any> = () => {
  const [fechaActualizacion, setFechadeActualizacion] = useState<any>();
  const [hiddenFecha, sethiddenFecha] = useState<boolean>(false)
  const [data, setData] = useState<any>();
  const [colorLogo, setColorLogo] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  let sqlite : SQLiteConnection = new SQLiteConnection(CapacitorSQLite)

  const [paises, setPaises] = useState<any>([]);

  const exportJson = async () => {
    try {

      let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera",false, "no-encryption", 1, false)

      await db.open();

      let res: any = await db.exportToJson("partial")
      if (res.export) {
        console.log("existen datos a exportar ")
        // Creamos un objeto Date con el tiempo Unix, multiplicándolo por 1000 para convertirlo a milisegundos
        let resp: any = await db.query("SELECT * FROM sync_table ORDER BY id DESC LIMIT 1")

        const date = new Date(Number(resp.values[0].sync_date) * 1000);

        // Usamos los métodos de Date para obtener el año, mes y día en formato "YYYY-MM-DD"
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Unimos las partes para formar la fecha en formato "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;
        setData(res.export)
        setFechadeActualizacion(formattedDate);
        sethiddenFecha(true);


      }
      console.log(JSON.stringify(res.export))


      // setPaises(JSON.parse(res.values) )
      db.close()
      await sqlite.closeConnection("triplefrontera",false)
      return true;
    }
    catch (error: any) {
      return false;
    }
  }
  const testDatabaseCopyFromAssets = async (): Promise<any> => {
    try {
      /*
      *Verificar que existe la base de datos 
      */
      let existe: any = await sqlite.isDatabase("triplefrontera")
      console.log(`Existe ${JSON.stringify(existe)}`)
      const Jasondato = JSON.parse(JSON.stringify(datos))
      console.log(Jasondato)
      if (!existe.result) {
        console.log("CARGAR BASE NUEVA RRRRRRRRRR")
        // await sqlite.copyFromAssets()
        /*
        * SI no exite importo por ahora una local 
        */
       setLoading(true)
        await sqlite.importFromJson(JSON.stringify(datos))
          .then(async (res) => {
            axios.get("https://areco.gob.ar:9535/api/data/json3")
              .then(async (res) => {
                console.log(`La respuesta es ${JSON.stringify(res.data)}`)
                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera",false, "no-encryption", 1, false)
                const resp: any = await sqlite.isJsonValid(JSON.stringify(res.data))
                console.log("es un jason valido? " + JSON.stringify(resp))

                const respJsonImport = await sqlite.importFromJson(JSON.stringify(res.data))
                console.log("Cambios" + JSON.stringify(respJsonImport.changes))

                await db.open();
                let rescrate: any = await db.createSyncTable();
                console.log(`Create Table ${JSON.stringify(rescrate.changes)}`)
                //creo un punto de restauracion en fecha 
                const d = new Date();
                await db.setSyncDate(d.toISOString());
                await db.close()
                await sqlite.closeConnection("triplefrontera",false)
                const de = Math.floor(new Date().getTime() / 1000);
                const datos = {
                  id: 0,
                  syncDate: de
                }
                setLoading(false)
                console.log(`fecha ${de}`)
                axios.post("https://areco.gob.ar:9535/api/sync_date", datos)
              })
            //una vez importada creo la tabla de sincronizacion 
            //console.log("Cambios" + res.changes)

          })
          .catch(async(error) => {
            await sqlite.closeConnection("triplefrontera",false)
            console.log(error)
          })

      }

      /*let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera",false, "no-encryption", 1, false)
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
      await sqlite.closeConnection("triplefrontera",false)*/
      return true;
    }
    catch (error: any) {
      return false;
    }
  }
 /* useEffect(() => {
    
    testDatabaseCopyFromAssets()
  }, [])*/

  const exportJsontoApi = () => {
    // axios post data?
    setLoading(true)
    axios.post("https://areco.gob.ar:9535/api/sqlite", data)
      .then(async (resp) => {
        let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera",false, "no-encryption", 1, false)
        setLoading(false)
        console.log(resp.data.success)
        if (resp.data.success) {
          await db.open();
          const d = new Date();
          const de = Math.floor(new Date().getTime() / 1000);
          await db.setSyncDate(d.toISOString());
          await db.close()
          await sqlite.closeConnection("triplefrontera",false)
          const datos = {
            id: 0,
            syncDate: de
          }

          console.log(`fecha ${de}`)
          axios.post("https://areco.gob.ar:9535/api/sync_date", datos)
          setColorLogo(true)
        } else {
          setColorLogo(false)
        }
      })
  }

  const importJson = () => {
    setLoading(true)
    axios.get("https://areco.gob.ar:9535/api/data/json2")
      .then(async (res) => {
        console.log(`La respuesta es ${JSON.stringify(res.data)}`)
        let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera",false, "no-encryption", 1, false)
        const resp: any = await sqlite.isJsonValid(JSON.stringify(res.data))
        console.log("es un jason valido? " + JSON.stringify(resp))

        const respJsonImport = await sqlite.importFromJson(JSON.stringify(res.data))
        console.log("Cambios" + JSON.stringify(respJsonImport.changes))
        await db.open();
        const d = new Date();
        await db.setSyncDate(d.toISOString());
        await db.close()
        await sqlite.closeConnection("triplefrontera",false)
        const de = Math.floor(new Date().getTime() / 1000);
        const datos = {
          id: 0,
          syncDate: de
        }
        setLoading(false)
        console.log(`fecha ${de}`)
        axios.post("https://areco.gob.ar:9535/api/sync_date", datos)
      })
  }
    const nuevaBBDD=async()=>{
      let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera",false, "no-encryption", 1, false)
      let borrar:any=await db.delete()
      await sqlite.closeConnection("triplefrontera",false)
      console.log("se borro")
      testDatabaseCopyFromAssets()

    }
  return (

    <IonPage>
      <IonContent className='content-border'>
        <IonGrid className='ion-align-items-center'>
          <IonRow>
            <IonCol className='col_logos' sizeSm='12' sizeXs='12' sizeLg='4' sizeXl='4'>
              <img src={logoAdesar}></img>
            </IonCol>
            <IonCol className='col_logos' sizeSm='12' sizeXs='12' sizeLg='4' sizeXl='4'>
              <img src={logoUnsada}></img>
            </IonCol>
            <IonCol className='col_logos' sizeSm='12' sizeXs='12' sizeLg='4' sizeXl='4'>
              <img src={logoMundoSano}></img>
            </IonCol>

          </IonRow>
          <IonRow >
            <IonCol >
              
            <div className='content-div'>
                {/*<h3>Seleccione localización de trabajo</h3>*/}

                <LocalizacionTrabajo paises={paises} />

               </div>
              <IonButton onClick={() => exportJson()} expand='block' color="secondary" className='button_css'>Exportar</IonButton>
              <IonButton onClick={() => importJson()} expand='block' color="secondary" className='button_css'>Importar</IonButton>
              <IonButton onClick={() => nuevaBBDD()} expand='block' color="secondary" className='button_css'>Cargar nueva base de datos </IonButton>
              {hiddenFecha && <IonItem onClick={() => exportJsontoApi()}>
                <IonLabel className="ion-text-wrap">Tu ultima actualizacíon es del dia {moment(fechaActualizacion).format("YYYY-MM-DD")}</IonLabel>
                
                {!loading && <IonIcon icon={downloadOutline} color={colorLogo ? "success" : "danger"}></IonIcon>}
              </IonItem>}
              <IonLoading message="Por favor esperar a que termine..." isOpen={loading} />
            </IonCol>

          </IonRow>


        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

export default Home;
