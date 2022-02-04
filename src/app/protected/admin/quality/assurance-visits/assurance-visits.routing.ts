import { Routes } from '@angular/router';

import { AssuranceVisitsComponent } from './assurance-visits/assurance-visits.component';
import { VisitsFormComponent } from "./form/form.component";
import {AssuranceVisitAdminViewComponent} from "./view/view.component";


export const AssuranceVisitsRoutes: Routes = [

    {
        path: '',
        component: AssuranceVisitsComponent,
    },
    {
        path: 'form',
        component: VisitsFormComponent
    },
    {
        path: 'form/:id',
        component: VisitsFormComponent
    },
    {
        path: 'view/:id',
        component: AssuranceVisitAdminViewComponent
    }
];
