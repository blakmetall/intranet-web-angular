import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MessageProvider} from "../../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {PermissionService} from "../../../../../core/services/permission.service";
import {RedirectProvider} from "../../../../../core/providers/redirect.provider";

@Component({
    selector: 'app-admin-permissions-groups-permission-form',
    templateUrl: './form.component.html',
})
export class PermissionFormComponent implements OnInit {

    id;
    permissionGroup;
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private PermissionService: PermissionService,
                public translate: TranslateService) {
        this.buildForm();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        const group_id = this.route.snapshot.paramMap.get('permission_group_id');
        this.form.get('user_permissions_group_id').patchValue(group_id);

        this.load();
    }

    load(){
        if(this.id){
            this.PermissionService.get(this.id).subscribe(
                (permissionGroup) => {
                    this.permissionGroup = permissionGroup;

                    if(this.id && permissionGroup){
                        this.form.patchValue(permissionGroup);
                    }
                },
                (error) => {
                    this.messageProvider.show('RECORD_NOT_FOUND', {error: true});
                    this.redirect.toListing(this.id, this.route);
                }
            );
        }
    }

    save() {
        this.PermissionService.save(this.form.value).subscribe( (permissionGroup) => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);
            this.permissionGroup = permissionGroup;

            if(!this.id){
                this.redirect.toEditForm(permissionGroup.id, this.route);
            }
        });
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            user_permissions_group_id: ['', Validators.required],
            slug: ['', Validators.required],
            name: ['', Validators.required],
        });
    }
}
