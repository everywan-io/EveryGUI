import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { EveryUPModule } from '@everyup/everyup.module';
import { ListComponent } from './components/list/list.component';
import { GeoClaimRoutes } from '@modules/geoclaim/gecoclaim.routes';
import { FiltersComponent } from './components/list/filters/filters.component';
import { GeoclaimService } from '@modules/geoclaim/geoclaim.service';
import { FeedsComponent } from './components/feeds/feeds.component';
import { FeedsFiltersComponent } from '@modules/geoclaim/components/feeds/filters/filters.component';
import { GeoclaimResolver } from '@modules/geoclaim/resolvers/geoclaim.resolver';


@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(GeoClaimRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule,
    ],
    providers: [
        GeoclaimService,
        GeoclaimResolver
    ],
    declarations: [
        ListComponent,
        FiltersComponent,
        FeedsComponent,
        FeedsFiltersComponent
    ]
})
export class GeoclaimModule {

}
