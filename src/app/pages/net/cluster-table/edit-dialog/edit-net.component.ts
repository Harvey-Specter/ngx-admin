import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'edit-net.component.html',
  styleUrls: ['edit-net.component.scss'],
})
export class EditNetComponent {

  @Input() name: string;
  @Input() desc: string;

  constructor(protected ref: NbDialogRef<EditNetComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(netname,netdesc) {
    this.ref.close({'netname':netname,'netdesc':netdesc});
    //this.ref.close({'netname':netname,'netdesc':netdesc});
  }
}
