import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class MahgazineArticleService {

    constructor(private http: HttpClient) {
    }

    all(req) {
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.filterBySection = req.filterBySection || '';

        let requestUrl = environment.api_url + 'mahgazine/articles/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash + "&filterBySection=" + req.filterBySection;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    save(mahgazine_article) {
        if (mahgazine_article.id) {
            return this.edit(mahgazine_article);
        } else {
            return this.add(mahgazine_article);
        }
    }

    add(mahgazine_article) {
        let requestUrl = environment.api_url + 'mahgazine/articles/store';
        return this.http.post(requestUrl, mahgazine_article).map((res: any) => {
            return res;
        });
    }

    edit(mahgazine_article) {
        let requestUrl = environment.api_url + 'mahgazine/articles/update/' + mahgazine_article.id;
        return this.http.post(requestUrl, mahgazine_article).map((res: any) => {
            return res;
        });
    }

    get(id) {
        let requestUrl = environment.api_url + 'mahgazine/articles/get/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    restore(id) {
        let requestUrl = environment.api_url + 'mahgazine/articles/restore/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    delete(id, forceDelete) {
        let requestUrl = environment.api_url + 'mahgazine/articles/delete/' + id;
        if (forceDelete) {
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    orderUp(id){
        let requestUrl = environment.api_url + 'mahgazine/articles/order/' + id + '/-1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    orderDown(id){
        let requestUrl = environment.api_url + 'mahgazine/articles/order/' + id + '/1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
}