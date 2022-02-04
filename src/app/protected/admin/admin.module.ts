import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// routing
import { AdminRoutes } from './admin.routing';

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
    ],
})

export class AdminModule {}
