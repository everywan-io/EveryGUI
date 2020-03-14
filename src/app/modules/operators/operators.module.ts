import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {EveryUPModule} from '@everyup/everyup.module';

import {SharedModule} from '@modules/shared/shared.module';
import {ListComponent} from '@modules/operators/components/list/list.component';
import {EditComponent} from '@modules/operators/components/edit/edit.component';
import {OperatorsRoutes} from '@modules/operators/operators.routes';
import {OperatorsService} from '@modules/operators/operators.service';
import {OperatorResolver} from '@modules/operators/resolvers/operator.resolver';
import {FiltersComponent} from '@modules/operators/components/list/filters/filters.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        EveryUPModule,
        TranslateModule,
        RouterModule.forChild(OperatorsRoutes),
        AngularSvgIconModule
    ],
    providers: [
        OperatorResolver,
        OperatorsService
    ],
    declarations: [
        ListComponent,
        EditComponent,
        FiltersComponent,
        DetailsComponent
    ]
})
export class OperatorsModule {

}
