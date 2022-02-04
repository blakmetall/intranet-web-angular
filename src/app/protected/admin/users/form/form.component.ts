import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {forkJoin} from "rxjs/index";

import { UserService} from "../../../../core/services/user.service";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {CompanyService} from "../../../../core/services/company.service";
import {HotelService} from "../../../../core/services/hotel.service";
import {UserRolService} from "../../../../core/services/user.rol.service";
import {PermissionsGroupService} from "../../../../core/services/permissions.group.service";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";
import {AuthProvider} from "../../../../core/providers/auth.provider";
import {AppProvider} from "../../../../core/providers/app.provider";

import * as moment from 'moment';
import {SessionService} from "../../../../core/services/session.service";

@Component({
    selector: 'app-admin-users-form',
    templateUrl: './form.component.html',
})
export class UserFormComponent implements OnInit {

    id;
    user;
    userRolesList;
    hotels;
    companies;
    form: FormGroup;

    permissionsGroups;

    timezones: Array<any>;

    localTimezone: string;

    loading = false;

    get permissions() { return this.form.get('permissions') as FormArray;}

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private userService: UserService,
                private permissionsGroupService: PermissionsGroupService,
                private companyService: CompanyService,
                private hotelService: HotelService,
                private userRolService: UserRolService,
                public auth: AuthProvider,
                public appProvider: AppProvider,
                private sessionService: SessionService,
                public translate: TranslateService) {

        this.localTimezone = moment.tz.guess();
        this.timezones = moment.tz.names();
        this.buildForm();

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;

        let loader = [];
        loader.push( this.companyService.all({}) );
        loader.push( this.hotelService.all({}) );
        loader.push( this.userRolService.all({}) );

        loader.push( this.permissionsGroupService.all({
            withPermissions: 1
        }));

        if(this.id){
            this.form.get('settings')['controls']['update_password'].patchValue(0);
            loader.push( this.userService.get(this.id) );
        }

        forkJoin(loader).subscribe(
            ([companies, hotels, userRolesList, permissionsGroups, user]) => {
                this.verifySuperAdminEditPermission(user);

                this.hotels = hotels;
                this.companies = companies;
                this.permissionsGroups = permissionsGroups;
                this.user = user;

                // fill form
                if(this.id && this.user){
                    if(!this.user.profile.address){
                        this.user.profile.address = {};
                    }

                    this.form.patchValue(this.user);
                }

                let allowSuper = false;
                if(this.id){
                    allowSuper = true;
                }
                // prepare user rol select
                let roles = [];
                if(this.user && this.user.role.slug != 'super'){
                    for(let rol of userRolesList){
                        if(rol.slug != 'super'){
                            roles.push(rol);
                        }
                    }
                }else{
                    for(let rol of userRolesList){
                        if(rol.slug != 'super'){
                            roles.push(rol);
                        }else if(allowSuper){
                            roles.push(rol);
                        }
                    }
                }
                this.userRolesList = roles;

                // prepare permissions controls
                if(this.user && this.user.permissions){
                    this.resetPermissions();
                    for(let permission of this.user.permissions){
                        this.addPermission(permission);
                    }
                }

                this.loading = false;
            },
            (error) => {
                this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                this.redirect.toListing(this.id, this.route);
                this.loading = false;
            }
        );
    }

    save() {
        this.loading = true;
        this.userService.save(this.form.value).subscribe( user => {
                let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
                this.messageProvider.show(message);
                this.user = user;

                if(!this.id){
                    this.redirect.toEditForm(user.id, this.route);
                }

                // if updating the current user, update session data
                if(this.id){
                    this.sessionService.initialize();
                }

                this.loading = false;
            }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            email: ['', Validators.compose([Validators.required, CustomValidators.email])],
            password: ['', Validators.required],
            is_enabled: [''],
            user_role_id: ['', Validators.required],

            // profile data
            profile: this.fb.group({
                id: [''],
                is_external: [''],
                hotel_id: [''],
                company_id: [''],
                job_title: ['', Validators.required],
                name: ['', Validators.required],
                lastname: ['', Validators.required],
                phone: [''],
                external_brandsite_enabled: [''],
                external_mahgazine_enabled: [''],
                is_directory_enabled: [''],

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

            permissions: this.fb.array([]),

            // settings
            settings: this.fb.group({
                update_password: [1]
            }),
        });

        // update password validity on "update_password" checkbox change
        this.form.get('settings').valueChanges.subscribe( () => {
            let validators = (this.form.get('settings')['controls']['update_password'].value) ? [Validators.required] : [];
            this.form.get('password').setValidators(validators);
            this.form.get('password').updateValueAndValidity();
        });

        // automatic timezone set validity
        this.form.get('profile')['controls']['use_local_timezone'].valueChanges.subscribe( use_local_timezone => {
            if(use_local_timezone){
                this.form.get('profile')['controls']['timezone'].disable();
            }else {
                this.form.get('profile')['controls']['timezone'].enable();
            }
        })
    }

    resetPermissions(){
        while (this.permissions.length !== 0) {
            this.permissions.removeAt(0)
        }
    }

    addPermission(permission?){
        const form = this.fb.group({
            id: [permission.id, Validators.required],
        });

        this.permissions.push(form);
    }

    // check if permission is added to main form
    permissionEnabled(permission){
        for(let formPermission of this.form.get('permissions').value){
            if(permission.id == formPermission.id){
                return true;
            }
        }

        return false;
    }

    removePermission(permission){
        for(let i in this.form.get('permissions').value){
            const index = parseInt(i);
            const formPermission = this.form.get('permissions').value[index];
            if(permission.id == formPermission.id){
                this.permissions.removeAt(index);
                return;
            }
        }
    }

    verifySuperAdminEditPermission(user){
        if(user && user.role && user.role.slug == 'super' && user.id != this.auth.user.id){
            this.router.navigate(['./']);
        }
    }
}
