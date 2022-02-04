import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MessageProvider} from "../../../core/providers/message.provider";
import {TranslateService} from "@ngx-translate/core";
import {SettingService} from "../../../core/services/setting.service";

import * as moment from 'moment';
import {AppProvider} from "../../../core/providers/app.provider";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

    form: FormGroup;
    timezones: Array<any> = [];

    constructor(private fb: FormBuilder,
                private messageProvider: MessageProvider,
                private settingService: SettingService,
                private appProvider: AppProvider,
                public translate: TranslateService) {

        this.form = this.fb.group({
            id: [1],
            timezone: ['', Validators.required],
        });

        this.timezones = moment.tz.names();
    }

    ngOnInit() {
        this.settingService.get().subscribe( settings => {
            this.form.patchValue(settings);
        })
    }

    save() {
        this.settingService.save(this.form.value).subscribe( () => {
            this.messageProvider.show('SETTINGS_UPDATED');

            this.appProvider.refresh();
        });
    }
}
