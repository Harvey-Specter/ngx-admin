import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ProjectRoutingModule, routedComponents } from './project-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import {ClusterTableService} from '../../@core/data/cluster-table.service';
import {NetService} from '../../@core/data/net.service';
import {NbButtonModule} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { EditNetComponent } from './project-table/edit-dialog/edit-net.component';
import {NbDialogService} from '@nebular/theme';
import {ProjectService} from '../../@core/data/project.service';
import {AddMemberComponent} from './addproject/add-member/add-member.component';
import {UsersService} from '../../@core/data/user.service';

@NgModule({
  imports: [
    ThemeModule,
    ProjectRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...routedComponents,
    EditNetComponent,
    AddMemberComponent,
  ],
  entryComponents: [
    EditNetComponent,
    AddMemberComponent,
  ],
  providers: [
    UsersService,
    NetService,
    ProjectService,
    NbDialogService,
    SmartTableService,
    ClusterTableService,
  ],
})
export class ProjectModule { }
