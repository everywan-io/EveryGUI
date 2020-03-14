import { DeviceDescriptorInterface } from '@configs/network/api.descriptors';
import { Device } from '@models/devices.model';


export class DevicesFactory {
    static create(source: DeviceDescriptorInterface[] | DeviceDescriptorInterface | Device ): Device[] | Device {
        if (source instanceof Array) {
            return source.map((descriptor: DeviceDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Device) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: Device): Device {
        const copy: Device = new Device();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: DeviceDescriptorInterface): Device {
        const duplicateKeys = [
            'id',
            'fcm',
            'model',
            'platformName',
            'platformVersion',
            'name',
            'user',
            'createdAt',
            'updatedAt'
        ];
        const instance: Device = new Device();

        duplicateKeys.forEach((key) => {
            if (key === 'platformName') {
                instance[key] = descriptor['platform_name'];
            } else if (key === 'platformVersion') {
                instance[key] = descriptor['platform_version'];
            } else if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            } else {
                instance[key] = descriptor[key];
            }
        });

        // FIXME
        if (!instance.user.avatar) {
            instance.user.avatar = 'http://lorempixel.com/400/400/people/';
        }

        instance['user'].fullName = instance['user']['full_name'];
        delete instance['user']['full_name'];

        return instance;
    }

}
