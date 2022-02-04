import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { QualityAssuranceVisitService } from '../../../../../core/services/quality/assurance-visit.service';
import { AssuranceVisitsDatabase } from './assurance-visits.database';
import { VisitsDatasource } from './assurance-visits.datasource';
import { MessageProvider } from "../../../../../core/providers/message.provider";
import { TranslateService } from "@ngx-translate/core";
import { DialogConfirmComponent } from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {DateProvider} from "../../../../../core/providers/date.provider";

@Component({
    selector: 'app-assurance-visits-admin',
    templateUrl: './assurance-visits.component.html',
})
export class AssuranceVisitsComponent implements OnInit {

    public _dataSource: VisitsDatasource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: AssuranceVisitsDatabase,
                public dialog: MatDialog,
                private qualityVisitServices: QualityAssuranceVisitService,
                private messageProvider: MessageProvider,
                public dateProvider: DateProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'hotel', 'datetime', 'status', 'owner', 'created_at', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new VisitsDatasource(this._db, this.paginator, this.sort, this.filter);
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
