import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-swap-language',
    templateUrl: './swap-language.component.html',
})
export class SwapLanguageComponent {

    constructor(public translate: TranslateService) { }

    setLanguage(lang){
        localStorage.setItem('lang', lang);
        this.translate.use(lang);
    }
}
