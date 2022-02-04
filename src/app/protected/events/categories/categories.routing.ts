import {Routes} from '@angular/router';

import {EventsCategoriesComponent} from './categories/categories.component';
import {EventCategoryFormComponent} from "./form/form.component";

export const EventCategoryRoutes: Routes = [
    {
        path: '',
        component: EventsCategoriesComponent,
    },
    {
        path: 'form',
        component: EventCategoryFormComponent
    },
    {
        path: 'form/:id',
        component: EventCategoryFormComponent
    }
];
