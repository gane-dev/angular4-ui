import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as dbtActions from '../../actions/dbt-actions';

import { DataBatchTrans } from '../../models/data-batch-trans.model'
import { DataBatchSearch } from '../../models/data-batch-search.model'
import * as lookupActions from '../../actions/lookup-actions';
import { Router } from '@angular/router';
@Injectable()
export class DbtSearchService {
    public dbt$: Observable<DataBatchTrans[]>;
     dbtSearch$:Observable<DataBatchSearch>;
    constructor(private store: Store<fromRoot.State>, private router: Router) {
      //  this.dbt$ = store.select(fromRoot.getDbtSearchResults);
       // this.dbtSearch$ = store.select(fromRoot.getDbtQuery);
    }
    searchAction(query: DataBatchSearch) {
        this.store.dispatch(new dbtActions.SearchDbtAction(query));
    }
    selectDbt(sourceId: string,batchId: number) {

        this.store.dispatch(new dbtActions.SelectDbt(sourceId + '|' + batchId.toString()));
        this.router.navigate(['dbt']);
    }
    getBatchIds(sourceId: string) {
        this.store.dispatch(new lookupActions.GetBatchAction(sourceId));
    }
    getSources() {
        this.store.dispatch(new lookupActions.GetDSAction(null));
    }
    clearSearch() {
        this.store.dispatch(new dbtActions.ClearSearchAction(null));
    }
}