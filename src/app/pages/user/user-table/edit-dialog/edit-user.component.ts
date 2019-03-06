import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.scss'],
})
export class EditUserComponent {

  @Input() name: string;
  @Input() desc: string;

  constructor(protected ref: NbDialogRef<EditUserComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(netname,netdesc) {
    this.ref.close({'netname':netname,'netdesc':netdesc});
    //this.ref.close({'netname':netname,'netdesc':netdesc});
  }
}
