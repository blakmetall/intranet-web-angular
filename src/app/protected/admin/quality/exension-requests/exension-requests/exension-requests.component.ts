import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatDialog} from '@angular/material';

import {QualityExensionRequestService} from '../../../../../core/services/quality/exension-request.service';
import {ExensionRequestsDatabase} from './exension-requests.database';
import {ExensionRequestsDataSource} from './exension-requests.datasource';

import {MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {DateProvider} from "../../../../../core/providers/date.provider";

@Component({
    selector: 'app-exension-requests-admin',
    templateUrl: './exension-requests.component.html',
})
export class ExensionRequestsComponent implements OnInit {

    public _dataSource: ExensionRequestsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: ExensionRequestsDatabase,
                public dialog: MatDialog,
                private exensionRequestService: QualityExensionRequestService,
                private messageProvider: MessageProvider,
                public dateProvider: DateProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'hotel', 'is_verified', 'owner', 'created_at', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new ExensionRequestsDataSource(this._db, this.paginator, this.sort, this.filter);
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
                this.exensionRequestService.delete(visit.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
