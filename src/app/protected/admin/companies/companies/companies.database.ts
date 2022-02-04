import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { CompanyService } from "../../../../core/services/company.service";

export interface CompanyData {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

@Injectable()
export class CompaniesDatabase {
    dataChange: BehaviorSubject<CompanyData[]> = new BehaviorSubject<CompanyData[]>([]);
    get data(): CompanyData[] { return this.dataChange.value; }

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: CompanyService) {}


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
            email: item.email,
            phone: item.phone,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at,
        });

        this.dataChange.next(copiedData);
    }
}
