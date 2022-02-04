import {Component} from '@angular/core';
import {MatDialog} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import {FolderProvider} from "../../../core/providers/folder.provider";
import {FolderFormComponent} from "../folder-form/folder-form.component";
import {FilesFormComponent} from "../files-form/files-form.component";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/internal/operators";
import {FolderService} from "../../../core/services/folder.service";

@Component({
    selector: 'app-folder-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class FolderActionsComponent {

    searchForm: FormGroup;
    searchBoxEnabled:boolean;


    get features() { return this.searchForm.get('features') as FormArray; }

    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        private folderService: FolderService,
        public folderProvider: FolderProvider,
        public translate: TranslateService) {

        this.searchBoxEnabled = false;

        this.buildSearchForm();
        this.initSearchFormEvents();

        this.folderProvider.features_Change().subscribe( (features) => {
            this.addFeaturesFilter(features);
        });
    }

    loadFolderFormComponent(){
        const dialogRef = this.dialog.open(FolderFormComponent, {
            width: '500px',
            height: '600px'
        });
        dialogRef.afterClosed().subscribe( success => {
            if(success){
                this.folderProvider.reload();
            }
        })
    }

    loadFilesFormComponent(){
        const dialogRef = this.dialog.open(FilesFormComponent, {
            width: '1000px',
            height: '700px',
            data: {
                folderID: this.folderProvider.folderID
            }
        });

        dialogRef.afterClosed().subscribe( (success) => {
            if(success){
                this.folderProvider.reload();
            }
        })
    }

    buildSearchForm(){
        this.searchForm = this.fb.group({
            search: [''],
            is_private: [''],

            features: this.fb.array([])
        });
    }
    
    initSearchFormEvents(){
        this.searchForm.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
        ).subscribe( formData => {
            this.folderProvider.setSearchFilter(formData);
            this.folderProvider.reload();
        });
    }

    toggleSearchBox(){
        this.searchBoxEnabled = ! this.searchBoxEnabled;
    }

    addFeaturesFilter(features){
        for(let feature of features){
            let featureForm = this.fb.group({
                id: [feature.id],
                is_enabled: [''],
                name_es: [feature.name_es],
                name_en: [feature.name_en],
            });

            this.features.push(featureForm);
        }
    }
}
