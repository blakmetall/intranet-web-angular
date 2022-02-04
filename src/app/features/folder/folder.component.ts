import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";
import {FolderProvider} from "../../core/providers/folder.provider";

@Component({
    selector: 'app-folder',
    templateUrl: './folder.component.html',
})
export class FolderComponent implements OnInit, OnDestroy {

    @Input() polymorphic_id : any;
    @Input() polymorphic_type: any;

    constructor(public translate: TranslateService, public folderProvider: FolderProvider) {}

    ngOnInit() {

        // data as observable. Folder feature triggers several events after update this values.
        this.folderProvider.polymorphicData = {
            id: parseInt(this.polymorphic_id),
            type: this.polymorphic_type
        };

    }

    ngOnDestroy() {
        this.folderProvider.clearData();
    }
}

