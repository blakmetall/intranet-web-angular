import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class SettingService {

    constructor(private http: HttpClient) {}

    save(setting){
        let requestUrl = environment.api_url + 'settings/update';
        return this.http.post(requestUrl, setting).map( (res: any) => {
            return res;
        });
    }

    get(){
        let requestUrl = environment.api_url + 'settings/get';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}