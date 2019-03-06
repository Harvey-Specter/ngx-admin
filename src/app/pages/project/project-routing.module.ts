import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import {ProjectTableComponent} from './project-table/project-table.component';
import {AddProjectComponent} from './addproject/addproject.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent,
  children: [{
    path: 'add-project',
    component: AddProjectComponent,
  },
  {
    path: 'project-table',
    component: ProjectTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }

export const routedComponents = [
  ProjectComponent,
  ProjectTableComponent,
  AddProjectComponent,
];
