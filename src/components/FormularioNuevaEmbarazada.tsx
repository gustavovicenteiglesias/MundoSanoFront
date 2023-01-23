import { DatetimeChangeEventDetail, IonButton, IonCol, IonContent, IonDatetime, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment"
import { useEffect, useState } from "react";
import { SQLiteConnection, capSQLiteOptions, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';
import { Geolocation } from '@capacitor/geolocation';
import { useIonAlert } from '@ionic/react';
import { useHistory } from "react-router";
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../pages/Home.css"

interface persona {
    id_persona?: number,
    apellido?: string,
    nombre?: string,
    documento?: string,
    fecha_nacimiento?: string,
    id_origen?: number,
    nacionalidad?: number,
    sexo?: string,
    madre?: number | null,
    alta?: number,
    nacido_vivo?: number | null,
    pais_residencia?: number,
    area_residencia?: number,
    paraje_residencia?: number,
    num_vivienda?: number,
    latitud?: number | null,
    longitud?: number | null,
    formLLeno?: boolean

}
const FormularioNuevaEmbarazada: React.FC = () => {
    const [datapicker, setDataPicker] = useState<boolean>(false)
    const [fecha, setFecha] = useState<string>()
    const [fecha1, setFecha1] = useState<string>()
    const [origen, setOrigen] = useState<any>([])
    const [paises, setPaises] = useState<any>([])
    const [area, setArea] = useState<any>([])
    const [parajes, setParaje] = useState<any>([])
    const [paciente, setPaciente] = useState<persona>()
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<Date>(new Date());

    const [showAlert, hideAlert] = useIonAlert();
    let sqlite = useSQLite()
    const history = useHistory()

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            rangeInfo: -50,
            nombre: '',
            apellido: "",
            documento: null,
            fecha_nacimiento: "",
            startDate,
            pais_residencia: ""
        }
    });

    const fechaNacimiento = (e: any) => {
        const dia = moment(e.detail.value).format("DD-MM-YYYY")
        console.log(dia)
        setDataPicker(false)
        setPaciente((prevProps) => ({ ...prevProps, fecha_nacimiento: moment(e.detail.value).format("YYYY-MM-DD") }))
        setFecha1(dia)
        setFecha(e.detail.value)
        setValue('fecha_nacimiento', e.detail.value)
    }

    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition()
            .then((resp) => {
                setPaciente((prevProps) => ({ ...prevProps, latitud: resp.coords.latitude }))
                setPaciente((prevProps) => ({ ...prevProps, longitud: resp.coords.longitude }))
            })
        console.log('Current position:', coordinates);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPaciente((prevProps) => ({ ...prevProps, [name]: value }));
    }

    
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2));
    };
    const insertDataSubmit = async (data: persona): Promise<boolean> => {
        try {

            let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
            await db.open();
            let res: any = await db.query("SELECT * FROM personas ORDER BY id_persona DESC LIMIT 1")
           
            setPaciente((prevProps) => ({ ...prevProps, id_persona: res.values[0].id_persona + 1 }))
            setPaciente((prevProps) => ({ ...prevProps, formLLeno: true }))
            db.close()
            await sqlite.closeConnection("triplefrontera")

            return true;
        }
        catch (error: any) {
            return false;
        }
    }


    useEffect(() => {
        setPaciente((prevProps) => ({ ...prevProps, sexo: "F" }))
        setPaciente((prevProps) => ({ ...prevProps, madre: null }))
        setPaciente((prevProps) => ({ ...prevProps, alta: 0 }))
        setPaciente((prevProps) => ({ ...prevProps, nacido_vivo: null }))
        printCurrentPosition()
    }, [])

    useEffect(() => {

        const testDatabaseCopyFromAssets = async (): Promise<any> => {
            try {
                let respConection = await sqlite.isConnection("triplefrontera")
                console.log("conection " + JSON.stringify(respConection))
                if (respConection.result) {
                    await sqlite.closeConnection("triplefrontera")

                }
                let db: SQLiteDBConnection = await sqlite.createConnection("triplefrontera")
                await db.open();
                let res: any = await db.query("SELECT * FROM origenes")
                setOrigen(res.values)
                let respais: any = await db.query("SELECT * FROM paises")
                setPaises(respais.values)
                let resArea: any = await db.query(`SELECT * FROM areas WHERE id_pais=${paciente?.pais_residencia}`)
                setArea(resArea.values)
                let resParaje: any = await db.query(`SELECT * FROM parajes WHERE id_area=${paciente?.area_residencia}`)
                setParaje(resParaje.values)

                db.close()
                await sqlite.closeConnection("triplefrontera")
                return true;
            }
            catch (error: any) {
                return false;
            }
        }
        testDatabaseCopyFromAssets()
    }, [paciente])
    console.log(paciente)

    return (

        <IonContent>

            <form onSubmit={handleSubmit(onSubmit)}>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Nombre</IonLabel>
                        <IonInput
                            {...register('nombre', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
                                    message: 'Nombre incorrecto'
                                },

                            })}
                        />
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="nombre"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <IonItem>
                        <IonLabel position="floating">Apellido</IonLabel>
                        <IonInput
                            {...register('apellido', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
                                    message: 'Nombre incorrecto'
                                },

                            })}
                        />
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="apellido"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <IonItem>
                        <IonLabel position="floating">Documento</IonLabel>
                        <IonInput
                            {...register('documento', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/,
                                    message: 'DNI incorrecto'
                                },

                            })}
                        />
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="documento"
                        as={<div style={{ color: 'red' }} />}
                    />
                    {/* === ION DATE TIME === */}
                    <IonItem>
                        <IonLabel position="stacked">Fecha de Nacimiento</IonLabel>
                        <IonInput onClick={() => setDataPicker(true)} value={fecha1} {...register('startDate', { required: 'must pick date' })}></IonInput>

                        {datapicker &&
                            <Controller
                                render={({ field }) => (
                                    <IonDatetime
                                        presentation="date"
                                        onIonChange={(e) => { fechaNacimiento(e) }}
                                        value={field.value}

                                    />

                                )}
                                control={control}
                                name="fecha_nacimiento"
                                rules={{ required: 'This is a required field' }}
                            />
                        }

                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="startDate"
                        as={<div style={{ color: 'red' }} />}
                    />
                    
                </IonList>
                <IonList>
                    {/* === SELECTS UBICACION PAIS === */}
                    <IonListHeader color="secondary">
                        <IonLabel>Ubicación</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Pais</IonLabel>
                        <Controller
                            render={({ field }) => (
                                <IonSelect onIonChange={(e) => { handleInputChange(e); setValue("pais_residencia", e.detail.value) }} name="pais_residencia">
                                    <IonSelectOption value={12} >Argentina</IonSelectOption>
                                    <IonSelectOption value={27} >Bolivia</IonSelectOption>
                                    <IonSelectOption value={177} >Paraguay</IonSelectOption>
                                </IonSelect>
                            )}
                            control={control}
                            name="pais_residencia"
                            rules={{ required: 'Por favor selecciona una opción' }}
                        />
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="pais_residencia"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <IonItem>
                        <IonLabel position="floating">Area</IonLabel>
                        <IonSelect onIonChange={e => handleInputChange(e)} name="area_residencia" >
                            {area.map((data: any, i: any) => {
                                return <IonSelectOption value={data.id_area} key={i}>{data.nombre}</IonSelectOption>
                            })}

                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Paraje</IonLabel>
                        <IonSelect onIonChange={e => handleInputChange(e)} name="paraje_residencia" >
                            {parajes.map((data: any, i: any) => {
                                return <IonSelectOption value={data.id_paraje} key={i}>{data.nombre}</IonSelectOption>
                            })}

                        </IonSelect>

                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Número de Vivienda</IonLabel>
                        <IonInput name="num_vivienda" type="number" onIonChange={(e) => handleInputChange(e)}></IonInput>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonListHeader color="secondary">Geolocalización</IonListHeader>
                    <IonItem>
                        <IonLabel>Latitud</IonLabel>
                        <IonLabel>{paciente?.latitud}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Longitud</IonLabel>
                        <IonLabel>{paciente?.longitud}</IonLabel>
                    </IonItem>
                </IonList>
                <IonButton type="submit" expand="block">{loading ? "Enviando" : "Enviar"} </IonButton>
            </form>

        </IonContent >
    )
}
export default FormularioNuevaEmbarazada