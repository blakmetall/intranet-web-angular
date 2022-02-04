import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MessageProvider} from "../../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {PermissionsGroupService} from "../../../../core/services/permissions.group.service";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";

@Component({
    selector: 'app-admin-permission-group-form',
    templateUrl: './form.component.html',
})
export class PermissionGroupFormComponent implements OnInit {

    id;
    permissionGroup;
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                public route: ActivatedRoute,
                private messageProvider: MessageProvider,
                public redirect: RedirectProvider,
                private permissionsGroupService: PermissionsGroupService,
                public translate: TranslateService) {
        this.buildForm();
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        if(this.id){
            this.permissionsGroupService.get(this.id).subscribe(
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
        this.permissionsGroupService.save(this.form.value).subscribe( (permissionGroup) => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            if(!this.id){
                this.redirect.toEditForm(permissionGroup.id, this.route);
            }
        });
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            is_administrative_group: [''],
        });
    }
}
