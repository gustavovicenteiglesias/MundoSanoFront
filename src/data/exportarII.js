export const datos={
    
    "database": "triplefrontera",
    "version": 1,
    "encrypted": false,
    "mode": "full",
    "tables": [
        {
            "name": "estados",
            "schema": [
                {
                    "column": "id_estado",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(150)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "estados_trigger_last_modified",
                    "logic": "BEGIN      UPDATE estados SET last_modified= (strftime('%s', 'now')) WHERE id_estado=OLD.id_estado;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "personas",
            "schema": [
                {
                    "column": "id_persona",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "apellido",
                    "value": "VARCHAR(200)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(200)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "documento",
                    "value": "VARCHAR(40)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "fecha_nacimiento",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "id_origen",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "nacionalidad",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "sexo",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "madre",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "alta",
                    "value": "SMALLINT  NULL DEFAULT 0"
                },
                {
                    "column": "nacido_vivo",
                    "value": "SMALLINT  NULL DEFAULT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "fk_origenes_idx",
                    "value": "`id_origen` DESC"
                },
                {
                    "name": "fk_personas_paises",
                    "value": "`nacionalidad` DESC"
                },
                {
                    "name": "madre",
                    "value": "`madre` DESC"
                }
            ],
           
        },
        {
            "name": "apps",
            "schema": [
                {
                    "column": "id_app",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_apps_UNIQUE",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "apps_trigger_last_modified",
                    "logic": "BEGIN      UPDATE apps SET last_modified= (strftime('%s', 'now')) WHERE id_app=OLD.id_app;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
         
        },
        {
            "name": "seguimiento_chagas",
            "schema": [
                {
                    "column": "id_seguimiento_chagas",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "examen_clinico",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_examen",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "ecg",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_ecg",
                    "value": "TEXT  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "hepatograma",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "ecocardiograma",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "tele_rx_torax",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "got",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "gpt",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "fal",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "parasitemia",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "serologia_10",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "serologia_12",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "serologia_24",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "detalle_got",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_gpt",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_hepatograma",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_ecocardiograma",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_fal",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_rx_torax",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "hemograma",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "detalle_hemograma",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "paises",
            "schema": [
                {
                    "column": "id_pais",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "codigo",
                    "value": "VARCHAR(3)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(150)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "codigo",
                    "value": "`codigo` DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "nombre",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "paises_derivacion_trigger_last_modified",
                    "logic": "BEGIN      UPDATE paises SET last_modified= (strftime('%s', 'now')) WHERE id_pais=OLD.id_pais;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "provincias",
            "schema": [
                {
                    "column": "id_provincia",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(30)  NOT NULL  COLLATE BINARY"
                },
                {
                    "column": "id_pais",
                    "value": "INT  NOT NULL DEFAULT 1"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_provincias_paises`",
                    "value": "FOREIGN KEY (`id_pais`) REFERENCES paises (`id_pais`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_pais_provincias",
                    "value": "`id_pais` DESC"
                }
            ],
          
        },
        {
            "name": "motivos_derivacion",
            "schema": [
                {
                    "column": "id_motivo",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(25)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "motivos_derivacion_trigger_last_modified",
                    "logic": "BEGIN      UPDATE motivos_derivacion SET last_modified= (strftime('%s', 'now')) WHERE id_motivo=OLD.id_motivo;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
        
        },
        {
            "name": "seguimiento_hiv",
            "schema": [
                {
                    "column": "id_seguimiento_hiv",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "antecedente",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "carga_viral",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "medico_cargo",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "derivacion_hospital",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "test_rapido_pareja",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "derivacion_hospital_pareja",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "medico_cargo_pareja",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "proviral_cargaviral",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "seguimiento_sifilis",
            "schema": [
                {
                    "column": "id_seguimiento_sifilis",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "pareja_fecha_realizado",
                    "value": "TIMESTAMP  NULL DEFAULT NULL"
                },
                {
                    "column": "pareja_fecha_resultados",
                    "value": "TIMESTAMP  NULL DEFAULT NULL"
                },
                {
                    "column": "pareja_resultado",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "pareja_tratamiento",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_mes_seguimiento",
                    "value": "SMALLINT  NULL DEFAULT NULL"
                },
                {
                    "column": "rn_examen_medico",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_vdrl",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_rx_osea",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_sedimento_orina",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_got",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_gpt",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_lcr",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_oftalmologico",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "rn_auditivo",
                    "value": "CHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "seguimiento_vhb",
            "schema": [
                {
                    "column": "id_seguimiento_vhb",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "antihbc",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "derivacion_hospital",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "antihbs",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "vacuna12hs",
                    "value": "SMALLINT  NULL DEFAULT NULL"
                },
                {
                    "column": "gammaglobulina_1248",
                    "value": "SMALLINT  NULL DEFAULT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "tipos_fin_embarazos",
            "schema": [
                {
                    "column": "id_tipos_fin_embarazos",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
         
        },
        {
            "name": "db_log",
            "schema": [
                {
                    "column": "id_db_log",
                    "value": "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL"
                },
                {
                    "column": "timestamp",
                    "value": "TIMESTAMP  NOT NULL"
                },
                {
                    "column": "query",
                    "value": "TEXT  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sync",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "db_log_trigger_last_modified",
                    "logic": "BEGIN      UPDATE db_log SET last_modified= (strftime('%s', 'now')) WHERE id_db_log=OLD.id_db_log;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "tratamiento_chagas",
            "schema": [
                {
                    "column": "id_tratamiento_chagas",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "droga",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "dosis_diaria",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "fecha_inicio",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "peso_inicial",
                    "value": "FLOAT(0,0)  NULL DEFAULT NULL"
                },
                {
                    "column": "fecha_finalizacion",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "peso_final",
                    "value": "FLOAT(0,0)  NULL DEFAULT NULL"
                },
                {
                    "column": "id_motivo_finalizacion",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "otros_eventos_adversos",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "observaciones",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "id_motivo_finalizacion",
                    "value": "`id_motivo_finalizacion` DESC"
                }
            ]
        },
        {
            "name": "etmis",
            "schema": [
                {
                    "column": "id_etmi",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_etmis_UNIQUE",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "etmis_trigger_last_modified",
                    "logic": "BEGIN      UPDATE etmis SET last_modified= (strftime('%s', 'now')) WHERE id_etmi=OLD.id_etmi;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "inmunizaciones",
            "schema": [
                {
                    "column": "id_inmunizacion",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_inmi_UNIQUE",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "inmunizaciones_trigger_last_modified",
                    "logic": "BEGIN      UPDATE inmunizaciones SET last_modified= (strftime('%s', 'now')) WHERE id_inmunizacion=OLD.id_inmunizacion;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "tratamiento_hiv",
            "schema": [
                {
                    "column": "id_tratamiento_hiv",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "droga",
                    "value": "VARCHAR(45)  NOT NULL DEFAULT 'AZT DURANTE 1 MES' COLLATE NOCASE"
                },
                {
                    "column": "medico_tratante",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "laboratorios",
            "schema": [
                {
                    "column": "id_laboratorio",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "resultado",
                    "value": "VARCHAR(1)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "confirmacion",
                    "value": "SMALLINT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_labo_UNIQUE",
                    "value": "`nombre` DESC,`confirmacion` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "laboratorios_trigger_last_modified",
                    "logic": "BEGIN      UPDATE laboratorios SET last_modified= (strftime('%s', 'now')) WHERE id_laboratorio=OLD.id_laboratorio;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "eventos_adversos",
            "schema": [
                {
                    "column": "id_evento_adverso",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "TEXT  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "eventos_adversos_trigger_last_modified",
                    "logic": "BEGIN      UPDATE eventos_adversos SET last_modified= (strftime('%s', 'now')) WHERE id_evento_adverso=OLD.id_evento_adverso;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "tratamiento_sifilis",
            "schema": [
                {
                    "column": "id_tratamiento_sifilis",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "droga",
                    "value": "VARCHAR(100)  NOT NULL DEFAULT 'PENICILINA BENZATINICA 2400000' COLLATE NOCASE"
                },
                {
                    "column": "fecha_dosis",
                    "value": "DATE  NOT NULL"
                },
                {
                    "column": "fecha_fin_tratamiento",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "dosis_numero",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "macs",
            "schema": [
                {
                    "column": "id_mac",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "macs_trigger_last_modified",
                    "logic": "BEGIN      UPDATE macs SET last_modified= (strftime('%s', 'now')) WHERE id_mac=OLD.id_mac;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "tratamiento_vhb",
            "schema": [
                {
                    "column": "id_tratamiento_vhb",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ]
        },
        {
            "name": "controles",
            "schema": [
                {
                    "column": "id_control",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "fecha",
                    "value": "DATE  NOT NULL"
                },
                {
                    "column": "id_persona",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "control_numero",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_estado",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_seguimiento_chagas",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_tratamiento_chagas",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_seguimiento_hiv",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_tratamiento_hiv",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_seguimiento_sifilis",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_tratamiento_sifilis",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_seguimiento_vhb",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_tratamiento_vhb",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "fecha_fin_embarazo",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "id_tipos_fin_embarazos",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "georeferencia",
                    "value": "VARCHAR(30)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`controles_ibfk_1`",
                    "value": "FOREIGN KEY (`id_seguimiento_chagas`) REFERENCES seguimiento_chagas (`id_seguimiento_chagas`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_2`",
                    "value": "FOREIGN KEY (`id_seguimiento_hiv`) REFERENCES seguimiento_hiv (`id_seguimiento_hiv`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_3`",
                    "value": "FOREIGN KEY (`id_seguimiento_sifilis`) REFERENCES seguimiento_sifilis (`id_seguimiento_sifilis`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_4`",
                    "value": "FOREIGN KEY (`id_seguimiento_vhb`) REFERENCES seguimiento_vhb (`id_seguimiento_vhb`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_5`",
                    "value": "FOREIGN KEY (`id_tratamiento_chagas`) REFERENCES tratamiento_chagas (`id_tratamiento_chagas`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_6`",
                    "value": "FOREIGN KEY (`id_tratamiento_hiv`) REFERENCES tratamiento_hiv (`id_tratamiento_hiv`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_7`",
                    "value": "FOREIGN KEY (`id_tratamiento_sifilis`) REFERENCES tratamiento_sifilis (`id_tratamiento_sifilis`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`controles_ibfk_9`",
                    "value": "FOREIGN KEY (`id_tratamiento_vhb`) REFERENCES tratamiento_vhb (`id_tratamiento_vhb`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`fk_controles_estado`",
                    "value": "FOREIGN KEY (`id_estado`) REFERENCES estados (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_controles_personas`",
                    "value": "FOREIGN KEY (`id_persona`) REFERENCES personas (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`fk_tipo_fin_emb`",
                    "value": "FOREIGN KEY (`id_tipos_fin_embarazos`) REFERENCES tipos_fin_embarazos (`id_tipos_fin_embarazos`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "fecha",
                    "value": "`fecha` DESC,`id_persona` DESC,`control_numero` DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "fk_Estado_idx",
                    "value": "`id_estado` DESC"
                },
                {
                    "name": "id_seguimiento_chagas",
                    "value": "`id_seguimiento_chagas` DESC"
                },
                {
                    "name": "id_seguimiento_hiv",
                    "value": "`id_seguimiento_hiv` DESC"
                },
                {
                    "name": "id_seguimiento_sifilis",
                    "value": "`id_seguimiento_sifilis` DESC"
                },
                {
                    "name": "id_tratamiento_chagas_controles",
                    "value": "`id_tratamiento_chagas` DESC"
                },
                {
                    "name": "id_tratamiento_hiv",
                    "value": "`id_tratamiento_hiv` DESC"
                },
                {
                    "name": "id_tratamiento_sifilis",
                    "value": "`id_tratamiento_sifilis` DESC"
                },
                {
                    "name": "id_seguimiento_vhb",
                    "value": "`id_seguimiento_vhb` DESC"
                },
                {
                    "name": "id_tratamiento_vhb",
                    "value": "`id_tratamiento_vhb` DESC"
                },
                {
                    "name": "id_persona",
                    "value": "`id_persona` DESC"
                },
                {
                    "name": "id_tipos_fin_embarazos",
                    "value": "`id_tipos_fin_embarazos` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "controles_trigger_last_modified",
                    "logic": "BEGIN  UPDATE controles SET last_modified= strftime('%s', 'now') WHERE id_control=OLD.id_control;END",
                    "condition": "WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "motivo_finalizacion_tratamiento",
            "schema": [
                {
                    "column": "id_motivo_finalizacion_tratamiento",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "motivo_finalizacion_tratamiento_trigger_last_modified",
                    "logic": "BEGIN      UPDATE motivo_finalizacion_tratamiento SET last_modified= (strftime('%s', 'now')) WHERE id_motivo_finalizacion_tratamiento=OLD.id_motivo_finalizacion_tratamiento;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "patologias_embarazos",
            "schema": [
                {
                    "column": "id_patologia_embarazo",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(80)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_pe_UNIQUE",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
         
        },
        {
            "name": "niveles_acceso",
            "schema": [
                {
                    "column": "id_nivel_acceso",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "acceso",
                    "value": "VARCHAR(50)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "triggers": [
                {
                    "name": "niveles_acceso_derivacion_trigger_last_modified",
                    "logic": "BEGIN      UPDATE niveles_acceso SET last_modified= (strftime('%s', 'now')) WHERE id_nivel_acceso=OLD.id_nivel_acceso;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "origenes",
            "schema": [
                {
                    "column": "id_origen",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(100)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_origenes",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "origenes_derivacion_trigger_last_modified",
                    "logic": "BEGIN      UPDATE origenes SET last_modified= (strftime('%s', 'now')) WHERE id_origen=OLD.id_origen;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "areas",
            "schema": [
                {
                    "column": "id_area",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_pais",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(100)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_paises`",
                    "value": "FOREIGN KEY (`id_pais`) REFERENCES paises (`id_pais`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_pais",
                    "value": "`id_pais` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "areas_trigger_last_modified",
                    "logic": "BEGIN      UPDATE areas SET last_modified= (strftime('%s', 'now')) WHERE id_area=OLD.id_area;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "ciudades",
            "schema": [
                {
                    "column": "id_ciudad",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(30)  NOT NULL  COLLATE BINARY"
                },
                {
                    "column": "id_provincia",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_ciudad_provincias`",
                    "value": "FOREIGN KEY (`id_provincia`) REFERENCES provincias (`id_provincia`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_provincia",
                    "value": "`id_provincia` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "ciudades_trigger_last_modified",
                    "logic": "BEGIN      UPDATE ciudades SET last_modified= (strftime('%s', 'now')) WHERE id_ciudad=OLD.id_ciudad;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "control_embarazo",
            "schema": [
                {
                    "column": "id_control_embarazo",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "edad_gestacional",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "eco",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "detalle_eco",
                    "value": "TEXT  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "hpv",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "pap",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sistolica",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "diastolica",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "clinico",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "observaciones",
                    "value": "TEXT  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "motivo",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "derivada",
                    "value": "SMALLINT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`control_embarazo_ibfk_1`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`fk_motivo`",
                    "value": "FOREIGN KEY (`motivo`) REFERENCES motivos_derivacion (`id_motivo`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_control",
                    "value": "`id_control` DESC"
                },
                {
                    "name": "fk_motivo",
                    "value": "`motivo` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "control_embarazo_trigger_last_modified",
                    "logic": "BEGIN      UPDATE control_embarazo SET last_modified= (strftime('%s', 'now')) WHERE id_control_embarazo=OLD.id_control_embarazo;  END",
                    "condition": " WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "patologias_rn",
            "schema": [
                {
                    "column": "id_patologias_Rn",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
           
        },
        {
            "name": "parajes",
            "schema": [
                {
                    "column": "id_paraje",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_area",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(100)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_areas`",
                    "value": "FOREIGN KEY (`id_area`) REFERENCES areas (`id_area`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_area",
                    "value": "`id_area` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "parajes_derivacion_trigger_last_modified",
                    "logic": "BEGIN      UPDATE parajes SET last_modified= (strftime('%s', 'now')) WHERE id_paraje=OLD.id_paraje;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "control_emb_patologico",
            "schema": [
                {
                    "column": "id_control_emb_patologico",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_control_embarazo",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "observaciones",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "derivacion",
                    "value": "SMALLINT  NULL DEFAULT NULL"
                },
                {
                    "column": "hospital",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "tratamientos",
                    "value": "SMALLINT  NULL DEFAULT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_control_emb`",
                    "value": "FOREIGN KEY (`id_control_embarazo`) REFERENCES control_embarazo (`id_control_embarazo`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_control_embarazo",
                    "value": "`id_control_embarazo` DESC",
                    "mode": "UNIQUE"
                }
            ],
            "triggers": [
                {
                    "name": "control_emb_patologico_trigger_last_modified",
                    "logic": "BEGIN      UPDATE control_emb_patologico SET last_modified= (strftime('%s', 'now')) WHERE id_control_emb_patologico=OLD.id_control_emb_patologico;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ]
        },
        {
            "name": "control_puerperio",
            "schema": [
                {
                    "column": "id_control_puerperio",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "patologico",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "observaciones",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "derivacion",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_control_puer_control`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_control_puerperio",
                    "value": "`id_control_puerperio` DESC,`id_control` DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "fk_control_puer_control",
                    "value": "`id_control` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "control_puerperio_trigger_last_modified",
                    "logic": "BEGIN      UPDATE control_puerperio SET last_modified= (strftime('%s', 'now')) WHERE id_control_puerperio=OLD.id_control_puerperio;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
         
        },
        {
            "name": "control_rn",
            "schema": [
                {
                    "column": "id_control_rn",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "edad_gestacional",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "peso",
                    "value": "FLOAT(0,0)  NOT NULL"
                },
                {
                    "column": "labio_leporino",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "s_genetico_malformaciones",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "hipotiroidismo_congenito",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "bajo_peso",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "hiperbilirrubinemia",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "sospecha_de_sepsis",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "deprimido_neonatal",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "madre_dbt",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "prematuro",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "rciu",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "hijo_de_madre_dbt",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "derivacion",
                    "value": "TEXT  NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "`fk_controlrn_control`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "id_control_rn",
                    "value": "`id_control_rn` DESC,`id_control` DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "fk_controlrn_control",
                    "value": "`id_control` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "control_rn_trigger_last_modified",
                    "logic": "BEGIN      UPDATE control_rn SET last_modified= (strftime('%s', 'now')) WHERE id_control_rn=OLD.id_control_rn;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "tipos_embarazos",
            "schema": [
                {
                    "column": "id_tipo_embarazo",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "nombre_UNIQUE",
                    "value": "`nombre` DESC",
                    "mode": "UNIQUE"
                }
            ],
           
        },
        {
            "name": "sync",
            "schema": [
                {
                    "column": "id_sync",
                    "value": "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL"
                },
                {
                    "column": "query",
                    "value": "TEXT  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "timestamp",
                    "value": "TIMESTAMP  NOT NULL"
                },
                {
                    "column": "disp1",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "disp2",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "disp3",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "disp4",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
           
        },
        {
            "name": "embarazos",
            "schema": [
                {
                    "column": "id_persona",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_tipo_embarazo",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "CPK_id_persona_id_control_id_tipo_embarazo",
                    "value": "PRIMARY KEY (id_persona,id_control,id_tipo_embarazo)"
                },
                {
                    "constraint": "`fk_embarazos_controles`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_embarazos_personas`",
                    "value": "FOREIGN KEY (`id_persona`) REFERENCES personas (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_embarazos_tipo_embarazo`",
                    "value": "FOREIGN KEY (`id_tipo_embarazo`) REFERENCES tipos_embarazos (`id_tipo_embarazo`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                }
            ],
            "indexes": [
                {
                    "name": "fk_persona_idx",
                    "value": "`id_persona` DESC"
                },
                {
                    "name": "fk_control_embarazos_idx",
                    "value": "`id_control` DESC"
                },
                {
                    "name": "fk_tipo_embarazo_idx",
                    "value": "`id_tipo_embarazo` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "embarazos_trigger_last_modified",
                    "logic": "BEGIN      UPDATE embarazos SET last_modified= (strftime('%s', 'now')) WHERE id_persona=OLD.id_persona;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ]
        },
        {
            "name": "embarazos_patologias",
            "schema": [
                {
                    "column": "id_control_embarazo_patologico",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_patologia_embarazo",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "CPK_id_control_embarazo_patologico_id_patologia_embarazo",
                    "value": "PRIMARY KEY (id_control_embarazo_patologico,id_patologia_embarazo)"
                },
                {
                    "constraint": "`fk_control_emba_pat`",
                    "value": "FOREIGN KEY (`id_control_embarazo_patologico`) REFERENCES control_emb_patologico (`id_control_emb_patologico`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                },
                {
                    "constraint": "`fk_pat_embs`",
                    "value": "FOREIGN KEY (`id_patologia_embarazo`) REFERENCES patologias_embarazos (`id_patologia_embarazo`) ON DELETE RESTRICT ON UPDATE RESTRICT"
                }
            ],
            "indexes": [
                {
                    "name": "fk_pat_embs",
                    "value": "`id_patologia_embarazo` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "embarazos_patologias_trigger_last_modified",
                    "logic": "BEGIN      UPDATE embarazos_patologias SET last_modified= (strftime('%s', 'now')) WHERE id_control_emb_patologico=OLD.id_control_emb_patologico;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ]
        },
        {
            "name": "etmis_personas",
            "schema": [
                {
                    "column": "id_persona",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_etmi",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "confirmada",
                    "value": "SMALLINT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "CPK_id_persona_id_etmi_id_control",
                    "value": "PRIMARY KEY (id_persona,id_etmi,id_control)"
                },
                {
                    "constraint": "`fk_etmis_personas_control`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_etmis_personas_etmi`",
                    "value": "FOREIGN KEY (`id_etmi`) REFERENCES etmis (`id_etmi`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_etmis_personas_personas`",
                    "value": "FOREIGN KEY (`id_persona`) REFERENCES personas (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                }
            ],
            "indexes": [
                {
                    "name": "fk_etmi_idx",
                    "value": "`id_etmi` DESC"
                },
                {
                    "name": "fk_control_ep_idx",
                    "value": "`id_control` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "etmis_personas_trigger_last_modified",
                    "logic": "BEGIN      UPDATE etmis_personas SET last_modified= (strftime('%s', 'now')) WHERE id_persona=OLD.id_persona;  END",
                    "condition": "FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
           
            "name": "inmunizaciones_control",
            "schema": [
                
                {
                    "column": "id_persona",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_inmunizacion",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "estado",
                    "value": "CHAR(1)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "CPK_id_persona_id_control_id_inmunizacion",
                    "value": "PRIMARY KEY (id_persona,id_control,id_inmunizacion)"
                },
                {
                    "constraint": "`fk_inmunicaciones_control_control`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_inmunicaciones_control_inmunizacion`",
                    "value": "FOREIGN KEY (`id_inmunizacion`) REFERENCES inmunizaciones (`id_inmunizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_inmunicaciones_control_persona`",
                    "value": "FOREIGN KEY (`id_persona`) REFERENCES personas (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                }
            ],
           
            "indexes": [
                {
                    "name": "fk_inmunizaciones_control_control",
                    "value": "`id_control` DESC"
                },
                {
                    "name": "fk_inmunizaciones_control_inmunizacion",
                    "value": "`id_inmunizacion` DESC"
                },
                {
                    "name": "fk_inmunizaciones_control_persona",
                    "value": "`id_persona` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "inmunizaciones_control_trigger_last_modified",
                    "logic": "BEGIN      UPDATE inmunizaciones_control SET last_modified= (strftime('%s', 'now')) WHERE id_persona=OLD.id_persona;  END",
                    "condition": "WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
        
        },
        {
            "name": "laboratorios_realizados",
            "schema": [
                {
                    "column": "id_persona",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_laboratorio",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "trimestre",
                    "value": "SMALLINT  NOT NULL"
                },
                {
                    "column": "fecha_realizado",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "fecha_resultados",
                    "value": "DATE  NULL DEFAULT NULL"
                },
                {
                    "column": "resultado",
                    "value": "VARCHAR(45)  NULL DEFAULT NULL COLLATE NOCASE"
                },
                {
                    "column": "id_etmi",
                    "value": "INT  NOT NULL DEFAULT 0"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
               
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                 {
                    "constraint": "CPK_id_persona_id_control_id_laboratorio_trimestre_id_etmi",
                    "value": "PRIMARY KEY (id_persona,id_control,id_laboratorio,id_etmi)"
                },
                {
                    "constraint": "`fk_laboratorios_realizados_control`",
                    "value": "FOREIGN KEY (`id_control`) REFERENCES controles (`id_control`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_laboratorios_realizados_laboratorio`",
                    "value": "FOREIGN KEY (`id_laboratorio`) REFERENCES laboratorios (`id_laboratorio`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "`fk_laboratorios_realizados_persona`",
                    "value": "FOREIGN KEY (`id_persona`) REFERENCES personas (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                }
            ],
            "indexes": [
                {
                    "name": "fk_control_idx",
                    "value": "`id_control` DESC"
                },
                {
                    "name": "fk_laboratorio_idx",
                    "value": "`id_laboratorio` DESC"
                },
                {
                    "name": "fk_etmis_idx",
                    "value": "`id_etmi` DESC"
                }
            ],
            "triggers": [
                {
                    "name": "laboratorios_realizados_trigger_last_modified",
                    "logic": "BEGIN  UPDATE laboratorios_realizados SET last_modified= strftime('%s', 'now') WHERE id_laboratorio=OLD.id_laboratorio ; END",
                    "condition": "WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        },
        {
            "name": "tratchagas_eventosadv",
            "schema": [
                {
                    "column": "id_tratamiento_chagas",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_evento_adverso",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "id_tratamiento_chagas",
                    "value": "`id_tratamiento_chagas` DESC"
                },
                {
                    "name": "id_evento_adverso",
                    "value": "`id_evento_adverso` DESC"
                }
            ]
        },
        {
            "name": "ubicaciones",
            "schema": [
                {
                    "column": "id_ubicacion",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "id_persona",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "id_paraje",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "id_area",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "num_vivienda",
                    "value": "VARCHAR(10)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "fecha",
                    "value": "DATE  NOT NULL"
                },
                {
                    "column": "georeferencia",
                    "value": "VARCHAR(30)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "id_pais",
                    "value": "INT  NULL DEFAULT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "ck",
                    "value": "`id_persona` DESC,`id_paraje` DESC,`id_area` DESC,`num_vivienda` DESC,`fecha` DESC,`id_pais` DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "fk_paises_idx",
                    "value": "`id_pais` DESC"
                },
                {
                    "name": "fk_ubicaciones_areas",
                    "value": "`id_area` DESC"
                },
                {
                    "name": "fk_ubicaciones_parajes",
                    "value": "`id_paraje` DESC"
                }
            ],
           
        },
        {
            "name": "usuarios",
            "schema": [
                {
                    "column": "id_usuario",
                    "value": "INT PRIMARY KEY NOT NULL"
                },
                {
                    "column": "usuario",
                    "value": "VARCHAR(50)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "password",
                    "value": "VARCHAR(128)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "email",
                    "value": "VARCHAR(150)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "nombre",
                    "value": "VARCHAR(100)  NOT NULL  COLLATE NOCASE"
                },
                {
                    "column": "nivel_acceso",
                    "value": "INT  NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                }
            ],
            "indexes": [
                {
                    "name": "usuario",
                    "value": "`usuario` DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "nivel_acceso",
                    "value": "`nivel_acceso` DESC"
                }
            ],
          
        },
        {
            "name": "antecedentes",
            "schema": [
                {
                    "column": "id_antecedente",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "id_persona",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "id_control",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "edad_primer_embarazo",
                    "value": "INT DEFAULT NULL"
                },
                {
                    "column": "fecha_ultimo_embarazo",
                    "value": "DATE DEFAULT NULL"
                },
                {
                    "column": "gestas",
                    "value": "INT DEFAULT 0"
                },
                {
                    "column": "partos",
                    "value": "INT DEFAULT 0"
                },
                {
                    "column": "cesareas",
                    "value": "INT DEFAULT 0"
                },
                {
                    "column": "abortos",
                    "value": "INT DEFAULT 0"
                },
                {
                    "column": "planificado",
                    "value": "SMALLINT DEFAULT NULL"
                },
                {
                    "column": "fum",
                    "value": "DATE DEFAULT NULL"
                },
                {
                    "column": "fpp",
                    "value": "DATE DEFAULT NULL"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK(sql_deleted IN (0, 1))"
                },
                {
                    "constraint": "fk_antecedentes_persona",
                    "value": "FOREIGN KEY(id_persona) REFERENCES personas(id_persona) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "fk_antecedentes_control",
                    "value": "FOREIGN KEY(id_control) REFERENCES controles(id_control) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "CPK_id_antecedente",
                    "value": "PRIMARY KEY(id_antecedente)"
                }
            ],
            "indexes": [
                {
                    "name": "ck_ante",
                    "value": "id_persona DESC",
                    "mode": "UNIQUE"
                },
                {
                    "name": "fk_control_ante_idx",
                    "value": "id_control DESC"
                }
            ],
            "triggers": [
                {
                    "name": "antecedentes_trigger_last_modified",
                    "logic": "BEGIN     UPDATE antecedentes SET last_modified= (strftime('%s', 'now')) WHERE id_antecedente=OLD.id_antecedente;  END",
                    "condition": "WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "antecedentes_apps",
            "schema": [
                {
                    "column": "id_antecedente",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "id_app ",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "last_modified ",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK(sql_deleted IN (0, 1))"
                },
                {
                    "constraint": "fk_antecedentes_apps_apps",
                    "value": "FOREIGN KEY(id_app) REFERENCES apps(id_app) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "fk_antecedentes_apps_antecedentes",
                    "value": "FOREIGN KEY(id_antecedente) REFERENCES antecedentes(id_antecedente) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "CPK_id_antecedente_id_app",
                    "value": "PRIMARY KEY(id_antecedente,id_app)"
                }
            ],
            "indexes": [
                {
                    "name": "fk_apps_idx",
                    "value": "id_app DESC"
                }
            ],
            "triggers": [
                {
                    "name": "antecedentes_apps_trigger_last_modified",
                    "logic": "BEGIN      UPDATE antecedentes_apps SET last_modified= (strftime('%s', 'now')) WHERE id_antecedente=OLD.id_antecedente;  END",
                    "condition": "WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
          
        },
        {
            "name": "antecedentes_macs",
            "schema": [
                {
                    "column": "id_antecedente",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "id_mac",
                    "value": "INT NOT NULL"
                },
                {
                    "column": "sql_deleted",
                    "value": "BOOLEAN DEFAULT 0 CHECK(sql_deleted IN (0, 1))"
                },
                {
                    "column": "last_modified",
                    "value": "INTEGER DEFAULT (strftime('%s', 'now'))"
                },
                {
                    "constraint": "fk_antecedentes_macs_antecedentes",
                    "value": "FOREIGN KEY(id_antecedente) REFERENCES antecedentes(id_antecedente) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "fk_antecedentes_macs_macs",
                    "value": "FOREIGN KEY(id_mac) REFERENCES macs(id_mac) ON DELETE NO ACTION ON UPDATE NO ACTION"
                },
                {
                    "constraint": "CPK_id_antecedente_id_mac",
                    "value": "PRIMARY KEY(id_antecedente,id_mac)"
                }
            ],
            "indexes": [
                {
                    "name": "fk_macs_idx",
                    "value": "id_mac DESC"
                }
            ],
            "triggers": [
                {
                    "name": "antecedentes_macs_trigger_last_modified",
                    "logic": "BEGIN      UPDATE antecedentes_macs SET last_modified= (strftime('%s', 'now')) WHERE id_antecedente=OLD.id_antecedente;  END",
                    "condition": "WHEN 1",
                    "timeevent": "AFTER UPDATE ON"
                }
            ],
           
        }
    ]
}