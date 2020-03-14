import { OverlayNet } from '@models/overlaynets.model';
import { OverlayNetDescriptorInterface } from '@configs/network/api.descriptors';

export class OverlayNetsFactory {
    static create(source: OverlayNetDescriptorInterface[] | OverlayNetDescriptorInterface | OverlayNet): OverlayNet[] | OverlayNet {
        if (source instanceof Array) {
            return source.map((descriptor: OverlayNetDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof OverlayNet) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: OverlayNet): OverlayNet {
        const copy: OverlayNet = new OverlayNet();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: OverlayNetDescriptorInterface): OverlayNet {
        const duplicateKeys = {
            id: '_id',
            type: 'type',
            name: 'name',
            description: 'description',
            tenantId: 'tenantid',
            slices: 'slices',
            tunnelType: 'tunnel_mode'
        };

        const instance: OverlayNet = new OverlayNet();
               
       
        for (const key in duplicateKeys) {
            if (duplicateKeys.hasOwnProperty(key)) {
                const value = duplicateKeys[key];
                instance[key] = descriptor[value];
            }
        }
        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): OverlayNet {
        const instance = new OverlayNet();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
