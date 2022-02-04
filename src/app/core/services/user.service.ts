import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.withProfile = req.withProfile || '';
        req.withRole = req.withRole || '';
        req.withUnreadChatMessages = req.withUnreadChatMessages || '';
        req.withHotel = req.withHotel || '';
        req.withCompany = req.withCompany || '';

        let requestUrl = environment.api_url + 'users/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&withProfile=" + req.withProfile + "&withRole=" + req.withRole + "&withUnreadChatMessages=" + req.withUnreadChatMessages + "&withHotel=" + req.withHotel + "&withCompany=" + req.withCompany + "&trash=" + req.trash;
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
        let requestUrl = environment.api_url + 'users/store';
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    edit(user){
        let requestUrl = environment.api_url + 'users/update/' + user.id;
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'users/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getCurrent(){
        return this.http.get(environment.api_url + 'users/getCurrent');
    }

    restore(id){
        let requestUrl = environment.api_url + 'users/restore/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id, forceDelete){
        let requestUrl = environment.api_url + 'users/delete/' + id;
        if(forceDelete){
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getDirectory(search?){
        let requestUrl = environment.api_url + 'users/getDirectory' ;
        if(search){
            requestUrl += '?search=' + search;
            requestUrl = encodeURI(requestUrl);
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
    getAssignableUsersForTask(){

        let requestUrl = environment.api_url + 'users/getAssignableUsersForTask';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}