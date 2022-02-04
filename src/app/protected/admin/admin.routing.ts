import { Routes } from '@angular/router';
import {PermissionGuard} from "../../core/guards/permission.guard";

export const AdminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
    },
    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [PermissionGuard],
    },
    {
        path: 'permissions-groups',
        loadChildren: './permissions-groups/permissions-groups.module#PermissionsGroupsModule',
        canActivate: [PermissionGuard],
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [PermissionGuard],
    },
    {
        path: 'hotels',
        loadChildren: './hotels/hotels.module#HotelsModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'companies',
        loadChildren: './companies/companies.module#CompaniesModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'brandsite',
        loadChildren: './brandsite/brandsite.module#BrandsiteModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'quality',
        loadChildren: './quality/quality.module#QualityModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'mahgazine',
        loadChildren: './mahgazine/mahgazine.module#MahgazineModule',
        canActivate: [PermissionGuard]
    }
];
