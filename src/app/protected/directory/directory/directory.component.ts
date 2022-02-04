import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../core/services/user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-admin-directory',
    templateUrl: './directory.component.html',
    styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

    directory;
    directoryTmp;
    filterOptions = [];

    search : any = '';
    search$ : BehaviorSubject<string>;

    constructor( public translate: TranslateService, private userService :  UserService ) {

        this.filterOptions = [
            { name: 'ALL', value: 'all', checked: true},
            { name: 'EXTERNAL', value: 'external', checked: false},
            { name: 'INTERNAL', value: 'internal', checked: false},
        ];

        this.search$ = new BehaviorSubject( '' );
        this.search$.asObservable().pipe(
            debounceTime(350),
            distinctUntilChanged()
        ).subscribe(search => {
            this.userService.getDirectory(search).subscribe((directory)=>{
                this.directory = directory;
                this.directoryTmp = directory;
            });
        });
    }

    ngOnInit() {
        this.userService.getDirectory().subscribe((directory)=>{
            this.directory = directory;
            this.directoryTmp = directory;
        });
    }
    
    filterDirectory(option){
        if(option.value == 'all'){
            this.directory = this.directoryTmp;
        }else if(option.value == 'external' || option.value == 'internal'){
            this.directory = [];

            for(let item of this.directoryTmp){
                if( (option.value == 'external' && item.profile.is_external) ||
                    (option.value == 'internal' && !item.profile.is_external) ){

                    this.directory.push(item);
                }
            }
        }
    }

    searchDirectory(search){
        this.search$.next(search);
    }
}
