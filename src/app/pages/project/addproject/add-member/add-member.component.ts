import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {FormArray} from '@angular/forms';
import {UsersService} from '../../../../@core/data/user.service';
import {exists} from 'fs';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'add-member.component.html',
  styleUrls: ['add-member.component.scss'],
})
export class AddMemberComponent implements OnInit{

  @Input() email: string;
  @Input() role: string;
  @Input() exists_member: FormArray;
  @Input() owner : string;

  //all_user : Array<any>;
  members_select: Array<any>;

  constructor(private usersService: UsersService, protected ref: NbDialogRef<AddMemberComponent>) {}

  cancel() {
    this.ref.close();
  }
  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        console.log('------users-------',users);
        const rs_user = [];
        for(let i = 0 ; i< users.length; i++ ){
          let same = 0;
          if (this.owner===users[i].email) same=1;
          for (let j = 0 ; j<this.exists_member.length; j++ ){
            if(users[i].email===this.exists_member.controls[j].get('email').value){
              same=1;
              break;
            }
          }
          if(!same) rs_user.push(users[i]);
        }
        console.log('------rs_user-------',rs_user);
        this.members_select=rs_user;
      });
  }
  ngOnInit() {

    this.getUsers();

  }

  submit(email,role) {
    //this.ref.close();
    this.ref.close({'email':email,'role':role});
  }
}
