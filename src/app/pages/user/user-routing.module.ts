import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import {UserTableComponent} from './user-table/user-table.component';
import {AddUserComponent} from './adduser/adduser.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'user-table',
    component: UserTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
  UserComponent,
  UserTableComponent,
  AddUserComponent,
];
