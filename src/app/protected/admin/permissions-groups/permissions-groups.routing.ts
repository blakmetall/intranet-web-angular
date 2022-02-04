import { Routes } from '@angular/router';
import {PermissionGroupFormComponent} from "./form/form.component";
import {PermissionsGroupsComponent} from "./permissions-groups/permissions-groups.component";


export const PermissionsGroupsRoutes: Routes = [
    {
        path: '',
        component: PermissionsGroupsComponent,
    },
    {
        path: 'form',
        component: PermissionGroupFormComponent
    },
    {
        path: 'form/:id',
        component: PermissionGroupFormComponent
    },
    {
        path: 'permissions/:permission_group_id',
        loadChildren: './permissions/permissions.module#PermissionsModule',
    }
];
