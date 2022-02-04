import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthProvider} from "../providers/auth.provider";
import {MessageProvider} from "../providers/message.provider";

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(private authProvider: AuthProvider,
                private router: Router,
                private messageProvider: MessageProvider) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ( !this.authProvider.user || this.authProvider.isStateAllowed( state )) {
            return true;
        } else {
            this.messageProvider.show('NOT_ALLOWED');
            this.router.navigate(['/']);
            return false;
        }
    }
}