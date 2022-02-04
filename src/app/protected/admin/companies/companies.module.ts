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
import {FlexLayoutModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";

// app modules
import {FeaturesModule} from "../../../features/features.module";

// routing
import { CompanyRoutes } from './companies.routing';

// components
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent} from "./form/form.component";

// databases
import {CompaniesDatabase} from "./companies/companies.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CompanyRoutes),
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
        CompaniesComponent,
        CompanyFormComponent,
    ],
    providers: [
        CompaniesDatabase
    ]
})

export class CompaniesModule {}
