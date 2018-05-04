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
import { PsrExceptionRuleService } from '../services/psr-exception.service';
//import { PsrRuleActions } from '../actions/index';
import { PsrTable } from '../models/psr-table.model';
import { of } from 'rxjs/observable/of';
import * as psr from '../actions/psr-rule-actions'
import { PsrExceptionGroup } from '../models/psr-exception-group.model';

@Injectable()
export class PsrRulesEffects {
    constructor(
        private actions$: Actions,
        private psrExceptionRuleService: PsrExceptionRuleService,
    ) { }
    @Effect()
    searchPsr$: Observable<Action> = this.actions$
        .ofType(psr.ActionTypes.SEARCH)
        .map((action: psr.SearchAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.psrExceptionRuleService.getPsrRules(query)
            .map((exceptionRules: PsrTable[]) => new psr.SearchCompleteAction(exceptionRules))
            .catch(() => of(new psr.SearchCompleteAction([])))
    );
    @Effect()
    savePsr$: Observable<Action> = this.actions$
        .ofType(psr.ActionTypes.SAVE_PSR)
        .map((action: psr.SavePsrAction) => action.payload)
        .filter(psrInput => psr !== null)
        .switchMap(psrTable => this.psrExceptionRuleService.addPsrRules(psrTable)
            .map((result: string) => new psr.SavePsrCompleteAction(result))
            .catch(() => of(new psr.SavePsrCompleteAction(null)))
        );
    @Effect()
    deletePsr$: Observable<Action> = this.actions$
        .ofType(psr.ActionTypes.DELETE_PSR)
        .map((action: psr.DeletePsrAction) => action.payload)
        .filter(psrInput => psr !== null)
        .switchMap(psrTable => this.psrExceptionRuleService.deletePsrRules(psrTable)
            .map((result: string) => new psr.DeletePsrCompleteAction(result))
            .catch(() => of(new psr.DeletePsrCompleteAction(null)))
        );
}
