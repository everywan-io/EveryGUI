export const DevicesLanguagePartialDefinition = {
    list: {
        title: 'Gestione Dispositivi',
        filters: {
            fields: {
                model: {
                    placeholder: 'Cerca un modello...'
                },
                os: {
                    placeholder: 'Seleziona in sistema operativo'
                },
                dateRange: {
                    placeholder: 'Cerca per data di registrazione',
                    fromDate: 'Registrati dal',
                    toDate: 'al'
                }
            },
            action: {
                create: 'Crea Dispositivo'
            }
        },
        headers: {
            name: 'Nome',
            model: 'Modello',
            dor: 'Data di registrazione',
            platform_name: 'Sistema Operativo',
            platform_version: 'Versione',
            user: 'Utente associato',
            createdAt: 'Creato',
            updatedAt: 'Modificato',
            actions: 'Azioni'
        },
        actions: {
            filter: 'Filtra',
            create: 'Crea dispositivo',
            edit: {
                long: 'Modifica dispositivo',
                short: 'Modifica'
            },
            delete: {
                long: 'Cancella dispositivo',
                short: 'Cancella'
            }
        },
        modals: {
            delete: {
                title: 'Elimina dispositivo',
                message: 'Stai per eliminare il dispositivo <b>{{ device.name }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Elimina',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Elimina dispositivo',
                message: 'Dispositivo eliminato correttamente'
            }
        }
    }
};
