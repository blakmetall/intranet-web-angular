import { Component, OnInit} from '@angular/core';
import {QualityExensionRequestService} from "../../../../../core/services/quality/exension-request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../../core/providers/message.provider";
import {DateProvider} from "../../../../../core/providers/date.provider";
import {FileViewerProvider} from "../../../../../core/providers/file-viewer.provider";

@Component({
    selector: 'app-task-view-component',
    templateUrl: './view.component.html',
})
export class ExensionRequestAdminViewComponent implements OnInit{

    id;
    exension;

    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        private exensionRequestService: QualityExensionRequestService,
        private router: Router,
        private route: ActivatedRoute,
        public dateProvider: DateProvider,
        public fileViewerProvider: FileViewerProvider,
    ) {
        
    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.exensionRequestService.get(this.id).subscribe(exension => {
            this.exension = exension;
            this.loading = false;
        });
    }

    approve(){
        this.exensionRequestService.approve(this.exension.id).subscribe( () => {
            this.load();
        });
    }

    deny(){
        this.exensionRequestService.deny(this.exension.id).subscribe( () => {
            this.load();
        });
    }
}