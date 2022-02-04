import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TaskService} from "../../../core/services/task.service";

export interface TaskArchiveData {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    user_owner: any;
    user_assigned: any;

    actions: any;
}

@Injectable()
export class TasksArchiveDatabase {
    dataChange: BehaviorSubject<TaskArchiveData[]> = new BehaviorSubject<TaskArchiveData[]>([]);
    get data(): TaskArchiveData[] { return this.dataChange.value; }
    session_data;

    pageIndex = 0;
    perPage = 20;
    totalItems = 0;
    activeSort = '';
    sortDirection = '';
    filter = '';
    trash = false;

    constructor(private dbService: TaskService) {}

    build(){

        let request = {
            page: this.pageIndex + 1,
            perPage: this.perPage,
            activeSort: this.activeSort,
            sortDirection: this.sortDirection,
            filter: this.filter,
            trash: (this.trash) ? 1 : 0,

            filterArchive: 1,
            filterByLoggedUser: 1,
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
            start_date: item.start_date,
            end_date: item.end_date,
            user_owner: item.user_owner,
            user_assigned: item.user_assigned,

            actions: 1
        });

        this.dataChange.next(copiedData);
    }
}
