export const DevicesIterfacesLanguagePartialDefinition = {
    list: {
        title: 'Interfaces',

        headers: {
            actions: 'Actions',
            name: 'Name',
            type: 'Type',
            mac_addr: 'Mac Addr',
            ipv4_addrs: 'IPv4 Addrs',
            ipv6_addrs: 'IPv6 Addrs',
            ipv4_subnets: 'IPv4 subnets',
            ipv6_subnets: 'IPv6 subnets',
            ext_ipv4_addrs: 'ext ipv4 addrs',
            ext_ipv6_addrs: 'ext ipv6 addrs',
            status: 'Status'
        },
        actions: {
            filter: 'Filter',

            edit: {
                long: 'Configure device',
                short: 'Configure'
            },
            delete: {
                long: 'Remove device',
                short: 'Remove'
            }
        },
        modals: {
            delete: {
                title: 'Remove device',
                message: 'You are about to delete the device <b>{{ device }}</b>.<br />Do you want to proceed?',
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
                message: 'Device deleted successfully'
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
    configure: {
        fields: {
            interfaceName: {
                label: 'Interface',
            },
            description: {
                label: 'Description',
                placeholder: 'Insert a description'
            },
            type: {
                label: 'Type',
                placeholder: 'Select Type'
            },
            ipv4_addrs: {
                label: 'IPv4 Addrs',
                placeholder: 'ex: XXX.XXX.XXX.XXX comma separated'
            },
            ipv4_subnets: {
                label: 'IPv4 Subnets',
                placeholder: 'ex: XXX.XXX.XXX.XXX/YY comma separated'
            },
            ipv6_addrs: {
                label: 'IPv6 Addrs',
                placeholder: 'IPv6 addrs comma separated'
            },
            ipv6_subnets: {
                label: 'IPv6 Subnets',
                placeholder: 'IPv6 Subnets comma separated'
            }

        }
    }
};
