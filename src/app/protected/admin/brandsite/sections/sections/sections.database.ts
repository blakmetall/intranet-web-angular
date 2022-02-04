import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { BrandsiteSectionService } from "../../../../../core/services/brandsite-section.service";

export interface SectionsData {
    id: string;
    name_es: string;
    name_en: string;
    features: any;
    is_predefined: number;
}

@Injectable()
export class BrandsiteSectionsDatabase {
    dataChange: BehaviorSubject<SectionsData[]> = new BehaviorSubject<SectionsData[]>([]);
    get data(): SectionsData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: BrandsiteSectionService) {}


    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,
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
            name_es: item.name_es,
            name_en: item.name_en,
            features: item.features,
            is_predefined: item.is_predefined
        });

        this.dataChange.next(copiedData);
    }
}
