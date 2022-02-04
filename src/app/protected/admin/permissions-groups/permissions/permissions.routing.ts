import { Routes } from '@angular/router';
import {PermissionFormComponent} from "./form/form.component";
import {PermissionsComponent} from "./permissions/permissions.component";


export const PermissionsRoutes: Routes = [
    {
        path: '',
        component: PermissionsComponent,
    },
    {
        path: 'form',
        component: PermissionFormComponent
    },
    {
        path: 'form/:id',
        component: PermissionFormComponent
    }
];
