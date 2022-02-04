import {Component, Inject, Input} from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './app-loader.component.html',
    styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent{

    @Input() loading : boolean;

    constructor() {
        this.loading = false;
    }

}