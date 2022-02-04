import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QualityExensionRequestService} from "../../../../core/services/quality/exension-request.service";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs";
import {HotelService} from "../../../../core/services/hotel.service";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";
import {FileViewerProvider} from "../../../../core/providers/file-viewer.provider";
import {FileItem, FileUploader} from "ng2-file-upload";
import {environment} from "../../../../../environments/environment";
import {AuthProvider} from "../../../../core/providers/auth.provider";

@Component({
    selector: 'app-exension-request-public-form',
    templateUrl: './form.component.html'
})
export class ExensionFormComponent implements OnInit {

    id;
    exension;
    form: FormGroup;
    hotels;

    document_file_uploader: FileUploader;

    uploads_length = 0;
    uploads_finished = 0;

    loading = false;
    loading2 = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                private exensionRequestService: QualityExensionRequestService,
                public translate: TranslateService,
                private hotelService: HotelService,
                private auth: AuthProvider,
                public fileViewerProvider: FileViewerProvider,
                public redirect: RedirectProvider,) {

        this.buildForm();
        this.buildUploaders();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        this.loading2 = true;
        this.hotelService.all({}).subscribe( hotels => {
            this.hotels = hotels;
            this.loading2 = false;
        });

        this.load();
    }

    load() {
        if (this.id) {
            this.loading = true;
            this.exensionRequestService.get(this.id).subscribe(exension => {
                this.exension = exension;
                this.form.patchValue(exension);
                this.loading = false;
            });
        }
    }

    save() {
        this.loading = true;
        this.exensionRequestService.save(this.form.value).subscribe(exension => {
            this.exension = exension;

            this.uploads_length = 0;
            if(this.document_file_uploader.queue.length){
                this.uploads_length++;
            }

            if(this.uploads_length){
                this.runUploaders();
            }else{
                if(!this.id){
                    this.messageProvider.show('RECORD_ADDED');
                    this.redirect.toEditForm(this.exension.id, this.route);
                    this.loading = false;
                }else{
                    this.messageProvider.show('RECORD_UPDATED');
                    this.uploads_finished = 0;
                    this.load();
                }
            }
        }, error => {this.loading = false});

    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            hotel_id: ['', Validators.required],
            policy: ['', Validators.required],
            application_reasoning: ['', Validators.required],
            guests_collateral_damage: ['', Validators.required],

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
            let id = this.exension.id;
            let type = 'quality-exension-request';
            let input_id = 'document_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.document_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.document_file_uploader.uploadAll();
    }

    afterUpload(){
        if(this.uploads_finished >= this.uploads_length){
            if(!this.id){
                this.messageProvider.show('RECORD_ADDED');
                this.redirect.toEditForm(this.exension.id, this.route);
                this.loading = false;
            }else{
                this.messageProvider.show('RECORD_UPDATED');
                this.uploads_finished = 0;
                this.load();
            }
        }
    }
}
