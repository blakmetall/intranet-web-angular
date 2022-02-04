import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FolderProvider} from "../../../core/providers/folder.provider";

@Component({
    selector: 'app-folder-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
})
export class FolderBreadcrumbsComponent {

    constructor(public folderProvider: FolderProvider, public translate: TranslateService) {}

    changeFolder(folderID){
        this.folderProvider.folderID = folderID;
    }

}