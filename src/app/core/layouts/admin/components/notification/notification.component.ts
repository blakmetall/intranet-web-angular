import {Component, EventEmitter, Output} from '@angular/core';
import {NotificationProvider} from "../../../../providers/notification.provider";
import {DateProvider} from "../../../../providers/date.provider";
import {NotificationService} from "../../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    @Output() toggleNotificationSidenav = new EventEmitter<void>();

    constructor(
        public notificationService: NotificationService,
        public notificationProvider: NotificationProvider,
        private router: Router,
        public dateProvider: DateProvider
    ) {}

    view(notification){
        this.notificationService.setViewedStatus(notification.id).subscribe( () => {
            this.notificationProvider.updateNotifications();

            // hides notification bar
            this.toggleNotificationSidenav.emit();

            this.router.navigate([ '/redirect'], {queryParams: {url: notification.url} } );
        });
    }

    delete(e, notification){
        e.stopPropagation(); // to avoid trigger the "view" function

        this.notificationService.delete(notification.id).subscribe( () => {
            this.notificationProvider.updateNotifications();
        });
    }

    deleteAll(){
        this.notificationService.deleteAll().subscribe( () => {
            this.notificationProvider.updateNotifications();
        });
    }

}
