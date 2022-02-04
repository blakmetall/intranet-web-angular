import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class TaskService {
    constructor(private http: HttpClient) {}

    all(req){

        req.activeSort = req.activeSort || '';
        req.sortDirection = req.sortDirection || '';
        req.page = req.page || 1; //default first page
        req.perPage = req.perPage || -1; //default no limit
        req.filter = req.filter || '';
        req.trash = req.trash || '';

        req.start_date = req.start_date || '';
        req.end_date = req.end_date || '';

        req.filterByLoggedUser = req.filterByLoggedUser || '';

        req.isPinnedToCalendar = req.isPinnedToCalendar || '';

        req.filterArchive = req.filterArchive || '';

        let requestUrl = environment.api_url + 'tasks/all';
        requestUrl += "?page=" + req.page + "&perPage=" + req.perPage + "&activeSort=" + req.activeSort + "&sortDirection=" + req.sortDirection + "&filter=" + req.filter + "&trash=" + req.trash + "&start_date=" + req.start_date  + "&end_date=" + req.end_date + "&filterArchive=" + req.filterArchive + "&filterByLoggedUser=" + req.filterByLoggedUser + "&isPinnedToCalendar=" + req.isPinnedToCalendar;

        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    save(task){
        if(task.id){
            return this.edit(task);
        }else{
            return this.add(task);
        }
    }

    add(task){
        let requestUrl = environment.api_url + 'tasks/store';
        return this.http.post(requestUrl, task).map( (res: any) => {
            return res;
        });
    }

    edit(task){
        let requestUrl = environment.api_url + 'tasks/update/' + task.id;
        return this.http.post(requestUrl, task).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'tasks/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id){
        let requestUrl = environment.api_url + 'tasks/delete/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    archive(id){
        let requestUrl = environment.api_url + 'tasks/archive/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getStatusList(){
        let requestUrl = environment.api_url + 'tasks/statusList';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    changeStatus(task_id, status_slug) {
        let requestUrl = environment.api_url + 'tasks/changeStatus/' + task_id;

        let req = {
            status: status_slug
        };

        return this.http.post(requestUrl, req).map( (res: any) => {
            return res;
        });
    }
}
