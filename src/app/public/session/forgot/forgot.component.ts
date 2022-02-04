import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from "../../../core/services/session.service";
import {MessageProvider} from "../../../core/providers/message.provider";

@Component({
    selector: 'app-session-forgot',
    templateUrl: './forgot.component.html',
})
export class ForgotComponent implements OnInit {

    public form: FormGroup;
    private inProgress: boolean;

    emailSent = false;
    emailIncorrect = false;

    constructor(private fb: FormBuilder,
                private messageProvider: MessageProvider,
                private authService: SessionService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit() {
        if(!this.inProgress){
            this.inProgress = true;
            this.authService.requestRecovery(this.form.value).subscribe(res => {
                if(res.success) {
                    this.emailSent = true;
                    this.emailIncorrect = false;
                } else {
                    this.emailSent = false;
                    this.emailIncorrect = true;
                }
                this.inProgress = false;
            });
        }
    }

}
