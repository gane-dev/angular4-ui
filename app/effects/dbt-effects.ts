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

import { DataBatchTrans } from '../models/data-batch-trans.model'
import { DataBatchSearch } from '../models/data-batch-search.model'



import { DataBatchTransService } from '../services/data-batch-trans.service';

import { LoginService } from '../services/login.service';
import { of } from 'rxjs/observable/of';
import * as dbt from '../actions/dbt-actions'


@Injectable()
export class DbtEffects {
    constructor(
        private actions$: Actions,
        private dbtService: DataBatchTransService,
        private loginService: LoginService
    ) { }
    @Effect()
    searchDbt$: Observable<Action> = this.actions$
        .ofType(dbt.ActionTypes.SEARCH_DBT)
        .map((action: dbt.SearchDbtAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.dbtService.searchDataBatchTrans(query)
            .map((dbts: DataBatchTrans[]) => new dbt.SearchDbtCompleteAction(dbts))
            .catch(() => of(new dbt.SearchDbtCompleteAction([])))
        );
    @Effect()
    saveDbt$: Observable<Action> = this.actions$
        .ofType(dbt.ActionTypes.SAVE_DBT)
        .map((action: dbt.SaveDbtAction) => action.payload)
        .filter(dbtInput => dbt !== null)
        .switchMap(dbts => this.dbtService.saveDbt(dbts)
            .map((result: string) => new dbt.SaveDbtCompleteAction(result))
            .catch(() => of(new dbt.SaveDbtCompleteAction(null)))
        );
    @Effect()
    applyFlags$: Observable<Action> = this.actions$
        .ofType(dbt.ActionTypes.APPLY_IE_FLAGS)
        .map((action: dbt.ApplyIEFlagsAction) => action.payload)
        .filter(dbtInput => dbt !== null)
        .switchMap(dbts => this.dbtService.applyFlags(dbts)
            .map((result: string) => new dbt.ApplyIEFlagsCompleteAction(result))
            .catch(() => of(new dbt.ApplyIEFlagsCompleteAction(null)))
        );
}
