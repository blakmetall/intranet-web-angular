import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { HotelService} from "../../../../core/services/hotel.service";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";
import {FileItem, FileUploader} from "ng2-file-upload";
import {environment} from "../../../../../environments/environment";
import {AuthProvider} from "../../../../core/providers/auth.provider";
import {FileViewerProvider} from "../../../../core/providers/file-viewer.provider";

@Component({
    selector: 'app-admin-hotels-form',
    templateUrl: './form.component.html',
})
export class HotelFormComponent implements OnInit {

    id;
    hotel;
    form: FormGroup;

    logo_uploader: FileUploader;
    presentation_file_uploader: FileUploader;

    uploads_length = 0;
    uploads_finished = 0;

    loading = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private HotelService: HotelService,
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
            this.HotelService.get(this.id).subscribe(
                (hotel) => {
                    if(this.id && hotel){
                        this.hotel = hotel;

                        if(!this.hotel.address){
                            this.hotel.address = {};
                        }

                        this.form.patchValue(this.hotel);
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
        this.HotelService.save(this.form.value).subscribe(hotel => {
            this.hotel = hotel;

            this.uploads_length = 0;
            if(this.logo_uploader.queue.length){
                this.uploads_length++;
            }
            if(this.presentation_file_uploader.queue.length){
                this.uploads_length++;
            }

            if(this.uploads_length){
                this.runUploaders();
            }else{
                let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
                this.messageProvider.show(message);
                if(!this.id){
                    this.redirect.toEditForm(this.hotel.id, this.route);
                }
                this.loading = false;
            }
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            stars: [1, Validators.required],
            is_enabled: [''],
            website: ['', CustomValidators.url],
            email: ['', CustomValidators.email],
            phone: [''],
            //order: [''],

            social_facebook: ['', CustomValidators.url],
            social_twitter: ['', CustomValidators.url],
            social_instagram: ['', CustomValidators.url],
            social_youtube: ['', CustomValidators.url],
            social_pinterest: ['', CustomValidators.url],
            social_linkedin: ['', CustomValidators.url],
            social_tripadvisor: ['', CustomValidators.url],

            address: this.fb.group({
                id: [''],
                country_id: ['', Validators.required],
                state_id: ['', Validators.required],
                street: ['', Validators.required],
                exterior_number: ['', Validators.required],
                interior_number: [''],
                colony: ['', Validators.required],
                municipality_or_county: ['', Validators.required],
                zip: [''],
            })
        });
    }

    buildUploaders(){
        this.logo_uploader = new FileUploader({});
        this.logo_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };

        this.presentation_file_uploader = new FileUploader({});
        this.presentation_file_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };
    }

    runUploaders(){
        // logo
        this.logo_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.hotel.id;
            let type = 'hotel';
            let input_id = 'logo_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.logo_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.logo_uploader.uploadAll();

        // presentation file image
        this.presentation_file_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.hotel.id;
            let type = 'hotel';
            let input_id = 'presentation_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.presentation_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.presentation_file_uploader.uploadAll();
    }

    afterUpload(){
        if(this.uploads_finished >= this.uploads_length){
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            if(!this.id){
                this.redirect.toEditForm(this.hotel.id, this.route);
                this.loading = false;
            }else{
                this.uploads_finished = 0;
                this.load();
            }
        }
    }
}
