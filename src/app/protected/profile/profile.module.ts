import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// app modules
import {FeaturesModule} from "../../features/features.module";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";

// routing
import {ProfileRoutes} from "./profile.routing";

// components
import {ProfileComponent} from "./profile.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProfileRoutes),
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

        FeaturesModule,
        MomentModule,
        MomentTimezoneModule,
    ],
    declarations: [
        ProfileComponent,
    ],
})

export class ProfileModule {}
