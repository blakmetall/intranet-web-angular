import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';

@Injectable()
export class QualityAssuranceVisitService {

    constructor(private http: HttpClient) {}

    all(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.hotel = req.hotel || '';

        req.filterByUserProfileHotel = req.filterByUserProfileHotel || '';

        let requestUrl = environment.api_url + 'quality/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash + "&hotel=" + req.hotel + "&filterByUserProfileHotel=" + req.filterByUserProfileHotel;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(visit){
        if(visit.id){
            return this.edit(visit);
        }else{
            return this.add(visit);
        }
    }

    add(visit){
        let requestUrl = environment.api_url + 'quality/store';
        return this.http.post(requestUrl, visit).map( (res: any) => {
            return res;
        });
    }

    edit(visit){
        let requestUrl = environment.api_url + 'quality/update/' + visit.id;
        return this.http.post(requestUrl, visit).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'quality/get/' + id;
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

    delete(id){
        let requestUrl = environment.api_url + 'quality/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getStatus(req){
        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        let requestUrl = environment.api_url + 'quality/status/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash;

        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}