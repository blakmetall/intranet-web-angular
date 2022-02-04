import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule, MatDatepickerModule, MatNativeDateModule,

} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//routing
import { AssuranceVisitsPublicComponent } from "./assurance-visits/assurance-visits.component";

//providers
import { AssuranceVisitsPublicDatabase } from "./assurance-visits/assurance-visits.database";

//components
import { AssuranceVisitPublicRoutes } from "./assurance-visits.routing";
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

import {HotelService} from "../../../core/services/hotel.service";
import {QualityAssuranceVisitService} from "../../../core/services/quality/assurance-visit.service";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {AssuranceVisitPublicViewComponent} from "./view/view.component";
import {ExtensionRequestPublicFormComponent} from "./extension-request/extension-request.component";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {FileUploadModule} from "ng2-file-upload";
import {FeaturesModule} from "../../../features/features.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AssuranceVisitPublicRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatMenuModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,

        FeaturesModule,

        MomentModule,
        MomentTimezoneModule,
        FileUploadModule,

        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.forRoot(),

    ],
    providers: [
        AssuranceVisitsPublicDatabase,
        HotelService,
        QualityAssuranceVisitService,

        //DatePipe,
    ],
    declarations: [
        AssuranceVisitsPublicComponent,
        AssuranceVisitPublicViewComponent,
        ExtensionRequestPublicFormComponent
    ],
})

export class AssuranceVisitsPublicModule {}
