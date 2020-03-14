import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { EveryUPModule } from '@everyup/everyup.module';
import { CategoriesRoutes } from '@modules/categories/categories.routes';
import { CategoriesService } from '@modules/categories/categories.service';
import { ListComponent } from '@modules/categories/components/list/list.component';
import { FilterComponent } from './components/list/filter/filter.component';
import { EditComponent } from './components/edit/edit.component';
import { CategoryResolver } from '@modules/categories/resolvers/category.resolver';
import { ColorTwitterModule } from 'ngx-color/twitter';


@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(CategoriesRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule,
        ColorTwitterModule
    ],
    providers: [
        CategoriesService,
        CategoryResolver
    ],
    declarations: [
        ListComponent,
        FilterComponent,
        EditComponent
    ]
})
export class CategoriesModule {

}
