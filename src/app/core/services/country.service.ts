import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'countries/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(address){
        if(address.id){
            return this.edit(address);
        }else{
            return this.add(address);
        }
    }

    add(address){
        let requestUrl = environment.api_url + 'countries/store';
        return this.http.post(requestUrl, address).map( (res: any) => {
            return res;
        });
    }

    edit(address){
        let requestUrl = environment.api_url + 'countries/update/' + address.id;
        return this.http.post(requestUrl, address).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'countries/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    restore(id){
        let requestUrl = environment.api_url + 'countries/restore/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id, forceDelete){
        let requestUrl = environment.api_url + 'countries/delete/' + id;
        if(forceDelete){
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}