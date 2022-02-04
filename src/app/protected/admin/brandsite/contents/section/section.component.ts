import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from "@ngx-translate/core";
import {HotelService} from "../../../../../core/services/hotel.service";
import {HotelBrandsiteSectionService} from "../../../../../core/services/hotel.brandsite.section.service";

@Component({
    selector: 'app-admin-brandsite-content-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class BrandsiteContentSectionComponent implements OnInit {

    polymorphic_id;
    polymorphic_type = 'HotelBrandsiteSection';

    hotel;
    brandsiteSection;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private hotelService: HotelService,
        private hotelBrandsiteSectionService: HotelBrandsiteSectionService,
        public translate: TranslateService)
    {}

    ngOnInit() {
        this.polymorphic_id = this.route.snapshot.paramMap.get('id');

        if(!this.polymorphic_id){
            this.router.navigate([ '../'], {relativeTo: this.route} );
        }else{

            this.hotelBrandsiteSectionService.get(this.polymorphic_id).subscribe( hotelBrandsiteSection => {
                this.hotel = hotelBrandsiteSection.hotel;
                this.brandsiteSection = hotelBrandsiteSection.brandsiteSection;
            });

        }
    }
}
