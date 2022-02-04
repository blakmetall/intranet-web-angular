import { Routes } from '@angular/router';

import { SectionsComponent } from './sections/sections.component';
import { SectionFormComponent } from "./form/form.component";

export const SectionRoutes: Routes = [
    {
        path: '',
        component: SectionsComponent,
    },
    {
        path: 'form',
        component: SectionFormComponent
    },
    {
        path: 'form/:id',
        component: SectionFormComponent
    }
];
