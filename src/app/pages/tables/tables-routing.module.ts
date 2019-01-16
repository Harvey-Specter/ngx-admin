import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import {ClusterTableComponent} from './cluster-table/cluster-table.component';
import {AddnetComponent} from './addnet/addnet.component';
import {BasenetComponent} from './addnet/basenet/basenet.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [{
    path: 'add-net',
    component: AddnetComponent,
  }, {
    path: 'smart-table',
    component: SmartTableComponent,
  },
  {
    path: 'cluster-table',
    component: ClusterTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  ClusterTableComponent,
  AddnetComponent,
  BasenetComponent,
];
