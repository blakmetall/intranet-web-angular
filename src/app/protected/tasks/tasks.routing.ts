import { Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import {TaskFormComponent} from "./form/form.component";
import {TasksArchiveComponent} from "./archive/archive.component";
import { TaskViewComponent} from "./view/view.component";

export const TasksRoutes: Routes = [
    {
        path: '',
        component: TasksComponent,
    },
    {
        path: 'form',
        component: TaskFormComponent
    },
    {
        path: 'form/:id',
        component: TaskFormComponent
    },
    {
        path: 'archive',
        component: TasksArchiveComponent
    },
    {
        path: 'view/:id',
        component: TaskViewComponent
    }

];
