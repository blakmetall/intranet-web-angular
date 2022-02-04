import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {forkJoin} from "rxjs/index";

import { QualityAssuranceVisitService} from "../../../../../core/services/quality/assurance-visit.service";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {HotelService} from "../../../../../core/services/hotel.service";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {FileItem, FileUploader} from "ng2-file-upload";
import {environment} from "../../../../../../environments/environment";
import {FileViewerProvider} from "../../../../../core/providers/file-viewer.provider";

@Component({
    selector: 'app-assurance-visit-form',
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
export class VisitsFormComponent implements OnInit {

    id;
    form: FormGroup;
    assurance_visit;

    statusList;
    hotels;

    notification_file_uploader: FileUploader;
    report_file_uploader: FileUploader;

    uploads_length = 0;
    uploads_finished = 0;

    loading = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private auth: AuthProvider,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                private companyService: QualityAssuranceVisitService,
                public translate: TranslateService,
                private hotelService : HotelService,
                public redirect: RedirectProvider,
                public fileViewerProvider: FileViewerProvider,
                private qualityVisitService : QualityAssuranceVisitService) {

        this.buildForm();
        this.buildUploaders();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        let loader = [];

        loader.push( this.hotelService.all({}) );
        loader.push( this.qualityVisitService.getStatus({}) );

        if(this.id){
            loader.push(this.qualityVisitService.get(this.id) );
        }

        forkJoin(loader).subscribe(
            ([hotels, status, visit]) => {
                this.hotels = hotels;
                this.statusList = status;

                if(visit){
                    // start date and time (with user timezone swap)
                    let datetime = moment.utc(visit.datetime, 'YYYY-MM-DD HH:mm:ss');
                    datetime.tz(this.auth.getTimezone());
                    visit.date = datetime.format('YYYY-MM-DD');
                    visit.time = datetime.format('HH:mm');

                    this.assurance_visit = visit;
                    this.form.patchValue(visit);
                }

                this.loading = false;
            }
        );
    }

    save() {
        this.loading = true;
        this.companyService.save(this.form.value).subscribe(assurance_visit => {
            this.assurance_visit = assurance_visit;

            this.uploads_length = 0;
            if(this.notification_file_uploader.queue.length){
                this.uploads_length++;
            }
            if(this.report_file_uploader.queue.length){
                this.uploads_length++;
            }

            if(this.uploads_length){
                this.runUploaders();
            }else{
                let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
                this.messageProvider.show(message);
                if(!this.id){
                    this.redirect.toEditForm(this.assurance_visit.id, this.route);
                }

                this.loading = false;
            }
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            hotel_id: ['', Validators.required],
            quality_assurance_visit_category_id: ['', Validators.required],
            revision_number: ['', Validators.required],
            score: [''],
            date: ['', Validators.required],
            time: ['', Validators.required],
        });
    }

    buildUploaders(){
        this.notification_file_uploader = new FileUploader({});
        this.notification_file_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };

        this.report_file_uploader = new FileUploader({});
        this.report_file_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };
    }

    runUploaders(){
        // logo
        this.notification_file_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.assurance_visit.id;
            let type = 'quality-assurance-visit';
            let input_id = 'notification_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.notification_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.notification_file_uploader.uploadAll();

        // presentation file image
        this.report_file_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.assurance_visit.id;
            let type = 'quality-assurance-visit';
            let input_id = 'report_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.report_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.report_file_uploader.uploadAll();
    }

    afterUpload(){
        if(this.uploads_finished >= this.uploads_length){
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);
            if(!this.id){
                this.redirect.toEditForm(this.assurance_visit.id, this.route);
                this.loading = false;
            }else{
                this.uploads_finished = 0;
                this.load();
            }
        }
    }


}
