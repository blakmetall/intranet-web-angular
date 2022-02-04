import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualityRoutes } from "./quality.routing";
import {MatCardModule} from "@angular/material";
import {FeaturesModule} from "../../features/features.module";
import {TranslateModule} from "@ngx-translate/core";
import {QualityFilesPublicComponent} from "./files/files.component";

@NgModule({
    imports: [
        RouterModule.forChild(QualityRoutes),

        MatCardModule,
        FeaturesModule,
        TranslateModule
    ],
    providers: [

    ],
    declarations: [
        QualityFilesPublicComponent
    ],
    entryComponents: [

    ],
})
export class PublicQualityModule {}
