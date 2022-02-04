import {Component, Inject} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-folder-file-features-view',
    templateUrl: './file-features-view.component.html',
    styleUrls: ['./file-features-view.component.scss']
})
export class FileFeaturesViewComponent {

    file;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<FileFeaturesViewComponent >,
        public translate: TranslateService
    ) {

        if(data){
            this.file = data.file || '';
        }
    }
}