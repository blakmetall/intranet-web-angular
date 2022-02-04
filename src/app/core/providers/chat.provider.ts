import {Injectable} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {AuthProvider} from "./auth.provider";

@Injectable()
export class ChatProvider {

    has_messages : boolean = false;
    pending_messages : number = 0;

    constructor(
        private auth: AuthProvider,
        private chatService: ChatService
    ) {
        this.initialize();
    }

    initialize(){
        setInterval( () => {
            this.updateUnread();
        }, 10000);

        this.updateUnread();
    }

    updateUnread(){
        if(this.auth.user){
            this.chatService.get_unread_messages_count().subscribe( (unread_messages) => {
                this.has_messages = (unread_messages) ? true : false;
                this.pending_messages = unread_messages;
            });
        }
    }
}