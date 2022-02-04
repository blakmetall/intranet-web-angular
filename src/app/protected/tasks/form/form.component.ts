import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {forkJoin} from "rxjs/index";
import {TranslateService} from "@ngx-translate/core";
import {MessageProvider} from "../../../core/providers/message.provider";
import {TaskService} from "../../../core/services/task.service";
import {UserService} from "../../../core/services/user.service";
import {SessionService} from "../../../core/services/session.service";
import {AuthProvider} from "../../../core/providers/auth.provider";
import {RedirectProvider} from "../../../core/providers/redirect.provider";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MomentDateAdapter} from "@angular/material-moment-adapter";

@Component({
    selector: 'app-global-task-form',
    templateUrl: './form.component.html',
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'YYYY-MM-DD',
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            }
        },
    ],
})
export class TaskFormComponent implements OnInit {

    id;
    task;
    statusList;
    users;
    form: FormGroup;
    selected;
    role;

    loading = false;
    loading2 = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public route: ActivatedRoute,
        private messageProvider: MessageProvider,
        public redirect: RedirectProvider,
        private taskService: TaskService,
        public translate: TranslateService,
        private userService: UserService,
        private sessionService: SessionService,
        private authProvider: AuthProvider) {

        this.buildForm();
    }

    ngOnInit() {
        if(!this.selected){
            this.selected = this.authProvider.getUser();
        }
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
        this.getUsers()
    }

    getUsers(){
        this.loading2 = true;
        this.userService.getAssignableUsersForTask()
            // sort by name and lastname
            .map( data => {
                data.sort( (a, b) => {
                    return  (a.profile.full_name < b.profile.full_name) ? -1 : 1;
                });

                return data;
            }).subscribe( users => {
                this.users = users;
                this.loading2 = false;
             })
    }

    load(){
        this.loading = true;
        // on new task (assign automatically current user) | updated automatically on edit
        if(!this.id){
            this.form.get('assigned_user_id').patchValue( this.authProvider.user.id);
        }

        let loader = [];
        loader.push( this.taskService.getStatusList() );
        if(this.id){
            loader.push( this.taskService.get(this.id) );
        }

        forkJoin(loader).subscribe(
            ([statusList, task]) => {
                this.statusList = statusList;

                if(this.id && task){
                    this.task = task;

                    let start_date = moment( task.start_date );
                    this.task.start_date = start_date.toISOString();

                    if(task.end_date){
                        let end_date = moment( task.end_date );
                        this.task.end_date = end_date.toISOString();
                    }

                    this.form.patchValue(this.task);
                }

                this.loading = false;
            },
            error => {
                if(this.id){
                    this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                    this.redirect.toListing(this.id, this.route);
                }
            }
        );
    }

    save() {
        this.loading = true;
        this.taskService.save(this.form.value).subscribe(task => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            if(!this.id){
                this.redirect.toEditForm(task.id, this.route);
            }

            this.loading = false;
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            assigned_user_id:[''],
            task_status_id: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required], // Validators.required not working on textarea
            start_date: ['', Validators.required],
            end_date: [''],
            is_pinned_to_calendar: [''],
        });
    }
}
