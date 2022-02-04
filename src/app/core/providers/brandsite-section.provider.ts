import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BrandsiteSectionProvider {

    constructor() {}

    isEnabled(brandsiteSectionSlug, hotelBrandsiteSections){
        for(let section of hotelBrandsiteSections){
            if(section.slug == brandsiteSectionSlug){
                return section.brandsite_section.is_enabled;
            }
        }

        return false;
    }

    getID(brandsiteSectionSlug, hotelBrandsiteSections){
        for(let section of hotelBrandsiteSections){
            if(section.slug == brandsiteSectionSlug){
                return section.brandsite_section.id;
            }
        }

        return '';
    }
}