import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ClusterTableService } from '../../../@core/data/cluster-table.service';

@Component({
  selector: 'ngx-cluster-table',
  templateUrl: './cluster-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-header {
      padding-bottom: 0.2rem;
    }
    nb-card span {
      line-height: 2;
    }
    [nbButton] {
      float:right
    }
    nb-card-body {
      min-height: 35rem;
    }
    .add {
      text-align: center;
    }
    .fab {
      font-size: 30rem;
    }
  `],
})
export class ClusterTableComponent {
  hasData = true;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ClusterTableService) {
    const data = this.service.getData();
    if (data.length === 0 ) {
      this.hasData = false;
    } else {
      this.hasData = true;
    }
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
