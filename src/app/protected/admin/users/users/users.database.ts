import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { UserService } from "../../../../core/services/user.service";

export interface UserData {
    id: string;
    lastname: string;
    name: string;
    email: string;
    role: any;
    is_enabled: string;

    deleted_at: any;
    created_at: any;
    updated_at: any;
}

@Injectable()
export class UsersDatabase {
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: UserService) {}


    build(){
        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            withProfile: 1,
            withRole: 1
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
            lastname: item.profile.lastname,
            name: item.profile.name,
            email: item.email,
            role: item.role,
            is_enabled: item.is_enabled,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at
        });

        this.dataChange.next(copiedData);
    }
}
