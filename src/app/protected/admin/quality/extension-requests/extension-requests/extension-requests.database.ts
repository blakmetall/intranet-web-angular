import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {QualityExtensionRequestService} from "../../../../../core/services/quality/extension-request.service";

export interface ExtensionRequest {
    id: string;
    hotel:string;
    owner:any;
    extension_date:string;
    policy: string;
    verifier_user_id: string;
    owner_user_id: string;
    is_verified: string;
    is_approved: string;

    created_at: string;
    updated_at: string;
    actions: number;
}

@Injectable()
export class ExtensionRequestsDatabase {
    dataChange: BehaviorSubject<ExtensionRequest[]> = new BehaviorSubject<ExtensionRequest[]>([]);
    get data(): ExtensionRequest[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: QualityExtensionRequestService) {}

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
            hotel: item.assurance_visit.hotel.name,
            owner: item.user_owner,
            extension_date: item.extension_date,
            policy: item.policy,
            verifier_user_id: item.verifier_user_id,
            owner_user_id: item.owner_user_id,
            is_verified: item.is_verified,
            is_approved: item.is_approved,

            created_at: item.created_at,
            updated_at: item.updated_at,
            actions: 1
        });

        this.dataChange.next(copiedData);
    }
}
