import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {control} from 'leaflet';
import { NetService } from '../../../@core/data/net.service';
import {Net} from '../../../@core/data/net';
import {Router} from '@angular/router';
import {timer} from 'rxjs/index';
import {Observable, Subject, Subscription} from 'rxjs/Rx';
import {takeUntil, tap} from 'rxjs/internal/operators';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'addnet.component.html',
  styleUrls: ['addnet.component.scss'],
})
export class AddnetComponent implements OnInit {

  private nets = '';

  private firstForm: FormGroup;
  private secondForm: FormGroup;
  private thirdForm: FormGroup;
  //nettype = 'docker';

  get orderinfo() { return this.secondForm.get('orderinfo') as FormArray; }
  get orginfo(){return this.secondForm.get('orginfo') as FormArray; }
  get orderorgs(){return this.thirdForm.get('orderorgs') as FormArray; }
  get orgs(){return this.thirdForm.get('orgs') as FormArray; }
  desc = 0;

  constructor(private fb: FormBuilder,private netService: NetService,private router: Router) {
  }

  getNets(): void {
    this.netService.getNets()
      .subscribe(nets => this.nets = nets);
  }


  showDesc() {
    if (this.desc === 0) this.desc = 1;
    else this.desc = 0;
  }
  initSecondForm() {
    this.secondForm = this.fb.group({
      // secondCtrl: ['', Validators.required],
      orderinfo: this.fb.array([]),
      orginfo: this.fb.array([]),

    });
  }
  initThirdForm() {
    this.thirdForm = this.fb.group({
      // secondCtrl: ['', Validators.required],
      orderorgs: this.fb.array([]),
      orgs: this.fb.array([]),

    });
  }
  ngOnInit() {
    this.firstForm = this.fb.group({
      nettype: ['docker' , Validators.required],
      netname: ['c1', Validators.required, this.netService.netNameValidator()],
      netdesc: ['desc'],
      ordertype: ['Solo'],
      orgcnt: ['2',Validators.required],
    });

    this.initSecondForm();

    this.initThirdForm();

    this.getNets();
  }

  onFirstSubmit() {

    this.initSecondForm();
    this.addOrderOrg();
    for (let i = 0 ; i < this.firstForm.value.orgcnt; i++) {
      // this.secondForm.
      this.addOrg(i);
    }

  }

  addOrderOrg() {
    this.orderinfo.push(this.fb.group({
      orderorgname: 'orderorg0',
      orderorgdomain: 'muddy0.com',
      ordercnt: '3',
    }));
  }
  addOrg(idx) {
    this.orginfo.push(this.fb.group({
      orgname: 'org' + idx,
      orgdomain: 'muddy' + idx + '.com',
      peercnt: '2',
    }));
  }


  fillThirdForm() {
    console.info('---fillThirdForm-this.secondForm.value.orderinfo.length-', this.secondForm.value.orderinfo.length);
    //const orderorgs = this.thirdForm.get('orderorgs') as FormArray;
    for (let i = 0 ; i < this.secondForm.value.orderinfo.length; i++) {

      const orderorgval = this.secondForm.value.orderinfo[i];
      const orderorg_fullname = orderorgval.orderorgname +'.'+ orderorgval.orderorgdomain;
      console.info('orderorgval-----', orderorgval);
      const orderers = this.fb.array([]);
      for (let j = 0 ; j < orderorgval.ordercnt ; j++ ) {

        const orderer = this.fb.group({orderorg_fullname:orderorg_fullname, orderer_fullname: 'orderer' + j + '.' + orderorg_fullname, orderer_hostname_port : '172.70.'+(i+20)+','+(j+10) });

        orderers.push(orderer);
      }
      const orderers_group = this.fb.group({orderorgname: orderorgval.orderorgname,
        orderorgdomain: orderorgval.orderorgdomain, orderers : orderers});
      this.orderorgs.push(orderers_group);
    }

    // const orgs = this.thirdForm.get('orgs') as FormArray;
    console.info('--------this.secondForm.value-----' , this.secondForm.value) ;
    for (let i = 0 ; i < this.secondForm.value.orginfo.length; i++) {

      const orgval = this.secondForm.value.orginfo[i];
      const org_fullname = orgval.orgname+'.'+orgval.orgdomain;
      const peers = this.fb.array([]);
      for (let j = 0 ; j < orgval.peercnt ; j++ ) {

        const peer = this.fb.group({org_fullname:org_fullname, peer_fullname: 'peer' + j + '.' + org_fullname, peer_hostname_port : '172.70.'+(i+20)+','+(j+10) });

        peers.push(peer);
      }
      const peers_group = this.fb.group({orgname: orgval.orgname, orgdomain: orgval.orgdomain ,peers : peers});
      this.orgs.push(peers_group);
    }
  }
  onSecondSubmit() {
    // this.secondForm.markAsDirty();
    console.info(this.secondForm.value);
    this.initThirdForm();
    this.fillThirdForm();
  }

  onThirdSubmit() {
    // this.thirdForm.markAsDirty();
    console.info({ 'first' : this.firstForm.value , 'second' : this.secondForm.value , 'third' : this.thirdForm.value}) ;

    const form3value=this.thirdForm.value;
    //const orderorgs = form3value.orderorgs;
    //const orgs=form3value.orgs;
    form3value.nettype = this.firstForm.value.nettype;
    form3value.netname = this.firstForm.value.netname;
    form3value.netdesc = this.firstForm.value.netdesc;
    form3value.ordertype = this.firstForm.value.ordertype;

    this.addNet(form3value as Net);

  }
  addNet(net:Net): void {
    //name = name.trim();
    if (!net) { return; }
    this.netService.addNet(net).subscribe(rs => {
        console.log(rs);
        this.oberserableTimer();
      });
  }
  oberserableTimer() {
    this.source = timer(1000, 500);
    this.abc = this.source.pipe(
      takeUntil(this.subject),
    ).subscribe(val => this.stopandrediect(val));

  }
  backlist(){
    this.subject.next();
    this.router.navigate(['/pages/net/net-table']);
  }
  stopandrediect(val){
    console.log(val, '=');
    this.subscribeTimer = this.timeLeft - val;
    if(this.subscribeTimer===0){
      this.subject.next();
      this.backlist();
    }
  }
  private source : Observable<any>;
  private abc : Subscription ;
  private subscribeTimer=0;
  private timeLeft=5;
  private subject = new Subject();

  oberserableTimer_0() {
    const source = timer(1000, 500);
    this.abc = source.subscribe(val => {
      this.stopandrediect(val);
    });
  }
  printandstop_0(val){
    console.log(val, '=');
    this.subscribeTimer = this.timeLeft - val;
    if(this.subscribeTimer===2){
      this.abc.unsubscribe();
    }

  }
}
