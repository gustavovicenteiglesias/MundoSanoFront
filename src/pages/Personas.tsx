import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, withIonLifeCycle, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';

import { SQLiteConnection, capSQLiteOptions, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';
import { useEffect, useMemo, useRef, useState } from 'react';

import { animationBuilder } from "../components/AnimationBuilder"
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { IoAddCircleOutline } from 'react-icons/io5';
import FilterComponent from '../components/FilterComponent';
//import './Home.css';

const Personas: React.FC = () => {
  const history = useHistory()
  let sqlite = useSQLite()
  const [personas, setPersonas] = useState<any>([])
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isPendientes,setIsPendientes]=useState<boolean>(false);
 var result1:any=[];

  const handleChange = (selectedRows: any) => {
    console.log("all"+selectedRows.allSelected )
    console.log("selectedCoun"+selectedRows.selectedCount)
    //
    if ((!selectedRows.allSelected && selectedRows.selectedCount > 0 && selectedRows.selectedCount < 2)|| (selectedRows.allSelected &&( selectedRows.selectedCount===1))) {


      history.push({ pathname: "/detallePaciente", state: selectedRows.selectedRows[0] })
      setToggleClearRows(!toggledClearRows)
    }
    setToggleClearRows(!toggledClearRows)
  };

 useEffect(() => {

    const testDatabaseCopyFromAssets = async (): Promise<any> => {
      try {
        let respConection = await sqlite.isConnection("triplefrontera")

        if (respConection.result) {
          await sqlite.closeConnection("triplefrontera")

        }
        setTimeout(async () => {


          let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")

          await db.open();
          let res: any = await db.query("SELECT p.id_persona,p.nombre,p.apellido,p.documento,p.fecha_nacimiento, e.id_etmi,w.nombre AS etmi , s.id_app,f.nombre AS apps,u.id_pais,pa.nombre AS nombre_pais,areas.nombre AS nombre_area,je.nombre AS nombre_paraje FROM personas p LEFT JOIN etmis_personas e ON p.id_persona=e.id_persona LEFT join etmis w ON e.id_etmi=w.id_etmi LEFT join antecedentes a ON p.id_persona=a.id_persona LEFT JOIN antecedentes_apps s ON a.id_antecedente=s.id_antecedente LEFT JOIN apps f ON s.id_app=f.id_app LEFT JOIN ubicaciones u ON p.id_persona=u.id_ubicacion LEFT JOIN paises pa ON u.id_pais=pa.id_pais LEFT JOIN areas ON u.id_area=areas.id_area LEFT JOIN parajes je ON u.id_paraje=je.id_paraje WHERE madre IS NULL ORDER BY p.id_persona ASC")
          let pendientes: any = await db.query("SELECT c.id_control,em.eco,l.resultado,p.id_persona,p.id_persona,p.nombre,p.apellido,p.documento,p.fecha_nacimiento, e.id_etmi,w.nombre AS etmi , s.id_app, s.id_app,f.nombre AS apps,u.id_pais,pa.nombre AS nombre_pais,areas.nombre AS nombre_area,je.nombre AS nombre_paraje FROM control_embarazo em LEFT JOIN controles c ON c.id_control=em.id_control "
            + " INNER JOIN laboratorios_realizados l ON c.id_control=l.id_control"
            + " INNER JOIN personas p ON c.id_persona=p.id_persona"
            + " LEFT JOIN etmis_personas e ON p.id_persona=e.id_persona"
            + " LEFT join etmis w ON e.id_etmi=w.id_etmi"
            + " LEFT join antecedentes a ON p.id_persona=a.id_persona "
            + " LEFT JOIN antecedentes_apps s ON a.id_antecedente=s.id_antecedente "
            + " LEFT JOIN apps f ON s.id_app=f.id_app "
            + " LEFT JOIN ubicaciones u ON p.id_persona=u.id_ubicacion "
            + " LEFT JOIN paises pa ON u.id_pais=pa.id_pais"
            + " LEFT JOIN areas ON u.id_area=areas.id_area "
            + " LEFT JOIN parajes je ON u.id_paraje=je.id_paraje"
            + ` WHERE em.eco="S" OR l.resultado IS NULL OR l.resultado="S" `)
          //+ ` GROUP BY c.id_control,em.eco,l.resultado,p.id_persona,p.nombre,p.apellido,p.documento,p.fecha_nacimiento, e.id_etmi,`
          // + ` w.nombre , s.id_app,f.nombre,u.id_pais `
          // + ` having DUPLICATE > 1`)
          console.log("Pendientes " + JSON.stringify(pendientes.values))
          let arr = pendientes.values
          const result = arr.filter(
            (thing: any, index: any, self: any) =>
              index ===
              self.findIndex((t: any) => t.id_control === thing.id_control && t.id_persona === thing.id_persona)
          );
          result1 = result.filter(
            (thing: any, index: any, self: any) =>
              index ===
              self.findIndex((t: any) => t.id_persona === thing.id_persona)
          );
          console.log(result);
          console.log(result1);
          isPendientes?setPersonas(result1):setPersonas(res.values)
         

          // setPaises(JSON.parse(res.values) )
          db.close()
          await sqlite.closeConnection("triplefrontera")
        }, 1000)
        return true;
      }
      catch (error: any) {
        return false;
      }
    }
    testDatabaseCopyFromAssets()
  }, [isPendientes])

  const conditionalRowStyles = [
    {
      when: (row: any) => row.id_etmi !== null,
      style: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        }
      }
    },
    {
      when: (row: any) => (row.id_app !== 10 && row.id_app !== null),
      style: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        }
      }
    },



  ]
  const pendientes=()=>{
    setIsPendientes(true)
  }
    
  
 
  const filteredItems = personas.filter(
    (item: any) => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.apellido && item.apellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nombre_pais && item.nombre_pais.toLowerCase().includes(filterText.toLowerCase()) ||
      item.etmi && item.etmi.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nombre_area && item.nombre_area.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nombre_paraje && item.nombre_paraje.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={((e: any) => setFilterText(e.target.value))} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

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
    {
      name: "PATOLÓGICO",
      selector: (row: any) => row.apps,
      sortable: true,
    },

    {
      name: "PAIS",
      selector: (row: any) => row.nombre_pais,
      sortable: true,
      omit: true
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

        <IonButton onClick={pendientes} fill="clear" slot='end'><IoAddCircleOutline size={30} />{" "}Pendientes</IonButton>
        <IonButton onClick={()=>setIsPendientes(false)} fill="clear" slot='end'><IoAddCircleOutline size={30} />{" "}Ver Todos</IonButton>
          <IonButton href='/nuevaembarazada' fill="clear" slot='start'><IoAddCircleOutline size={30} />{" "}Nueva Embarazada</IonButton>
        </IonItem>
       
        <DataTable
          columns={columns}
          data={filteredItems}
          selectableRows
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
          conditionalRowStyles={conditionalRowStyles}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead

        />
      </IonContent>
    </IonPage>

  );
};

export default Personas;