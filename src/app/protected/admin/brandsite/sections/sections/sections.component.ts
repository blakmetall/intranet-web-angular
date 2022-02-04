import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { BrandsiteSectionsDatabase } from './sections.database';
import { SectionsDataSource } from './sections.datasource';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-admin-brandsite-sections',
    templateUrl: './sections.component.html',
})
export class SectionsComponent implements OnInit {

    public _dataSource: SectionsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: BrandsiteSectionsDatabase,
                public dialog: MatDialog,
                public translate: TranslateService) {
        this.displayedColumns = ['name_es', 'features', 'id'];
    }

    ngOnInit() {
        this._dataSource = new SectionsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }
}
