import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

    brandsite_url;
    mahgazine_url;

    constructor(
        private router: Router
    ) {
        this.brandsite_url = environment.brandsite_url;
        this.mahgazine_url = environment.mahgazine_url;
    }


}
