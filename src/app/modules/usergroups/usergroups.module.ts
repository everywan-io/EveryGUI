import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsergroupsRoutes } from '@modules/usergroups/usergroups.routes';
import { ListComponent } from '@modules/usergroups/components/list/list.component';
import { UsergroupsService } from '@modules/usergroups/usergroups.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { FiltersComponent } from './components/list/filters/filters.component';
import { EditComponent } from './components/edit/edit.component';
import { EveryUPModule } from '@everyup/everyup.module';
import { FilterBarComponent } from '@modules/usergroups/components/edit/filterBar/filterBar.component';
import { UsergroupResolver } from '@modules/usergroups/resolvers/usergroup.resolver';


@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(UsergroupsRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule
    ],
    providers: [
        UsergroupsService,
        UsergroupResolver
    ],
    declarations: [
        ListComponent,
        FiltersComponent,
        EditComponent,
        FilterBarComponent
    ]
})
export class UsergroupsModule {
    
}
