import { Routes } from '@angular/router';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from "./form/form.component";

export const CompanyRoutes: Routes = [
    {
        path: '',
        component: CompaniesComponent,
    },
    {
        path: 'form',
        component: CompanyFormComponent
    },
    {
        path: 'form/:id',
        component: CompanyFormComponent
    }
];
