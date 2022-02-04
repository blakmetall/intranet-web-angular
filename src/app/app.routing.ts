import {Routes} from '@angular/router';

import {AdminLayoutComponent, AuthLayoutComponent} from './core';
import {AuthGuard} from "./core/guards/auth.guard";
import {PermissionGuard} from "./core/guards/permission.guard";
import {RedirectComponent} from "./protected/redirect/redirect.component";

export const AppRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
        {
            path: 'redirect',
            component: RedirectComponent
        },
        {
            path: 'profile',
            loadChildren: './protected/profile/profile.module#ProfileModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'dashboard',
            loadChildren: './protected/dashboard/dashboard.module#DashboardModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'chat',
            loadChildren: './protected/chat/chat.module#ChatModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'admin',
            loadChildren: './protected/admin/admin.module#AdminModule',
            canActivate: [AuthGuard, PermissionGuard]
        },
        {
            path: 'directory',
            loadChildren: './protected/directory/directory.module#DirectoryModule',
            canActivate: [AuthGuard, PermissionGuard]
        },
        {
            path: 'tasks',
            loadChildren: './protected/tasks/tasks.module#TasksModule',
            canActivate: [AuthGuard, PermissionGuard]
        },
        {
            path: 'calendar',
            loadChildren: './protected/events/events.module#EventsModule',
            canActivate: [AuthGuard, PermissionGuard]
        },
        {
            path: 'quality',
            loadChildren: './protected/quality/quality.module#PublicQualityModule',
            canActivate: [AuthGuard, PermissionGuard]
        },
    ]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'session',
        loadChildren: './public/session/session.module#SessionModule'
    }]
}, {
    path: '**',
    redirectTo: 'session/404'
}];
