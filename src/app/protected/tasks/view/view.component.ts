import { Component, OnInit} from '@angular/core';
import {TaskService} from "../../../core/services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../core/providers/message.provider";
import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {MatDialog} from "@angular/material";
import {DateProvider} from "../../../core/providers/date.provider";

@Component({
    selector: 'app-task-view-component',
    templateUrl: './view.component.html',
})
export class TaskViewComponent implements OnInit{

    id;
    task;

    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        public dialog: MatDialog,
        private taskService: TaskService,
        private router: Router,
        private route: ActivatedRoute,
        public dateProvider: DateProvider
    ) {}

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.taskService.get(this.id).subscribe(
            (task) => {
                this.task = task;
                this.loading = false;
            },
            (error) => {
                this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                this.router.navigate([ '/tasks' ]);
            }
        );
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
                    this.router.navigate(['/tasks']);
                });
            }
        });
    }
}