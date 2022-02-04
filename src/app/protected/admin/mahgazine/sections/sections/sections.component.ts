import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MahgazineSectionsDatabase } from './sections.database';
import { MahgazineSectionsDataSource } from './sections.datasource';
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {DateProvider} from "../../../../../core/providers/date.provider";
import {MahgazineSectionService} from "../../../../../core/services/mahgazine-section.service";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {MahgazineEditionService} from "../../../../../core/services/mahgazine-edition.service";

@Component({
    selector: 'app-admin-mahgazine-sections',
    templateUrl: './sections.component.html',
})
export class MahgazineSectionsComponent implements OnInit {

    public edition_id;
    public edition;

    public _dataSource: MahgazineSectionsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private authProvider: AuthProvider,
                public _db: MahgazineSectionsDatabase,
                public dialog: MatDialog,
                public route: ActivatedRoute,
                public dateProvider: DateProvider,
                private mahgazineSectionService: MahgazineSectionService,
                private mahgazineEditionService: MahgazineEditionService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'name', 'color', 'order', 'created_at', 'actions'];
    }

    ngOnInit() {
        this.edition_id = this.route.snapshot.paramMap.get('edition_id');
        this._db.setEdition( this.edition_id );

        if(this.edition_id){
            this.mahgazineEditionService.get(this.edition_id).subscribe( edition => {
                this.edition = edition;
            });
        }

        this._dataSource = new MahgazineSectionsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(section, forceDelete){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: section.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.mahgazineSectionService.delete(section.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(section){
        this.mahgazineSectionService.restore(section.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }

    orderUp(id){
        this.mahgazineSectionService.orderUp(id).subscribe( () => {
            this._db.build();
        });
    }

    orderDown(id){
        this.mahgazineSectionService.orderDown(id).subscribe( () => {
            this._db.build();
        });
    }
}
