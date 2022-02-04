import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class PermissionService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';

        req.user_permissions_group_id = req.user_permissions_group_id || '';

        let requestUrl = environment.api_url + 'users/permissions-groups/permissions/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + '&user_permissions_group_id=' + req.user_permissions_group_id;
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
        let requestUrl = environment.api_url + 'users/permissions-groups/permissions/store';
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    edit(user){
        let requestUrl = environment.api_url + 'users/permissions-groups/permissions/update/' + user.id;
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'users/permissions-groups/permissions/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id){
        let requestUrl = environment.api_url + 'users/permissions-groups/permissions/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}