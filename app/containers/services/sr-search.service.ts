import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as srActions from '../../actions/spend-rule-actions';
import * as lookupActions from '../../actions/lookup-actions';
import { SpendRule } from '../../models/spend-rule.model'
import { SpendRuleDtl } from '../../models/spend-rule-dtl.model'
import { SpendRuleSearch } from '../../models/spend-rule-search.model'
import { CategoryLOV } from '../../models/category-lov.model'

import { Router } from '@angular/router';
@Injectable()
export class SrSearchService {
    public sr$: Observable<SpendRuleDtl[]>;
    sr: SpendRuleDtl[];
   srSearch$: Observable<SpendRuleSearch>;
   catList$: Observable<CategoryLOV[]>;
   constructor(private store: Store<fromRoot.State>, private router: Router) {
       this.sr$ = store.select(fromRoot.getSrSearchResults);
       this.sr$.subscribe(
           (rules: SpendRuleDtl[]) => {
                this.sr = rules;
            });
       this.srSearch$ = store.select(fromRoot.getSrQuery);
       this.catList$ = store.select(fromRoot.getCategoryLOV)
    }
    searchAction(query:SpendRuleSearch) {
        this.store.dispatch(new srActions.SearchSrAction(query));
    }
    clearSearchAction() {
        this.store.dispatch(new srActions.ClearSearchAction(null));
    }
    selectSr(ruleId: string)
    {
        this.store.dispatch(new srActions.SelectSr(ruleId));
      //this.store.dispatch(new srActions.SelectedSrDetail(this.sr[idx].details));
        this.router.navigate(['sr/0']);
    }
    addSr()
    {
        this.store.dispatch(new srActions.AddSrRuleAction(null));
        this.router.navigate(['sr/1']);
    }
    filterCategory(value: any)
    {
        this.store.dispatch(new lookupActions.GetCatAction(value));
    }
}