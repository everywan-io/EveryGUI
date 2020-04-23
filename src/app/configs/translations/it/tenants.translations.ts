export const TenantsLanguagePartialDefinition = {
    details: {
        title: 'Tenant Details',
        fields: {
            id: {
                label: 'Tenant Id'
            },
            name: {
                label: 'Tenant Name',
            },
            info: {
                label: 'Info',
            },
            configured: {
                label: 'Configured'
            },
            domainId: {
                label: 'Domain Id',
            },
            conf: {
                label: 'Configurations'
            },
            token: {
                label: 'Token'
            }
        },
    },
    list: {
        title: 'Tenants',
        filters: {
            fields: {
                term: {
                    placeholder: 'Cerca per id'
                },
                type: {
                    placeholder: 'Tutti i tipi',

                }
            },
            action: {
                create: 'Create Tenant'
            }
        },
        headers: {
            actions: 'Actions',
            id: 'Id',
            name: 'Name',
            type: 'Type',
            tunnelType: 'Tunnel',
            numSlices: '# Slices',
            tenantId: 'Tenant'
        },
        actions: {
            filter: 'Filter',
            create: {
                long: 'Create Tenant',
                short: 'Create'
            },
            edit: {
                long: 'Edit Tenant',
                short: 'Edit'
            },
            delete: {
                long: 'Remove Tenant',
                short: 'Remove'
            }
        },
        modals: {
            delete: {
                title: 'Remove Tenant',
                message: 'Stai per eliminare tenantnet <b>{{ tenantnet }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Remove',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Creation Tenant',
                message: 'L\'Tenant <b>{{ fullname }}</b> è stata creato con successo'
            },
            delete: {
                title: 'Remove Tenant',
                message: 'Tenant eliminato correttamente'
            },
            edit: {
                title: 'Edit Tenant',
                message: 'Tenant modificato correttamente'
            }
        },
    },
    edit: {
        title: {
            create: 'Create Tenant',
            edit: 'Edit Tenant'
        },
        fields: {
            name: {
                label: 'Nome',
                placeholder: 'Inserisci il nome dell\'Tenant'
            },
            description: {
                label: 'Description',
                placeholder: 'Inserisci una Description'
            },
            type: {
                label: 'Tipo Tenant',
                placeholder: 'Seleziona tipologia Tenant'
            },
        },
        actions: {
            edit: 'Edit Tenant',
            create: 'Create Tenant'
        },
        modals: {
            create: {
                title: 'Create Tenant',
                message: 'Stai per creare la Tenant <b>{{ tenantnet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Create',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Creation Tenant',
                message: 'L\'Tenant <b>{{ fullname }}</b> è stato creato con successo'
            },
            edit: {
                title: 'Edit Tenant',
                message: 'Il Tenant <b>{{ fullname }}</b> è stato modificato con successo'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
