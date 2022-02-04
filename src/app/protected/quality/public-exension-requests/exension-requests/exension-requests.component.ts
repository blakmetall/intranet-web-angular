import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { QualityExensionRequestService } from "../../../../core/services/quality/exension-request.service";
import { PublicExensionRequestDatabase } from "./exension-requests.database";
import { PublicExensionRequestDatasource } from "./exension-requests.datasource";

import { MessageProvider } from "../../../../core/providers/message.provider";
import { TranslateService } from "@ngx-translate/core";
import { DialogConfirmComponent } from "../../../../core/components/dialog-confirm/dialog.confirm";
import {AuthProvider} from "../../../../core/providers/auth.provider";
import {DateProvider} from "../../../../core/providers/date.provider";

@Component({
    selector: 'app-exension-requests-public',
    templateUrl: './exension-requests.component.html',
})
export class ExensionRequestsPublicComponent implements OnInit {

    public _dataSource: PublicExensionRequestDatasource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: PublicExensionRequestDatabase,
                public dialog: MatDialog,
                public auth: AuthProvider,
                public dateProvider: DateProvider,
                private ExensionRequestService: QualityExensionRequestService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'hotel', 'is_verified', 'owner', 'created_at', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new PublicExensionRequestDatasource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(visit) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: visit.name
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.ExensionRequestService.delete(visit.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

}
