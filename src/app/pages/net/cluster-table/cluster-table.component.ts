import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ClusterTableService } from '../../../@core/data/cluster-table.service';
import {Router} from '@angular/router';
import {NetService} from '../../../@core/data/net.service';
import { EditNetComponent} from './edit-dialog/edit-net.component';
import {NbDialogService} from '@nebular/theme';
import {FormGroup} from '@angular/forms';
import {Net} from '../../../@core/data/net';

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
  //private editForm: FormGroup;
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
      name: {
        title: '名称',
        type: 'string',
      },
      type: {
        title: '集群环境',
        type: 'string',
      },
      desc: {
        title: '描述',
        type: 'string',
      },
      ordertype: {
        title: '排序机制',
        type: 'string',
      },
      orgcnt: {
        title: '组织数',
        type: 'string',
      },
      nodecnt: {
        title: '节点数',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private netService: NetService,private service: ClusterTableService, private router: Router,private dialogService: NbDialogService) {
    this.getNets();
    // const data = this.service.getData();
    // if (data.length === 0 ) {
    //   this.hasData = false;
    // } else {
    //   this.hasData = true;
    // }
    // this.source.load(data);
  }
  initTable(data): void {
    if (data.length === 0 ) {
      this.hasData = false;
    } else {
      this.hasData = true;
    }
    this.source.load(data);
  }

  getNets(): void {
    this.netService.getNets()
    .subscribe(nets => this.initTable(nets));
  }

  onDeleteConfirm(event): void {
    console.log('---------onDeleteConfirm----------');
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCreate(): void{
    console.log('---------onCreate----------');
    this.router.navigate(['/pages/net/add-net']);
  }

  onEdit(event): void{
    console.log('---------onEdit----------',event.data);
      this.dialogService.open(EditNetComponent,{context:event.data})
        .onClose.subscribe(data => data && this.updateNet(data));
        //.onClose.subscribe(name => name && this.names.push(name));
  }
  to_addnet(){
    console.info('----to_addnet------');
    this.router.navigate(['/pages/net/add-net']);
  }
  updateNet(data): void {
    //name = name.trim();
    if (!data) { return; }
    this.netService.updateNet(data)
      .subscribe(rs => {
        //this.heroes.push(hero);
        console.log(rs);
        //this.router.navigate(['/pages/net/user-table']);
      });
  }
}
