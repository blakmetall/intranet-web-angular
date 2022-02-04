import {Injectable} from '@angular/core';
import {SettingService} from "../services/setting.service";
import {MAHGAZINE_TEMPLATES} from "../constants/mahgazine.templates";

@Injectable()
export class AppProvider {

    // app configurations
    folderSectionID = '1';
    //myFilesSectionID = '2'; (to be used for user_files section if needed)

    mahgazine_templates = [];


    settings:any;
    timezone:any;

    dateFormat:string;
    timeFormat:string;
    dateTimeFormat:string;

    constructor(private settingService: SettingService) {
        this.dateFormat = 'YYYY-MM-DD';
        this.timeFormat = 'HH:mm';
        this.dateTimeFormat = 'YYYY-MM-DD HH:mm';

        this.mahgazine_templates = MAHGAZINE_TEMPLATES;

        this.load()
    }

    load(){
        this.settingService.get().subscribe( settings => {
            this.settings = settings;
            this.timezone = settings.timezone || null;
        });
    }

    refresh(){
        this.load();
    }
}