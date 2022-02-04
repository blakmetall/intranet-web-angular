import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../environments/environment";
import {DateProvider} from "../../providers/date.provider";
import {AuthProvider} from "../../providers/auth.provider";


@Component({
    selector: 'app-file-viewer',
    templateUrl: './file-viewer.component.html',
    styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent{

    file: any;
    download_url: string;

    constructor(
        public dialogRef: MatDialogRef<FileViewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public translate: TranslateService,
        public dateProvider: DateProvider,
        ) {

        this.file = data.file;
        this.download_url = environment.api_url + 'downloads/' + this.file.id + '/' + this.file.slug;
    }

    close(){
        this.dialogRef.close(false);
    }

}