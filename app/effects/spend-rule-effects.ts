import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { SpendRuleService } from '../services/spend-rule.service';
import { SpendRule } from '../models/spend-rule.model';
import { SpendRuleSearch } from '../models/spend-rule-search.model';

import { SpendRuleDetails } from '../models/spend-rule-details.model';

import { SpendRuleDtl } from '../models/spend-rule-dtl.model';
import { of } from 'rxjs/observable/of';
import * as spendRule from '../actions/spend-rule-actions'


@Injectable()
export class SrEffects {
    constructor(
        private actions$: Actions,
        private spendRuleService: SpendRuleService,
               
    ) { }
      
    @Effect()
    searchSpendRules$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SEARCH_SR)
        .map((action: spendRule.SearchSrAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.spendRuleService.searchSpendRule(query)
            .map((spendRules: SpendRuleDtl[]) => new spendRule.SearchSrCompleteAction(spendRules))
            .catch(() => of(new spendRule.SearchSrCompleteAction([])))
    );
    @Effect()
    selectDetail$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SELECT_SR)
        .map((action: spendRule.SelectSr) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.spendRuleService.searchSpendDetail(query)
            .map((spendRules: SpendRuleDetails) => new spendRule.SelectSrDetailCompleteAction(spendRules))
            .catch(() => of(new spendRule.SelectSrDetailCompleteAction(null)))
        );
    @Effect()
    addSrRule$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.ADD_SR_RULE)
        .map((action: spendRule.AddSrRuleAction) => action.payload)
        //.filter(psrInput => (spendRule !== null && spendRule !== undefined)) 
        .switchMap(psrTable => this.spendRuleService.addSrRule()
            .map((result: string) => new spendRule.AddSrRuleCompleteAction(result))
            .catch(() => of(new spendRule.AddSrRuleCompleteAction(null)))
        );
    @Effect()
    saveSrRule$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SAVE_SR_RULE)
        .map((action: spendRule.SaveSrRuleAction) => action.payload)
       // .filter(psrInput => (psrInput !== null && psrInput !== undefined)) 
        .switchMap(psrTable => this.spendRuleService.saveSrRule(psrTable)
            .map((result: string) => new spendRule.SaveSrRuleCompleteAction(result))
            .catch(() => of(new spendRule.SaveSrRuleCompleteAction(null)))
        );
    
    @Effect()
    deleteSrRule$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.DELETE_SR_RULE)
        .map((action: spendRule.DeleteSrRuleAction) => action.payload)
        //.filter(psrInput => (psrInput !== undefined && psrInput !== null))
        .switchMap(psrTable => this.spendRuleService.deleteSrRule(psrTable)
            .map((result: string) => new spendRule.DeleteSrRuleCompleteAction(result))
            .catch(() => of(new spendRule.DeleteSrRuleCompleteAction(null)))
        );


    @Effect()
    saveSrDetails$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SAVE_SR_DETAILS)
        .map((action: spendRule.SaveSrDetailsAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.saveSrDetails(psrTable)
            .map((result: string) => new spendRule.SaveSrDetailsCompleteAction(result))
            .catch(() => of(new spendRule.SaveSrDetailsCompleteAction(null)))
        );
    @Effect()
    deleteSrDetails$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.DELETE_SR_DETAILS)
        .map((action: spendRule.DeleteSrDetailsAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.deleteSrDetails(psrTable)
            .map((result: string) => new spendRule.DeleteSrDetailsCompleteAction(result))
            .catch(() => of(new spendRule.DeleteSrDetailsCompleteAction(null)))
        );

    @Effect()
    saveSrCust$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SAVE_SR_CUST)
        .map((action: spendRule.SaveSrCustAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.saveSrCust(psrTable)
            .map((result: string) => new spendRule.SaveSrCustCompleteAction(result))
            .catch(() => of(new spendRule.SaveSrCustCompleteAction(null)))
        );
    @Effect()
    deleteSrCust$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.DELETE_SR_CUST)
        .map((action: spendRule.DeleteSrCustAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.deleteSrCust(psrTable)
            .map((result: string) => new spendRule.DeleteSrCustCompleteAction(result))
            .catch(() => of(new spendRule.DeleteSrCustCompleteAction(null)))
        );

    @Effect()
    saveSrSupp$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SAVE_SR_SUPP)
        .map((action: spendRule.SaveSrSuppAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.saveSrSupp(psrTable)
            .map((result: string) => new spendRule.SaveSrSuppCompleteAction(result))
            .catch(() => of(new spendRule.SaveSrSuppCompleteAction(null)))
        );
    @Effect()
    deleteSrSupp$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.DELETE_SR_SUPP)
        .map((action: spendRule.DeleteSrSuppAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.deleteSrSupp(psrTable)
            .map((result: string) => new spendRule.DeleteSrSuppCompleteAction(result))
            .catch(() => of(new spendRule.DeleteSrSuppCompleteAction(null)))
        ); 


    @Effect()
    saveSrCat$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.SAVE_SR_CAT)
        .map((action: spendRule.SaveSrCatAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.saveSrCat(psrTable)
            .map((result: string) => new spendRule.SaveSrCatCompleteAction(result))
            .catch(() => of(new spendRule.SaveSrCatCompleteAction(null)))
        );
    @Effect()
    deleteSrCat$: Observable<Action> = this.actions$
        .ofType(spendRule.ActionTypes.DELETE_SR_CAT)
        .map((action: spendRule.DeleteSrCatAction) => action.payload)
        //.filter(psrInput => psrInput !== undefined)
        .switchMap(psrTable => this.spendRuleService.deleteSrCat(psrTable)
            .map((result: string) => new spendRule.DeleteSrCatCompleteAction(result))
            .catch(() => of(new spendRule.DeleteSrCatCompleteAction(null)))
        ); 
}
