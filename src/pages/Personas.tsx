import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, withIonLifeCycle , IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';

import { SQLiteConnection, capSQLiteOptions, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';
import { useEffect, useRef, useState } from 'react';

import { animationBuilder } from "../components/AnimationBuilder"
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { IoAddCircleOutline } from 'react-icons/io5';
//import './Home.css';

const Personas: React.FC = () => {
  const history = useHistory()
  let sqlite = useSQLite()
  const [personas, setPersonas] = useState<any>([])
  const [toggledClearRows, setToggleClearRows] = useState(false);
 let control:any=[]
  const handleChange = (selectedRows: any) => {
    //console.log(selectedRows)
    if (!selectedRows.allSelected && selectedRows.selectedCount > 0 && selectedRows.selectedCount < 2) {

      console.log("por aca")
      history.push({ pathname: "/detallePaciente", state: selectedRows.selectedRows[0] })
      setToggleClearRows(!toggledClearRows)
    }
    setToggleClearRows(!toggledClearRows)
  };

  useIonViewWillEnter(() => {

    const testDatabaseCopyFromAssets = async (): Promise<any> => {
      try {
        let respConection = await sqlite.isConnection("triplefrontera")
        console.log("conection " + JSON.stringify(respConection))
        if (respConection.result) {
            await sqlite.closeConnection("triplefrontera")

        }
        let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
       
        await db.open();
        let res: any = await db.query("SELECT p.id_persona,p.nombre,p.apellido,p.documento,p.fecha_nacimiento, e.id_etmi,w.nombre AS etmi FROM personas p  LEFT JOIN etmis_personas e ON p.id_persona=e.id_persona LEFT join etmis w ON e.id_etmi=w.id_etmi WHERE madre IS NULL")
       
       
        //console.log(`@@@ res.control ${JSON.stringify(res.values)}`)
        setPersonas(res.values)

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

  const conditionalRowStyles = [
    {
      when: (row: any) => row.id_etmi !== null,
      style: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        }
      }}
]
  const columns = [

    {
      name: "Cod.Paciente",
      selector: (row: any) => row.id_persona,
      sortable: true,
    },

    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row: any) => row.apellido,
      sortable: true,
    },
    
    {
      name: "ETMI",
      selector: (row: any) => row.etmi,
      sortable: true,
    },
  ]
  
  return (

    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle slot="end">Paciente</IonTitle>
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/" routerAnimation={animationBuilder} />
           
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
        <IonButton href='/nuevaembarazada' fill="clear" slot='end'><IoAddCircleOutline size={30}/>{" "}Nueva Embarazada</IonButton>
        </IonItem>
      
        <DataTable
          columns={columns}
          data={personas}
          selectableRows
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
          conditionalRowStyles={conditionalRowStyles}
          pagination
        />
      </IonContent>
    </IonPage>

  );
};

export default Personas;