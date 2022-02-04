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
    MatMenuModule, MatTooltipModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// app modules
import {FeaturesModule} from "../../../features/features.module";

// routing
import { PermissionsGroupsRoutes } from './permissions-groups.routing';

// components
import { PermissionsGroupsComponent } from './permissions-groups/permissions-groups.component';
import { PermissionGroupFormComponent} from "./form/form.component";

// databases
import {PermissionsGroupsDatabase} from "./permissions-groups/permissions-groups.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PermissionsGroupsRoutes),
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
        MatTooltipModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,

        FeaturesModule
    ],
    declarations: [
        PermissionsGroupsComponent,
        PermissionGroupFormComponent,
    ],
    providers: [
        PermissionsGroupsDatabase,
    ]
})

export class PermissionsGroupsModule {}
