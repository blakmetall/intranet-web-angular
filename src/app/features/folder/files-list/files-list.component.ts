import {Component} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";
import {MessageProvider} from "../../../core/providers/message.provider";
import {MatDialog} from "@angular/material";
import {FolderProvider} from "../../../core/providers/folder.provider";
import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {FileService} from "../../../core/services/file.service";
import {FileFormComponent} from "../file-form/file-form.component";
import {FileViewerProvider} from "../../../core/providers/file-viewer.provider";
import {environment} from "../../../../environments/environment";
import {DateProvider} from "../../../core/providers/date.provider";


@Component({
    selector: 'app-folder-files-list',
    templateUrl: './files-list.component.html',
    styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent {

    public download_base_url : any;

    public brandsite_url = environment.brandsite_url;

    constructor(
        private dialog: MatDialog,
        private fileService: FileService,
        private messageProvider: MessageProvider,
        public folderProvider: FolderProvider,
        public fileViewerProvider: FileViewerProvider,
        public dateProvider: DateProvider,
        public translate: TranslateService) {

        this.download_base_url = environment.api_url + 'downloads/';

    }

    editFile( file ){
        const dialogRef = this.dialog.open(FileFormComponent, {
            width: '900px',
            data: {file: file}
        });
        dialogRef.afterClosed().subscribe( () => {
            this.folderProvider.reload(); // reloads data by incrementing
        })
    }

    deleteFile( file ){
        const forceDelete = true;

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                msg: 'DELETE_FILE',
                name: file.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.fileService.delete(file.id, forceDelete).subscribe( () => {
                    this.messageProvider.show('FILE_DELETED');
                    this.folderProvider.reload(); // reloads data by incrementing
                })
            }
        });
    }
}
