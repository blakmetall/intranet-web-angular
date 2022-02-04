import { Routes } from '@angular/router';

import { ExtensionRequestPublicComponent } from "./extension-requests/extension-requests.component";
import {ExtensionRequestPublicFormComponent2} from "./form/form.component";
import {ExtensionRequestPublicViewComponent} from "./view/view.component";

export const PublicExtensionRequestsRoutes: Routes = [
    {
        path: '',
        component: ExtensionRequestPublicComponent,
    },
    {
        path: 'form/:id',
        component: ExtensionRequestPublicFormComponent2
    },
    {
        path: 'view/:id',
        component: ExtensionRequestPublicViewComponent
    }
];
