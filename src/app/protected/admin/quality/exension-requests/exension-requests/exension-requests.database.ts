import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {QualityExensionRequestService} from "../../../../../core/services/quality/exension-request.service";

export interface ExensionRequest {
    id: string;
    hotel:string;
    owner:any;
    is_approved: string;
    is_verified:string;

    created_at:string;
    updated_at:string;
    actions:number;
}

@Injectable()
export class ExensionRequestsDatabase {
    dataChange: BehaviorSubject<ExensionRequest[]> = new BehaviorSubject<ExensionRequest[]>([]);

    get data(): ExensionRequest[] {
        return this.dataChange.value;
    }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: QualityExensionRequestService) {
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
            hotel: item.hotel.name,
            owner: item.user_owner,
            is_approved: item.is_approved,
            is_verified: item.is_verified,

            created_at: item.created_at,
            updated_at: item.updated_at,
            actions: 1
        });
        this.dataChange.next(copiedData);
    }
}
