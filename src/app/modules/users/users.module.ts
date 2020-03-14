import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersRoutes } from '@modules/users/users.routes';
import { ListComponent } from '@modules/users/components/list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { EveryUPModule } from '@everyup/everyup.module';
import { SharedModule } from '@modules/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '@modules/users/users.service';
import { FiltersComponent } from './components/list/filters/filters.component';
import { EditComponent } from './components/edit/edit.component';
import { UserResolver } from '@modules/users/resolvers/user.resolver';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
    imports: [
        NgbModule,
        SharedModule,
        TranslateModule,
        EveryUPModule,
        RouterModule.forChild(UsersRoutes)
    ],
    providers: [
        UsersService,
        UserResolver
    ],
    declarations: [
        ListComponent,
        FiltersComponent,
        EditComponent,
        DetailsComponent,
    ]
})
export class UsersModule {

}
