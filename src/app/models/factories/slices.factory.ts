import {Slice} from '@models/slices.model';
import {SliceDescriptorInterface} from '@configs/network/api.descriptors';

export class SlicesFactory {
    static create(source: SliceDescriptorInterface[] | SliceDescriptorInterface | Slice): Slice[] | Slice {
        if (source instanceof Array) {
            return source.map((descriptor: SliceDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Slice) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Slice): Slice {
        const copy: Slice = new Slice();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: SliceDescriptorInterface): Slice {
        const duplicateKeys = ['name', 'tenantid', 'interfaces', 'mode', 'type'];
        const instance: Slice = new Slice();
        // TODO type: SliceType; 
        duplicateKeys.forEach(key => instance[key] = descriptor[key]);
        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): Slice {
        const instance = new Slice();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
