import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { CompanyService } from '../../../../core/services/company.service';
import { CompaniesDatabase } from './companies.database';
import { CompaniesDataSource } from './companies.datasource';
import { MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";

@Component({
    selector: 'app-admin-companies',
    templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit {

    public _dataSource: CompaniesDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: CompaniesDatabase,
                public dialog: MatDialog,
                private CompanyService: CompanyService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['name', 'email', 'phone', 'id'];
    }

    ngOnInit() {
        this._dataSource = new CompaniesDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(company, forceDelete){

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: company.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.CompanyService.delete(company.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(company){
        this.CompanyService.restore(company.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }
}
