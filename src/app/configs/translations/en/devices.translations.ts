export const DevicesLanguagePartialDefinition = {
    list: {
        title: 'EveryEdge routers',
        filters: {
            fields: {
                term: {
                    placeholder: 'Search...'
                },
                type: {
                    placeholder: 'All type',
                },
                status: {
                    placeholder: 'All status'
                }
            }
        },
        headers: {
            actions: 'Actions',
            id: 'Id',
            name: 'Name',
            type: 'Type',
            natType: 'NAT Type',
            connected: 'Connected',
            interfaces: 'Interfaces',
            enabled: 'Enabled',
            configured: 'Configured',
            registration_timestamp: 'Registered at',
            mgmtip: 'Mgmt IP',
            status: 'Status'
        },
        actions: {
            filter: 'Filter',
            enable: {
                long: 'Enable device',
                short: 'Enable'
            },
            disable: {
                long: 'Disable device',
                short: 'Disable'
            },
            edit: {
                long: 'Configure device',
                short: 'Configure'
            },
            details: {
                long: 'Show device',
                short: 'Show'
            },
            delete: {
                long: 'Remove device',
                short: 'Remove'
            }
        },
        modals: {
            delete: {
                title: 'Remove device',
                message: 'You are about to remove the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Remove',
                    cancel: 'Cancel'
                }
            },
            enable: {
                title: 'Enable device',
                message: 'You are about to enable the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            disable: {
                title: 'Disable device',
                message: 'You are about to disable the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Remove device',
                message: 'Device removed successfully'
            },
            enable: {
                title: 'Enable device',
                message: 'Device enbled successfully'
            },
            disable: {
                title: 'Disable device',
                message: 'Device disabled successfully'
            },
            edit: {
                title: 'Edit EveryEdge',
                message: 'Device edited successfully'
            }
        },
    },
    edit: {
        title: {
            edit: 'Configure EveryEdge'
        },
        fields: {
            name: {
                label: 'Name',
                placeholder: 'Insert a name'
            },
            type: {
                label: 'Type',
                placeholder: ''
            },
            description: {
                label: 'Description',
                placeholder: 'Insert a description'
            },
            natType: {
                label: 'NAT Type'
            },
            registration_timestamp: {
                label: 'Registered at'
            },
            mgmtip: {
                label: 'Mgmt IP'
            },
            status: {
                label: 'Status'
            }
        },
        actions: {
            edit: 'Save configuration'
        },
        notifications: {
            edit: {
                title: 'Edit EveryEdge',
                message: 'The device <b>{{ fullname }}</b> has beed edited successfully'
            }
        },
        modals: {
            edit: {
                title: 'Configure device',
                message: 'You area bout to configure device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Configure',
                    cancel: 'Cancel'
                }
            },
            approve: {
                title: 'Enable device',
                message: 'You are about to enable the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
    },
    details: {
        title: 'EveryEdge Details',
        fields: {
            deviceId: 'Device Id',
            name: 'Name',
            type: 'Type',
            description: 'Description',
            natType: 'NAT Type',
            connected: 'Connected',
            interfaces: 'Interfaces',
            enabled: 'Enabled',
            configured: 'Configured',
            registration_timestamp: 'Registered at',
            mgmtip: 'Mgmt IP',
            status: 'Status'
        },
        actions: {
            edit: 'Edit EveryEdge'
        },
        notifications: {
            delete: {
                title: 'Remove device',
                message: 'Device removed successfully'
            },
            enable: {
                title: 'Enable device',
                message: 'Device enabled successfully'
            },
            disable: {
                title: 'Disable device',
                message: 'Device disabled successfully'
            },
        },
        modals: {
            edit: {
                title: 'Configure device',
                message: 'You are about to configure the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Configure',
                    cancel: 'Cancel'
                }
            },
            enable: {
                title: 'Enable device',
                message: 'You are about to enable the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            disable: {
                title: 'Disable device',
                message: 'You are about to disable the device <b>{{ device }}</b>.<br />Do you want to proceed?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
