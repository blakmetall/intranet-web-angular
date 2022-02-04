import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MahgazineSectionService} from "../../../../../core/services/mahgazine-section.service";

export interface MahgazineSectionData {
    id: string;
    name: string;
    order: string;
    color: string;
    template_slug: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;

    actions: number;
}

@Injectable()
export class MahgazineSectionsDatabase {
    dataChange: BehaviorSubject<MahgazineSectionData[]> = new BehaviorSubject<MahgazineSectionData[]>([]);
    get data(): MahgazineSectionData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    edition_id = '';

    constructor(private dbService: MahgazineSectionService) {}

    setEdition(edition_id){
        this.edition_id = edition_id;
    }

    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            filterByEdition: this.edition_id
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
            order: item.order,
            color: item.color,
            template_slug: item.template_slug,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at,

            actions: 1
        });

        this.dataChange.next(copiedData);
    }
}
