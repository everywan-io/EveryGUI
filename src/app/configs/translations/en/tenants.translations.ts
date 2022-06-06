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
                    placeholder: 'Search by ID'
                },
                type: {
                    placeholder: 'All types',

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
                message: 'You are about to delete the tenantnet <b>{{ tenantnet }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Remove',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Create Tenant',
                message: 'The Tenant <b>{{ fullname }}</b> has been created successfully.'
            },
            delete: {
                title: 'Remove Tenant',
                message: 'Tenant deleted successfully.'
            },
            edit: {
                title: 'Edit Tenant',
                message: 'Tenant modified successfully.'
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
                label: 'Name',
                placeholder: 'Insert the name of the Tenant'
            },
            description: {
                label: 'Description',
                placeholder: 'Insert a description'
            },
            type: {
                label: 'Tipo Tenant',
                placeholder: 'Select the Tenant type'
            },
        },
        actions: {
            edit: 'Edit Tenant',
            create: 'Create Tenant'
        },
        modals: {
            create: {
                title: 'Create Tenant',
                message: 'You are about to create the Tenant <b>{{ tenantnet }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Create',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'Create Tenant',
                message: 'The Tenant <b>{{ fullname }}</b> has been created successfully.'
            },
            edit: {
                title: 'Edit Tenant',
                message: 'The Tenant <b>{{ fullname }}</b> has been modified successfully.'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
