import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {DragulaService} from "ng2-dragula";
import {MatDialog} from "@angular/material";

import {TaskService} from '../../../core/services/task.service';
import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {MessageProvider} from "../../../core/providers/message.provider";
import {SessionService} from "../../../core/services/session.service";
import {AuthProvider} from "../../../core/providers/auth.provider";
import {TASKS_STATUSES} from "../../../core/constants/tasks.statuses";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    tasks: any[] = [];
    columns: any[];
    currentUser;
    subscriptions = new Subscription();

    loading = false;

    constructor( private taskService:  TaskService,
                 public dialog: MatDialog,
                 private messageProvider: MessageProvider,
                 private router: Router,
                 private sessionServices: SessionService,
                 private authProvider: AuthProvider,
                 private dragulaService: DragulaService
    ) {

        this.columns = TASKS_STATUSES;
        this.dragulaService.drop.subscribe(([name, el, target, source, sibling]) => {
            this.loading = true;
            this.taskService.changeStatus(el.dataset.id, target.dataset.status).subscribe( task =>  {
                this.load();
            });
        });
    }

    ngOnInit() {
        this.currentUser = this.authProvider.getUser();
        this.load();
    }

    load(){
        const req = {
            filterByLoggedUser: 1
        };
        this.taskService.all(req).forEach((tasks) => {
            this.tasks = tasks;
            this.loading = false;
        });
    }

    archive(task){
        this.taskService.archive(task.id).subscribe( task => {
            this.ngOnInit();
        });
    }

    delete(task){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                msg: 'DELETE_TASK'
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.taskService.delete(task.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this.ngOnInit();
                });
            }
        });
    }

}