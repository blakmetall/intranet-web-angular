import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import {HotelService} from "../../../../../core/services/hotel.service";
import { BrandsiteContentsDatabase } from './contents.database';
import { BrandsiteContentsDataSource } from './contents.datasource';
import { MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";

import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {BrandsiteSectionProvider} from "../../../../../core/providers/brandsite-section.provider";

@Component({
    selector: 'app-admin-brandsite-contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.scss']
})
export class BrandsiteContentsComponent implements OnInit {

    public _dataSource: BrandsiteContentsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: BrandsiteContentsDatabase,
                public dialog: MatDialog,
                private HotelService: HotelService,
                private messageProvider: MessageProvider,
                public brandsiteSectionProvider: BrandsiteSectionProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['logo', 'name', 'id'];
    }

    ngOnInit() {
        this._dataSource = new BrandsiteContentsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(hotel, forceDelete){

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: hotel.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.HotelService.delete(hotel.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(hotel){
        this.HotelService.restore(hotel.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }
}
