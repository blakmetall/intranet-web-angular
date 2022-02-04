import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class CompanyService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'companies/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(user){
        if(user.id){
            return this.edit(user);
        }else{
            return this.add(user);
        }
    }

    add(user){
        let requestUrl = environment.api_url + 'companies/store';
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    edit(user){
        let requestUrl = environment.api_url + 'companies/update/' + user.id;
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'companies/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    restore(id){
        let requestUrl = environment.api_url + 'companies/restore/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id, forceDelete){
        let requestUrl = environment.api_url + 'companies/delete/' + id;
        if(forceDelete){
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getCategories(){
        let requestUrl = environment.api_url + 'companies/categories';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}