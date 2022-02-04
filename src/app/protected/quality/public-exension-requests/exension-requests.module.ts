import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import {
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,

} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';

//routing
import { PublicExensionRequestRoutes } from "./exension-requests.routing";

//providers
import { PublicExensionRequestDatabase } from "./exension-requests/exension-requests.database";

//components
import { ExensionRequestsPublicComponent } from "./exension-requests/exension-requests.component";
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CalendarModule} from "angular-calendar";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {HotelService} from "../../../core/services/hotel.service";
import {MatNativeDateModule} from "@angular/material";
import {ExensionFormComponent} from "./form/form.component";
import {ExensionRequestPublicViewComponent} from "./view/view.component";


import {QualityAssuranceVisitService} from "../../../core/services/quality/assurance-visit.service";
import {QualityExensionRequestService} from "../../../core/services/quality/exension-request.service";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {FileUploadModule} from "ng2-file-upload";
import {FeaturesModule} from "../../../features/features.module";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PublicExensionRequestRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatRadioModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,

        MatDatepickerModule,
        MatNativeDateModule,

        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        TranslateModule,
        CalendarModule.forRoot(),
        NgxMaterialTimepickerModule.forRoot(),
        FeaturesModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MomentModule,
        MomentTimezoneModule,
        FileUploadModule,
    ],
    providers: [
        PublicExensionRequestDatabase,
        HotelService,
        QualityExensionRequestService,
        QualityAssuranceVisitService,

        DatePipe,
    ],
    declarations: [
        ExensionRequestsPublicComponent,
        ExensionFormComponent,
        ExensionRequestPublicViewComponent,
    ],
})

export class PublicQualityExensionRequestModule {}
