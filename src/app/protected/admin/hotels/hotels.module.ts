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
import {FeaturesModule} from "../../../features/features.module";

// routing
import { HotelRoutes } from './hotels.routing';

// components
import { HotelsComponent } from './hotels/hotels.component';
import { HotelFormComponent} from "./form/form.component";

// databases
import {HotelsDatabase} from "./hotels/hotels.database";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HotelRoutes),
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
        FileUploadModule
    ],
    declarations: [
        HotelsComponent,
        HotelFormComponent,
    ],
    providers: [
        HotelsDatabase,
    ]
})
export class HotelsModule {}
