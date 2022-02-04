import { Routes } from '@angular/router';

import { BrandsiteContentsComponent } from './contents/contents.component';
import {BrandsiteContentSectionComponent} from "./section/section.component";
import {BrandsiteContentFormComponent} from "./form/form.component";

export const BrandsiteContentsRoutes: Routes = [
    {
        path: '',
        component: BrandsiteContentsComponent,
    },
    {
        path: 'form/:id',
        component: BrandsiteContentFormComponent
    },
    {
        path: 'section',
        component: BrandsiteContentSectionComponent
    },
    {
        path: 'section/:id',
        component: BrandsiteContentSectionComponent
    }
];
