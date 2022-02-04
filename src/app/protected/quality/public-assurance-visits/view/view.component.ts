import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageProvider} from "../../../../core/providers/message.provider";
import {QualityAssuranceVisitService} from "../../../../core/services/quality/assurance-visit.service";
import {DateProvider} from "../../../../core/providers/date.provider";
import {FileViewerProvider} from "../../../../core/providers/file-viewer.provider";

@Component({
    selector: 'app-assurance-visit-public-view-component',
    templateUrl: './view.component.html',
})
export class AssuranceVisitPublicViewComponent implements OnInit{

    id;
    visit;

    loading = false;

    constructor(
        private messageProvider: MessageProvider,
        private assuranceVisitService: QualityAssuranceVisitService,
        private router: Router,
        private route: ActivatedRoute,
        public dateProvider: DateProvider,
        public fileViewerProvider: FileViewerProvider
    ) {

    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.load();
    }

    load(){
        this.loading = true;
        this.assuranceVisitService.get(this.id).subscribe((visit) => {
            this.visit = visit;
            this.loading = false;
        });
    }
}