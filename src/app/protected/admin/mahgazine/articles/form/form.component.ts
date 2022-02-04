import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {FileItem, FileUploader} from "ng2-file-upload";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MahgazineSectionService} from "../../../../../core/services/mahgazine-section.service";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";
import {AuthProvider} from "../../../../../core/providers/auth.provider";
import {FileViewerProvider} from "../../../../../core/providers/file-viewer.provider";
import {AppProvider} from "../../../../../core/providers/app.provider";
import {MahgazineEditionService} from "../../../../../core/services/mahgazine-edition.service";
import {MahgazineArticleService} from "../../../../../core/services/mahgazine-article.service";
import {HotelService} from "../../../../../core/services/hotel.service";
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: 'app-admin-mahgazine-article-form',
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
export class MahgazineArticleFormComponent implements OnInit {

    id;
    article;
    form: FormGroup;

    edition_id;
    edition;

    section_id;
    section;

    hotels;

    article_file_uploader: FileUploader;

    uploads_length = 0;
    uploads_finished = 0;

    loading = false;
    loading2 = false;
    loading3 = false;
    loading4 = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private mahgazineSectionService: MahgazineSectionService,
                private mahgazineEditionService: MahgazineEditionService,
                private mahgazineArticleService: MahgazineArticleService,
                private hotelService: HotelService,
                private auth: AuthProvider,
                public appProvider: AppProvider,
                public fileViewerProvider: FileViewerProvider,
                public translate: TranslateService) {
        this.buildForm();
        this.buildUploaders();
    }

    ngOnInit() {
        this.edition_id = this.route.snapshot.paramMap.get('edition_id');
        this.section_id = this.route.snapshot.paramMap.get('section_id');
        this.id = this.route.snapshot.paramMap.get('article_id');
        this.load();
    }

    load(){
        if(this.edition_id){
            this.loading2 = true;
            this.mahgazineEditionService.get(this.edition_id).subscribe( edition => {
                this.edition = edition;
                this.loading2 = false;
            });
        }

        if(this.section_id){
            this.loading3 = true;
            this.mahgazineSectionService.get(this.section_id).subscribe( section => {
                this.section = section;
                this.loading3 = false;
            });
        }

        this.loading4 = true;
        this.hotelService.all({}).subscribe(hotels => {
            this.hotels = hotels;
            this.loading4 = false;
        })

        if(this.id){
            this.loading = true;
            this.mahgazineArticleService.get(this.id).subscribe(
                (article) => {
                    if(this.id && article){
                        this.article = article;

                        this.form.patchValue(this.article);
                    }
                    this.loading = false;
                },
                (error) => {
                    this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                    this.redirect.toListing(this.id, this.route);
                }
            );
        }else{
            this.form.get('mahgazine_edition_section_id').patchValue(this.section_id);
        }
    }

    save() {
        this.loading = true;
        this.mahgazineArticleService.save(this.form.value).subscribe(article => {
            this.article = article;

            this.uploads_length = 0;
            if(this.article_file_uploader.queue.length){
                this.uploads_length++;
            }

            if(this.uploads_length){
                this.runUploaders();
            }else{
                let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
                this.messageProvider.show(message);
                if(!this.id){
                    this.router.navigate(['/admin/mahgazine/edition/' + this.edition_id + '/sections/' + this.section_id + '/articles/form/' + this.article.id]);
                }
                this.loading = false;
            }
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            mahgazine_edition_section_id: ['', Validators.required],
            hotel_id: [''],
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    buildUploaders(){
        this.article_file_uploader = new FileUploader({});
        this.article_file_uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.uploads_finished++;
            this.afterUpload();
        };
    }

    runUploaders(){
        // presentation file image
        this.article_file_uploader.onBeforeUploadItem = (item: FileItem) => {
            let id = this.article.id;
            let type = 'mahgazine-article';
            let input_id = 'article_file';

            item.url = environment.api_url + 'files/singleUpload/' + type + '/' + id + '/' + input_id;
            item.withCredentials = false;
            this.article_file_uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };
        this.article_file_uploader.uploadAll();
    }

    afterUpload(){
        if(this.uploads_finished >= this.uploads_length){
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            if(!this.id){
                this.router.navigate(['/admin/mahgazine/edition/' + this.edition_id + '/sections/' + this.section_id + '/articles/form/' + this.article.id]);
                this.loading = false;
            }else{
                this.uploads_finished = 0;
                this.load();
            }
        }
    }
}
