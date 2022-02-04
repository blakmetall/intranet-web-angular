import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {EventService} from "../../../core/services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../core/providers/message.provider";
import {RedirectProvider} from "../../../core/providers/redirect.provider";
import {HotelService} from "../../../core/services/hotel.service";
import {AuthProvider} from "../../../core/providers/auth.provider";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {forkJoin} from "rxjs/index";

@Component({
    selector: 'app-event-form',
    templateUrl: './form.component.html',
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'YYYY-MM-DD',
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            }
        },
    ],
})
export class EventFormComponent implements OnInit{

    id;
    event;
    form: FormGroup;
    categories;

    selected;
    start;
    end;
    is_private = 0;

    hotels = [];

    loading = false;

    constructor(
            private router: Router,
            public route: ActivatedRoute,
            private messageProvider: MessageProvider,
            public redirect: RedirectProvider,
            private datePipe: DatePipe,
            private eventService: EventService,
            private hotelService: HotelService,
            private fb: FormBuilder,
            private auth: AuthProvider,
            public translate: TranslateService) {

        this.buildForm();
    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.selected = 1;
        this.load();
    }

    load(){
        this.loading = true;

        let loader = [];
        loader.push( this.eventService.getCategories({}) );
        loader.push( this.hotelService.all({}) );
        if(this.id){
            loader.push( this.eventService.get(this.id) );
        }

        forkJoin(loader).subscribe(([categories, hotels, event]) => {
            this.categories = categories;
            this.hotels = [{id: 0, name: 'ALL_HOTELS'}, ...hotels];

            // if edit
            if(event){
                this.event = event;

                // start date and time (with user timezone swap)
                let start_datetime = moment.utc(event.start_datetime, 'YYYY-MM-DD HH:mm:ss');
                start_datetime.tz(this.auth.getTimezone());
                this.event.start_date = start_datetime.format('YYYY-MM-DD');
                this.event.start_time = start_datetime.format('HH:mm');

                // end date and time (with user timezone swap)
                let end_datetime = moment.utc(event.end_datetime, 'YYYY-MM-DD HH:mm:ss');
                end_datetime.tz(this.auth.getTimezone());
                this.event.end_date = end_datetime.format('YYYY-MM-DD');
                this.event.end_time = end_datetime.format('HH:mm');

                this.form.patchValue(this.event);
            }

            this.loading = false;
        });
    }

    save() {
        if(this.form.get('is_private').value){
            this.form.get('hotel_id').patchValue(0);
        }

        this.loading = true;
        this.eventService.save(this.form.value).subscribe( event => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);
            this.event = event;
            this.loading = false;

            if(!this.id){
                this.redirect.toEditForm(event.id, this.route);
            }
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            events_calendar_category_id: ['', Validators.required],
            hotel_id: [0],
            is_private: [0],
            name: ['', Validators.required],
            description: ['', Validators.required],
            start_date: ['', Validators.required],
            start_time: ['', Validators.required],
            end_date: ['', Validators.required],
            end_time: ['', Validators.required],
            is_finished: [''],
        });
    }

}
