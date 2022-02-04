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
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";


import { AssuranceVisitsRoutes } from './assurance-visits.routing';

//databases
import { AssuranceVisitsDatabase } from './assurance-visits/assurance-visits.database';

//components
import {AssuranceVisitsComponent} from './assurance-visits/assurance-visits.component';
import {VisitsFormComponent} from "./form/form.component";
import {AssuranceVisitAdminViewComponent} from "./view/view.component";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {MomentModule} from "angular2-moment";
import {FileUploadModule} from "ng2-file-upload";
import {FeaturesModule} from "../../../../features/features.module";


@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(AssuranceVisitsRoutes),

        // material design
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

        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.forRoot(),

        MomentModule,
        MomentTimezoneModule,

        FileUploadModule,
        FeaturesModule,
    ],
    providers: [
        AssuranceVisitsDatabase,
    ],
    declarations: [
        AssuranceVisitsComponent,
        VisitsFormComponent,
        AssuranceVisitAdminViewComponent,
    ],
})

export class QualityAssuranceVisitsModule {}
