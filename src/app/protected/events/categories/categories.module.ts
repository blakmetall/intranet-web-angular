import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
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
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// extra modules
import {ColorPickerModule} from 'ngx-color-picker';

// routing
import {EventCategoryRoutes} from './categories.routing';

// components
import {EventsCategoriesComponent} from "./categories/categories.component";
import {EventCategoryFormComponent} from "./form/form.component";

// databases
import {EventsCategoriesDatabase} from "./categories/categories.database";
import {FeaturesModule} from "../../../features/features.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EventCategoryRoutes),
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

        ColorPickerModule,
        FeaturesModule,
    ],
    declarations: [
        EventsCategoriesComponent,
        EventCategoryFormComponent
    ],
    providers: [
        EventsCategoriesDatabase
    ]
})

export class EventsCategoriesModule {
}
