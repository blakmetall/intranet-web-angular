import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthProvider {

    user;
    profile;
    timezone;
    role;
    permissions;

    constructor() {}

    isUrlAllowed(url){
        let state = {
            url: url
        };
        return this.isStateAllowed(state);
    }

    /**
     * Verify if next state is allowed acording to user rol or permissions
     * @param state
     * @returns {boolean}
     */
    isStateAllowed(state){
        
        // super admin allowed
        if(this.isSuper()){
            return true;
        }

        // admin allowed except route permissions
        if(this.isAdmin() && state.url != "/admin/permissions-groups"){
            return true;
        }

        // specific route permission
        if(this.permissions && this.permissions.length){
            for(let permission of this.permissions){
                if(permission.slug == state.url ){
                    return true;
                }
            }
        }

        // allowed if custom parent state is allowed
        if (this.isParentStateAllowed(state)) {
            return true;
        }

        return false;
    }

    /**
     * Check if new route state has a parent route allowed within the list of allowed parents
     * @param state
     * @returns {boolean}
     */
    isParentStateAllowed(state){
        let urlPaths = [];
        let url = state.url;

        // remove first "/"
        while(url.charAt(0) === '/'){
            url = url.substr(1);
        }
        const urlPartials = url.split('/');

        // create tree of parent paths in array
        for(let i = 0; i < urlPartials.length; i++){
            let urlPath = '';

            for(let j = 0; j <= i; j++){
                urlPath += '/' + urlPartials[j];
            }

            urlPaths.push(urlPath);
        }


        // exluced parent search states
        for(let urlPath of urlPaths) {
            if (
                urlPath == '/admin/brandsite' ||
                urlPath == '/admin/quality' ||
                urlPath == '/quality'
            ) {
                return false
            }
        }

        // specific route permission
        if(this.permissions && this.permissions.length && urlPaths.length){
            for(let permission of this.permissions){
                for(let urlPath of urlPaths){


                    if(urlPath == permission.slug){
                        if(urlPath == state.url){
                            return true;
                        }else{
                            if( urlPath == '/tasks' ) {
                               return true;
                            }
                        }
                    }

                }
            }
        }

        return false;
    }

    // attemts authentication
    authenticate(token, user, role, permissions) {
        this.setPassportToken(token);
        this.setUser(user);
        this.setRole(role);
        this.setPermissions(permissions);
    }

    // check if authenticated
    authenticated() {
        return (localStorage.getItem('passportToken')) ? true : false;
    }

    setPassportToken(token){ localStorage.setItem('passportToken', token); }
    getPassportToken(){ return localStorage.getItem('passportToken'); }

    setUser(user) {
        this.user = user;
        this.profile = user.profile;
        this.timezone = this.profile ? this.profile.timezone : null;

        // sets user data portion into local storage
        const tmpUser = {
            id: user.id,
            email: user.email,
        };
        localStorage.setItem('user', JSON.stringify(tmpUser));
    }
    getUser() {
        if(!this.user){
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        return this.user;
    }

    setRole(role){ this.role = role; }
    getRole(){ return this.role; }

    setPermissions(permissions){ this.permissions = permissions; }
    getPermissions() { return this.permissions; }

    setTimezone(timezone){
        this.timezone = timezone;
    }
    getTimezone(){
        if(this.profile && this.profile.use_local_timezone){
            if(moment && moment.tz){
                return moment.tz.guess();
            }else{
                return '';
            }
        }else{
            return this.timezone;
        }
    }

    isSuper(){  return ( this.role && this.role.slug == 'super') ? true : false; }
    isAdmin(){  return ( this.role && (this.role.slug == 'super' || this.role.slug == 'admin')) ? true : false; }
    isCorporative(){  return (this.role && this.role.slug == 'corporative') ? true : false; }
    isRegular(){  return (this.role && this.role.slug == 'regular') ? true : false; }

    clear(){
        this.user = null;
        this.profile = null;
        this.timezone = null;
        this.role = null;
        this.permissions = null;
    }
}