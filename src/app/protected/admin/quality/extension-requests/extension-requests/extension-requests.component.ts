import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { QualityExtensionRequestService } from '../../../../../core/services/quality/extension-request.service';
import { ExtensionRequestsDatabase } from './extension-requests.database';
import { ExtensionRequestsDataSource } from './extension-requests.datasource';
import { MessageProvider } from "../../../../../core/providers/message.provider";
import { TranslateService } from "@ngx-translate/core";
import { DialogConfirmComponent } from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {DateProvider} from "../../../../../core/providers/date.provider";

@Component({
    selector: 'app-extension-requests',
    templateUrl: './extension-requests.component.html',
})
export class ExtensionRequestsComponent implements OnInit {

    public _dataSource: ExtensionRequestsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: ExtensionRequestsDatabase,
                public auth: AuthProvider,
                public dialog: MatDialog,
                private qualityVisitServices: QualityExtensionRequestService,
                private messageProvider: MessageProvider,
                public dateProvider: DateProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'hotel', 'extension_date', 'is_verified', 'owner', 'created_at', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new ExtensionRequestsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(visit){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: visit.name
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.qualityVisitServices.delete(visit.id).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
