import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class MahgazineEditionService {

    constructor(private http: HttpClient) {
    }

    all(req) {
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        //req.isEnabled = req.isEnabled || '';

        let requestUrl = environment.api_url + 'mahgazine/editions/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    save(mahgazine_edition) {
        if (mahgazine_edition.id) {
            return this.edit(mahgazine_edition);
        } else {
            return this.add(mahgazine_edition);
        }
    }

    add(mahgazine_edition) {
        let requestUrl = environment.api_url + 'mahgazine/editions/store';
        return this.http.post(requestUrl, mahgazine_edition).map((res: any) => {
            return res;
        });
    }

    edit(mahgazine_edition) {
        let requestUrl = environment.api_url + 'mahgazine/editions/update/' + mahgazine_edition.id;
        return this.http.post(requestUrl, mahgazine_edition).map((res: any) => {
            return res;
        });
    }

    get(id) {
        let requestUrl = environment.api_url + 'mahgazine/editions/get/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    restore(id) {
        let requestUrl = environment.api_url + 'mahgazine/editions/restore/' + id;
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    delete(id, forceDelete) {
        let requestUrl = environment.api_url + 'mahgazine/editions/delete/' + id;
        if (forceDelete) {
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
}