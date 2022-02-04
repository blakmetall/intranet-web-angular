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
    MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// app modules
import {FeaturesModule} from "../../../features/features.module";

// routing
import { MahgazineRoutes } from './mahgazine.routing';

// components
import { MahgazineEditionsComponent } from './editions/editions/editions.component';
import { MahgazineEditionFormComponent} from "./editions/form/form.component";

// databases
import {MahgazineEditionsDatabase} from "./editions/editions/editions.database";
import {FileUploadModule} from "ng2-file-upload";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MahgazineSectionsComponent} from "./sections/sections/sections.component";
import {MahgazineSectionsDatabase} from "./sections/sections/sections.database";
import {MahgazineSectionFormComponent} from "./sections/form/form.component";
import {ColorPickerModule} from "ngx-color-picker";
import {MahgazineArticlesComponent} from "./articles/articles/articles.component";
import {MahgazineArticleFormComponent} from "./articles/form/form.component";
import {MahgazineArticlesDatabase} from "./articles/articles/articles.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MahgazineRoutes),
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

        FeaturesModule,
        FileUploadModule,

        MomentModule,
        MomentTimezoneModule,

        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.forRoot(),
        ColorPickerModule,
    ],
    declarations: [
        MahgazineEditionsComponent,
        MahgazineEditionFormComponent,

        MahgazineSectionsComponent,
        MahgazineSectionFormComponent,

        MahgazineArticlesComponent,
        MahgazineArticleFormComponent,
    ],
    providers: [
        MahgazineEditionsDatabase,
        MahgazineSectionsDatabase,
        MahgazineArticlesDatabase
    ]
})
export class MahgazineModule {}
