import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatNativeDateModule, MatCheckboxModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

// routing
import {ChatRoutes} from './chat.routing';

// components
import {ChatComponent} from './chat.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {MomentModule} from "angular2-moment";

import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: true
};


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ChatRoutes),
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatProgressBarModule,
        MatInputModule,
        MatMenuModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule,

        MomentModule,
        MomentTimezoneModule,
        MatNativeDateModule,
        PerfectScrollbarModule,

        FormsModule,
        ReactiveFormsModule,

        ChartsModule,
        NgxDatatableModule,
        FlexLayoutModule,

        TranslateModule
    ],
    declarations: [
        ChatComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})

export class ChatModule {}
