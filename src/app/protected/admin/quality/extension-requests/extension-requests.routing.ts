import { Routes } from '@angular/router';

import { ExtensionRequestsComponent } from './extension-requests/extension-requests.component';
import { ExtensionRequestAdminViewComponent } from "./view/view.component";

export const ExtensionRequestsRoutes: Routes = [
    {
        path: '',
        component: ExtensionRequestsComponent,
    },
    {
        path: 'view/:id',
        component: ExtensionRequestAdminViewComponent
    }
];
