import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {environment} from '../../../environments/environment';

@Injectable()
export class EventService {

    constructor(private http: HttpClient,
                ) {
    }

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.start_date = req.start_date || '';
        req.end_date = req.end_date || '';

        let requestUrl = environment.api_url + 'events/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash + "&start_date=" + req.start_date  + "&end_date=" + req.end_date;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(data) {
        if (data.id) {
            return this.update(data);
        } else {
            return this.add(data);
        }
    }

    update(data) {
        const requestUrl = environment.api_url + 'events/edit/' + data.id;
        return this.http.post(requestUrl, data).map((res: any) => {
            return res;
        });
    }

    add(data) {
        const requestUrl = environment.api_url + 'events/store';
        return this.http.post(requestUrl, data).map((res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'events/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getCategories(req) {
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'events/categories/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    delete(id) {
        let requestUrl = environment.api_url + 'events/delete/' + id;
            requestUrl += '?forceDelete=1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
}