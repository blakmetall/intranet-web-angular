import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class NotificationService {
    constructor(private http: HttpClient) {}

    all(req){

        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'notifications/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection ;

        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id){
        let requestUrl = environment.api_url + 'notifications/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    deleteAll(){
        let requestUrl = environment.api_url + 'notifications/deleteAll' ;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    setViewedStatus(id){
        let requestUrl = environment.api_url + 'notifications/setViewedStatus/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}
