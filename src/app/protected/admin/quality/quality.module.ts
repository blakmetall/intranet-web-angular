import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualityRoutes } from "./quality.routing";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {QualityFilesAdminComponent} from "./files/files.component";
import {FeaturesModule} from "../../../features/features.module";
import {MatCardModule} from "@angular/material";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        RouterModule.forChild(QualityRoutes),

        MomentModule,
        MomentTimezoneModule,

        MatCardModule,
        FeaturesModule,
        TranslateModule
    ],
    declarations: [
        QualityFilesAdminComponent
    ],
})
export class QualityModule {}
