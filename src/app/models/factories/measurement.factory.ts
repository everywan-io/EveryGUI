import { Measurement } from '@models/measurement.model';
import { MeasurementDescriptorInterface } from '@configs/network/api.descriptors';

export class MeasurementsFactory {
    static create(source: MeasurementDescriptorInterface[] | MeasurementDescriptorInterface | Measurement): Measurement[] | Measurement {
        if (source instanceof Array) {
            return source.map((descriptor: MeasurementDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Measurement) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Measurement): Measurement {
        const copy: Measurement = new Measurement();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: MeasurementDescriptorInterface): Measurement {
        const duplicateKeys = {
            sessionId: 'sessionId',
            sessionDescription: 'sessionDescription',
            senderName: 'senderName',
            reflectorName: 'reflectorName',
            status: 'status',
            delayDirectPath: 'delayDirectPath',
            delayReturnPath: 'delayReturnPath',
            interval: 'interval',
            authenticationMode: 'authenticationMode',
            keyChain: 'keyChain',
            timestampFormat: 'timestampFormat',
            delayMeasurementMode: 'delayMeasurementMode',
            sessionReflectorMode: 'sessionReflectorMode',
            senderDeviceId: 'senderDeviceId',
            senderStampIp: 'senderStampIp',
            reflectorDeviceId: 'reflectorDeviceId',
            reflectorStampIp: 'reflectorStampIp',
            sidlist: 'sidlist',
            returnSidlist: 'returnSidlist',
            results: 'results',
            overlayId: 'overlayId',
            overlayName: 'overlayName',
            duration: 'duration'
        };

        const instance: Measurement = new Measurement();
        // TODO type: DeviceType; 
        for (const key in duplicateKeys) {
            if (duplicateKeys.hasOwnProperty(key)) {
                const value = duplicateKeys[key];
                instance[key] = descriptor[value];
            }
        }
        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): Measurement {
        const instance = new Measurement();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
