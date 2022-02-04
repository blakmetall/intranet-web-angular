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

import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// extras
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

// routing
import { ExtensionRequestsRoutes } from './extension-requests.routing';

// databases
import { ExtensionRequestsDatabase } from './extension-requests/extension-requests.database';

// components
import { ExtensionRequestsComponent } from './extension-requests/extension-requests.component';
import {ExtensionRequestAdminViewComponent} from "./view/view.component";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {FeaturesModule} from "../../../../features/features.module";

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(ExtensionRequestsRoutes),

        // maerial
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
        ExtensionRequestsDatabase,
    ],
    declarations: [
        ExtensionRequestsComponent,
        ExtensionRequestAdminViewComponent,
    ],
})

export class QualityExtensionRequestsModule {}
