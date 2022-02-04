import {Injectable} from '@angular/core';
import {NotificationService} from "../services/notification.service";
import {AuthProvider} from "./auth.provider";

@Injectable()
export class NotificationProvider {

    notifications : any = [];

    pending_view : any = 0;

    constructor(
        private auth: AuthProvider,
        private notificationService: NotificationService
    ) {}

    initialize(){
        setTimeout(() => {
            this.updateNotifications();
        }, 2000);

        setInterval( () => {
            this.updateNotifications();
        }, 10000);
    }

    updateNotifications(){
        if(this.auth.user){
            this.notificationService.all({}).subscribe( (notifications) => {
                this.notifications = notifications;

                this.pending_view = 0;

                for(let i = 0; i < this.notifications.length; i++){
                    if(!this.notifications[i].viewed){
                        this.pending_view++;
                    }
                }
            });
        }
    }
}