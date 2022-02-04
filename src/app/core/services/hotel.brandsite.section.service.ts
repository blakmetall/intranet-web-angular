import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class HotelBrandsiteSectionService {

    constructor(private http: HttpClient) {}


    get(id){
        let requestUrl = environment.api_url + 'hotels/brandsiteSections/' + id ;
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

}