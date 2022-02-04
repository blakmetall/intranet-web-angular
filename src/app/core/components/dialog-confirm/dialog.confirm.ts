import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-core-component-dialog-firm',
    templateUrl: './dialog.confirm.html',
})
export class DialogConfirmComponent {

    name = '';
    forceDelete = '';
    msg = '';

    constructor(
        public dialogRef: MatDialogRef<DialogConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
        this.name = data.name;
        this.forceDelete = data.forceDelete;
        this.msg = data.msg || '';
    }

    confirm(){
        this.dialogRef.close(true);
    }

    cancel(){
        this.dialogRef.close(false);
    }

}