import { Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppProvider} from "../../../../core/providers/app.provider";
import {FolderProvider} from "../../../../core/providers/folder.provider";

@Component({
    selector: 'app-admin-quality-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class QualityFilesAdminComponent implements OnInit {

    polymorphic_id;
    polymorphic_type = 'FolderSection';

    constructor(
        private appProvider: AppProvider,
        public translate: TranslateService,
        public folderProvider: FolderProvider,
    ) {
        this.polymorphic_id = appProvider.folderSectionID;
    }

    ngOnInit() {
        setTimeout( () => {
            this.folderProvider.reload();
        }, 500);
    }
}
