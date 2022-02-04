import { Routes } from '@angular/router';
import {PermissionGuard} from "../../../core/guards/permission.guard";
import {QualityFilesAdminComponent} from "./files/files.component";

export const QualityRoutes: Routes = [
    {
        path: '',
        redirectTo: 'assurance-visits',
        pathMatch: 'full',
    },
    {
        path: 'assurance-visits',
        loadChildren: './assurance-visits/assurance-visits.module#QualityAssuranceVisitsModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'extension-requests',
        loadChildren: './extension-requests/extension-requests.module#QualityExtensionRequestsModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'exension-requests',
        loadChildren: './exension-requests/exension-requests.module#QualityExensionRequestModule',
        canActivate: [PermissionGuard]
    },
    {
        path: 'files',
        component: QualityFilesAdminComponent,
        canActivate: [PermissionGuard]
    }
];
