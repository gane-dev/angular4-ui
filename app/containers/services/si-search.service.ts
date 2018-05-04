import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as siActions from '../../actions/si-actions';

import { SpendIncidentHeader } from '../../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../../models/spend-incident-detail.model'
import { SpendIncident } from '../../models/spend-incident.model'

import { Router } from '@angular/router';
@Injectable()
export class SiSearchService {
    public si$: Observable<SpendIncidentHeader[]>;
    siSearch$:Observable<SpendIncidentHeader>;
   constructor(private store: Store<fromRoot.State>, private router: Router) {
       this.si$ = store.select(fromRoot.getSiSearchResults);
       this.siSearch$ = store.select(fromRoot.getSiQuery);
    }
    searchAction(query:SpendIncidentHeader) {
        this.store.dispatch(new siActions.SearchSiAction(query));
    }
    selectSi(auditId: number)
    {
        this.store.dispatch(new siActions.SelectSiAction(Object.assign(<SpendIncidentHeader>{ SPEND_AUDIT_ID: auditId})));
        this.router.navigate(['si']);
    }
    viewTransactions(auditId: number)
    {
        this.store.dispatch(new siActions.SelectSiAction(Object.assign(<SpendIncidentHeader>{ SPEND_AUDIT_ID: auditId })));
        this.router.navigate(['si/0']);
    }

    ignoreIncident(auditId: number) {
        this.store.dispatch(new siActions.SelectSiAction(Object.assign(<SpendIncidentHeader>{ SPEND_AUDIT_ID: auditId })));
        this.router.navigate(['si/1']);
    }
     clearSearch() {
            this.store.dispatch(new siActions.ClearSearchAction(null));
    }
}