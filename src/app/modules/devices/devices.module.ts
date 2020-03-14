import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { EveryUPModule } from '@everyup/everyup.module';
import { DevicesService } from '@modules/devices/devices.service';
import { DevicesRoutes } from '@modules/devices/devices.routes';
import { ListComponent } from './components/list/list.component';
import { FiltersComponent } from './components/list/filters/filters.component';


@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(DevicesRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule
    ],
    providers: [
        DevicesService
    ],
    declarations: [ListComponent, FiltersComponent]
})
export class DevicesModule {

}
