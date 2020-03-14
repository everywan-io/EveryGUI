import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { EveryUPModule } from '@everyup/everyup.module';
import { ListComponent } from '@modules/areyoufine/components/list/list.component';
import { AreyoufineRoutes } from '@modules/areyoufine/areyoufine.routes';
import { FiltersComponent } from './components/list/filters/filters.component';
import { AreyoufineService } from '@modules/areyoufine/areyoufine.service';
import { FeedsComponent } from './components/feeds/feeds.component';
import { FeedsFiltersComponent } from '@modules/areyoufine/components/feeds/filters/filters.component';
import { AreYouFineResolver } from '@modules/areyoufine/resolvers/areyoufine.resolver';


@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(AreyoufineRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule
    ],
    providers: [
        AreyoufineService,
        AreYouFineResolver
    ],
    declarations: [
        ListComponent,
        FiltersComponent,
        FeedsComponent,
        FeedsFiltersComponent
    ]
})
export class AreyoufineModule {

}
