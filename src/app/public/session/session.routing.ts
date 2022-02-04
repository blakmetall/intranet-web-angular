import {Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {ForgotComponent} from './forgot/forgot.component';
import {SigninComponent} from './signin/signin.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {GuestGuard} from "../../core/guards/guest.guard";

export const SessionRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '404',
            component: NotFoundComponent
        }, {
            path: 'error',
            component: ErrorComponent
        }, {
            path: 'forgot',
            component: ForgotComponent,
            canActivate: [GuestGuard]
        }, {
            path: 'signin',
            component: SigninComponent,
            canActivate: [GuestGuard]
        }, {
            path: 'resetPassword/:recovery_key',
            component: ResetPasswordComponent,
            canActivate: [GuestGuard]
        }]
    }
];
