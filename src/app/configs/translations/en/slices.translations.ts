export const SlicesLanguagePartialDefinition = {
    list: {
        title: 'Overlay Networks',
        filters: {
            fields: {
                term: {
                    placeholder: 'Search by ID'
                },
                type: {
                    placeholder: 'All types',

                }
            }
        },
        headers: {
            actions: 'Actions',
            id: 'Id',
            type: 'Type',
            name: 'Name',
            tenantid: 'Tenant Id',
            mode: 'Mode',
        },
        actions: {
            filter: 'Filter',
            edit: {
                long: 'Edit slice',
                short: 'Edit'
            },
            delete: {
                long: 'Delete slice',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Delete slice',
                message: 'You are about to delete the slice <b>{{ slice }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Cance;'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Delete slice',
                message: 'Slice deleted successfully.'
            }
        },
    },
    edit: {
        title: 'Edit slice',
        fields: {
          
        }
        ,
        actions: {
            create: 'Create slice',
            edit: 'Edit slice'
        },
        notifications: {
            create: {
                title: 'Create slice',
                message: 'The slice <b>{{ fullname }}</b> has been created successfully.'
            },
            edit: {
                title: 'Modifica slice',
                message: 'The slice <b>{{ fullname }}</b> has been modified successfully.'
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
