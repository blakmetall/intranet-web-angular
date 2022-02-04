import { Routes } from '@angular/router';

import { MahgazineEditionsComponent } from './editions/editions/editions.component';
import { MahgazineEditionFormComponent } from "./editions/form/form.component";
import {MahgazineSectionFormComponent} from "./sections/form/form.component";
import {MahgazineSectionsComponent} from "./sections/sections/sections.component";
import {MahgazineArticlesComponent} from "./articles/articles/articles.component";
import {MahgazineArticleFormComponent} from "./articles/form/form.component";

export const MahgazineRoutes: Routes = [

    // editions
    {
        path: '',
        component: MahgazineEditionsComponent,
    },
    {
        path: 'form',
        component: MahgazineEditionFormComponent
    },
    {
        path: 'form/:id',
        component: MahgazineEditionFormComponent
    },

    // sections
    {
        path: 'edition/:edition_id/sections',
        component: MahgazineSectionsComponent
    },
    {
        path: 'edition/:edition_id/sections/form',
        component: MahgazineSectionFormComponent
    },
    {
        path: 'edition/:edition_id/sections/form/:section_id',
        component: MahgazineSectionFormComponent
    },

    // articles
    {
        path: 'edition/:edition_id/sections/:section_id/articles',
        component: MahgazineArticlesComponent
    },
    {
        path: 'edition/:edition_id/sections/:section_id/articles/form',
        component: MahgazineArticleFormComponent
    },
    {
        path: 'edition/:edition_id/sections/:section_id/articles/form/:article_id',
        component: MahgazineArticleFormComponent
    }
];
