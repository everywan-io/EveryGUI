export const OverlayNetsLanguagePartialDefinition = {
    list: {
        title: 'Overlay Networks',
        filters: {
            fields: {
                term: {
                    placeholder: 'Search'
                },
                type: {
                    placeholder: 'All types',

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
                message: 'You are about to delete the Overlay Network <b>{{ overlaynet }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Create Overlay Network',
                message: 'The Overlay Network has been created successfully.'
            },
            delete: {
                title: 'Delete Overlay Network',
                message: 'The Overlay Network has been deleted successfully.'
            },
            edit: {
                title: 'Edit Overlay Network',
                message: 'The Overlay Network has been modified successfully.'
            }
        },
    },
    edit: {
        title: {
            create: 'Create Overlay Network',
            edit: 'Edit Overlay Network',
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
                ipv6_addrs: {
                    label: 'IPv6'
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
                message: 'You are about to create the Overlay Network <b>{{ overlaynet }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Create',
                    cancel: 'Cancel'
                }
            },
            edit: {
                title: 'Edit Overlay Network',
                message: 'You are about to edit the Overlay Network <b>{{ overlaynet }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            configure: {
                title: 'Configure Overlay Network',
                message: 'You are about to configure the Overlay Network <b>{{ overlaynet }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Create Overlay Network',
                message: 'Overlay Network created successfully.'
            },
            edit: {
                title: 'Edit Overlay Network',
                message: 'Overlay Network modified successfully.'
            },
            configuration: {
                title: 'Configuration Overlay Network',
                message: 'Overlay Network configured successfully.'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};



