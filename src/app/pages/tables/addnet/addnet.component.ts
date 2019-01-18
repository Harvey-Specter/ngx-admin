import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'addnet.component.html',
  styleUrls: ['addnet.component.scss'],
})
export class AddnetComponent implements OnInit {

  // private firstForm: FormGroup;
  private secondForm: FormGroup;
  private thirdForm: FormGroup;

  firstForm = this.fb.group({
    nettype: [''],
    netname: [''],
    netdesc: [''],
    ordertype: [''],
    orgcnt: ['2'],
  });
  desc = 0;
  // orderOrgCnt = 0;
  orgCnt = 1;
  // stepIndex = 1;
  orgs: any[] = [];

  constructor(private fb: FormBuilder) {
    this.firstForm = this.fb.group({
      nettype: [''],
      netname: '',
      netdesc: [''],
      ordertype: [''],
      orgcnt: ['2'],
    });
  }

  setOrgCnt($event) {
    this.orgCnt = $event.target.value;
  }

  createOrgs() {
    this.orgs = [];
    for (let i = 1; i <= this.orgCnt - 1; i ++) {
      console.info('数的值：' + i);
      this.orgs.push(i);
    }
  }
  showDesc() {
    console.info('------showDesc------');
    if (this.desc === 0) this.desc = 1;
    else this.desc = 0;
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
