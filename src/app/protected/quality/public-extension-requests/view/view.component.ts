import { Component, OnInit} from '@angular/core';
import {QualityExtensionRequestService} from "../../../../core/services/quality/extension-request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";
import {DateProvider} from "../../../../core/providers/date.provider";
import {FileViewerProvider} from "../../../../core/providers/file-viewer.provider";
import {MatDialog} from "@angular/material";
import {AuthProvider} from "../../../../core/providers/auth.provider";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";

@Component({
    selector: 'app-extension-request-public-view-component',
    templateUrl: './view.component.html',
})
export class ExtensionRequestPublicViewComponent implements OnInit{

    id;
    extension;
    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        private extensionService: QualityExtensionRequestService,
        private router: Router,
        private dialog: MatDialog,
        public auth: AuthProvider,
        private route: ActivatedRoute,
        public dateProvider: DateProvider,
        public redirect: RedirectProvider,
        public fileViewerProvider: FileViewerProvider,
    ) {}

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

    delete(extension){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {msg: 'DELETE_RECORD'}
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.extensionService.delete(extension.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this.router.navigate(['/quality/extension-requests']);
                });
            }
        });
    }
}