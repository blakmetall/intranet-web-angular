import {Routes} from '@angular/router';

import {EventsComponent} from './events/events.component';
import {EventFormComponent} from "./form/form.component";
import {EventViewComponent} from "./view/view.component";

export const EventsRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: EventsComponent
        },
        {
            path: 'view/:id',
            component: EventViewComponent,
        },
        {
            path: 'form',
            component: EventFormComponent,
        },
        {
            path: 'form/:id',
            component: EventFormComponent,
        },
        {
            path: 'categories',
            loadChildren: './categories/categories.module#EventsCategoriesModule',
        }
    ]
}];
