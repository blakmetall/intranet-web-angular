import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class FolderService {

    constructor(private http: HttpClient) {}

    save(folder){
        if(folder.id){
            return this.edit(folder);
        }else{
            return this.add(folder);
        }
    }

    add(folder){
        let requestUrl = environment.api_url + 'folders/store';
        return this.http.post(requestUrl, folder).map( (res: any) => {
            return res;
        });
    }

    edit(folder){
        let requestUrl = environment.api_url + 'folders/update/' + folder.id;
        return this.http.post(requestUrl, folder).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'folders/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id, forceDelete){
        let requestUrl = environment.api_url + 'folders/delete/' + id;
        if(forceDelete){
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getUsersPermitted(id){
        let requestUrl = environment.api_url + 'folders/get/' + id + '/getUsersPermitted';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getRoot(polymorphic_id, polymorphic_type){
        let requestUrl = environment.api_url + 'folders/getRoot/' + polymorphic_id + '/' + polymorphic_type;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getChilds(id, search){
        let requestUrl = environment.api_url + 'folders/get/' + id + '/getChilds';

        return this.http.post(requestUrl, search).map( (res: any) => {
            return res;
        });
    }

    getRootTree(id){
        let requestUrl = environment.api_url + 'folders/get/' + id + '/getRootTree';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getBreadcrumbs(id){
        let requestUrl = environment.api_url + 'folders/get/' + id + '/getBreadcrumbs';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getRootFolderAvailableFeatures(polymorphic_id, polymorphic_type){
        let requestUrl = environment.api_url + 'folders/getRootFolderAvailableFeatures';
        let req = {
            polymorphic_id: polymorphic_id,
            polymorphic_type: polymorphic_type
        };

        return this.http.post(requestUrl, req).map( (res: any) => {
            return res;
        });
    }

}