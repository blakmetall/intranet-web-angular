import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthProvider} from "../providers/auth.provider";

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private authProvider: AuthProvider, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authProvider.authenticated()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}