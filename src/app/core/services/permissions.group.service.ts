import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class PermissionsGroupService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';

        req.withPermissions = req.withPermissions || '';

        let requestUrl = environment.api_url + 'users/permissions-groups/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + '&withPermissions=' + req.withPermissions;
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
        let requestUrl = environment.api_url + 'users/permissions-groups/store';
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    edit(user){
        let requestUrl = environment.api_url + 'users/permissions-groups/update/' + user.id;
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'users/permissions-groups/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id){
        let requestUrl = environment.api_url + 'users/permissions-groups/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}