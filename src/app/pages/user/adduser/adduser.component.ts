import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from '../../../@core/data/user.service';
import {User} from '../../../@core/data/user';
import {Router} from '@angular/router';
//import Avatars from '@dicebear/avatars';
//import sprites from '@dicebear/avatars-identicon-sprites';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'adduser.component.html',
  styleUrls: ['adduser.component.scss'],
})
export class AddUserComponent implements OnInit {

  private users = '';
  private firstForm: FormGroup;
  //private fs = require('fs');
  //private jdenticon = require('jdenticon');

  desc = 0;

  constructor(private fb: FormBuilder,private usersService: UsersService,private router: Router) {
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }


  showDesc() {
    if (this.desc === 0) this.desc = 1;
    else this.desc = 0;
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      email: ['mary@123.com', Validators.required, this.usersService.netNameValidator()],
      password: ['123456',Validators.required],
      userdesc:['userdesc'],
      changepasswd:[true] ,
      displayname: ['displayname'],
      userrole: ['standard'],
      status:['0'],
      privileges: this.fb.group({
        cn:true,
        mu:false,
        mr:false,
        cs:false,
        mn:false,
        la:true,
      })
    });

    this.getUsers();
  }

  onFirstSubmit() {
    console.log('--onFirstSubmit--');
    console.log(this.firstForm.value);

    this.addUser(this.firstForm.value as User);
  }

  addUser(user:User): void {
    //name = name.trim();
    // const options = {};
    // const avatars = new Avatars(sprites(options));
    // const svg = avatars.create('mary');
    //
    // console.log('svg---',svg);

    if (!user) { return; }
    this.usersService.addUser(user).subscribe(rs => {
        console.log(rs);
        //this.oberserableTimer();
        this.router.navigate(['/pages/user/user-table']);
      });
  }
}
