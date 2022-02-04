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
    MatTooltipModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// app modules
import {FeaturesModule} from "../../../../features/features.module";

// routing
import { BrandsiteContentsRoutes } from './contents.routing';

// components
import { BrandsiteContentsComponent } from './contents/contents.component';
import {BrandsiteContentSectionComponent} from "./section/section.component";
import {BrandsiteContentFormComponent} from "./form/form.component";

// databases
import {BrandsiteContentsDatabase} from "./contents/contents.database";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BrandsiteContentsRoutes),
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
    ],
    declarations: [
        BrandsiteContentsComponent,
        BrandsiteContentFormComponent,
        BrandsiteContentSectionComponent,
    ],
    providers: [
        BrandsiteContentsDatabase
    ]
})
export class BrandsiteContentsModule {}
