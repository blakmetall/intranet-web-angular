import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {QualityAssuranceVisitService} from "../../../../../core/services/quality/assurance-visit.service";
import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {MatDialog} from "@angular/material";
import {DateProvider} from "../../../../../core/providers/date.provider";
import {FileViewerProvider} from "../../../../../core/providers/file-viewer.provider";

@Component({
    selector: 'app-assurance-visit-admin-view-component',
    templateUrl: './view.component.html',
})
export class AssuranceVisitAdminViewComponent implements OnInit{

    id;
    visit;
    owner;

    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        private assuranceVisitService: QualityAssuranceVisitService,
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        public dateProvider: DateProvider,
        public fileViewerProvider: FileViewerProvider
    ) {

    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.assuranceVisitService.get(this.id).subscribe((visit) => {
            this.visit = visit;
            this.loading = false;
        });
    }

    delete(visit) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {msg: 'DELETE_RECORD'}
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.assuranceVisitService.delete(visit.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this.router.navigate(['/admin/quality/assurance-visits']);
                });
            }
        });
    }
}