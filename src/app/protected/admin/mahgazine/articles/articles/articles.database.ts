import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MahgazineArticleService} from "../../../../../core/services/mahgazine-article.service";

export interface MahgazineArticleData {
    id: string;
    name: string;
    description: string;
    order: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;

    actions: number;
}

@Injectable()
export class MahgazineArticlesDatabase {
    dataChange: BehaviorSubject<MahgazineArticleData[]> = new BehaviorSubject<MahgazineArticleData[]>([]);
    get data(): MahgazineArticleData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    section_id = '';

    constructor(private dbService: MahgazineArticleService) {}

    setEditionSection(section_id){
        this.section_id = section_id;
    }

    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            filterBySection: this.section_id
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
            description: item.description,
            order: item.order,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at,

            actions: 1
        });

        this.dataChange.next(copiedData);
    }
}
