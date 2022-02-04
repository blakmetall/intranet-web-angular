import { Routes } from '@angular/router';
import {PermissionGuard} from "../../../core/guards/permission.guard";

export const BrandsiteRoutes: Routes = [
    {
        path: '',
        redirectTo: 'sections',
        pathMatch: 'full',
    },
    {
        path: 'contents',
        loadChildren: './contents/contents.module#BrandsiteContentsModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'sections',
        loadChildren: './sections/sections.module#BrandsiteSectionsModule',
        canActivate: [PermissionGuard]
    },
];
