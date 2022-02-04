import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {forkJoin} from "rxjs/index";

import { QualityAssuranceVisitService} from "../../../../core/services/quality/assurance-visit.service";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {AuthProvider} from "../../../../core/providers/auth.provider";
import {QualityExtensionRequestService} from "../../../../core/services/quality/extension-request.service";
import {FileItem, FileUploader} from "ng2-file-upload";
import {FileViewerProvider} from "../../../../core/providers/file-viewer.provider";
import {environment} from "../../../../../environments/environment";
import {DateProvider} from "../../../../core/providers/date.provider";

@Component({
    selector: 'app-assurance-visit-extension-request-form2',
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
export class ExtensionRequestPublicFormComponent2 implements OnInit {

    id;
    form: FormGroup;

    assurance_visit : any;
    extension_request : any;

    document_file_uploader: FileUploader;

    uploads_length = 0;
    uploads_finished = 0;

    loading = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public auth: AuthProvider,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public translate: TranslateService,
                public redirect: RedirectProvider,
                public dateProvider: DateProvider,
                private qualityExtensionRequestService: QualityExtensionRequestService,
                private qualityAssuranceVisitService : QualityAssuranceVisitService,
                public fileViewerProvider: FileViewerProvider,
    ) {

        this.buildForm();
        this.buildUploaders();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.qualityExtensionRequestService.get(this.id).subscribe( extension_request => {
            if(!extension_request){
                this.router.navigate(['/quality/extension-requests']);
            }

            // start date and time (with user timezone swap)
            let datetime = moment.utc(extension_request.extension_date, 'YYYY-MM-DD HH:mm:ss');
            datetime.tz(this.auth.getTimezone());
            extension_request.date = datetime.format('YYYY-MM-DD');
            extension_request.time = datetime.format('HH:mm');


            this.extension_request = extension_request;
            this.assurance_visit = extension_request.assuranceVisit;
            this.form.patchValue(this.extension_request);

            this.loading = false;
        }, error => {this.loading = false});
    }

    save() {
        this.loading = true;
        this.qualityExtensionRequestService.edit(this.form.value).subscribe( (extension_request) => {
            this.extension_request = extension_request;

            this.uploads_length = 0;
            if(this.document_file_uploader.queue.length){
                this.uploads_length++;
            }

            if(this.uploads_length){
                this.runUploaders();
            }else{
                this.messageProvider.show('RECORD_UPDATED');
                if(!this.id){
                    this.redirect.toEditForm(this.extension_request.id, this.route);
                }
                this.loading = false;
            }
        });
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            date: ['', Validators.required],
            time: ['', Validators.required],
            application_reasoning: ['', Validators.required],
            guests_collateral_damage: ['', Validators.required],
            policy: ['', Validators.required],
        });
    }

    buildUploaders(){
        this.document_file_uploader = new FileUploader({});
        this.document_file_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };
    }

    runUploaders(){
        // document
        this.document_file_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.extension_request.id;
            let type = 'quality-extension-request';
            let input_id = 'document_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.document_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.document_file_uploader.uploadAll();
    }

    afterUpload(){
        if(this.uploads_finished >= this.uploads_length){
            this.messageProvider.show('RECORD_UPDATED');
            if(!this.id){
                this.redirect.toEditForm(this.extension_request.id, this.route);
                this.loading = false;
            }else{
                this.uploads_finished = 0;
                this.load();
            }
        }
    }

}
