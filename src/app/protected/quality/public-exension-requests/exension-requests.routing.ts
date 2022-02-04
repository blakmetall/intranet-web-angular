import { Routes } from '@angular/router';

import { ExensionRequestsPublicComponent } from "./exension-requests/exension-requests.component";
import { ExensionFormComponent } from "./form/form.component";
import { ExensionRequestPublicViewComponent } from "./view/view.component";

export const PublicExensionRequestRoutes: Routes = [
    {
        path: '',
        component: ExensionRequestsPublicComponent,
    },
    {
        path: 'form',
        component: ExensionFormComponent
    },
    {
        path: 'form/:id',
        component: ExensionFormComponent
    },
    {
        path: 'view/:id',
        component: ExensionRequestPublicViewComponent
    }
];
