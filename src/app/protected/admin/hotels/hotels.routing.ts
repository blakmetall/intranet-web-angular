import { Routes } from '@angular/router';

import { HotelsComponent } from './hotels/hotels.component';
import { HotelFormComponent } from "./form/form.component";

export const HotelRoutes: Routes = [
    {
        path: '',
        component: HotelsComponent,
    },
    {
        path: 'form',
        component: HotelFormComponent
    },
    {
        path: 'form/:id',
        component: HotelFormComponent
    }
];
