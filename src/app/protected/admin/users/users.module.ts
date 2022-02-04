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
    MatMenuModule, MatListModule, MatExpansionModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// app modules
import {FeaturesModule} from "../../../features/features.module";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {MomentModule} from "angular2-moment";

// routing
import { UsersRoutes } from './users.routing';

// components
import { UsersComponent } from './users/users.component';
import { UserFormComponent} from "./form/form.component";

// databases
import {UsersDatabase} from "./users/users.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
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
        MatListModule,
        MatExpansionModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,

        FeaturesModule,
        MomentModule,
        MomentTimezoneModule,
    ],
    declarations: [
        UsersComponent,
        UserFormComponent,
    ],
    providers: [
        UsersDatabase
    ]
})

export class UsersModule {}
