import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class FileService {

    updateBasePath = environment.api_url + 'files/update/';

    uploadToFolderBasePath = environment.api_url + 'files/uploadToFolder/';

    constructor(private http: HttpClient) {}

    save(file){
        if(file.id){
            return this.edit(file);
        }else{
            return this.add(file);
        }
    }

    add(file){
        let requestUrl = environment.api_url + 'files/store';
        return this.http.post(requestUrl, file).map( (res: any) => {
            return res;
        });
    }

    edit(file){
        let requestUrl = environment.api_url + 'files/update/' + file.id;
        return this.http.post(requestUrl, file).map( (res: any) => {
            return res;
        });
    }

    get(id){
        let requestUrl = environment.api_url + 'files/get/' + id;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    delete(id, forceDelete){
        let requestUrl = environment.api_url + 'files/delete/' + id;
        if(forceDelete){
            requestUrl += '?forceDelete=1';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    getFromFolder(id, search){
        let requestUrl = environment.api_url + 'files/getFromFolder/' + id;

        return this.http.post(requestUrl, search).map( (res: any) => {
            return res;
        });
    }

    updateFeatures(id, features){
        let requestUrl = environment.api_url + 'files/' + id + '/updateFeatures';
        return this.http.post(requestUrl, features).map( (res: any) => {
            return res;
        });
    }

    updateFeaturedStatus(id, is_featured){
        let requestUrl = environment.api_url + 'files/' + id + '/updateFeaturedStatus';
        return this.http.post(requestUrl, is_featured).map( (res: any) => {
            return res;
        });
    }

    updateFlipPageStatus(id, flip_page_enabled){
        let requestUrl = environment.api_url + 'files/' + id + '/updateFlipPageStatus';
        return this.http.post(requestUrl, flip_page_enabled).map( (res: any) => {
            return res;
        });
    }
}