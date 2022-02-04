import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FileViewerComponent} from "../components/file-viewer/file-viewer.component";

@Injectable()
export class FileViewerProvider {

    dialogRef : any;

    constructor(
        public dialog: MatDialog,
        //@Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    load(file){
        this.dialog.open(FileViewerComponent, {
            data: {file: file},

            width: '1000px',
            height: '800px'
        });
    }
}