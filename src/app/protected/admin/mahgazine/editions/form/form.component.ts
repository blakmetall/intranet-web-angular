import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";
import {FileItem, FileUploader} from "ng2-file-upload";
import {environment} from "../../../../../../environments/environment";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {FileViewerProvider} from "../../../../../core/providers/file-viewer.provider";
import {MahgazineEditionService} from "../../../../../core/services/mahgazine-edition.service";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MomentDateAdapter} from "@angular/material-moment-adapter";

@Component({
    selector: 'app-admin-mahgazine-edition-form',
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
export class MahgazineEditionFormComponent implements OnInit {

    id;
    edition;
    form: FormGroup;

    cover_file_uploader: FileUploader;

    uploads_length = 0;
    uploads_finished = 0;

    loading = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private mahgazineEditionService: MahgazineEditionService,
                private auth: AuthProvider,
                public fileViewerProvider: FileViewerProvider,
                public translate: TranslateService) {
        this.buildForm();
        this.buildUploaders();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        if(this.id){
            this.loading = true;
            this.mahgazineEditionService.get(this.id).subscribe(
                (edition) => {
                    if(this.id && edition){
                        this.edition = edition;

                        // start date and time (with user timezone swap)
                        let start_datetime = moment.utc(edition.start_datetime, 'YYYY-MM-DD HH:mm:ss');
                        start_datetime.tz(this.auth.getTimezone());
                        this.edition.start_date = start_datetime.format('YYYY-MM-DD');
                        this.edition.start_time = start_datetime.format('HH:mm');

                        // end date and time (with user timezone swap)
                        let end_datetime = moment.utc(edition.end_datetime, 'YYYY-MM-DD HH:mm:ss');
                        end_datetime.tz(this.auth.getTimezone());
                        this.edition.end_date = end_datetime.format('YYYY-MM-DD');
                        this.edition.end_time = end_datetime.format('HH:mm');

                        this.form.patchValue(this.edition);
                    }

                    this.loading = false;
                },
                (error) => {
                    this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                    this.redirect.toListing(this.id, this.route);
                }
            );
        }
    }

    save() {
        this.loading = true;
        this.mahgazineEditionService.save(this.form.value).subscribe(edition => {
            this.edition = edition;

            this.uploads_length = 0;
            if(this.cover_file_uploader.queue.length){
                this.uploads_length++;
            }

            if(this.uploads_length){
                this.runUploaders();
            }else{
                let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
                this.messageProvider.show(message);
                if(!this.id){
                    this.redirect.toEditForm(this.edition.id, this.route);
                }
                this.loading = false;
            }
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],

            start_date: ['', Validators.required],
            start_time: ['', Validators.required],

            end_date: ['', Validators.required],
            end_time: ['', Validators.required],

            is_published: [''],
            //is_finished: [''],
        });
    }

    buildUploaders(){
        this.cover_file_uploader = new FileUploader({});
        this.cover_file_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };
    }

    runUploaders(){
        // presentation file image
        this.cover_file_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.edition.id;
            let type = 'mahgazine-edition';
            let input_id = 'cover_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.cover_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.cover_file_uploader.uploadAll();
    }

    afterUpload(){
        if(this.uploads_finished >= this.uploads_length){
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            if(!this.id){
                this.redirect.toEditForm(this.edition.id, this.route);
                this.loading = false;
            }else{
                this.uploads_finished = 0;
                this.load();
            }
        }
    }
}
