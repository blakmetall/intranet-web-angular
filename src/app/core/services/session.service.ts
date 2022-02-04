import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./user.service";
import {AuthProvider} from "../providers/auth.provider";
import {MessageProvider} from "../providers/message.provider";


@Injectable()
export class SessionService {


    constructor(private http: HttpClient,
                private router: Router,
                private authProvider: AuthProvider,
                private route: ActivatedRoute,
                private messageProvider: MessageProvider,
                private userService: UserService) {}

    initialize(){
        // test for user in localStorage ( to reload all data for protected modules)
        let user = JSON.parse(localStorage.getItem('user'));

        if(user && user.id){
            this.userService.getCurrent().subscribe( (user : any) => {
                if(user){
                    this.authProvider.setUser(user);
                    this.authProvider.setRole(user.role);
                    this.authProvider.setPermissions(user.permissions);

                    let url = window.location.pathname;
                    if(!this.authProvider.isUrlAllowed(url)){
                        this.router.navigate(['/dashboard']);
                        this.messageProvider.show('NOT_ALLOWED');
                    }
                }else{
                    this.logout();
                }
            }, (error : any) => {
                this.logout();
            });
        }
    }

    // API CALLS
    login(data) {
        return this.http.post(environment.api_url + 'session/login', data).map( (res: any) => {
            return res;
        });
    }

    logout() {
        return this.http.post(environment.api_url + 'session/logout', {}).map((res:any) => {
            this.authProvider.clear();
            localStorage.removeItem('passportToken');
            localStorage.removeItem('user');
            return res;
        });
    }

    requestRecovery(req){
        return this.http.post(environment.api_url + 'session/requestRecovery', req).map( (res: any) => {
            return res;
        });
    }

    verifyRecoveryKey(key){
        return this.http.get(environment.api_url + 'session/verifyRecoveryKey/' + key).map( (res: any) => {
            return res;
        });
    }

    resetPassword(password){
        return this.http.post(environment.api_url + 'session/resetPassword', password).map( (res: any) => {
            return res;
        });
    }

    requestLogin(){
        this.logout().subscribe(() => {
            this.router.navigate(['/']);
        });
    }

}