import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Project} from '../../../@core/data/project';
import {ProjectService} from '../../../@core/data/project.service';
import {AddMemberComponent} from './add-member/add-member.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'addproject.component.html',
  styleUrls: ['addproject.component.scss'],
})
export class AddProjectComponent implements OnInit {

  private projects = '';

  private firstForm: FormGroup;

  get members() { return this.firstForm.get('members') as FormArray; }

  desc = 0;

  constructor(private fb: FormBuilder,private projectService: ProjectService,private router: Router,private dialogService: NbDialogService) {
  }
  getProjects(): void {
    this.projectService.getProject()
      .subscribe(projects => this.projects = projects);
  }

  showDesc() {
    if (this.desc === 0) this.desc = 1;
    else this.desc = 0;
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      project_name: ['p1', Validators.required, this.projectService.projectNameValidator()],
      project_desc:['project_desc'],
      project_owner_email: [ JSON.parse(localStorage.getItem('user')).email],
      user_role: ['Owner'],
      members: this.fb.array([]),
    });
    //this.addMember();

    //this.getProjects();
  }

  onFirstSubmit() {

  }
  openAddMember(){
    console.log('---------openAddMember----------');
    this.dialogService.open(AddMemberComponent,{context:{'owner':JSON.parse(localStorage.getItem('user')).email,'exists_member': this.firstForm.get('members') as FormArray}})
      //.onClose.subscribe(data => data && this.saveMember(data));
      .onClose.subscribe(data => {
        console.log('----data-----',data);
        data && this.addMember(data.email,data.role);
    });
    //.onClose.subscribe(name => name && this.names.push(name));
  }
  delMember(idx){
      this.members.removeAt(idx);
  }
  addMember(email,role){
    this.members.push(this.fb.group({
      email: email,
      role: role,
    }));
  }

  addProject(project:Project): void {
    //name = name.trim();
    if (!project) { return; }
    this.projectService.addProject(project).subscribe(rs => {
        console.log(rs);
      });
  }

  backlist(){
    this.router.navigate(['/pages/project/project-table']);
  }

  saveMember(data): void {
    //name = name.trim();
    if (!data) { return; }
    this.projectService.saveMember(data)
      .subscribe(rs => {
        //this.heroes.push(hero);
        console.log(rs);
        //this.router.navigate(['/pages/net/user-table']);
      });
  }
}
