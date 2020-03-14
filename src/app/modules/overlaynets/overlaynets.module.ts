import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {EveryUPModule} from '@everyup/everyup.module';

import {SharedModule} from '@modules/shared/shared.module';
import {ListComponent} from '@modules/overlaynets/components/list/list.component';
import {EditComponent} from '@modules/overlaynets/components/edit/edit.component';
import {OverlayNetsRoutes} from '@modules/overlaynets/overlaynets.routes';
import {OverlayNetsService} from '@modules/overlaynets/overlaynets.service';
import {OverlayNetResolver} from '@modules/overlaynets/resolvers/overlaynets.resolver';
import {DeviceAvailableResolver} from '@modules/overlaynets/resolvers/devices.resolver';
import {FiltersComponent} from '@modules/overlaynets/components/list/filters/filters.component';
import {DevIntCardComponent} from '@modules/devices/components/interfacecard/interfacecard.component';
import { DevicesService } from '../devices/devices.service';
import { InterfaceAvailableResolver } from './resolvers/interfaces.resolver';

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        EveryUPModule,
        TranslateModule,
        RouterModule.forChild(OverlayNetsRoutes),
        AngularSvgIconModule
    ],
    providers: [
        OverlayNetResolver,
        DeviceAvailableResolver,
        InterfaceAvailableResolver,
        DevicesService,
        OverlayNetsService
    ],
    declarations: [
        ListComponent,
        EditComponent,
        FiltersComponent,
        DevIntCardComponent
    ]
})

export class OverlayNetsModule {

}
