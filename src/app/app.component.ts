import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {SessionService} from "./core/services/session.service";
import {NotificationProvider} from "./core/providers/notification.provider";

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(
        public translate: TranslateService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private sessionService: SessionService,
        private notificationProvider: NotificationProvider
    ) {

        this.registerIcons();

        this.initializeLanguage();

        this.sessionService.initialize();

        this.notificationProvider.initialize();
    }

    initializeLanguage(){
        this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');
        const defaultLang = this.getDefaultLang();
        this.translate.use(defaultLang.match(/(en|es)/) ? defaultLang : 'es');
    }

    getDefaultLang(){
        const localLang = localStorage.getItem('lang');
        return ((localLang) ? localLang : this.translate.getBrowserLang());
    }

    registerIcons(){
        this.matIconRegistry.addSvgIcon(
            'app_heart',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/app/icons/heart.svg')
        );
    }
}
