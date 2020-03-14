export const SlicesLanguagePartialDefinition = {
    list: {
        title: 'Overlay Networks',
        filters: {
            fields: {
                term: {
                    placeholder: 'Cerca per id'
                },
                type: {
                    placeholder: 'Tutti i tipi',

                }
            }
        },
        headers: {
            actions: 'Actions',
            id: 'Id',
            type: 'Type',
            name: 'Nome',
            tenantid: 'Tenant Id',
            mode: 'Mode',
        },
        actions: {
            filter: 'Filter',
            edit: {
                long: 'Modifica slice',
                short: 'Edit'
            },
            delete: {
                long: 'Elimina slice',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Elimina slice',
                message: 'Stai per eliminare slice <b>{{ slice }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Elimina slice',
                message: 'Operatore eliminato correttamente'
            }
        },
    },
    edit: {
        title: 'Modifica slice',
        fields: {
          
        }
        ,
        actions: {
            create: 'Crea slice',
            edit: 'Modifica slice'
        },
        notifications: {
            create: {
                title: 'Creation slice',
                message: 'Il slice <b>{{ fullname }}</b> è stato creato con successo'
            },
            edit: {
                title: 'Modifica slice',
                message: 'Il slice <b>{{ fullname }}</b> è stato modificato con successo'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
