import {Component} from '@angular/core';
import {MenuService} from './menu.service';

import {TranslateService} from '@ngx-translate/core';
import {AuthProvider} from "../../../../providers/auth.provider";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    providers: [MenuService]
})
export class MenuComponent {

    constructor(
        public menuService: MenuService,
        public auth: AuthProvider,
        public translate: TranslateService) {
    }
}
