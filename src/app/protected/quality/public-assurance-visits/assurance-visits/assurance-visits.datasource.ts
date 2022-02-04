import {MatPaginator, MatSort, MatSortable} from '@angular/material';
import {ElementRef} from "@angular/core";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {AssuranceVisitsPublicDatabase, AssuranceVisit} from "./assurance-visits.database";
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

export class AssuranceVisitsPublicDatasource extends DataSource<any> {

    constructor(
        private _db: AssuranceVisitsPublicDatabase,
        private _paginator: MatPaginator,
        private _sort: MatSort,
        private _filter: ElementRef) {
        super();
    }

    connect(): Observable<AssuranceVisit[]> {
        //filter event
        Observable.fromEvent(this._filter.nativeElement, 'keyup').debounceTime(250).distinctUntilChanged().subscribe(() => {
            this._db.pageIndex = 0;
            this._db.filter = this._filter.nativeElement.value;
            this._db.build();
        });

        //paginator and sort events
        Observable.merge(...[this._sort.sortChange, this._paginator.page]).subscribe(() => {
            if(this._sort.direction == ""){
                this._db.activeSort = '';
                this._sort.active = '';
            }else{
                this._db.activeSort = this._sort.active;
            }
            this._db.sortDirection = this._sort.direction;
            this._db.pageIndex = this._paginator.pageIndex;
            this._db.perPage = this._paginator.pageSize;
            this._db.build();
        });

        this.resetSavedOptions();

        return Observable.merge(...[this._db.dataChange]).map(() => {
            const data = this._db.data.slice();
            //const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data;
        });
    }

    disconnect() {}

    //retrieves old filter configurations from database object before Request
    resetSavedOptions() {
        this._paginator.pageIndex = this._db.pageIndex;
        this._paginator.pageSize = this._db.perPage;
        this._filter.nativeElement.value = this._db.filter;

        this._sort.active = this._db.activeSort;
        if(this._db.sortDirection == ''){
            this._sort.direction = '';
        }else{
            this._sort.direction = (this._db.sortDirection == 'asc') ? 'asc' : 'desc';
        }
    }

    //reset filter configurations and rebuild table
    clear() {
        this._paginator.pageIndex = this._db.pageIndex = 0;
        this._paginator.pageSize = this._db.perPage = 20;
        this._filter.nativeElement.value = this._db.filter = '';

        this._sort.active = this._db.activeSort = '';
        this._sort.direction = this._db.sortDirection = '';

        this._db.trash = false;

        let sortable = <MatSortable>{ id: '', start: 'asc' };
        this._sort.sort(sortable);
    }

    trashToggle(){
        this._db.trash = !this._db.trash;
        this._db.build();
    }
}
