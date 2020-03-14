import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { Category } from '@models/categories.model';
import { CategoryDescriptorInterface } from '@configs/network/api.descriptors';
import { CategoriesFactory } from '@models/factories/categories.factory';


@Injectable()
export class CategoriesService {
    constructor(private API: ApiService) {}

    fetch(payload: any): Observable<Category> {
        return this.API.Categories
            .fetch(payload)
            .pipe(
                map((categories: CategoryDescriptorInterface) => CategoriesFactory.create(categories) as Category[])
            );
    }

    get(id: string): Observable<Category> {
        return this.API.Categories
            .get({id: id})
            .pipe(
                map((category: CategoryDescriptorInterface) => {
                    return CategoriesFactory.create(category) as Category})
            );
    }

    update(payload: any): Observable<Category> {
        return this.API.Categories
            .update(payload)
            .pipe(
                map((category: CategoryDescriptorInterface) => CategoriesFactory.create(category) as Category)
            );
    }

    create(payload: any): Observable<Category> {
        return this.API.Categories
            .create(payload)
            .pipe(
                map((category: CategoryDescriptorInterface) => CategoriesFactory.create(category) as Category)
            );
    }

    delete(id: string) {
        return this.API.Categories.delete({id: id});
    }

}
