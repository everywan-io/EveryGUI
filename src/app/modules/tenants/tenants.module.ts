import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';

import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {EveryUPModule} from '@everyup/everyup.module';
import {SharedModule} from '@modules/shared/shared.module';
import {TenantsRoutes} from '@modules/tenants/tenants.routes';
import {TenantsService} from '@modules/tenants/tenants.service';
import {TenantResolver} from '@modules/tenants/resolvers/tenant.resolver';
//import {FiltersComponent} from '@modules/tenants/components/list/filters/filters.component';



@NgModule({
  imports: [
      SharedModule,
      NgbModule,
      EveryUPModule,
      TranslateModule,
      RouterModule.forChild(TenantsRoutes),
      AngularSvgIconModule
  ],
  providers: [
      TenantResolver,
      TenantsService
  ],
  declarations: [
    EditComponent, 
    DetailsComponent, 
    ListComponent
  ]
})


export class TenantsModule {

}
