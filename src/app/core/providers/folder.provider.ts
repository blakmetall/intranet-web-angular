import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";
import {Observable} from "rxjs/Observable";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {filter} from "rxjs/internal/operators";
import {FolderService} from "../services/folder.service";
import {AuthProvider} from "./auth.provider";
import {FileService} from "../services/file.service";

@Injectable()
export class FolderProvider {

    breadcrumbs;
    folders;
    files;
    //features = []; // categories list

    searchFilter; // search data to filter

    // checks for polymorphic data changes
    polymorphicDataChange = new BehaviorSubject<any>({});
    get polymorphicData(): any { return this.polymorphicDataChange.value; }
    set polymorphicData(data) { this.polymorphicDataChange.next(data); }

    // checks for rootFolder id changes
    rootFolderID_DataChange = new BehaviorSubject<any>({});
    get rootFolderID(): any { return this.rootFolderID_DataChange.value; }
    set rootFolderID(data) { this.rootFolderID_DataChange.next(data); }

    // checks for regular folder id changes
    folderID_DataChange = new BehaviorSubject<any>(0);
    get folderID(): any { return this.folderID_DataChange.value; }
    set folderID(data) { this.folderID_DataChange.next(data); }

    // checks for feature changes
    features_DataChange = new BehaviorSubject<any>([]);
    get features(): any { return this.features_DataChange.value; }
    set features(data) { this.features_DataChange.next(data); }

    // this reloadControl event controller (by incrementing the reloader)
    reloadControl = new BehaviorSubject<any>(0);
    get reloader(): any { return this.reloadControl.value; }
    set reloader(increment) { this.reloadControl.next(increment); }

    constructor(private folderService: FolderService,
                private fileService: FileService,
                private authProvider: AuthProvider) {

        this.folderID_Change().subscribe( (folderID) => {
            this.folderService.getBreadcrumbs(folderID).subscribe( breadcrumbs => {
                this.breadcrumbs = breadcrumbs;
            });

            this.folderService.getChilds(folderID, this.searchFilter).subscribe(folders => {
                this.folders = folders;
            });

            this.fileService.getFromFolder(folderID, this.searchFilter).subscribe( files => {
                this.files = files;
            });
        });

        this.polymorphicData_Change().subscribe( () => {
            this.getRootFolderID();
            this.getRootFolderFeatures();
        });

        this.reloadChange().subscribe( () => {
            this.folderService.getBreadcrumbs(this.folderID).subscribe( breadcrumbs => {
                this.breadcrumbs = breadcrumbs;
            });

            this.folderService.getChilds(this.folderID, this.searchFilter).subscribe(folders => {
                this.folders = folders;
            });

            this.fileService.getFromFolder(this.folderID, this.searchFilter).subscribe( files => {
                this.files = files;
            });
        })


        /*
        this.folderProvider.rootFolderID_Change().subscribe( () => {
            this.folderProvider.getRootFolderID()
        });
        */
    }

    polymorphicData_Change() : Observable<any>{
        return this.polymorphicDataChange.asObservable().pipe(
            distinctUntilChanged(),
            debounceTime(100),
            filter(data => (data.id && data.type)) // this filter ensures id and type is on json data to be returned
        );
    };

    rootFolderID_Change() : Observable<any>{
        return this.rootFolderID_DataChange.asObservable().pipe(
            distinctUntilChanged(),
            filter( data => (data))
        );
    };

    folderID_Change() : Observable<any>{
        return this.folderID_DataChange.asObservable().pipe(
            distinctUntilChanged(),
            debounceTime(100),
            filter(data => (data))
        );
    };

    features_Change() : Observable<any>{
        return this.features_DataChange.asObservable().pipe(
            distinctUntilChanged(),
        );
    };

    reloadChange(): Observable<any>{
        return this.reloadControl.asObservable().pipe(
            distinctUntilChanged(),
            debounceTime(500),
            filter( increment => (increment > 0))
        )
    }

    getRootFolderID(){
        const id = this.polymorphicData.id;
        const type = this.polymorphicData.type;

        if(! (id && type) ) return; // simple folder id and type validation

        this.folderService.getRoot(id, type).subscribe(rootFolder => {
            // triggers folder events
            this.folderID = rootFolder.id;
        });
    }

    getRootFolderFeatures(){
        const id = this.polymorphicData.id;
        const type = this.polymorphicData.type;
        this.folderService.getRootFolderAvailableFeatures(id, type).subscribe( features => {
            this.features = features;
        });
    }

    canOpen(folder){
        if(folder.is_private  && (this.authProvider.isAdmin() || this.isOwner(folder) || this.isPermitted(folder))){
            return true;
        }else if(!folder.is_private){
            return true;
        }

        return false;
    }

    canEdit(folder){
        if(folder.is_private  && (this.authProvider.isAdmin() || this.isOwner(folder) )){
            return true;
        }else if(!folder.is_private){
            return true;
        }
        return false;
    }

    canDelete(folder){
        if(folder.is_private  && (this.authProvider.isAdmin() || this.isOwner(folder) )){
            return true;
        }else if(!folder.is_private){
            return true;
        }

        return false;
    }

    // unlock if user has permissions for this folder
    isPermitted(folder){
        if(!folder.is_private){ return true; }

        for(let permission of folder.permissions){
            if(permission.pivot.user_id == this.authProvider.user.id){
                return true;
            }
        }

        return false;
    }

    isOwner(folder){
        return (this.authProvider.user.id == folder.user_owner_id) ? true : false;
    }

    reload(){
        this.reloader = this.reloader + 1;
    }

    setSearchFilter(data){
        this.searchFilter = data;
    }

    clearData() {
        this.breadcrumbs = null;
        this.folders = null;
        this.files = null;
        this.features = [];
        this.searchFilter = null;
    }

}
