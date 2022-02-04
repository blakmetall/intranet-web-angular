import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {QualityAssuranceVisitService} from "../../../../../core/services/quality/assurance-visit.service";

export interface AssuranceVisit {
    id: string;
    hotel:string;
    owner: any;
    status: string;
    datetime: string;
    revision_number: string;
    score: string;

    created_at: string;
    updated_at: string;
    actions: number;
}

@Injectable()
export class AssuranceVisitsDatabase {
    dataChange: BehaviorSubject<AssuranceVisit[]> = new BehaviorSubject<AssuranceVisit[]>([]);
    get data(): AssuranceVisit[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: QualityAssuranceVisitService) {}


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
            hotel: item.hotel.name,
            owner: item.user_owner,
            status: item.status.name,
            datetime: item.datetime,
            revision_number: item.revision_number,
            score: item.score,

            created_at: item.created_at,
            updated_at: item.updated_at,
            actions: 1
        });

        this.dataChange.next(copiedData);
    }
}
