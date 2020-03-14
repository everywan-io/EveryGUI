import { UsersStatsDescriptorInterface } from '@configs/network/api.descriptors';
import { UsersStats } from '@models/usersStats.model';


export class UsersStatsFactory {
    static create(source: UsersStatsDescriptorInterface[] | UsersStatsDescriptorInterface | UsersStats ): UsersStats [] | UsersStats {
        if (source instanceof Array) {
            return source.map((descriptor: UsersStatsDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof UsersStats) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: UsersStats): UsersStats {
        const copy: UsersStats = new UsersStats();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: UsersStatsDescriptorInterface): UsersStats {

        const instance: UsersStats = new UsersStats();

        instance['locations'] = descriptor['locations'];

        return instance;
    }

}
