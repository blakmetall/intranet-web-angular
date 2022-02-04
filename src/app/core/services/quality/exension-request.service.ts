import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';

@Injectable()
export class QualityExensionRequestService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'quality/exensions/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(exensions){
        if(exensions.id){
            return this.edit(exensions);
        }else{
            return this.add(exensions);
        }
    }

    add(exensions){
        let requestUrl = environment.api_url + 'quality/exensions/store';
        return this.http.post(requestUrl, exensions).map( (res: any) => {
            return res;
        });
    }

    edit(exensions){
        let requestUrl = environment.api_url + 'quality/exensions/update/' + exensions.id;
        return this.http.post(requestUrl, exensions).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'quality/exensions/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id){
        let requestUrl = environment.api_url + 'quality/exensions/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    approve(id){
        let requestUrl = environment.api_url + 'quality/exensions/approve/' + id;
        return this.http.post(requestUrl, {}).map( (res: any) => {
            return res;
        });
    }

    deny(id){
        let requestUrl = environment.api_url + 'quality/exensions/deny/' + id;
        return this.http.post(requestUrl, {}).map( (res: any) => {
            return res;
        });
    }
}