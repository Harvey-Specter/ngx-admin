import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'addnet.component.html',
  styleUrls: ['addnet.component.scss'],
})
export class AddnetComponent implements OnInit {

  private firstForm: FormGroup;
  private secondForm: FormGroup;
  private thirdForm: FormGroup;

  desc = 0;
  // orderOrgCnt = 0;
  orgCnt = 1;
  // stepIndex = 1;
  orgs: any[] = [];

  constructor(private fb: FormBuilder) {
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
      nettype: ['1'],
      netname: 'c1',
      netdesc: ['desc'],
      ordertype: ['Solo'],
      orgcnt: ['2'],
    });

    this.secondForm = this.fb.group({
      // secondCtrl: ['', Validators.required],
      orderorgname: this.fb.array([
        this.fb.control(''),
      ]),
      orderorgdomain: this.fb.array([
        this.fb.control(''),
      ]),
      orderorgcnt: this.fb.array([
        this.fb.control(''),
      ]),

      orgname: this.fb.array([
        this.fb.control(''),
      ]),
      orgdomain: this.fb.array([
        this.fb.control(''),
      ]),
      orgcnt: this.fb.array([
        this.fb.control(''),
      ]),
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    // this.firstForm.markAsDirty();
    console.info(this.firstForm.value.orgcnt);

    // this.firstForm.get('orgcnt') as FormContro
    const orgnames = this.secondForm.get('orgname') as FormArray;
    for (let i = 1 ; i < this.firstForm.value.orgcnt; i++) {
      // this.secondForm.
      orgnames.push(new FormControl());
    }
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
