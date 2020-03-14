import { NgModule } from '@angular/core';

import { UserslocationService } from '@modules/userslocation/userslocation.service';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { UserslocationRoutes } from '@modules/userslocation/userslocation.routes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        RouterModule.forChild(UserslocationRoutes),
        TranslateModule
    ],
    providers: [
        UserslocationService
    ],
    declarations: [
        ListComponent
    ]
})
export class UserslocationModule {

}
