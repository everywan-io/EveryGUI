import { NoticeFeedDescriptorInterface } from '@configs/network/api.descriptors';
import { NoticeFeed, NoticeStatus } from '@models/noticeFeeds.model';

export class NoticeFeedsFactory {
    static create(source: NoticeFeedDescriptorInterface[] | NoticeFeedDescriptorInterface | NoticeFeed ): NoticeFeed [] | NoticeFeed {
        if (source instanceof Array) {
            return source.map((descriptor: NoticeFeedDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof NoticeFeed) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: NoticeFeed): NoticeFeed {
        const copy: NoticeFeed = new NoticeFeed();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: NoticeFeedDescriptorInterface): NoticeFeed {
        const duplicateKeys = [
            'receiver',
            'status',
            'logs',
            'updatedAt'
        ];
        const instance: NoticeFeed = new NoticeFeed();

        duplicateKeys.forEach((key) => {
            if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            }  else if (key === 'status') {
                instance[key] = NoticeStatus[descriptor[key]];
            } else {
                instance[key] = descriptor[key];
            }
        });

        // FIXME
        if (!instance['receiver'].avatar) {
            instance['receiver'].avatar = 'http://lorempixel.com/400/400/people/';
        }

        instance['receiver'].fullName = instance['receiver']['full_name'];
        delete instance['receiver']['full_name'];

        return instance;
    }

}
