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

@Component({
    selector: 'app-admin-mahgazine-section-form',
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
export class MahgazineSectionFormComponent implements OnInit {

    id;
    section;
    form: FormGroup;

    edition_id;
    edition;

    color;

    loading = false;
    loading2 = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private mahgazineSectionService: MahgazineSectionService,
                private mahgazineEditionService: MahgazineEditionService,
                private auth: AuthProvider,
                public appProvider: AppProvider,
                public fileViewerProvider: FileViewerProvider,
                public translate: TranslateService) {
        this.buildForm();
    }

    ngOnInit() {
        this.edition_id = this.route.snapshot.paramMap.get('edition_id');
        this.id = this.route.snapshot.paramMap.get('section_id');
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

        if(this.id){
            this.loading = true;
            this.mahgazineSectionService.get(this.id).subscribe(
                (section) => {
                    if(this.id && section){
                        this.section = section;

                        this.form.patchValue(this.section);
                    }

                    this.loading = false;
                },
                (error) => {
                    this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                    this.redirect.toListing(this.id, this.route);
                }
            );
        }else{
            this.form.get('mahgazine_edition_id').patchValue(this.edition_id);
        }
    }

    save() {
        this.loading = true;
        this.mahgazineSectionService.save(this.form.value).subscribe(section => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);
            this.section = section;

            if(!this.id){
                this.redirect.toEditForm(this.section.id, this.route);
            }

            this.loading = false;
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            mahgazine_edition_id: ['', Validators.required],
            name: ['', Validators.required],
            color: ['', Validators.required],
            template_slug: ['', Validators.required],
        });
    }

    setColor(color){
        this.form.get('color').patchValue(color);
        this.color = color;
    }
}
