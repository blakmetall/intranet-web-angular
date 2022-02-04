import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class HotelService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.isEnabled = req.isEnabled || '';
        req.withBrandsiteSections = req.withBrandsiteSections || '';
        req.withLogo = req.withLogo || '';

        let requestUrl = environment.api_url + 'hotels/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash + "&isEnabled=" + req.isEnabled + "&withBrandsiteSections=" + req.withBrandsiteSections + "&withLogo=" + req.withLogo;
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
        let requestUrl = environment.api_url + 'hotels/store';
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    edit(user){
        let requestUrl = environment.api_url + 'hotels/update/' + user.id;
        return this.http.post(requestUrl, user).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'hotels/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    restore(id){
        let requestUrl = environment.api_url + 'hotels/restore/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id, forceDelete){
        let requestUrl = environment.api_url + 'hotels/delete/' + id;
        if(forceDelete){
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getBrandsiteSections(id){
        let requestUrl = environment.api_url + 'hotels/' + id + '/brandsiteSections';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    editBrandsiteSections(id, sections){
        let requestUrl = environment.api_url + 'hotels/' + id + '/brandsiteSections/update';
        return this.http.post(requestUrl, sections).map( (res: any) => {
            return res;
        });
    }

    orderUp(id){
        let requestUrl = environment.api_url + 'hotels/order/' + id + '/-1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }

    orderDown(id){
        let requestUrl = environment.api_url + 'hotels/order/' + id + '/1';
        return this.http.get(requestUrl).map((res: any) => {
            return res;
        });
    }
}