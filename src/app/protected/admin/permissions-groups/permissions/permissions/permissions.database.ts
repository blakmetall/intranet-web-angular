import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { PermissionService } from "../../../../../core/services/permission.service";

export interface PermissionData {
    id: string;
    slug: string;
    name: string;
}

@Injectable()
export class PermissionsDatabase {
    dataChange: BehaviorSubject<PermissionData[]> = new BehaviorSubject<PermissionData[]>([]);
    get data(): PermissionData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    user_permissions_group_id = '';

    constructor(private dbService: PermissionService) {}


    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            user_permissions_group_id: this.user_permissions_group_id,
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
            slug: item.slug,
            name: item.name,
        });

        this.dataChange.next(copiedData);
    }
}
