

export class Audit {
    operator: {
        operators: string,
        administrators: string
    };
    users: {
        registered: string
    };
    groups: {
        registered: string
    };
    notices: {
        sent: string,
        latest: {
            delivered: {
                amount: string,
                percentage: string
            },
            readed: {
                amount: string,
                percentage: string
            },
            sent: {
                amount: string,
                percentage: string
            }
        }
    };
    inquiry: {
        geoclaim: {
            sent: string
        };
        areyoufine: {
            sent: string
        };
    };
    signals: {
        received: string
    };
    devices: {
        registered: string
    };
}
