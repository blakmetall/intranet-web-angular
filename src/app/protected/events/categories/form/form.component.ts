import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {EventCategoryService} from "../../../../core/services/event.category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {RedirectProvider} from "../../../../core/providers/redirect.provider";

@Component({
    selector: 'app-category-form',
    templateUrl: './form.component.html',
})
export class EventCategoryFormComponent implements OnInit{

    id;
    category;
    form: FormGroup;

    color; // needed for color picker (can't use this.form.get('color').value)

    loading = false;

    constructor(
        private router: Router,
        public route: ActivatedRoute,
        private messageProvider: MessageProvider,
        public redirect: RedirectProvider,
        private eventCategoryService: EventCategoryService,
        private fb: FormBuilder,
        public translate: TranslateService) {

        this.buildForm();
    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');

        if(this.id){
            this.loading = true;
            this.eventCategoryService.get(this.id).subscribe( category => {
                this.form.patchValue(category);
                this.loading = false;
            });
        }
    }

    save() {
        this.loading = true;
        this.eventCategoryService.save(this.form.value).subscribe((eventCategory) => {
            let message = this.id ? 'RECORD_UPDATED' : 'RECORD_ADDED';
            this.messageProvider.show(message);

            if(!this.id){
                this.redirect.toEditForm(eventCategory.id, this.route);
            }
            this.loading = false;
        }, error => {this.loading = false});
    }

    buildForm(){
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            color: ['#333333', Validators.required],
        });
    }

    setColor(color){
        this.form.get('color').patchValue(color);
        this.color = color;
    }
}
