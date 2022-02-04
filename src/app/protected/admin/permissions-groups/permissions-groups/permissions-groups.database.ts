import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { PermissionsGroupService } from "../../../../core/services/permissions.group.service";

export interface PermissionGroupData {
    id: string;
    name: string;
    permissions: any;
    is_administrative_group: string;
}

@Injectable()
export class PermissionsGroupsDatabase {
    dataChange: BehaviorSubject<PermissionGroupData[]> = new BehaviorSubject<PermissionGroupData[]>([]);
    get data(): PermissionGroupData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: PermissionsGroupService) {}


    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            withPermissions: 1,
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
            permissions: item.permissions,
            is_administrative_group: item.is_administrative_group
        });

        this.dataChange.next(copiedData);
    }
}
