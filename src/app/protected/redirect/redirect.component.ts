import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-redirect',
    template: 'Redirect'
})
export class RedirectComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if(params.url){
                this.router.navigate([ params.url ]);
            }
        });
    }

}
