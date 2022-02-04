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
    selector: 'app-files-form',
    templateUrl: './files-form.component.html',
    styleUrls: ['./files-form.component.scss']
})
export class FilesFormComponent implements OnInit {

    uploader: FileUploader;
    folderID;

    form: FormGroup;


    get features() { return this.form.get('features') as FormArray;}

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FilesFormComponent >,
        private messageProvider: MessageProvider,
        private fileService: FileService,
        public folderProvider: FolderProvider,
        private auth: AuthProvider,
        public translate: TranslateService
    ) {
        // get folderID to save files
        if(data && data.folderID){
            this.folderID = data.folderID;
        }

        // uploader configuration
        this.uploader = new FileUploader({
            url: this.fileService.uploadToFolderBasePath + this.folderID,
        });

        // adds token to file upload
        this.uploader.onBeforeUploadItem = (item: FileItem) => {
            item.withCredentials = false; // required
            this.uploader.authToken = 'Bearer ' + this.auth.getPassportToken();
        };

        // after adding a file to queue
        this.uploader.onAfterAddingFile = (item: FileItem)  => {
            this.refreshQueue();
        };

        // initialize form for features and "is_featured" flag
        this.form = this.fb.group({
            is_featured: [''],
            features: this.fb.array([]),
            flip_page_enabled: ['']
        });

        // add global features on saved file
        this.uploader.onSuccessItem = (item: FileItem, res: any, status: number, headers: ParsedResponseHeaders) => {
            res = JSON.parse(res);
            if(res.success && res.file && res.file.id){

                // update features for the files (if settled)
                let hasFeatures = false;
                for(let feature of this.form.value.features){
                    if(feature.enabled){
                        hasFeatures = true;
                    }
                }
                if(hasFeatures){
                    this.fileService.updateFeatures(res.file.id, this.form.value).subscribe( () => {
                        if(this.uploader.progress == 100){
                            this.folderProvider.reload();
                        }
                    });
                }

                // update is_featured flag
                if(this.form.get('is_featured').value){
                    this.fileService.updateFeaturedStatus(res.file.id, this.form.value).subscribe( () => {
                        if(this.uploader.progress == 100) {
                            this.folderProvider.reload();
                        }
                    });
                }

                // update flip_page_status flag
                if(this.form.get('flip_page_enabled').value){
                    this.fileService.updateFlipPageStatus(res.file.id, this.form.value).subscribe( () => {
                        if(this.uploader.progress == 100) {
                            this.folderProvider.reload();
                        }
                    });
                }
            }

            // close on upload
            if(this.uploader.progress == 100){
                this.messageProvider.show('FILES_UPLOADED');
                this.dialogRef.close(true);
            }
        };
    }

    ngOnInit() {
       this.buildFeaturesForm();
    }

    uploadAll(){
        this.uploader.uploadAll();
    }

    cancelAll(){
        this.uploader.cancelAll();
    }

    clearQueue(){
        this.uploader.clearQueue();
    }

    removeFromQueue(row){
        this.uploader.removeFromQueue(row);
        this.refreshQueue();
    }

    refreshQueue(){
        const tempQueue = this.uploader.queue;
        this.uploader.queue = [];
        this.uploader.queue = [...tempQueue];
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

    featureForm_addFeatureOption(feature){
        let featureForm = this.fb.group({
            id: [feature.id],
            enabled: [''],
            name_en: [feature.name_en],
            name_es: [feature.name_es],
        });
        this.features.push(featureForm);
    }
}