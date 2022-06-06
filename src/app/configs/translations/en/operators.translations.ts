export const OperatorsLanguagePartialDefinition = {
    list: {
        title: 'Manage operators',
        filters: {
            fields: {
                term: {
                    placeholder: 'Search by name, surname or email'
                },
                roles: {
                    placeholder: 'All roles'
                }
            },
            action: {
                create: 'Create operator'
            }
        },
        headers: {
            fullname: 'Operator',
            role: 'Role',
            actions: 'Actions'
        },
        actions: {
            filter: 'Filter',
            create: 'Create operator',
            edit: {
                long: 'Edit operator',
                short: 'Edit'
            },
            delete: {
                long: 'Delete operator',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Delete operator',
                message: 'You area bout to delete the operator <b>{{ operator }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Delete operator',
                message: 'Operator deleted successfully'
            }
        },
    },
    edit: {
        title: 'Edit operator',
        fields: {
            name: {
                label: 'Name',
                placeholder: 'Insert the name of the operator'
            },
            surname: {
                label: 'Surname',
                placeholder: 'Insert the surname of the operator'
            },
            type: {
                label: 'Account type',
                placeholder: 'Select the account type'
            },
            phone: {
                label: 'Telephone number',
                placeholder: 'Insert the telephone number'
            },
            email: {
                label: 'Email address',
                placeholder: 'Insert email address'
            },
            password: {
                label: 'Password',
                placeholder: 'Insert password'
            },
            passwordConfirm: {
                label: 'Confirm password',
                placeholder: 'Confirm password'
            }
        },
        actions: {
            create: 'Create operator',
            edit: 'Edit operator'
        },
        notifications: {
            create: {
                title: 'Operator created',
                message: 'The operator <b>{{ fullname }}</b> has been created successfully.'
            },
            edit: {
                title: 'Edit operator',
                message: 'The operator <b>{{ fullname }}</b> has been modified successfully.'
            }
        }
    }
};
