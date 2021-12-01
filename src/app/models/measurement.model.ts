export class Parameters {
    id: number;
    timestamp: number;
    value: number;
}

export class Delay {
    delays: Parameters;
    averageDelay: number;
}

export class Results {
    delayDirectPath: Delay;
    delayReturnPath: Delay;
}

export class Measurement {
    sessionId: string;
    sessionDescription: string;
    senderName: string;
    reflectorName: string;
    status: string;
    delayDirectPath: number;
    delayReturnPath: number;
    interval: number;
    authenticationMode: string;
    keyChain: string;
    timestampFormat: string;
    delayMeasurementMode: string;
    sessionReflectorMode: string;
    senderDeviceId: string;
    senderStampIp: string;
    reflectorDeviceId: string;
    reflectorStampIp: string;
    sidlist: string;
    returnSidlist: string;
    overlayName: string;
    overlayId: string;
    duration: number;
    results: Results;


    defineExtraProperties() {

    }
}
