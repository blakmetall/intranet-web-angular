import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {forkJoin} from "rxjs/index";

import {MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {HotelService} from "../../../../../core/services/hotel.service";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";

@Component({
    selector: 'app-admin-brandsite-contents-form',
    templateUrl: './form.component.html',
})
export class BrandsiteContentFormComponent implements OnInit {

    id;
    hotel;
    form: FormGroup;

    loading = false;

    get hotelBrandsiteSections(): FormArray { return this.form.get('hotelBrandsiteSections') as FormArray; }

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public  redirect: RedirectProvider,
                private HotelService: HotelService,
                public translate: TranslateService) {

        this.form = this.fb.group({
            hotelBrandsiteSections: this.fb.array([])
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        let loader = [];
        loader.push( this.HotelService.get(this.id) );
        loader.push( this.HotelService.getBrandsiteSections(this.id) );

        forkJoin(loader).subscribe(([hotel, hotelBrandsiteSections]) => {
            this.hotel = hotel;

                // hotel brandsite sections fill
                if(hotelBrandsiteSections.length){
                    this.resetHotelBrandsiteSections();
                    for(let section of hotelBrandsiteSections){
                        this.addHotelBrandsiteSection(section);
                    }
                }

                this.loading = false;
            },
            error => {this.loading = false}
        );

    }

    save() {
        this.loading = true;
        this.HotelService.editBrandsiteSections(this.hotel.id, this.form.value).subscribe(() => {
            let message = 'SECTIONS_UPDATED';
            this.messageProvider.show(message);
            this.loading = false;
        },error => {this.loading = false});
    }

    resetHotelBrandsiteSections(){
        while (this.hotelBrandsiteSections.length !== 0) {
            this.hotelBrandsiteSections.removeAt(0)
        }
    }

    addHotelBrandsiteSection(hotelBrandsiteSection){
        let hotelBrandsiteSectionForm = this.fb.group({
            id: [''],
            hotel_id: [''],
            is_enabled: [''],

            brandsite_section: this.fb.group({
                name_en: [hotelBrandsiteSection.brandsite_section.name_en],
                name_es: [hotelBrandsiteSection.brandsite_section.name_es]
            }),
        });

        if(hotelBrandsiteSection){
            hotelBrandsiteSectionForm.patchValue(hotelBrandsiteSection);
        }

        this.hotelBrandsiteSections.push(hotelBrandsiteSectionForm);
    }


}
