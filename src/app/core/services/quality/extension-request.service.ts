import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';

@Injectable()
export class QualityExtensionRequestService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'quality/extension/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(extension){
        if(extension.id){
            return this.edit(extension);
        }else{
            return this.add(extension);
        }
    }

    add(extension){
        let requestUrl = environment.api_url + 'quality/extension/store';
        return this.http.post(requestUrl, extension).map( (res: any) => {
            return res;
        });
    }

    edit(extension){
        let requestUrl = environment.api_url + 'quality/extension/update/' + extension.id;
        return this.http.post(requestUrl, extension).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'quality/extension/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }


    approve(id){
        let requestUrl = environment.api_url + 'quality/extension/approve/' + id;
        return this.http.post(requestUrl, {}).map( (res: any) => {
            return res;
        });
    }

    deny(id){
        let requestUrl = environment.api_url + 'quality/extension/deny/' + id;
        return this.http.post(requestUrl, {}).map( (res: any) => {
            return res;
        });
    }

    delete(id){
        let requestUrl = environment.api_url + 'quality/extension/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}