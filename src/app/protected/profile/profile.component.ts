import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {MessageProvider} from "../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../core/services/user.service";
import {AuthProvider} from "../../core/providers/auth.provider";
import {SessionService} from "../../core/services/session.service";
import {AppProvider} from "../../core/providers/app.provider";
import * as moment from 'moment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    id;
    user;
    form: FormGroup;
    timezones: Array<any>;

    localTimezone: string;

    loading = false;
    loading2 = false;

    constructor(private fb: FormBuilder,
                public appProvider: AppProvider,
                private router: Router,
                private route: ActivatedRoute,
                private messageProvider: MessageProvider,
                private authProvider: AuthProvider,
                public sessionService: SessionService,
                private userService: UserService,
                public translate: TranslateService) {

        this.localTimezone = moment.tz.guess();
        this.timezones = moment.tz.names();
        this.buildForm();
    }

    ngOnInit() {
        let user = this.authProvider.getUser();
        if(!user){
            this.loading2 = true;
            this.userService.getCurrent().subscribe( (user : any) => {
                if(user){
                    this.id = user.id;
                    this.authProvider.setUser(user);
                    this.authProvider.setRole(user.role);
                    this.authProvider.setPermissions(user.permissions);
                }else{
                    this.sessionService.logout();
                }
                this.loading2 = false;
                this.load();
            }, (error : any) => {
                this.sessionService.logout();
            });
        }else{
            this.id = user.id;
            this.load();
        }
    }

    load(){
        this.loading = true;

        this.form.get('settings')['controls']['update_password'].patchValue(0);
        this.userService.get(this.id).subscribe(
            user => {
                this.user = user;
                this.form.patchValue(this.user);
                this.loading = false;
            },
            (error) => {
                this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                this.router.navigate(['/']);
            }
        );
    }

    onSubmit() {
        this.loading = true;
        this.userService.save(this.form.value).subscribe( () => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            //update session data on update profile
            this.sessionService.initialize();
            this.loading = false;
        });
    }

    private buildForm(){
        this.form = this.fb.group({
            id: [''],
            email: ['', Validators.compose([Validators.required, CustomValidators.email])],
            password: ['', Validators.required],

            // profile data
            profile: this.fb.group({
                id: [''],
                name: ['', Validators.required],
                lastname: ['', Validators.required],
                phone: [''],

                // timezone configurations
                use_local_timezone: [''],
                timezone: ['', Validators.required],

                // address (polymorphic)
                address: this.fb.group({
                    id: [''],
                    country_id: ['', Validators.required],
                    state_id: ['', Validators.required],
                    street: ['', Validators.required],
                    exterior_number: ['', Validators.required],
                    interior_number: [''],
                    colony: ['', Validators.required],
                    municipality_or_county: ['', Validators.required],
                    zip: [''],
                })
            }),

            // settings
            settings: this.fb.group({
                update_password: [0]
            }),
        });

        // update password validity on "update_password" checkbox change
        this.form.get('settings').valueChanges.subscribe( () => {
            let validators = (this.form.get('settings')['controls']['update_password'].value) ? [Validators.required] : [];
            this.form.get('password').setValidators(validators);
            this.form.get('password').updateValueAndValidity();
        });

        // automatic timze set validity
        this.form.get('profile')['controls']['use_local_timezone'].valueChanges.subscribe( use_local_timezone => {
            if(use_local_timezone){
                this.form.get('profile')['controls']['timezone'].disable();
            }else {
                this.form.get('profile')['controls']['timezone'].enable();
            }
        })
    }
}
