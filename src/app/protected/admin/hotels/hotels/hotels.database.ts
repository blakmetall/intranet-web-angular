import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HotelService } from "../../../../core/services/hotel.service";

export interface HotelData {
    id: string;
    name: string;
    phone: string;
    website: string;
    order: string;
    is_enabled: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

@Injectable()
export class HotelsDatabase {
    dataChange: BehaviorSubject<HotelData[]> = new BehaviorSubject<HotelData[]>([]);
    get data(): HotelData[] { return this.dataChange.value; }

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
            phone: item.phone,
            website: item.website,
            order: item.order,
            is_enabled: item.is_enabled,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at,
        });

        this.dataChange.next(copiedData);
    }
}
