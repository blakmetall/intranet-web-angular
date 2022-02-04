import { Component, OnInit} from '@angular/core';
import {QualityExtensionRequestService} from "../../../../../core/services/quality/extension-request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";
import {DateProvider} from "../../../../../core/providers/date.provider";
import {FileViewerProvider} from "../../../../../core/providers/file-viewer.provider";

@Component({
    selector: 'app-extension-request-admin-view-component',
    templateUrl: './view.component.html',
})
export class ExtensionRequestAdminViewComponent implements OnInit{

    id;
    extension;

    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        private extensionService: QualityExtensionRequestService,
        private router: Router,
        private route: ActivatedRoute,
        public dateProvider: DateProvider,
        public redirect: RedirectProvider,
        public fileViewerProvider: FileViewerProvider
    ) {

    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.extensionService.get(this.id).subscribe(extension => {
            this.extension = extension;
            this.loading = false;
        });
    }

    approve(){
        this.extensionService.approve(this.extension.id).subscribe( extension => {
            this.load();
        });
    }

    deny(){
        this.extensionService.deny(this.extension.id).subscribe( extension => {
            this.load();
        });
    }


}