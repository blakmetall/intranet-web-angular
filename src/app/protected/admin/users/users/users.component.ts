import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from '../../../../core/services/user.service';
import { UsersDatabase } from './users.database';
import { UsersDataSource } from './users.datasource';
import { MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../../core/components/dialog-confirm/dialog.confirm";
import {AuthProvider} from "../../../../core/providers/auth.provider";

@Component({
    selector: 'app-admin-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

    public _dataSource: UsersDataSource | null;
    public displayedColumns: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: UsersDatabase,
                public dialog: MatDialog,
                public auth: AuthProvider,
                private userService: UserService,
                private messageProvider: MessageProvider,
                public translate: TranslateService) {
        this.displayedColumns = ['is_enabled', 'name', 'email', 'role', 'id'];
    }

    ngOnInit() {
        this._dataSource = new UsersDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();
    }

    delete(user, forceDelete){

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                name: user.email,
                forceDelete: forceDelete,
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if(success){
                this.userService.delete(user.id, forceDelete).subscribe(()=>{
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }

    restore(user){
        this.userService.restore(user.id).subscribe(()=>{
            this.messageProvider.show('RECORD_RESTORED');
            this._db.build();
        })
    }
}
