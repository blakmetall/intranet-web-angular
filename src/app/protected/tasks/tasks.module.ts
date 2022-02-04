import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    MatDatepickerModule,
    MatNativeDateModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TaskFormComponent} from "./form/form.component";
import {TranslateModule} from '@ngx-translate/core';

// extra modules
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

// app modules
import {FeaturesModule} from "../../features/features.module";

// routing
import {TasksRoutes} from './tasks.routing';

// components
import {TasksComponent} from './tasks/tasks.component';
import {TaskViewComponent} from "./view/view.component";
import {TasksArchiveComponent} from "./archive/archive.component";

// databases
import {TasksArchiveDatabase} from "./archive/archive.database";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TasksRoutes),
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
        MatDatepickerModule,
        MatNativeDateModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,

        DragulaModule,

        FeaturesModule,
        MomentModule,
        MomentTimezoneModule,

        FeaturesModule,
    ],
    declarations: [
        TasksComponent,
        TaskFormComponent,
        TaskViewComponent,
        TasksArchiveComponent,
        TaskViewComponent,
    ],
    providers: [
        TasksArchiveDatabase
    ]
})

export class TasksModule {}
