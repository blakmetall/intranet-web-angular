import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MahgazineEditionService} from "../../../../../core/services/mahgazine-edition.service";

export interface MahgazineEditionData {
    id: string;
    name: string;
    start_datetime: string;
    end_datetime: string;
    is_published: string;
    is_finished: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;

    actions: number;
}

@Injectable()
export class MahgazineEditionsDatabase {
    dataChange: BehaviorSubject<MahgazineEditionData[]> = new BehaviorSubject<MahgazineEditionData[]>([]);
    get data(): MahgazineEditionData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: MahgazineEditionService) {}


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
            start_datetime: item.start_datetime,
            end_datetime: item.end_datetime,
            is_published: item.is_published,
            is_finished: item.is_finished,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at,

            actions: 1
        });

        this.dataChange.next(copiedData);
    }
}
