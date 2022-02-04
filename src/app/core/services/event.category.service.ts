import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';

@Injectable()
export class EventCategoryService {

    constructor(private http: HttpClient) {
    }

    all(req) {
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

    save(category){
        if(category.id){
            return this.edit(category);
        }else{
            return this.add(category);
        }
    }

    add(category) {
        let requestUrl = environment.api_url + 'events/categories/store';
        return this.http.post(requestUrl, category).map((res: any) => {
            return res;
        });
    }

    edit(category) {
        let requestUrl = environment.api_url + 'events/categories/update/' + category.id;
        return this.http.post(requestUrl, category).map((res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'events/categories/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id) {
        let requestUrl = environment.api_url + 'events/categories/delete/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
}