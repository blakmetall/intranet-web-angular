import { NgModule } from '@angular/core';
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
    MatTreeModule,
    MatChipsModule,
    MatTooltipModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

// extra modules
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FileUploadModule} from "ng2-file-upload";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";

// feature: address
import {AddressComponent} from "./address/address.component";

// feature: folder
import {FolderComponent} from "./folder/folder.component";
import {FoldersListComponent} from "./folder/folders-list/folders-list.component";
import {FolderBreadcrumbsComponent} from "./folder/breadcrumbs/breadcrumbs.component";
import {FolderActionsComponent} from "./folder/actions/actions.component";
import {FolderFormComponent} from "./folder/folder-form/folder-form.component";
import {FilesListComponent} from "./folder/files-list/files-list.component";
import {FilesFormComponent} from "./folder/files-form/files-form.component";
import {FileFeaturesViewComponent} from "./folder/file-features-view/file-features-view.component";
import {FileViewComponent} from "./folder/file-view/file-view.component";
import {FileFormComponent} from "./folder/file-form/file-form.component";

// feature: timezone date
import {TimezoneDateComponent} from "./timezone-date/timezone-date.component";

// databases

// providers
import {FolderProvider} from "../core/providers/folder.provider";
import {AppLoaderComponent} from "./app-loader/app-loader.component";

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatRadioModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatChipsModule,
        MatTreeModule,
        MatListModule,
        MatChipsModule,
        MatProgressSpinnerModule,

        MatProgressBarModule,
        MatToolbarModule,
        NgxDatatableModule,
        FileUploadModule,

        FormsModule,
        ReactiveFormsModule,

        MomentModule,
        MomentTimezoneModule,

        FlexLayoutModule,
        TranslateModule,
    ],
    declarations: [
        // address
        AddressComponent,

        // folder
        FolderComponent,
        FolderBreadcrumbsComponent,
        FolderActionsComponent,
        FoldersListComponent,
        FilesListComponent,
        FolderFormComponent,
        FilesFormComponent,
        FileFormComponent,
        FileFeaturesViewComponent,
        FileViewComponent,

        // timezone date
        TimezoneDateComponent,

        // app loader
        AppLoaderComponent,
    ],
    providers: [
        FolderProvider
    ],
    entryComponents: [
        FolderFormComponent,
        FilesFormComponent,
        FileFormComponent,
        FileFeaturesViewComponent,
        FileViewComponent,
    ],
    exports: [
        AddressComponent,
        FolderComponent,
        TimezoneDateComponent,
        AppLoaderComponent,
    ]
})

export class FeaturesModule {}
