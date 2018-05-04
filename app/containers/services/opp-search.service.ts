import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as oppActions from '../../actions/opportunity-actions';
import { OpportunityHeader } from '../../models/opportunity-header.model';
import { OpportunitySearch } from '../../models/opportunity-search.model';

import { Router } from '@angular/router';
@Injectable()
export class OppSearchService {
    public opp$: Observable<OpportunityHeader[]>;
    oppSearch$:Observable<OpportunitySearch>;
   constructor(private store: Store<fromRoot.State>, private router: Router) {
       this.opp$ = store.select(fromRoot.getOppSearchResults);
       this.oppSearch$ = store.select(fromRoot.getOppQuery);
    }
    searchAction(query:OpportunitySearch) {
        this.store.dispatch(new oppActions.SearchOppAction(query));
    }
    selectOpp(custId: string, suppId: string)
    {
        this.store.dispatch(new oppActions.SelectOppAction(Object.assign(<OpportunityHeader>{ }, {CUST_ID:custId,SUPPLIER_ID:suppId})));
        this.router.navigate(['opp']);
    }
     clearSearch() {
            this.store.dispatch(new oppActions.ClearSearchAction(null));
    }
}