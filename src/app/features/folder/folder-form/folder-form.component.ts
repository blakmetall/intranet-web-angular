import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from "@ngx-translate/core";
import {FolderProvider} from "../../../core/providers/folder.provider";
import {FolderService} from "../../../core/services/folder.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MessageProvider} from "../../../core/providers/message.provider";
import {UserService} from "../../../core/services/user.service";
import {forkJoin} from "rxjs/index";
import {AuthProvider} from "../../../core/providers/auth.provider";

@Component({
    selector: 'app-folder-form',
    templateUrl: './folder-form.component.html',
})
export class FolderFormComponent implements OnInit {

    id;
    folder;
    form: FormGroup;

    users;

    get folderPermissions(): FormArray { return this.form.get('settings')['controls']['folderPermissions'] as FormArray; }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<FolderFormComponent >,
        private fb: FormBuilder,
        private messageProvider: MessageProvider,
        private userService: UserService,
        private folderService: FolderService,
        public folderProvider: FolderProvider,
        private authProvider: AuthProvider,
        public translate: TranslateService
    ) {

        if(data){
            this.folder = data.folder || '';
            if(this.folder){
                this.id = this.folder.id;
            }
        }

        this.buildForm();
    }

    ngOnInit() {
        this.form.get('polymorphic_id').patchValue( this.folderProvider.folderID );

        // manual patch to avoid overwrite polymorphic_id && polymorphic_type
        if(this.id){
            this.form.get('id').patchValue(this.id);
            this.form.get('name').patchValue(this.folder.name);
            this.form.get('is_private').patchValue(this.folder.is_private);
            this.form.get('is_featured').patchValue(this.folder.is_featured);
        }

        this.load();
    }

    load(){
        let loader = [];

        loader.push( this.userService.all({
            withProfile: 1,
            withRole: 1
        }) );

        if(this.id) {
            loader.push(this.folderService.getUsersPermitted(this.id));
        }

        forkJoin(loader).subscribe(([users, usersPermitted]) => {
            this.users = users;
            this.form_addUserPermissionOptions(users);
            this.form_enablePermissionsTo(usersPermitted);
        });
    }

    save(){
        this.folderService.save(this.form.value).subscribe( folder => {
            const msg = this.id ? 'FOLDER_UPDATED' : 'FOLDER_ADDED';
            this.messageProvider.show( msg );

            this.folder = folder;
            this.folderProvider.reload(); // reloads data by incrementing

            this.dialogRef.close(true);
        });
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            polymorphic_id: ['', Validators.required],
            polymorphic_type: ['Folder'],

            name: ['', Validators.required],
            is_private: [''],
            is_featured: [''],

            settings: this.fb.group({
                folderPermissions: this.fb.array([])
            }),
        });
    }

    form_addUserPermissionOptions(users){
        if(users.length){
            for(let user of users){
                this.form_addUserPermissionOption(user);
            }
        }
    }

    form_addUserPermissionOption(user){
        if(!this.form_isPermissionOptionEnabled(user)){ return; }

        let permissionOptionForm = this.fb.group({
            id: [ user.id ],
            is_permitted: [''],
            name: [ user.profile.name ],
            lastname: [ user.profile.lastname ],
        });

        this.folderPermissions.push(permissionOptionForm);
    }

    form_enablePermissionsTo(users){
        if(users && users.length){
            let folderPermissions = this.folderPermissions.getRawValue();

            for(let user of users){

                // enable folder permissions on permitted users
                for(let i in folderPermissions){
                    let current = folderPermissions[i];
                    if(current.id == user.id){
                        folderPermissions[i].is_permitted = true;
                    }
                }

            }

            this.form.get('settings')['controls']['folderPermissions'].patchValue(folderPermissions);
        }
    }

    // hide owner option for private users for the folder
    form_isPermissionOptionEnabled(user){
        if(this.folder && this.folder.owner && this.folder.owner.id == user.id){
            return false;
        }else if(!this.folder && user.id == this.authProvider.user.id){
            return false;
        }else if(user.role && (user.role.slug == 'super' || user.role.slug == 'admin')){
            return false;
        }

        return true;
    }
}