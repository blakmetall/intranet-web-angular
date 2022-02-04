import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HotelService} from "../../../../../core/services/hotel.service";

export interface BrandsiteContentData {
    id: string;
    logo: any;
    name: string;
    brandsiteSections: any;
}

@Injectable()
export class BrandsiteContentsDatabase {
    dataChange: BehaviorSubject<BrandsiteContentData[]> = new BehaviorSubject<BrandsiteContentData[]>([]);
    get data(): BrandsiteContentData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: HotelService) {}


    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            isEnabled: 1, // only enabled hotels
            withBrandsiteSections: 1, // with sections available
            withLogo: 1 // retrieves logo from list
        };

        this.dbService.all(request).subscribe(items => {
            this.dataChange.next([]);
            this.totalItems = items.total;
            for(var i=0; i < items.data.length; i++){
                this.addItem(items.data[i]);
            }
        });
    }

    addItem(item) {
        const copiedData = this.data.slice();

        copiedData.push({
            id: item.id,
            name: item.name,
            brandsiteSections: item.brandsite_sections,

            logo: item.logo
        });

        this.dataChange.next(copiedData);
    }
}
