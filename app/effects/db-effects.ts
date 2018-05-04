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

import { DataBatch } from '../models/data-batch.model'
import { DataBatchDetails } from '../models/data-batch-details.model'
import { DataBatchSearch } from '../models/data-batch-search.model'

import { DataBatchTransDetails } from '../models/dbt-details.model';

import { DataBatchService } from '../services/data-batch.service';
import { DataBatchTransService } from '../services/data-batch-trans.service';
import { of } from 'rxjs/observable/of';
import * as db from '../actions/db-actions'


@Injectable()
export class DbEffects {
    constructor(
        private actions$: Actions,
        private dbService: DataBatchService,
        private dbtService: DataBatchTransService,
    ) { }

    @Effect()
    searchDb$: Observable<Action> = this.actions$
        .ofType(db.ActionTypes.SEARCH_DB)
        .map((action: db.SearchDbAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.dbService.searchDataBatchs(query)
            .map((dbs: DataBatchDetails[]) => new db.SearchDbCompleteAction(dbs))
            .catch(() => of(new db.SearchDbCompleteAction([])))
        );
    @Effect()
    saveDb$: Observable<Action> = this.actions$
        .ofType(db.ActionTypes.SAVE_DB)
        .map((action: db.SaveDbAction) => action.payload)
        .filter(dbInput => db !== null)
        .switchMap(dbHeader => this.dbService.saveDb(dbHeader)
            .map((result: string) => new db.SaveDbCompleteAction(result))
            .catch(() => of(new db.SaveDbCompleteAction(null)))
        );

    @Effect()
    getTransactions$: Observable<Action> = this.actions$
        .ofType(db.ActionTypes.GET_TRANSACTIONS)
        .map((action: db.GetTransactionsAction) => action.payload)
        .filter(dbInput => dbInput.remote == true)
        .switchMap((dbHeader:DataBatchSearch) => this.dbtService.getDataBatchTrans(dbHeader)
        .map((result:any) => new db.GetTransactionsCompleteAction(result))
        .catch(() => of(new db.GetTransactionsCompleteAction(null)))
        );
    @Effect()
    getTransactionsCount$: Observable<Action> = this.actions$
        .ofType(db.ActionTypes.GET_TRANSACTIONS_COUNT)
        .map((action: db.GetTransactionsCountAction) => action.payload)
        //.filter(dbInput => dbInput.remote == true)
        .switchMap((dbHeader: DataBatchSearch) => this.dbtService.getDataBatchTransCount(dbHeader)
            .map((result: any) => new db.GetTransactionsCountCompleteAction(result))
            .catch(() => of(new db.GetTransactionsCountCompleteAction(null)))
        );
    @Effect()
    publishDB$: Observable<Action> = this.actions$
        .ofType(db.ActionTypes.PUBLISH_DB)
        .map((action: db.PublishDBAction) => action.payload)
        .filter(dbInput => db !== null)
        .switchMap((dbHeader: DataBatchSearch) => this.dbService.publishDB(dbHeader)
            .map((result: string) => new db.PublishDBCompleteAction(result))
            .catch(() => of(new db.PublishDBCompleteAction(null)))
        );
}
