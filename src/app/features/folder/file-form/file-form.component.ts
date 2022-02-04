import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MessageProvider} from "../../../core/providers/message.provider";
import {AuthProvider} from "../../../core/providers/auth.provider";
import {FileItem, FileUploader} from "ng2-file-upload";
import {FileService} from "../../../core/services/file.service";
import {FolderProvider} from "../../../core/providers/folder.provider";
import {ParsedResponseHeaders} from "ng2-file-upload/file-upload/file-uploader.class";

@Component({
    selector: 'app-file-form',
    templateUrl: './file-form.component.html',
    styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

    uploader: FileUploader;

    form: FormGroup;
    file;


    get features() { return this.form.get('features') as FormArray;}

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FileFormComponent >,
        private messageProvider: MessageProvider,
        private fileService: FileService,
        public folderProvider: FolderProvider,
        private auth: AuthProvider,
        public translate: TranslateService
    ) {

        // initialize form for features and "is_featured" flag
        this.form = this.fb.group({
            id: [''],
            is_featured: [''],
            features: this.fb.array([]),
            flip_page_enabled: ['']
        });

        // get folderID to save files
        if(data && data.file){
            this.file = data.file;
            this.form.get('id').patchValue(this.file.id);
        }

        // uploader configuration
        this.uploader = new FileUploader({
            url: this.fileService.updateBasePath + this.file.id,
        });

        // adds token to file upload
        this.uploader.onBeforeUploadItem = (item: FileItem) => {
            item.withCredentials = false; // required
            this.uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };

        this.uploader.onCompleteAll = () => {
            this.uploader.clearQueue();
            this.messageProvider.show('FILE_UPDATED');
        };

        this.uploader.onCompleteItem = (item: FileItem, res: any) => {
            res = JSON.parse(res);
            if(res.success && res.file && res.file.id) {
                this.file = res.file;
                this.messageProvider.show('FILE_UPDATED');
            }
        };
    }

    ngOnInit() {
        this.buildFeaturesForm();
        this.populateForm();
    }

    buildFeaturesForm(){
        setTimeout(() => {
            if(this.folderProvider.features && this.folderProvider.features.length){
                for(let feature of this.folderProvider.features){
                    this.featureForm_addFeatureOption(feature);
                }
            }
        }, 250);
    }

    populateForm(){
        if(this.file){
            this.form.get('is_featured').patchValue( this.file.is_featured );
            this.form.get('flip_page_enabled').patchValue( this.file.flip_page_enabled );
        }
    }

    featureForm_addFeatureOption(feature){
        let featureForm = this.fb.group({
            id: [feature.id],
            enabled: [''],
            name_en: [feature.name_en],
            name_es: [feature.name_es],
        });

        // retrieve old features from file
        if(this.file.features && this.file.features.length){
            for(const feature of this.file.features){
                if(feature.id == featureForm.get('id').value){
                    featureForm.get('enabled').patchValue(true);
                }
            }
        }

        this.features.push(featureForm);
    }

    update(){
        // update features and form fields
        this.fileService.edit(this.form.value).subscribe( (res) => {
            if(res.success && !this.uploader.queue.length){
                this.messageProvider.show('FILE_UPDATED');
            }
        });

        // upload file
        this.uploader.uploadAll();
    }
}