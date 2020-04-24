export const OverlayNetsLanguagePartialDefinition = {
    list: {
        title: 'Overlay Networks',
        filters: {
            fields: {
                term: {
                    placeholder: 'Search'
                },
                type: {
                    placeholder: 'Tutti i tipi',

                }
            },
            action: {
                create: 'Create Overlay Network'
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
                long: 'Create Overlay Network',
                short: 'Create'
            },
            configure: {
                long: 'Configure Overlay Network',
                short: 'Configure'
            },
            edit: {
                long: 'Edit Overlay Network',
                short: 'Edit'
            },
            delete: {
                long: 'Delete Overlay Network',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Delete Overlay Network',
                message: 'Stai per eliminare Overlay Network <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Creation Overlay Network',
                message: 'L\'Overlay Network è stata creato con successo'
            },
            delete: {
                title: 'Delete Overlay Network',
                message: 'Overlay Network eliminato correttamente'
            },
            edit: {
                title: 'Edit Overlay Network',
                message: 'Overlay Network modificato correttamente'
            }
        },
    },
    edit: {
        title: {
            create: 'Create Overlay Network',
            edit: 'Mofidica Overlay Network',
            configure: 'Configure Overlay Network'
        },
        fields: {
            name: {
                label: 'Name',
                placeholder: 'Insert a name'
            },
            description: {
                label: 'Description',
                placeholder: 'Insert a description'
            },
            type: {
                label: 'Type',
                placeholder: 'Select Type'
            },
            tunnelType: {
                label: 'Tunnel',
                placeholder: 'Select Tunnel'
            },
            localslices: {
                label: 'Local slices',
                name: {
                    label: 'Name'
                },
                ipv4_addrs: {
                    label: 'IPv4'
                },
                type: {
                    label: 'Type'
                }
            },
            interfaces: {
                label: 'Interface',
                placeholder: 'Select Interface'
            }
        },
        actions: {
            configure: 'Configure Overlay Network',
            edit: 'Create Overlay Network',
            create: 'Create Overlay Network'
        },
        modals: {
            create: {
                title: 'Create Overlay Network',
                message: 'Stai per creare la Overlay Network <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Create',
                    cancel: 'Cancel'
                }
            },
            edit: {
                title: 'Edit Overlay Network',
                message: 'Stai per modificare la Overlay Network <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            configure: {
                title: 'Configure Overlay Network',
                message: 'Stai per configurare la Overlay Network <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Creation Overlay Network',
                message: 'L\'Overlay Network è stata creato con successo'
            },
            edit: {
                title: 'Edit Overlay Network',
                message: 'L\'Overlay Network è stata modificato con successo'
            },
            configuration: {
                title: 'Configuration Overlay Network',
                message: 'L\'Overlay Network è stata configurata con successo'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};



