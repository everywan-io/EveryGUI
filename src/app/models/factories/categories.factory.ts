import { CategoryDescriptorInterface } from '@configs/network/api.descriptors';
import { Category } from '@models/categories.model';


export class CategoriesFactory {
    static create(source: CategoryDescriptorInterface[] | CategoryDescriptorInterface | Category ): Category[] | Category {
        if (source instanceof Array) {
            return source.map((descriptor: CategoryDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Category) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: Category): Category {
        const copy: Category = new Category();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: CategoryDescriptorInterface): Category {
        const duplicateKeys = [
            'id',
            'name',
            'description',
            'color',
            'createdAt',
            'updatedAt'
        ];
        const instance: Category = new Category();

        duplicateKeys.forEach((key) => {
            if (key === 'createdAt') {
                instance[key] = descriptor['created_at'].toString();
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'].toString();
            } else {
                instance[key] = descriptor[key];
            }
        });

        return instance;
    }

}
