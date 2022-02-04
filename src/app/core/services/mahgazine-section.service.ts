import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class MahgazineSectionService {

    constructor(private http: HttpClient) {
    }

    all(req) {
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.filterByEdition = req.filterByEdition || '';

        let requestUrl = environment.api_url + 'mahgazine/sections/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash + "&filterByEdition=" + req.filterByEdition;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    save(mahgazine_section) {
        if (mahgazine_section.id) {
            return this.edit(mahgazine_section);
        } else {
            return this.add(mahgazine_section);
        }
    }

    add(mahgazine_section) {
        let requestUrl = environment.api_url + 'mahgazine/sections/store';
        return this.http.post(requestUrl, mahgazine_section).map((res: any) => {
            return res;
        });
    }

    edit(mahgazine_section) {
        let requestUrl = environment.api_url + 'mahgazine/sections/update/' + mahgazine_section.id;
        return this.http.post(requestUrl, mahgazine_section).map((res: any) => {
            return res;
        });
    }

    get(id) {
        let requestUrl = environment.api_url + 'mahgazine/sections/get/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    restore(id) {
        let requestUrl = environment.api_url + 'mahgazine/sections/restore/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    delete(id, forceDelete) {
        let requestUrl = environment.api_url + 'mahgazine/sections/delete/' + id;
        if (forceDelete) {
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    orderUp(id){
        let requestUrl = environment.api_url + 'mahgazine/sections/order/' + id + '/-1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
    orderDown(id){
        let requestUrl = environment.api_url + 'mahgazine/sections/order/' + id + '/1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
}