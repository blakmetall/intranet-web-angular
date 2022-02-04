import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from '@angular/material';
import {Subject} from 'rxjs/Subject';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';

import * as moment from 'moment';
import {Moment} from "moment";

import {EventService} from "../../../core/services/event.service";

import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {MessageProvider} from "../../../core/providers/message.provider";
import {TaskService} from "../../../core/services/task.service";

import {forkJoin} from 'rxjs/index';
import {AuthProvider} from "../../../core/providers/auth.provider";
import {EventsProvider} from "../../../core/providers/events.provider";

@Component({
    selector: 'app-events',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {


    // calendar controls
    calendar: CalendarEvent[] = [];
    view = 'month';
    //viewIcon = 'view_module'; // for month icon start
    viewDate: Date;
    activeDayIsOpen = false;
    refresh: Subject<any>;
    actions: CalendarEventAction[];
    actions_private: CalendarEventAction[];

    // date controls for calendar
    start_date_control : BehaviorSubject<string>;
    start_date: Moment;
    end_date: Moment;

    isLoading = false;

    //Data session services
    currentUser;

    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private taskService: TaskService,
                private authProvider: AuthProvider,
                private eventsProvider: EventsProvider,
                private messageProvider: MessageProvider,
                public eventService: EventService) {

        this.refresh = new Subject();

        this.viewDate = new Date();
        this.start_date_control = new BehaviorSubject( '' );

        this.actions = [
            {
                label: '<i class="viewButton"></i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    if(event.meta.type == 'event'){
                        this.router.navigate([ 'view/' + event.meta.activity.id ], {relativeTo: this.route});
                    }else{
                        this.router.navigate(['/tasks/view/' + event.meta.activity.id]);
                    }
                }
            },
            {
                label: '<i class="editButton"></i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    if(event.meta.type == 'event'){
                        this.router.navigate([ 'form/' + event.meta.activity.id ], {relativeTo: this.route});
                    }else{
                        this.router.navigate(['/tasks/form/' + event.meta.activity.id]);
                    }
                }
            },
            {
                label: '<i class="deleteButton"></i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.delete(event);
                }
            }
        ];
        this.actions_private = [
            {
                label: '<i class="viewButton"></i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    if(event.meta.type == 'event'){
                        this.router.navigate([ 'view/' + event.meta.activity.id ], {relativeTo: this.route});
                    }else{
                        this.router.navigate(['/tasks/view/' + event.meta.activity.id]);
                    }
                }
            }
        ];

        this.startDateChange().subscribe( () => {
            this.load();
        });

        this.viewDate = moment().toDate();
        this.start_date = moment();
        this.end_date = moment();
        this.start_date_control.next( moment().format('YYYY-MM-DD') );
    }

    ngOnInit() {
        if(this.eventsProvider.getStartDate()){
            this.viewDate = this.eventsProvider.getStartDate().add(15, 'days').toDate();
            this.start_date = this.eventsProvider.getStartDate();
            this.end_date = this.eventsProvider.getEndDate();
            this.start_date_control.next( this.eventsProvider.getStartDate().format('YYYY-MM-DD') );
        }
    }

    startDateChange(): Observable<string>{
        return this.start_date_control.asObservable().pipe(
            distinctUntilChanged(),
            debounceTime(500)
        );
    };

    // activated when calendar is rendered
    beforeMonthViewRender(event){
        if(this.start_date){
            this.start_date = moment(event.period.start);
            this.end_date = moment(event.period.end);
            this.start_date_control.next( moment(event.period.start).format('YYYY-MM-DD') );

            this.currentUser = this.authProvider.getUser();
        }
    }

    load(){
        if( !this.start_date ) return;

        this.calendar = [];
        let loader = [];

        // events request
        loader.push( this.eventService.all({
            start_date: this.start_date.format('YYYY-MM-DD'),
            end_date: this.end_date.format('YYYY-MM-DD'),
        }));

        // tasks request
        loader.push(this.taskService.all({
            start_date: this.start_date.format('YYYY-MM-DD'),
            end_date: this.end_date.format('YYYY-MM-DD'),
            filterByLoggedUser: 1,
            isPinnedToCalendar: 1
        }));

        this.isLoading = true;
        this.activeDayIsOpen = false; // close gray rectangle on change month

        forkJoin(loader).subscribe(([events, tasks]) => {
            this.eventsProvider.setStartDate(this.start_date);
            this.eventsProvider.setEndDate(this.end_date);

            this.isLoading = false;
            this.refresh.next([]);

            this.loadActivities(events, 'event');
            this.loadActivities(tasks, 'task');
        });
    }

    // load the activities (events or tasks to calendar)
    loadActivities(activities, type) {
        if ( !activities ) { return  '';}

        for (let activity of activities) {
            let actions;

            // select button actions on calendar activity
            if (
                   activity.user_id  === this.currentUser.id // if owner of event
                || activity.owner_user_id === this.currentUser.id // if owner of task
                || this.authProvider.isAdmin() // if admin
                || (this.authProvider.isCorporative() && !activity.is_private && activity.hotel_id == 0)
                || activity.assigned_user_id === this.currentUser.id) // if assigned to task
            {
                actions = this.actions;
            }else{
                actions = this.actions_private;
            }

            let defaultColor = (type == 'event') ? '#333333' : '#b3b3b3';

            let start_datetime:any;
            let end_datetime:any;

            // prepare activity dates with profile timezone
            if(type == 'event'){
                start_datetime = moment.utc(activity.start_datetime, 'YYYY-MM-DD HH:mm:ss');
                start_datetime.tz(this.authProvider.getTimezone());

                end_datetime = moment.utc(activity.end_datetime, 'YYYY-MM-DD HH:mm:ss');
                end_datetime.tz(this.authProvider.getTimezone());
            }else if(type == 'task') {
                start_datetime = moment(activity.start_date + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
                //start_datetime.tz(this.authProvider.getTimezone());

                if(activity.end_date){
                    end_datetime = moment(activity.end_date + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
                    //end_datetime.tz(this.authProvider.getTimezone());
                }else{
                    // use start date but at the end of the day if task still has no "end_date"
                    end_datetime = moment(activity.start_date + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
                    //end_datetime.tz(this.authProvider.getTimezone());
                }
            }

            let item:any = {
                start: start_datetime,
                end: end_datetime,
                //end: moment( activity.end_date, 'YYYY-MM-DD', true ).toDate(),
                title: activity.name,
                actions: actions,
                meta: {
                    type: type,
                    activity: activity
                },
                color: {
                    primary: (type == 'event' && activity.category) ? activity.category.color : defaultColor,
                    secondary: (type == 'event' && activity.category) ? activity.category.color : defaultColor,
                }
            };

            this.calendar.push(item);
            this.refresh.next();
        }
    }

    delete(event) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {
                msg: (event.meta.type == 'event') ? 'DELETE_EVENT' : 'DELETE_TASK'
            }   
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                const service = (event.meta.type == 'event') ? this.eventService : this.taskService;
                service.delete(event.meta.activity.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this.load()
                });
            }
        });
    }

    // used for calendar to view the activities list per day
    dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }
}
