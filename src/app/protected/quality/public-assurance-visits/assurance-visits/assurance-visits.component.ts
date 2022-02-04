import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { AssuranceVisitsPublicDatabase } from "./assurance-visits.database";
import { AssuranceVisitsPublicDatasource } from "./assurance-visits.datasource";
import { TranslateService } from "@ngx-translate/core";
import {DateProvider} from "../../../../core/providers/date.provider";

@Component({
    selector: 'app-assurance-visits-public',
    templateUrl: './assurance-visits.component.html',
})
export class AssuranceVisitsPublicComponent implements OnInit {

    public _dataSource: AssuranceVisitsPublicDatasource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: AssuranceVisitsPublicDatabase,
                public dialog: MatDialog,
                public dateProvider: DateProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'hotel', 'datetime', 'status', 'owner', 'created_at', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new AssuranceVisitsPublicDatasource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }
}
