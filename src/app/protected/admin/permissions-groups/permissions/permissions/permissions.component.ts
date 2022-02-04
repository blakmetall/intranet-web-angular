import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { PermissionService } from '../../../../../core/services/permission.service';
import { PermissionsDatabase } from './permissions.database';
import { PermissionsDataSource } from './permissions.datasource';
import { MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../../core/components/dialog-confirm/dialog.confirm";
import {ActivatedRoute} from "@angular/router";
import {PermissionsGroupService} from "../../../../../core/services/permissions.group.service";

@Component({
    selector: 'app-admin-permissions-groups-permission',
    templateUrl: './permissions.component.html',
})
export class PermissionsComponent implements OnInit {

    public _dataSource: PermissionsDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;


    permissionGroup = '';
    permissionGroupID = '';

    constructor(public _db: PermissionsDatabase,
                public dialog: MatDialog,
                private route: ActivatedRoute,
                private permissionService: PermissionService,
                private permissionsGroupService: PermissionsGroupService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['name', 'slug', 'id'];
    }

    ngOnInit() {
        this.permissionGroupID = this.route.snapshot.paramMap.get('permission_group_id');
        this._dataSource = new PermissionsDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.user_permissions_group_id = this.permissionGroupID; // permission group id
        this._db.build();

        this.permissionsGroupService.get(this.permissionGroupID).subscribe( (permissionGroup) => {
            this.permissionGroup = permissionGroup;
        })
    }

    delete(permission){

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: { name: permission.name }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.permissionService.delete(permission.id).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
