import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MahgazineArticlesDatabase } from './articles.database';
import { MahgazineArticlesDataSource } from './articles.datasource';
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {DateProvider} from "../../../../../core/providers/date.provider";
import {MahgazineSectionService} from "../../../../../core/services/mahgazine-section.service";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {MahgazineEditionService} from "../../../../../core/services/mahgazine-edition.service";
import {MahgazineArticleService} from "../../../../../core/services/mahgazine-article.service";

@Component({
    selector: 'app-admin-mahgazine-sections',
    templateUrl: './articles.component.html',
})
export class MahgazineArticlesComponent implements OnInit {

    public edition_id;
    public edition;

    public section_id;
    public section;

    public _dataSource: MahgazineArticlesDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private authProvider: AuthProvider,
                public _db: MahgazineArticlesDatabase,
                public dialog: MatDialog,
                public route: ActivatedRoute,
                public dateProvider: DateProvider,
                private mahgazineSectionService: MahgazineSectionService,
                private mahgazineEditionService: MahgazineEditionService,
                private mahgazineArticleService: MahgazineArticleService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'name', 'order', 'created_at', 'actions'];
    }

    ngOnInit() {
        this.edition_id = this.route.snapshot.paramMap.get('edition_id');
        this.section_id = this.route.snapshot.paramMap.get('section_id');
        this._db.setEditionSection( this.section_id );

        if(this.edition_id){
            this.mahgazineEditionService.get(this.edition_id).subscribe( edition => {
                this.edition = edition;
            });
        }

        if(this.section_id){
            this.mahgazineSectionService.get(this.section_id).subscribe( section => {
                this.section = section;
            });
        }

        this._dataSource = new MahgazineArticlesDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(article, forceDelete){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: article.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.mahgazineArticleService.delete(article.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(article){
        this.mahgazineArticleService.restore(article.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }

    orderUp(id){
        this.mahgazineArticleService.orderUp(id).subscribe( () => {
            this._db.build();
        });
    }

    orderDown(id){
        this.mahgazineArticleService.orderDown(id).subscribe( () => {
            this._db.build();
        });
    }

}
