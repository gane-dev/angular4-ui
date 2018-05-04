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
//import { AppState } from '../reducers/index';
import { OpportunityService } from '../services/opportunity.service';
//import { PsrRuleActions } from '../actions/index';
import { Opportunity } from '../models/opportunity.model';
import { OpportunitySearch } from '../models/opportunity-search.model';

import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunityDetail } from '../models/opportunity-detail.model';
import { of } from 'rxjs/observable/of';
import * as opp from '../actions/opportunity-actions'


@Injectable()
export class OpportunityEffects {
    constructor(
        private actions$: Actions,
        private opportunityService: OpportunityService,
               
    ) { }
    
    @Effect()
    searchOpp$: Observable<Action> = this.actions$
        .ofType(opp.ActionTypes.SEARCH_OPP)
        .map((action: opp.SearchOppAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.opportunityService.searchOpportunity(query)
            .map((opps: OpportunityHeader[]) => new opp.SearchOppCompleteAction(opps))
            .catch(() => of(new opp.SearchOppCompleteAction([])))
    );
    @Effect()
    selectOpp$: Observable<Action> = this.actions$
        .ofType(opp.ActionTypes.SELECT_OPP)
        .map((action: opp.SelectOppAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.opportunityService.selectOpportunity(query)
            .map((opps: OpportunityDetail[]) => new opp.SelectOppCompleteAction(opps))
            .catch(() => of(new opp.SelectOppCompleteAction([])))
        );
    @Effect()
    saveOppHeader$: Observable<Action> = this.actions$
        .ofType(opp.ActionTypes.SAVE_OPP_HEADER)
        .map((action: opp.SaveOppHeaderAction) => action.payload)
        .filter(oppInput => opp !== null)
        .switchMap(oppHeader => this.opportunityService.saveOppHeader(oppHeader)
            .map((result: string) => new opp.SaveOppHeaderCompleteAction(result))
            .catch(() => of(new opp.SaveOppHeaderCompleteAction(null)))
        );

}
