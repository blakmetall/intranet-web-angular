import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import {MessageProvider} from "../providers/message.provider";
import {AuthProvider} from "../providers/auth.provider";
import {SessionService} from "../services/session.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

    constructor(private injector: Injector, private messageProvider: MessageProvider) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authProvider = this.injector.get(AuthProvider);
        const translate = this.injector.get(TranslateService);

        let headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + authProvider.getPassportToken(),

            APP_TIMEZONE: '',
            APP_LANG: ''
        };

        if(authProvider.getTimezone()){
            headers.APP_TIMEZONE = authProvider.getTimezone();
            headers.APP_LANG = translate.currentLang
        }

        request = request.clone({
            setHeaders: headers,
        });

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {}
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {

                if (err.status === 401) {
                    const sessionService = this.injector.get(SessionService);
                    sessionService.requestLogin();
                }

                if(err.status === 400){
                    //err = http error data
                    //err.error = error section of http error data

                    //err.error.errors = list of array errors from API
                    const errorsList = err.error.errors;
                    this.messageProvider.show(errorsList, {label: 'ERROR', error: true});
                }

            }
        });
    }
}