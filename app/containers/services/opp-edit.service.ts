import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/max';
import 'rxjs/add/observable/from';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as oppActions from '../../actions/opportunity-actions';
import { Opportunity } from '../../models/opportunity.model';
import { OpportunityHeader } from '../../models/opportunity-header.model';
import { OpportunityDetail } from '../../models/opportunity-detail.model';

import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';


@Injectable()
export class OppEditService {
    header$: Observable<OpportunityHeader>;
    details$: Observable<OpportunityDetail[]>;
    header: OpportunityHeader;
    details: OpportunityDetail[];
    constructor(private location: Location,private store: Store<fromRoot.State>) {
        this.header$ = store.select(fromRoot.getSelectedOppHeader);
        this.details$ = store.select(fromRoot.getSelectedOppDetails);
        //this.header$.subscribe((data: OpportunityHeader) => {
        //    if (data != null) {
        //        this.header = Object.assign({}, data);
           
        //    }
        //});
        this.details$.subscribe((data: OpportunityDetail[]) => {
            if (data != null && data != undefined) {
                this.details = Object.assign([], data);

            }
        });
    }
    saveHeader(header: OpportunityHeader) {
        this.store.dispatch(new oppActions.SaveOppHeaderAction(header));
    }
    
    goBack() {
        this.location.back();
    }
    waitForSave(): Observable<string> {
        return this.store.select(fromRoot.getOppResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                return of(saveSuccess);
            });
    }
}