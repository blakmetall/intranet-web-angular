import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EventCategoryService} from "../../../../core/services/event.category.service";

export interface EventCategoryData {
    id: string;
    name: string;
    color: string;
}

@Injectable()
export class EventsCategoriesDatabase {
    dataChange: BehaviorSubject<EventCategoryData[]> = new BehaviorSubject<EventCategoryData[]>([]);

    get data(): EventCategoryData[] {
        return this.dataChange.value;
    }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: EventCategoryService) {
    }


    build() {
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
            for (var i = 0; i < items.data.length; i++) {
                this.addItem(items.data[i]);

            }
        });
    }

    addItem(item) {
        const copiedData = this.data.slice();

        copiedData.push({
            id: item.id,
            name: item.name,
            color: item.color,
        });

        this.dataChange.next(copiedData);
    }
}
