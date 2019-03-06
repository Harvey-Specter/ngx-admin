import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ClusterTableService } from '../../../@core/data/cluster-table.service';
import {Router} from '@angular/router';
import {NetService} from '../../../@core/data/net.service';
import { EditUserComponent} from './edit-dialog/edit-user.component';
import {NbDialogService} from '@nebular/theme';
import {FormGroup} from '@angular/forms';
import {Net} from '../../../@core/data/net';
import {UsersService} from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-project-table',
  templateUrl: './user-table.component.html',
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
export class UserTableComponent {
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
      status:{
        title: '状态',
        type: 'string',
      },
      email: {
        title: '邮箱',
        type: 'string',
      },
      userdesc: {
        title: '描述',
        type: 'string',
      },
      displayname: {
        title: '显示名称',
        type: 'string',
      },
      userrole: {
        title: '用户角色',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private usersService: UsersService,private service: ClusterTableService, private router: Router,private dialogService: NbDialogService) {
    this.getUsers();
    // const data = this.service.getData();
    // if (data.length === 0 ) {
    //   this.hasData = false;
    // } else {
    //   this.hasData = true;
    // }
    // this.source.load(data);
  }
  initTable(data): void {
    console.log('----data----',data);
    if (data.length === 0 ) {
      this.hasData = false;
    } else {
      this.hasData = true;
    }
    this.source.load(data);
  }

  getUsers(): void {
    this.usersService.getUsers()
    .subscribe(users => this.initTable(users));
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
    this.router.navigate(['/pages/user/add-user']);
  }

  onEdit(event): void{
    console.log('---------onEdit----------',event.data);
      this.dialogService.open(EditUserComponent,{context:event.data})
        .onClose.subscribe(data => data && this.updateNet(data));
        //.onClose.subscribe(name => name && this.names.push(name));
  }
  to_adduser(){
    console.info('----to_adduser------');
    this.router.navigate(['/pages/user/add-user']);
  }
  updateNet(data): void {
    //name = name.trim();
    if (!data) { return; }
    this.usersService.updateUser(data)
      .subscribe(rs => {
        //this.heroes.push(hero);
        console.log(rs);
        //this.router.navigate(['/pages/net/user-table']);
      });
  }
}
