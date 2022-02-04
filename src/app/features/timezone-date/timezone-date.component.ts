import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthProvider} from "../../core/providers/auth.provider";
import {AppProvider} from "../../core/providers/app.provider";
import * as moment from 'moment';

@Component({
    selector: 'app-timezone-date',
    templateUrl: './timezone-date.component.html',
    styleUrls: ['./timezone-date.component.scss']
})
export class TimezoneDateComponent implements OnInit, OnChanges {

    @Input() date : any;
    @Input() time : any;

    _date:any;
    _time:any;

    timezone_date:any;

    constructor(
        public appProvider: AppProvider,
        public auth: AuthProvider,
        public translate: TranslateService
    ) {}

    ngOnInit(){
        this._date = this.date;
        this._time = this.time;

        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes.date){
            let tmp = changes.date.currentValue;
            let date = moment(tmp);
            if(date.isValid()){
                this._date = date.format(this.appProvider.dateFormat);
            }
        }

        if(changes.time){
            this._time = changes.time.currentValue;
        }

        this.refresh();
    }

    private refresh(){
        let date = this._date;
        let time = this._time;

        let format:string = this.appProvider.dateFormat;

        if(time){
            date +=  (' ' + time);
            format = this.appProvider.dateTimeFormat;
        }

        date = moment(date, format);

        if(date.isValid()){
            this.timezone_date = date;
        }
    }
    
}
