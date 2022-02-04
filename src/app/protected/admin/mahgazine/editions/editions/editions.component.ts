import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MahgazineEditionsDatabase } from './editions.database';
import { MahgazineEditionsDataSource } from './editions.datasource';
import { MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {MahgazineEditionService} from "../../../../../core/services/mahgazine-edition.service";
import {DateProvider} from "../../../../../core/providers/date.provider";

@Component({
    selector: 'app-admin-mahgazine-editions',
    templateUrl: './editions.component.html',
})
export class MahgazineEditionsComponent implements OnInit {

    public _dataSource: MahgazineEditionsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private authProvider: AuthProvider,
                public _db: MahgazineEditionsDatabase,
                public dialog: MatDialog,
                public dateProvider: DateProvider,
                private MahgazineEditionService: MahgazineEditionService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'name', 'start_datetime', 'end_datetime', 'is_published', 'actions'];
    }

    ngOnInit() {
        this._dataSource = new MahgazineEditionsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(edition, forceDelete){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: edition.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.MahgazineEditionService.delete(edition.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(edition){
        this.MahgazineEditionService.restore(edition.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }
}
