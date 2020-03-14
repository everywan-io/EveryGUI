export const CategoriesLanguagePartialDefinition = {
    list: {
        title: 'Gestione Categorie',
        filters: {
            fields: {
                term: {
                    placeholder: 'Cerca...'
                }
            },
            action: {
                create: 'Crea Categoria'
            }
        },
        headers: {
            name: 'Nome',
            description: 'Descrizione',
            createdAt: 'Creato',
            updatedAt: 'Modificato',
            actions: 'Azioni'
        },
        actions: {
            filter: 'Filtra',
            create: 'Crea categoria',
            edit: {
                long: 'Modifica categoria',
                short: 'Modifica'
            },
            delete: {
                long: 'Cancella categoria',
                short: 'Cancella'
            }
        },
        modals: {
            delete: {
                title: 'Elimina categoria',
                message: 'Stai per eliminare la categoria <b>{{ category.name }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Elimina',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Elimina categoria',
                message: 'Categoria eliminata correttamente'
            }
        }
    },
    edit: {
        preview: 'Preview',
        title: {
            create: 'Crea categoria',
            edit: 'Modifica categoria'
        },
        fields: {
            name: {
                label: 'Nome',
                placeholder: 'Inserisci il nome della categoria'
            },
            description: {
                label: 'Descrizione',
                placeholder: 'Inserisci la descrizione della categoria'
            },
            color: {
                label: 'Colore',
            }
        },
        actions: {
            create: 'Crea categoria',
            edit: 'Modifica categoria'
        },
        notifications: {
            create: {
                title: 'Creazione categoria',
                message: 'La categoria <b>{{ category.name }}</b> è stata creata con successo'
            },
            edit: {
                title: 'Modifica categoria',
                message: 'La categoria <b>{{ category.name }}</b> è stata modificata con successo'
            }
        }
    }
};
