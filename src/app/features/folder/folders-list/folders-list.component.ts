import {Component} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";
import {FolderProvider} from "../../../core/providers/folder.provider";
import {MatDialog} from "@angular/material";
import {FolderService} from "../../../core/services/folder.service";
import {FolderFormComponent} from "../folder-form/folder-form.component";
import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {MessageProvider} from "../../../core/providers/message.provider";
import {DateProvider} from "../../../core/providers/date.provider";


@Component({
    selector: 'app-folder-folders-list',
    templateUrl: './folders-list.component.html',
    styleUrls: ['./folders-list.component.scss']
})
export class FoldersListComponent {

    constructor(
        private dialog: MatDialog,
        private folderService: FolderService,
        private messageProvider: MessageProvider,
        public folderProvider: FolderProvider,
        public dateProvider: DateProvider,
        public translate: TranslateService) {
    }

    changeFolder( folder ){
        if(this.folderProvider.canOpen(folder)){
            this.folderProvider.folderID = folder.id;
        }else{
            this.messageProvider.show('FOLDER_PERMISSION_DENY', {label: 'ERROR', error: true});
        }
    }

    editFolder( folder ){
        const dialogRef = this.dialog.open(FolderFormComponent, {
            width: '500px',
            data: {
                folder: folder
            }
        });

        dialogRef.afterClosed().subscribe( success => {
            if(success){
                this.folderProvider.reload(); // reloads data by incrementing
            }
        })
    }

    deleteFolder( folder ){
        const forceDelete = true;

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                msg: 'DELETE_FOLDER',
                name: folder.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.folderService.delete(folder.id, forceDelete).subscribe( (folder) => {
                    this.messageProvider.show('FOLDER_DELETED');

                    this.folderProvider.reload(); // reloads data by incrementing
                })
            }
        });
    }
}
