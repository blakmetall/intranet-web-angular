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
    MatNativeDateModule,
    MatDatepickerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FlexLayoutModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

// routing
import {ExensionRequestsRouting} from './exension-requests.routing';

// databases
import {ExensionRequestsDatabase} from './exension-requests/exension-requests.database';

// components
import {ExensionRequestsComponent} from './exension-requests/exension-requests.component';
import {ExensionRequestAdminViewComponent} from "./view/view.component";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {FeaturesModule} from "../../../../features/features.module";

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(ExensionRequestsRouting),

        // material
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
        FeaturesModule,

        NgxMaterialTimepickerModule.forRoot(),
        MomentModule,
        MomentTimezoneModule,
    ],
    providers: [

        ExensionRequestsDatabase,

    ],
    declarations: [
        ExensionRequestsComponent,
        ExensionRequestAdminViewComponent
    ],
})

export class QualityExensionRequestModule {}
