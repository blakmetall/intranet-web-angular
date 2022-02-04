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
import {FeaturesModule} from "../../../../features/features.module";

// routing
import { PermissionsRoutes } from './permissions.routing';

// components
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionFormComponent} from "./form/form.component";

// databases
import {PermissionsDatabase} from "./permissions/permissions.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PermissionsRoutes),
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

        FeaturesModule
    ],
    declarations: [
        PermissionsComponent,
        PermissionFormComponent,
    ],
    providers: [
        PermissionsDatabase
    ]
})

export class PermissionsModule {}
