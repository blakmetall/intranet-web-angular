import {Injectable} from '@angular/core';

@Injectable()
export class EventsProvider {

    start_date;
    end_date;

    constructor() {}

    getStartDate(){
        return this.start_date;
    }

    setStartDate(start_date){
        this.start_date = start_date;
    }

    getEndDate(){
        return this.end_date;
    }

    setEndDate(end_date){
        this.end_date = end_date;
    }
}