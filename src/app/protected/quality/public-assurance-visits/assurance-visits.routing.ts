import { Routes } from '@angular/router';

import { AssuranceVisitsPublicComponent } from "./assurance-visits/assurance-visits.component";
import {AssuranceVisitPublicViewComponent} from "./view/view.component";
import {ExtensionRequestPublicFormComponent} from "./extension-request/extension-request.component";

export const AssuranceVisitPublicRoutes: Routes = [
    {
        path: '',
        component: AssuranceVisitsPublicComponent,
    },
    {
        path: 'view/:id',
        component: AssuranceVisitPublicViewComponent
    },
    {
        path: 'extension-request/:id',
        component: ExtensionRequestPublicFormComponent
    },
];
