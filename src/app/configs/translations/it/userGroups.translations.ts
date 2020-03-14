export const UserGroupsLanguagePartialDefinition = {
    list: {
        title: 'Gestione gruppi',
        headers: {
            name: 'Nome',
            description: 'Descrizione',
            created_at: 'Data di creazione',
            updated_at: 'Ultima modifica',
            actions: 'Azioni'
        },
        actions: {
            filter: 'Filtra',
            open: 'Apri',
            edit: {
                long: 'Modifica gruppo',
                short: 'Modifica'
            },
            delete: {
                long: 'Cancella gruppo',
                short: 'Cancella'
            },
            create: 'Crea'
        },
        filters: {
            fields: {
                term: {
                    placeholder: 'Cerca per nome...'
                }
            },
            action: {
                create: 'Crea gruppo',
            }
        },
        modals: {
            delete: {
                title: 'Elimina gruppo',
                message: 'Stai per eliminare il gruppo <b>{{ group }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Elimina',
                    cancel: 'Annulla'
                }
            }
        }
    },
    delete: {
        notifications: {
            title: 'Elimina gruppo',
            message: 'Gruppo eliminato correttamente',
            confirm: {
                title: 'Vuoi eliminare questo gruppo ?',
                true: 'Ok',
                false: 'Annulla'
            }
        }
    },
    create: {
        title: 'Crea gruppo',
        filterBar: {
            title: 'Crea nuovo gruppo',
            description: 'Modifica i filtri sottostanti per creare un nuovo gruppo di utenti',
            fields: {
                name: {
                    title: 'Nome gruppo',
                    placeholder: 'Inserisci il nome del gruppo'
                },
                description: {
                    title: 'Descrizione del gruppo',
                    placeholder: 'Inserisci la descrizione del gruppo'
                },
                filters: {
                    headers: {
                        users: 'Utenti',
                        devices: 'Dispositivi',
                    },
                    term: {
                        placeholder: 'Nome, cognome o email utenti...'
                    },
                    gender: {
                        placeholder: 'Seleziona genere'
                    },
                    resident: {
                        placeholder: 'Seleziona se è residente',
                        responses: {
                            yes: 'Si',
                            no: 'No'
                        }
                    },
                    dateRange: {
                        placeholder: 'Cerca per data di nascita',
                        fromDate: 'Nati dal',
                        toDate: 'al'
                    },
                    created: {
                        placeholderFrom: 'Registrati a partire dal',
                        placeholderTo: 'Registrati entro il'
                    },
                    device: {
                        name: 'Nome del dispositivo',
                        os: 'Sistema operativo'
                    }
                },
            },
            action: {
                create: {
                    long: 'Crea gruppo',
                    short: 'Crea'
                }
            }
        },
        notifications: {
            title: 'Crea gruppo',
            message: 'Gruppo creato correttamente',
        }
    },
    edit: {
        title: 'Modifica gruppo',
        actions: {
            edit: 'Modifica gruppo',
            create: 'Crea gruppo'
        },
        notifications: {
            create: {
                title: 'Creazione gruppo',
                message: 'Il gruppo è stato creato con successo'
            },
            edit: {
                title: 'Modifica gruppo',
                message: 'Il gruppo è stato modificato con successo'
            }
        }
    }
}
