import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/max';
import 'rxjs/add/observable/from';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as siActions from '../../actions/si-actions';
import { SpendIncident } from '../../models/spend-incident.model';
import { SpendIncidentHeader } from '../../models/spend-incident-header.model';
import { SpendIncidentDetail } from '../../models/spend-incident-detail.model';

import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';


@Injectable()
export class SiEditService {
    header$: Observable<SpendIncidentHeader>;
    details$: Observable<SpendIncidentDetail[]>;
    header: SpendIncidentHeader;
    details: SpendIncidentDetail[];
    constructor(private location: Location,private store: Store<fromRoot.State>) {
        this.header$ = store.select(fromRoot.getSelectedSiHeader);
        //this.header$.subscribe((header: SpendIncidentHeader) => {
        //    if (header != null) {
        //        this.header = Object.assign({},header);

        //    }
        //});
        this.details$ = store.select(fromRoot.getSelectedSiDetail);
        //this.details$.subscribe((det: SpendIncidentDetail[]) => {
        //    if (det != null) {
        //        this.details = Object.assign([],det);

        //    }
        //}
        //);
    }
    saveHeader(header: SpendIncidentHeader)
    {
        this.store.dispatch(new siActions.SaveSiHeaderAction(header));
    }
    goBack() {
        this.location.back();
    }
    waitForSave(): Observable<string> {
        return this.store.select(fromRoot.getSiResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                return of(saveSuccess);
            });
    }
    waitForIgnore(): Observable<string> {
        return this.store.select(fromRoot.getSiIgnoreResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                return of(saveSuccess);
            });
    }
    ignoreTransactions(recToChange: SpendIncidentDetail[])
    {
        this.store.dispatch(new siActions.IgnoreSiTransactionAction(recToChange));
    }
}