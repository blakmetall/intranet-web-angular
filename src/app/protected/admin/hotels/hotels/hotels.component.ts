import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HotelService } from '../../../../core/services/hotel.service';
import { HotelsDatabase } from './hotels.database';
import { HotelsDataSource } from './hotels.datasource';
import { MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";
import {AuthProvider} from "../../../../core/providers/auth.provider";

@Component({
    selector: 'app-admin-hotels',
    templateUrl: './hotels.component.html',
})
export class HotelsComponent implements OnInit {

    public _dataSource: HotelsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private authProvider: AuthProvider,
                public _db: HotelsDatabase,
                public dialog: MatDialog,
                private hotelService: HotelService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['is_enabled', 'name', 'phone', 'website', 'order', 'id'];
    }

    ngOnInit() {
        this._dataSource = new HotelsDataSource(this._db, this.paginator, this.sort, this.filter);
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
                this.hotelService.delete(hotel.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(hotel){
        this.hotelService.restore(hotel.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }

    orderUp(id){
        this.hotelService.orderUp(id).subscribe( () => {
            this._db.build();
        });
    }

    orderDown(id){
        this.hotelService.orderDown(id).subscribe( () => {
            this._db.build();
        });
    }
}
