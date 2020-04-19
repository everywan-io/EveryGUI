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
                create: 'Create Overlay Net'
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
                long: 'Create Overlay Net',
                short: 'Create'
            },
            configure: {
                long: 'Configure Overlay Net',
                short: 'Configure'
            },
            edit: {
                long: 'Edit Overlay Net',
                short: 'Edit'
            },
            delete: {
                long: 'Delete Overlay Net',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Delete OverlayNet',
                message: 'Stai per eliminare overlaynet <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Creation OverlayNet',
                message: 'L\'OverlayNet <b>{{ fullname }}</b> è stata creato con successo'
            },
            delete: {
                title: 'Delete OverlayNet',
                message: 'OverlayNet eliminato correttamente'
            },
            edit: {
                title: 'Edit OverlayNet',
                message: 'OverlayNet modificato correttamente'
            }
        },
    },
    edit: {
        title: {
            create: 'Create OverlayNet',
            edit: 'Mofidica OverlayNet',
            configure: 'Configure OverlayNet'
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
            devices: {
                label: 'EveryEdge routers'
            },
            interfaces: {
                label: 'Interface',
                placeholder: 'Select Interface'
            }
        },
        actions: {
            configure: 'Configure Overlay Net',
            edit: 'Create Overlay Net',
            create: 'Create Overlay Net'
        },
        modals: {
            create: {
                title: 'Create Overlay Net',
                message: 'Stai per creare la OverlayNet <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Create',
                    cancel: 'Cancel'
                }
            },
            edit: {
                title: 'Edit Overlay Net',
                message: 'Stai per modificare la OverlayNet <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            configure: {
                title: 'Configure Overlay Net',
                message: 'Stai per configurare la OverlayNet <b>{{ overlaynet }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Creation Overlay Net',
                message: 'L\'OverlayNet <b>{{ fullname }}</b> è stata creato con successo'
            },
            edit: {
                title: 'Edit Overlay Net',
                message: 'Il OverlayNet <b>{{ fullname }}</b> è stata modificato con successo'
            },
            configuration: {
                title: 'Configuration Overlay Net',
                message: 'Il OverlayNet <b>{{ fullname }}</b> è stata configurata con successo'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};



