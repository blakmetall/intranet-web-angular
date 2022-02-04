import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddressService} from "../../core/services/address.service";
import {TranslateService} from "@ngx-translate/core";
import {CountryService} from "../../core/services/country.service";
import {StateService} from "../../core/services/state.service";


@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {

    @Input() parentForm : any;
    @Output() addressForm = new EventEmitter<any>();

    id;
    address;
    countries: any;
    states: any;
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private addressService: AddressService,
                private countryService: CountryService,
                private stateService: StateService,
                public translate: TranslateService) {

        this.form = this.fb.group({
            id: [''],
            country_id: ['', Validators.required],
            state_id: ['', Validators.required],
            street: ['', Validators.required],
            exterior_number: ['', Validators.required],
            interior_number: [''],
            colony: ['', Validators.required],
            municipality_or_county: ['', Validators.required],
            zip: [''],
        });

        // state selector based on country selected
        this.form.get('country_id').valueChanges.subscribe( country => {
            this.states = [];
            this.form.get('state_id').patchValue('');
            this.stateService.all({country_id: this.form.get('country_id').value} ).subscribe( states => {
                this.states = states;
            });
        });

        // emit address form changes to parent
        this.form.valueChanges.subscribe( () => {
            this.addressForm.emit( this.form );
        });
    }

    ngOnInit() {
        this.states = [];

        if(this.parentForm.value){

            if(this.parentForm.value.address){ // check for root "address" field and second child field

                this.form.patchValue(this.parentForm.value.address);

            }else if(this.parentForm.value.profile.address){ // check for profile child address

                this.form.patchValue(this.parentForm.value.profile.address);

            }
        }

        this.loadContent();
    }

    loadContent(){
        this.countryService.all({}).subscribe( countries => {
            this.countries = countries;
        });
    }

}
