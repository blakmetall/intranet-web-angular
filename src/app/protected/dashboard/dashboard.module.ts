import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

// routing
import {DashboardRoutes} from './dashboard.routing';

// components
import {DashboardComponent} from './dashboard/dashboard.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatProgressBarModule,
        MatMenuModule,

        ChartsModule,
        NgxDatatableModule,
        FlexLayoutModule,

        TranslateModule
    ],
    declarations: [
        DashboardComponent
    ]
})

export class DashboardModule {
}
