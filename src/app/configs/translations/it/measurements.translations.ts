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
            },
            action: {
                create: 'Create Measurement Sessions'
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
            details: {
                long: 'Show details',
                short: 'Details'
            },
            results: {
                long: 'Show results',
                short: 'Results'
            },
            create: {
                long: 'Create Measurement Sessions',
                short: 'Create'
            },
            runSession: {
                long: 'Run Session',
                short: 'Run'
            },
            stopSession: {
                long: 'Stop Session',
                short: 'Stop'
            },
            delete: {
                long: 'Delete Session',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Delete session',
                message: 'Stai per eliminare la sessione <b>{{ measurement }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            run: {
                title: 'Current status is STOPPED',
                message: 'Stai per cambiare lo stato alla sessione <b>{{ measurement }}</b> in <b> RUNNING</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            stop: {
                title: 'Current status is RUNNING',
                message: 'Stai per cambiare lo stato alla sessione <b>{{ measurement }}</b> in <b> STOPPED</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Session <b>{{measurement}}</b> removed',
                message: 'Sessione eliminata correttamente'
            },
            run: {
                title: 'Actually status is <b>Running</b>',
                message: 'Session\'s status successfully changed to <b>Running<b>'
            },
            stop: {
                title: 'Actually status is <b>Stopped</b>',
                message: 'Session\'s status successfully changed to <b>Stopped<b>'
            },
            edit: {
                title: 'Edit Measurement Sessions',
                message: 'Sessione modificata correttamente'
            }
        },
    },
    edit: {
        title: {
            create: 'Configure Measurement Sessions'
        },
        fields: {
            interval: {
                label: 'Interval (in seconds)',
                placeholder: 'insert an interval'
            },
            authenticationMode: {
                label: 'Authentication Mode',
                placeholder: 'Select mode'
            },
            keyChain: {
                label: 'Key Chain (only for Authentication Mode)',
                placeholder: 'insert key chain'
            },
            timestampFormat: {
                label: 'Timestamp Format',
                placeholder: 'Select timestamp'
            },
            delayMeasurementMode: {
                label: 'Delay Measurement Mode',
                placeholder: 'Select mode'
            },
            sessionReflectorMode: {
                label: 'Session Reflector Mode',
                placeholder: 'Select mode'
            },
            sessionSender: {
                label: 'Session Sender',
                placeholder: 'Select device'
            },
            sessionReflector: {
                label: 'Session Reflector',
                placeholder: 'Select device'
            },
            sidlist: {
                label: 'Direct Path Segment List',
                placeholder: 'insert sidlist'
            },
            returnSidlist: {
                label: 'Return Path Segment List',
                placeholder: 'insert return sidlist'
            },
            duration: {
                label: 'Session\'s Duration (in seconds)',
                placeholder: 'insert duration'
            },
            runOptions: {
                label: 'Run After Creation',
                placeholder: 'select an option'
            },
            overlaySession: {
                label: 'Associated Overlay',
                placeholder: 'select overlay'
            }
        },
        actions: {
            create: 'Create Measurement Sessions'
        },
        notifications: {
            create: {
                title: 'Edit Measurement Sessions',
                message: 'La sessione è stata creata con successo'
            }
        },
        modals: {
            create: {
                title: 'Configure session',
                message: 'Stai per configurare la sessione.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Configure',
                    cancel: 'Cancel'
                }
            },
            approve: {
                title: 'Enable session',
                message: 'Stai per approvare la sessione.<br />Sei sicuro di voler procedere?',
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
            delayReturnPath: 'Mean Delay (ms)',
            overlayId: 'Overlay ID',
            overlayName: 'Overlay Name'
        },
        actions: {
            edit: 'Edit Measurement Sessions'
        },
        notifications: {
            delete: {
                title: 'Remove session',
                message: 'Sessione eliminata correttamente'
            },
            enable: {
                title: 'Enable session',
                message: 'Session successful enbled'
            },
            disable: {
                title: 'Disable session',
                message: 'Session successful disabled'
            }
        }
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
