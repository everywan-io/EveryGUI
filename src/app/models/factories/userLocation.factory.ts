import { UserLocationDescriptorInterface } from '@configs/network/api.descriptors';
import { UserLocation } from '@models/userLocation.model';


export class UserLocationFactory {
    static create(source: UserLocationDescriptorInterface[] | UserLocationDescriptorInterface | UserLocation ): UserLocation [] | UserLocation {
        if (source instanceof Array) {
            return source.map((descriptor: UserLocationDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof UserLocation) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: UserLocation): UserLocation {
        const copy: UserLocation = new UserLocation();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: UserLocationDescriptorInterface): UserLocation {

        const duplicateKeys = [
            'id',
            'full_name',
            'avatar',
            'location',
        ];

        const instance: UserLocation = new UserLocation();

        duplicateKeys.forEach((key) => {
            if (key === 'full_name') {
                instance['fullName'] = descriptor[key];
            } else {
                instance[key] = descriptor[key];
            }
        });


        return instance;
    }

}
