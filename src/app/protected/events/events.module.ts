import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule, MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDatepickerModule
} from '@angular/material';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// extra modules
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {CalendarModule} from 'angular-calendar';

// app modules
import {FeaturesModule} from "../../features/features.module";

// routing
import {EventsRoutes} from './events.routing';

// components
import {EventsComponent} from './events/events.component';
import {EventFormComponent} from "./form/form.component";
import {EventViewComponent} from './view/view.component';
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EventsRoutes),
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatListModule,
        MatGridListModule,
        MatMenuModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatTabsModule,
        MatDialogModule,
        MatExpansionModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatCheckboxModule,
        MatSelectModule,

        // calendar modules
        CalendarModule.forRoot(),
        NgxMaterialTimepickerModule.forRoot(),
        MomentModule,
        MomentTimezoneModule,

        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,

        FeaturesModule,
    ],
    declarations: [
        EventsComponent,
        EventViewComponent,
        EventFormComponent,
    ],
})

export class EventsModule {
}
