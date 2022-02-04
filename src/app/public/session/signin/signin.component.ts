import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SessionService} from "../../../core/services/session.service";
import {TranslateService} from '@ngx-translate/core';
import {MessageProvider} from "../../../core/providers/message.provider";
import {AuthProvider} from "../../../core/providers/auth.provider";


@Component({
    selector: 'app-session-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    public form: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private sessionService: SessionService,
                private authProvider: AuthProvider,
                private messageProvider: MessageProvider,
                public translate: TranslateService,) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit() {
        this.sessionService.login(this.form.value).subscribe(res => {
            if (res.success) {
                this.authProvider.authenticate(res.token, res.user, res.role, res.permissions);

                // initialize sesion data
                this.sessionService.initialize();

                this.router.navigate(['/']);
            } else {
                this.messageProvider.show('WRONG_CREDENTIALS', {error: true});
            }
        });

    }

}
