import { Routes } from '@angular/router';

import { ExensionRequestsComponent } from './exension-requests/exension-requests.component';
import { ExensionRequestAdminViewComponent } from "./view/view.component";

export const ExensionRequestsRouting: Routes = [
    {
        path: '',
        component: ExensionRequestsComponent,
    },
    {
        path: 'view/:id',
        component: ExensionRequestAdminViewComponent
    }
];
