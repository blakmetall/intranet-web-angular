import { Component, OnInit} from '@angular/core';
import {QualityExensionRequestService} from "../../../../core/services/quality/exension-request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";
import {DateProvider} from "../../../../core/providers/date.provider";
import {FileViewerProvider} from "../../../../core/providers/file-viewer.provider";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";
import {MatDialog} from "@angular/material";
import {AuthProvider} from "../../../../core/providers/auth.provider";

@Component({
    selector: 'app-exension-request-public-view-component',
    templateUrl: './view.component.html',
})
export class ExensionRequestPublicViewComponent implements OnInit{

    id;
    exension;
    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        private exensionRequestService: QualityExensionRequestService,
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        public auth: AuthProvider,
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
        this.exensionRequestService.get(this.id).subscribe((exension) => {
            this.exension = exension;
            this.loading = false;
        });
    }

    delete(exension){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {msg: 'DELETE_RECORD'}
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.exensionRequestService.delete(exension.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this.router.navigate(['/quality/exension-requests']);
                });
            }
        });
    }
}