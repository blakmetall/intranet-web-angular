import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../core/services/event.service";
import {DialogConfirmComponent} from "../../../core/components/dialog-confirm/dialog.confirm";
import {MatDialog} from "@angular/material";
import {MessageProvider} from "../../../core/providers/message.provider";
import {DateProvider} from "../../../core/providers/date.provider";

@Component({
    selector: 'app-events-view-component',
    templateUrl: './view.component.html',
})
export class EventViewComponent implements OnInit{

    id;
    event;

    loading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        public dateProvider: DateProvider,
        private messageProvider: MessageProvider,
        public eventService : EventService,
    ) {}

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.eventService.get(this.id).subscribe( event => {
            this.event = event;
            this.loading = false;
        })
    }

    delete(event) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            data: {msg: 'DELETE_EVENT'}
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success) {
                this.eventService.delete(event.id).subscribe(() => {
                    this.messageProvider.show('RECORD_DELETED');
                    this.router.navigate(['/calendar']);
                });
            }
        });
    }
}