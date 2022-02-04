import { Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserFormComponent } from "./form/form.component";

export const UsersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
    },
    {
        path: 'form',
        component: UserFormComponent
    },
    {
        path: 'form/:id',
        component: UserFormComponent
    }
];
