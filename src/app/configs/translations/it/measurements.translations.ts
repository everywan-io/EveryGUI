import { timestamp } from "rxjs/operators";

export const MeasurementsLanguagePartialDefinition = {
    list: {
        title: 'Measurement Sessions',
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
            sessionId: 'Id',
            sessionDescription: 'Session Description',
            senderName: 'Sender Name',
            reflectorName: 'Reflector Name',
            status: 'Status',
            delayDirectPath: 'Delay Direct Path',
            delayReturnPath: 'Delay Return Path',
            actions: 'Actions'
        },
        actions: {
            filter: 'Filter',
            enable: {
                long: 'Enable session',
                short: 'Enable'
            },
            disable: {
                long: 'Disable session',
                short: 'Disable'
            },
            edit: {
                long: 'Configure session',
                short: 'Configure'
            },
            details: {
                long: 'Show details',
                short: 'Details'
            },
            results: {
                long: 'Show results',
                short: 'Results'
            },
            run_stop: {
                long: 'Run session/Stop session',
                short: 'Run/Stop'
            },
            delete: {
                long: 'Remove session',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Remove session',
                message: 'Stai per eliminare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Remove',
                    cancel: 'Cancel'
                }
            },
            enable: {
                title: 'Enable session',
                message: 'Stai per abilitare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            disable: {
                title: 'Disable session',
                message: 'Stai per disabilitare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Remove session',
                message: 'Session eliminato correttamente'
            },
            enable: {
                title: 'Enable session',
                message: 'Session successful enbled'
            },
            disable: {
                title: 'Disable session',
                message: 'Session successful disabled'
            },
            edit: {
                title: 'Edit Measurement Sessions',
                message: 'Sessione modificata correttamente'
            }
        },
    },
    edit: {
        title: {
            edit: 'Configure Measurement Sessions'
        },
        fields: {
            sessionId: {
                label: 'Session Id',
                placeholder: 'Insert a session id'
            },
            sessionDescription: {
                label: 'Session Description',
                placeholder: ''
            },
            senderName: {
                label: 'Sender Name',
                placeholder: 'Insert a sender name'
            },
            reflectorName: {
                label: 'Reflector Name'
            },
            status: {
                label: 'Status'
            },
            delayDirectPath: {
                label: 'Delay Direct Path'
            },
            delayReturnPath: {
                label: 'Delay Return P dettagliath'
            }
        },
        actions: {
            edit: 'Save configuration'
        },
        notifications: {
            edit: {
                title: 'Edit Measurements Sessions',
                message: 'La session <b>{{ fullname }}</b> è stata modificata con successo'
            }
        },
        modals: {
            edit: {
                title: 'Configure session',
                message: 'Stai per configurare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Configure',
                    cancel: 'Cancel'
                }
            },
            approve: {
                title: 'Enable session',
                message: 'Stai per approvare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
    },
    details: {
        title: 'Measurement Sessions Details',
        fields: {
            sessionId: 'Session ID',
            status: 'Status',
            interval: 'Interval (in seconds)',
            authenticationMode: 'Authentication Mode',
            keyChain: 'Key Chain',
            timestampFormat: 'Timestamp Format',
            delayMeasurementMode: 'Delay Measurement Mode',
            sessionReflectorMode: 'Session Reflector Mode',
            senderDeviceId: 'Device ID',
            senderName: 'Device Name',
            senderStampIp: 'STAMP IP',
            reflectorDeviceId: 'Device ID',
            reflectorName: 'Device Name',
            reflectorStampIp: 'STAMP IP',
            sidlist: 'Segment List',
            returnSidlist: 'Segment List',
            delayDirectPath: 'Mean Delay (ms)',
            delayReturnPath: 'Mean Delay (ms)'
        },
        actions: {
            edit: 'Edit Measurement Sessions'
        },
        notifications: {
            delete: {
                title: 'Remove session',
                message: 'Session eliminata correttamente'
            },
            enable: {
                title: 'Enable session',
                message: 'Session successful enbled'
            },
            disable: {
                title: 'Disable session',
                message: 'Session successful disabled'
            },
        },
        modals: {
            edit: {
                title: 'Configure session',
                message: 'Stai per configurare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Configure',
                    cancel: 'Cancel'
                }
            },
            enable: {
                title: 'Enable session',
                message: 'Stai per abilitare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            disable: {
                title: 'Disable session',
                message: 'Stai per disabilitare la session <b>{{ session }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
    },
    results: {
        title: 'Measurement Sessions Results',
        fields: {
            sessionId: 'Session ID',
            sidlist: 'Segment List',
            returnSidlist: 'Segment List',
            delayDirectPath: {
                delays: {
                    id: "ID ritardo",
                    timestamp: "Timestamp",
                    value: "Valore di ritardo"
                },
                averageDelay: "Media dei ritardi"
            },
            delayReturnPath: {
                delays: {
                    id: "ID ritardo",
                    timestamp: "Timestamp",
                    value: "Valore di ritardo"
                },
                averageDelay: "Media dei ritardi"
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
