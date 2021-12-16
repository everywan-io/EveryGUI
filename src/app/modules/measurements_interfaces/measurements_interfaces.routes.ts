import { Routes } from '@angular/router';
import { EditComponent } from '@modules/measurements_interfaces/components/edit/edit.component';
import { DetailsComponent } from '@modules/measurements_interfaces/components/details/details.component';
import { MeasurementResolver } from './resolvers/measurements_interfaces.resolver';
import { ResultsResolver } from './resolvers/results.resolver';
import { ListComponent } from '@modules/measurements_interfaces/components/list/list.component';
import { ResultsComponent } from '@modules/measurements_interfaces/components/results/results.component';
import { DeviceMeasurementAvailableResolver } from './resolvers/devices.resolver';
import { resolve } from 'url';

export const MeasurementsRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: 'create',
    component: EditComponent,
    data: {
        mode: 'create'
    },
    resolve: {
        device: DeviceMeasurementAvailableResolver
    }
}, {
    path: ':sessionId',
    component: DetailsComponent,
    resolve: {
        measurement: MeasurementResolver
    }
}, {
    path: ':sessionId/results',
    component: ResultsComponent,
    resolve: {
        measurement: ResultsResolver
    }
}];
