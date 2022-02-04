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
import { PublicExtensionRequestsRoutes } from './extension-requests.routing';

//providers
import { ExtensionRequestsDatabase } from "./extension-requests/extension-requests.database";

//components
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatNativeDateModule} from "@angular/material";

import { ExtensionRequestPublicComponent } from "./extension-requests/extension-requests.component";
import {ExtensionRequestPublicViewComponent} from "./view/view.component";


import {HotelService} from "../../../core/services/hotel.service";
import {QualityExtensionRequestService} from "../../../core/services/quality/extension-request.service";
import {QualityAssuranceVisitService} from "../../../core/services/quality/assurance-visit.service";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {ExtensionRequestPublicFormComponent2} from "./form/form.component";
import {FileUploadModule} from "ng2-file-upload";
import {FeaturesModule} from "../../../features/features.module";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PublicExtensionRequestsRoutes),
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


        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        TranslateModule,
        NgxMaterialTimepickerModule.forRoot(),
        FeaturesModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MomentModule,
        MomentTimezoneModule,
        FileUploadModule,
    ],
    providers: [
        ExtensionRequestsDatabase,
        QualityExtensionRequestService,
        QualityAssuranceVisitService,
        HotelService,

        DatePipe,
    ],
    declarations: [
        ExtensionRequestPublicComponent,
        ExtensionRequestPublicFormComponent2,
        ExtensionRequestPublicViewComponent
    ],
})

export class PublicQualityExtensionsPublicModule {}
