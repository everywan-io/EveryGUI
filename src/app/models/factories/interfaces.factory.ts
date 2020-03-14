import {Interface} from '@models/interfaces.model';
import {InterfaceDescriptorInterface} from '@configs/network/api.descriptors';

export class InterfacesFactory {
    static create(source: InterfaceDescriptorInterface[] | InterfaceDescriptorInterface | Interface): Interface[] | Interface {
        if (source instanceof Array) {
            return source.map((descriptor: InterfaceDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Interface) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Interface): Interface {
        const copy: Interface = new Interface();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: InterfaceDescriptorInterface): Interface {
        const duplicateKeys = {
            deviceid: 'deviceid',
            name: 'name',
            macAddr: 'mac_addr',
            ipv4Addrs: 'ipv4_addrs',
            ipv6Addrs: 'ipv6_addrs',
            ipv4Subnets: 'ipv4_subnets',
            ipv6Subnets: 'ipv6_subnets',
            extIpv4Addrs: 'ext_ipv4_addrs',
            extIpv6Addrs: 'ext_ipv6_addrs',
            type: 'type'
        };
        const instance: Interface = new Interface();

        for (const key in duplicateKeys) {
            if (duplicateKeys.hasOwnProperty(key)) {
                const value = duplicateKeys[key];
                instance[key] = descriptor[value];
            }
        }

        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): Interface {
        const instance = new Interface();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
