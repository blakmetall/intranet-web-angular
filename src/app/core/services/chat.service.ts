import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChatService {
    constructor(private http: HttpClient) {}

    send(id, message){
        let requestUrl = environment.api_url + 'chat/send/' + id;
        return this.http.post(requestUrl, { message: message} ).map( (res: any) => {
            return res;
        });
    }

    get(id, top_scrolled?){
        let requestUrl = environment.api_url + 'chat/get/' + id;
        if(!top_scrolled){
            requestUrl+= '/limit';
        }
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }

    get_unread_messages_count(){
        let requestUrl = environment.api_url + 'chat/get/unreadMessages/count';
        return this.http.get(requestUrl).map( (res: any) => {
            return res;
        });
    }
}
