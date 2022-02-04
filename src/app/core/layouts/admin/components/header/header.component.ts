import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "../../../../services/session.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthProvider} from "../../../../providers/auth.provider";
import * as moment from 'moment';
import {NotificationProvider} from "../../../../providers/notification.provider";
import {ChatProvider} from "../../../../providers/chat.provider";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    time: any = '';
    timezone: any = '';
    date: any = '';

    @Output() toggleSidenav = new EventEmitter<void>();
    @Output() toggleNotificationSidenav = new EventEmitter<void>();

    constructor(
        public auth: AuthProvider,
        public translate: TranslateService,
        private sessionService: SessionService,
        public chatProvider: ChatProvider,
        public notificationProvider: NotificationProvider,
        private router: Router) {

        // clock timezone
        setInterval( () => {
            if(this.auth.profile){
                let moment_timezone : any;
                let lang = localStorage.getItem('lang');

                if(this.auth.profile.use_local_timezone){
                    moment_timezone = moment.tz( moment.tz.guess() );
                }else{
                    moment_timezone = moment.tz( this.auth.timezone );
                }

                this.time = moment_timezone.lang(lang).format('h:mm A');
                this.date = moment_timezone.lang(lang).format('YYYY-MM-DD');
                this.timezone = this.auth.timezone;
            }
        }, 1000)
    }

    logout(){
        this.sessionService.logout().subscribe( () => {
            this.router.navigate(['/session/signin']);
        });
    }

    setLanguage(lang){
        localStorage.setItem('lang', lang);
        this.translate.use(lang);
    }
}
