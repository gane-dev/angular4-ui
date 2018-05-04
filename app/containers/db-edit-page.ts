import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';

import { DataBatchDetails } from '../models/data-batch-details.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/observable/fromEvent';
import 'rxjs/observable/merge';
import 'rxjs/add/operator/do';
import { DbEditService } from './services/db-edit.service';
import { DataBatchMatching } from '../models/data-batch-matching.model';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LookupDataService } from '../services/lookup-data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    //   moduleId: module.id,
    selector: 'cia-db-edit',
    templateUrl: 'html/db-edit-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DbEditService]
})
export class DbEditPageComponent {
    public qaOptions: Array<{ text: string, value: string }>;
    public qaPassOptions: Array<{ text: string, value: string }>;
    dataBatch: DataBatchDetails;
    reject: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute,
        private dbEditService: DbEditService, private lookupDataService: LookupDataService
    ,public toastr: ToastsManager, vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.qaOptions = this.lookupDataService.getReviewStatus();
        this.qaPassOptions = this.lookupDataService.getQAPassStatus();
        route.params.subscribe(
            params => {
                if (params['id'] === "0") {
                    //reject
                    this.reject = true;
                }
            });
        dbEditService.db$.subscribe(
            (result: DataBatchDetails) => {
                console.log(result);
                if (this.reject)
                    this.dataBatch = Object.assign(<DataBatchDetails>{}, result, {PUBLISH_ACTION : 'R'});
                else
                    this.dataBatch = Object.assign(<DataBatchDetails>{}, result, { PUBLISH_ACTION: 'U' });
            });

       }

    back() {
        this.dbEditService.goBack();
    }
    onSave(dataBatch: DataBatchDetails) {
      
            this.dbEditService.saveTransactions(this.dataBatch);
            this.dbEditService.waitForSave().subscribe(
                (result: string) => {
                    if (result == '1') {
                        console.log(result);
                        this.toastr.success('Data Batch Save Completed', 'Success!');
                    }
                    else if (result == null)
                        this.toastr.error('Data Batch Save Failed!', 'Error!');
                    else
                        this.toastr.error('Data Batch Save Failed!' + result, 'Error!');
                });
    }
    hQAReview(value) {
        this.dataBatch = Object.assign({}, this.dataBatch, { QA_REVIEW_STATUS: value });
    }
    hQAPass(value) {
        this.dataBatch = Object.assign({}, this.dataBatch, { QA_PASS_STATUS: value });
    }
}