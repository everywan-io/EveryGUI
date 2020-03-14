import { NoticeFeedStatsDescriptorInterface } from '@configs/network/api.descriptors';
import { NoticeFeedsStats } from '@models/noticeFeedsStats.model';


export class NoticeFeedsStatsFactory {
    static create(source: NoticeFeedStatsDescriptorInterface[] | NoticeFeedStatsDescriptorInterface | NoticeFeedsStats ): NoticeFeedsStats [] | NoticeFeedsStats {
        if (source instanceof Array) {
            return source.map((descriptor: NoticeFeedStatsDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof NoticeFeedsStats) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: NoticeFeedsStats): NoticeFeedsStats {
        const copy: NoticeFeedsStats = new NoticeFeedsStats();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: NoticeFeedStatsDescriptorInterface): NoticeFeedsStats {
        const duplicateKeys = [
            'receivers',
            'readed',
            'delivered',
            'sent'
        ];
        const instance: NoticeFeedsStats = new NoticeFeedsStats();

        duplicateKeys.forEach((key) => {

            if (key !== 'receivers') {
                instance[key] = {
                    amount: '',
                    percentage: ''
                };
                instance[key].amount = descriptor[key].amount;
                instance[key].percentage = descriptor[key].percentage;
            } else {
                instance[key] = descriptor[key];
            }
        });

        return instance;
    }
}
