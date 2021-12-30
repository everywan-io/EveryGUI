import { SIDList } from '@models/measurement.model';
import { SIDListDescriptorInterface } from '@configs/network/api.descriptors';

export class SIDListsFactory {
    static create(source: SIDListDescriptorInterface[] | SIDListDescriptorInterface | SIDList): SIDList[] | SIDList {
        if (source instanceof Array) {
            return source.map((descriptor: SIDListDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof SIDList) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: SIDList): SIDList {
        const copy: SIDList = new SIDList();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: SIDListDescriptorInterface): SIDList {
        const duplicateKeys = {
            direct_sid_list: 'direct_sid_list',
            overlay_name: 'overlay_name',
            overlayid: 'overlayid',
            return_sid_list: 'return_sid_list',
            tenantid: 'tenantid'
        };

        const instance: SIDList = new SIDList();
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

    static restoreFromStorage(descriptor): SIDList {
        const instance = new SIDList();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
