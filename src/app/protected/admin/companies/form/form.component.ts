import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {forkJoin} from "rxjs/index";

import { CompanyService} from "../../../../core/services/company.service";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";

@Component({
    selector: 'app-admin-companies-form',
    templateUrl: './form.component.html',
})
export class CompanyFormComponent implements OnInit {

    id;
    company;
    categories;
    form: FormGroup;

    loading = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                public redirect: RedirectProvider,
                private messageProvider: MessageProvider,
                private companyService: CompanyService,
                public translate: TranslateService) {

        this.buildForm();

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;

        let loader = [];

        loader.push( this.companyService.getCategories() );
        if(this.id){
            loader.push( this.companyService.get(this.id) );
        }

        forkJoin(loader).subscribe(([categories, company]) => {
                this.company = company;
                this.categories = categories;

                if(this.id && this.company){
                    if(!this.company.address){
                        this.company.address = {};
                    }
                    this.form.patchValue(this.company);
                }
                this.loading = false;
            }
        );
    }

    save() {
        this.companyService.save(this.form.value).subscribe(company => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);
            this.company = company;

            if(!this.id){
                this.redirect.toEditForm(company.id, this.route);
            }
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            company_category_id: ['', Validators.required],
            company_address_id: [''],
            name: ['', Validators.required],
            email: ['', CustomValidators.email],
            phone: [''],

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
}
