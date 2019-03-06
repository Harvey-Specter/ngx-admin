import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import {ClusterTableService} from '../../@core/data/cluster-table.service';
import {UsersService} from '../../@core/data/user.service';
import {NbButtonModule} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './user-table/edit-dialog/edit-user.component';
import {NbDialogService} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...routedComponents,
    EditUserComponent,
  ],
  entryComponents: [
    EditUserComponent,
  ],
  providers: [
    UsersService,
    NbDialogService,
    ClusterTableService,
  ],
})
export class UserModule { }
