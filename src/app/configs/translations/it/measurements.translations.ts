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
                message: 'You are about to delete the session <b>{{ measurement }}</b>.<br />Are you sure?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            run: {
                title: 'Current status is STOPPED',
                message: 'You are about to change the status of the session <b>{{ measurement }}</b> in <b> RUNNING</b>.<br />Are you sure?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            stop: {
                title: 'Current status is RUNNING',
                message: 'You are about to change the status of the session <b>{{ measurement }}</b> in <b> STOPPED</b>.<br />Are you sure?',
                actions: {
                    confirm: 'Confirm',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Session <b>{{measurement}}</b> removed',
                message: 'Session deleted successfully'
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
                message: 'Session created successfully'
            }
        },
    },
    edit: {
        title: {
            create: 'Configure Measurement Sessions'
        },
        fields: {
            interval: {
                label: 'Interval [s]',
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
                label: 'Session Duration [s] - \'0\' for Unlimited Duration',
                placeholder: 'insert duration'
            },
            runOptions: {
                label: 'Run After Creation',
                placeholder: 'select an option'
            }
        },
        actions: {
            create: 'Create Measurement Sessions'
        },
        notifications: {
            create: {
                title: 'Edit Measurement Sessions',
                message: 'Session created successfully'
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
            interval: 'Interval [s]',
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
            delayDirectPath: 'Mean Delay [ms]',
            delayReturnPath: 'Mean Delay [ms]',
            overlayId: 'Overlay ID',
            overlayName: 'Overlay Name'
        },
        actions: {
            edit: 'Edit Measurement Sessions'
        },
        notifications: {
            delete: {
                title: 'Remove session',
                message: 'Session deleted successfully'
            },
            enable: {
                title: 'Enable session',
                message: 'Session enabled successfully'
            },
            disable: {
                title: 'Disable session',
                message: 'Session disabled successfully'
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
                    id: "Delay ID",
                    timestamp: "Timestamp",
                    value: "Delay Value"
                },
                averageDelay: "Average Delay"
            },
            delayReturnPath: {
                delays: {
                    id: "Delay ID",
                    timestamp: "Timestamp",
                    value: "Delay Value"
                },
                averageDelay: "Average Delay"
            }
        }
    },
    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
