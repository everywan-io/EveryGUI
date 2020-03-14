import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignalsService } from '@modules/signals/signals.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { EveryUPModule } from '@everyup/everyup.module';
import { SignalsRoutes } from '@modules/signals/signals.routes';
import { ListComponent } from './components/list/list.component';
import { FiltersComponent } from './components/list/filters/filters.component';
import { DetailsComponent } from './components/details/details.component';
import { SignalResolver } from '@modules/signals/resolvers/signal.resolver';
import { ResponseComponent } from './components/response/response.component';

@NgModule({
    declarations: [
        ListComponent,
        FiltersComponent,
        DetailsComponent,
        ResponseComponent,
    ],
    imports: [
        NgbModule,
        RouterModule.forChild(SignalsRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule,
    ],
    providers: [
        SignalsService,
        SignalResolver
    ]
})
export class SignalsModule { }
