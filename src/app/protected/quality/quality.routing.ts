import { Routes } from '@angular/router';
import {QualityFilesPublicComponent} from "./files/files.component";
import {PermissionGuard} from "../../core/guards/permission.guard";


export const QualityRoutes: Routes = [
    {
        path: '',
        redirectTo: 'sections',
        pathMatch: 'full',
    },
    {
        path: 'assurance-visits',
        loadChildren: './public-assurance-visits/assurance-visits.module#AssuranceVisitsPublicModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'extension-requests',
        loadChildren: './public-extension-requests/extension-requests.module#PublicQualityExtensionsPublicModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'exension-requests',
        loadChildren: './public-exension-requests/exension-requests.module#PublicQualityExensionRequestModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'files',
        component: QualityFilesPublicComponent,
        canActivate: [PermissionGuard]
    }


];
