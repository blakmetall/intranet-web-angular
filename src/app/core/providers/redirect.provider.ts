import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class RedirectProvider {

    constructor(public router: Router) {}

    toForm(id, route){
        let url_path = (id) ? '../../form' : '../form';
        this.router.navigate([ url_path ], {relativeTo: route});
    }
    
    toListing(id, route){
        let url_path = (id) ? '../../' : '../';
        this.router.navigate([ url_path ], {relativeTo: route});
    }

    toEditForm(id, route){
        this.router.navigate([ '../form/' + id ], {relativeTo: route});
    }
}