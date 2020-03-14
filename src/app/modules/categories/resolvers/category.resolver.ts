import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '@models/categories.model';
import { CategoriesService } from '@modules/categories/categories.service';

@Injectable()
export class CategoryResolver implements Resolve<Observable<Category>> {
    constructor(private categoryService: CategoriesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
        const categoryIdentifier: string = route.paramMap.get('id');

        return this.categoryService.get(categoryIdentifier)
            .pipe(
                map((category: Category) => category)
            );
    }

}
