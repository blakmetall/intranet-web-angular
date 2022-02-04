import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// routing
import { BrandsiteRoutes } from './brandsite.routing';

@NgModule({
    imports: [
        RouterModule.forChild(BrandsiteRoutes),
    ],
})
export class BrandsiteModule {}
