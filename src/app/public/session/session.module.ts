import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
    MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSnackBarModule, MatMenuModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from "@ngx-translate/core";

// routes
import {SessionRoutes} from './session.routing';

// components
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {ForgotComponent} from './forgot/forgot.component';
import {SigninComponent} from './signin/signin.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {SwapLanguageComponent} from "./components/swap-language/swap-language.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SessionRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,

        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,

        TranslateModule,
    ],
    declarations: [
        NotFoundComponent,
        ErrorComponent,
        ForgotComponent,
        SigninComponent,
        ResetPasswordComponent,

        SwapLanguageComponent
    ],
})

export class SessionModule {
}
