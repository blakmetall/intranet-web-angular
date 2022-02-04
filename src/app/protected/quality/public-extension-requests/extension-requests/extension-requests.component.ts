import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatDialog} from '@angular/material';

import {QualityExtensionRequestService} from "../../../../core/services/quality/extension-request.service";
import {ExtensionRequestsDatabase} from "./extension-requests.database";
import {ExtensionRequestsDatasource} from "./extension-requests.datasource";

import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";
import {DateProvider} from "../../../../core/providers/date.provider";
import {AuthProvider} from "../../../../core/providers/auth.provider";

@Component({
    selector: 'app-extension-requests-public',
    templateUrl: './extension-requests.component.html',
})
export class ExtensionRequestPublicComponent implements OnInit {

    public _dataSource: ExtensionRequestsDatasource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: ExtensionRequestsDatabase,
                public dialog: MatDialog,
                public auth: AuthProvider,
                public dateProvider: DateProvider,
                private qualityExtensionRequestService: QualityExtensionRequestService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'hotel', 'extension_date', 'is_verified', 'owner', 'created_at', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new ExtensionRequestsDatasource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(extension) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {msg: 'DELETE_RECORD'}
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.qualityExtensionRequestService.delete(extension.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
