import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { BrandsiteSectionService} from "../../../../../core/services/brandsite-section.service";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";

@Component({
    selector: 'app-admin-brandsite-sections-form',
    templateUrl: './form.component.html',
})
export class SectionFormComponent implements OnInit {

    id;
    section;
    form: FormGroup;

    loading = false;

    get features() { return this.form.get('features') as FormArray;}

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private BrandsiteSectionService: BrandsiteSectionService,
                public translate: TranslateService) {
        this.buildForm();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.BrandsiteSectionService.get(this.id).subscribe(
            section => {
                this.section = section;
                this.form.patchValue(section);

                if(!section.is_predefined){
                    this.form.get('name_es').enable();
                    this.form.get('name_en').enable();
                }

                if(section.features){
                    this.resetFeatures();
                    for(let feature of section.features){
                        this.addFeature(feature);
                    }
                }

                this.loading = false;
            },
            (error) => {
                this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                this.redirect.toListing(this.id, this.route);
            }
        );
    }

    save() {
        this.loading = true;
        this.BrandsiteSectionService.save(this.form.value).subscribe(section => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);
            this.section = section;

            if(section.features){
                this.resetFeatures();
                for(let feature of section.features){
                    this.addFeature(feature);
                }
            }

            this.redirect.toListing(this.id, this.route);

            this.loading = false;
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            name_es: [{value: '', disabled: true}, Validators.required],
            name_en: [{value: '', disabled: true}, Validators.required],
            is_predefined: [0],

            features: this.fb.array([])
        });
    }

    resetFeatures(){
        while (this.features.length !== 0) {
            this.features.removeAt(0)
        }
    }

    addFeature(feature?){
        let featureForm = this.fb.group({
            id: [''],
            name_es: ['', Validators.required],
            name_en: ['', Validators.required],
        });

        if(feature){
            featureForm.patchValue(feature);
        }

        this.features.push(featureForm);
    }

    removeFeature(i){
        this.features.removeAt(i);
    }
}
