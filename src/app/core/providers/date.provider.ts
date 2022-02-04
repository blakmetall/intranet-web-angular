import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {AuthProvider} from "./auth.provider";

@Injectable()
export class DateProvider {

    constructor(
        private auth: AuthProvider
    ) {}

    getUserTz(){
        return this.auth.getTimezone();
    }

    fromUTCtoMoment(date){
        let datetime = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');
        return datetime;
    }

    // receives a date in UTC and returns in User timezone
    fromUTCtoTZ(date){
        let tz = this.auth.getTimezone();
        let datetime = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');
        datetime.tz(tz);

        return datetime;
    }
}