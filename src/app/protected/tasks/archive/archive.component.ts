import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';

import {TasksArchiveDatabase} from './archive.database';
import {TasksArchiveDataSource} from './archive.datasource';
import {MessageProvider} from "../../../core/providers/message.provider";

import {TranslateService} from "@ngx-translate/core";
import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {TaskService} from "../../../core/services/task.service";
import {Router} from "@angular/router";
import {AuthProvider} from "../../../core/providers/auth.provider";
import {SessionService} from "../../../core/services/session.service";

@Component({
    selector: 'app-task-archive',
    templateUrl: './archive.component.html',
})
export class TasksArchiveComponent implements OnInit {

    public _dataSource: TasksArchiveDataSource | null;
    public displayedColumns: any[];
    session_data;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(public _db: TasksArchiveDatabase,
                private dialog: MatDialog,
                private router: Router,
                private taskServices: TaskService,
                private messageProvider: MessageProvider,
                private authProvider: AuthProvider,
                private sessionService: SessionService,
                public translate: TranslateService) {
        this.displayedColumns = ['id', 'name', 'start_date', 'end_date', 'user_owner', 'user_assigned', 'actions'];
    }



    ngOnInit() {
        this.session_data = this.authProvider.getUser();
        this._dataSource = new TasksArchiveDataSource(this._db, this.paginator, this.sort, this.filter);
        this._db.build();

    }

    delete(task) {

        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                msg: 'DELETE_TASK'
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.taskServices.delete(task.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this._db.build();
                });
            }
        });
    }
}
