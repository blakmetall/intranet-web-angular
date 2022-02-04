import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomValidators} from "ng2-validation";
import {MessageProvider} from "../../../core/providers/message.provider";
import {SessionService} from "../../../core/services/session.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-session-reset-password',
    templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

    public form: FormGroup;
    public recoveryKey;
    public user;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private messageProvider: MessageProvider,
                private router: Router,
                private sessionService: SessionService,
                public translate: TranslateService) {
    }

    ngOnInit() {
        this.recoveryKey = this.route.snapshot.paramMap.get('recovery_key');

        let passwordFormControl = new FormControl('', Validators.required);
        this.form = this.fb.group({
            id: [null],
            recovery_key: [this.recoveryKey],
            password: passwordFormControl,
            password2: [null, Validators.compose([Validators.required, CustomValidators.equalTo(passwordFormControl)])]
        });

        if(this.recoveryKey){
            this.sessionService.verifyRecoveryKey(this.recoveryKey).subscribe(res => {
                if(res.success){
                    this.user = res.user;
                    this.form.get('id').patchValue(res.user.id);
                    this.form.get('recovery_key').patchValue(this.recoveryKey);
                }else{
                    this.invalidRecoveryKey();
                }
            });
        }
    }

    invalidRecoveryKey(){
        this.messageProvider.show('RECOVERY_KEY_EXPIRED', {error: true});
        this.router.navigate(['/session/forgot']);
    }

    onSubmit() {
        this.sessionService.resetPassword(this.form.value).subscribe(res => {
            if(res.success){
                this.messageProvider.show('PASSWORD_RESETTED');
                this.router.navigate(['/session/signin']);
            }else{
                this.invalidRecoveryKey();
            }
        });
    }

}
