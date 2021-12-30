import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { EveryUPModule } from '@everyup/everyup.module';

import { SharedModule } from '@modules/shared/shared.module';
import { ListComponent } from '@modules/measurements_interfaces/components/list/list.component';
import { EditComponent } from '@modules/measurements_interfaces/components/edit/edit.component';
import { DetailsComponent } from '@modules/measurements_interfaces/components/details/details.component';
import { ResultsComponent } from '@modules/measurements_interfaces/components/results/results.component';
import { MeasurementsRoutes } from '@modules/measurements_interfaces/measurements_interfaces.routes';
import { MeasurementsService } from '@modules/measurements_interfaces/measurements_interfaces.service';
import { MeasurementResolver } from './resolvers/measurements_interfaces.resolver';
import { ResultsResolver } from './resolvers/results.resolver';
import { FiltersComponent } from '@modules/measurements_interfaces/components/list/filters/filters.component';

import { FormsModule } from '@angular/forms';
import { DeviceMeasurementAvailableResolver } from './resolvers/devices.resolver';
import { DevicesService } from '../devices/devices.service';
import { OverlayNetsService } from '../overlaynets/overlaynets.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        EveryUPModule,
        TranslateModule,
        RouterModule.forChild(MeasurementsRoutes),
        AngularSvgIconModule,
        FormsModule,
        NgSelectModule
    ],
    providers: [
        MeasurementResolver,
        ResultsResolver,
        DeviceMeasurementAvailableResolver,
        MeasurementsService,
        DevicesService,
        OverlayNetsService
    ],
    declarations: [
        ListComponent,
        EditComponent,
        DetailsComponent,
        ResultsComponent,
        FiltersComponent,
    ]
})
export class MeasurementsModule {

}
