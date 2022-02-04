import {Component, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatDialog} from '@angular/material';

import {EventCategoryService} from '../../../../core/services/event.category.service';
import {EventsCategoriesDatabase} from './categories.database';
import {EventsCategoriesDataSource} from './categories.datasource';

import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
})

export class EventsCategoriesComponent {

    public _dataSource: EventsCategoriesDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: EventsCategoriesDatabase,
                public dialog: MatDialog,
                private categoryService: EventCategoryService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['name', 'color', 'id'];
    }

    ngOnInit() {
        this._dataSource = new EventsCategoriesDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(category) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: { msg: 'DELETE_CATEGORY' }
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.categoryService.delete(category.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
