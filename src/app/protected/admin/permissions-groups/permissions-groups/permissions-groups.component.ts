import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { PermissionsGroupService } from '../../../../core/services/permissions.group.service';
import { PermissionsGroupsDatabase } from './permissions-groups.database';
import { PermissionsGroupsDataSource } from './permissions-groups.datasource';
import { MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";

@Component({
    selector: 'app-admin-companies',
    templateUrl: './permissions-groups.component.html',
})
export class PermissionsGroupsComponent implements OnInit {

    public _dataSource: PermissionsGroupsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: PermissionsGroupsDatabase,
                public dialog: MatDialog,
                private PermissionsGroupService: PermissionsGroupService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['name', 'permissions', 'is_administrative_group', 'id'];
    }

    ngOnInit() {
        this._dataSource = new PermissionsGroupsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(permissionGroup, forceDelete){

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: permissionGroup.name,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.PermissionsGroupService.delete(permissionGroup.id).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
