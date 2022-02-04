import {Component, Inject} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FileService} from "../../../core/services/file.service";

@Component({
    selector: 'app-file-view',
    templateUrl: './file-view.component.html',
    styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent {

    file;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FileViewComponent >,
        private fileService: FileService,
        public translate: TranslateService
    ) {
        // get folderID to save files
        if(data && data.file){
            this.file = data.file;
        }
    }
}