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
import { SectionRoutes } from './sections.routing';

// components
import { SectionsComponent } from './sections/sections.component';
import { SectionFormComponent} from "./form/form.component";

// databases
import {BrandsiteSectionsDatabase} from "./sections/sections.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SectionRoutes),
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
        SectionsComponent,
        SectionFormComponent,
    ],
    providers: [
        BrandsiteSectionsDatabase
    ]
})

export class BrandsiteSectionsModule {}
