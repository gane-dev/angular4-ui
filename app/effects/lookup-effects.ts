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

import { CustomerLOV } from '../models/customer-lov.model';
import { SupplierLOV } from '../models/supplier-lov.model';

import { CategoryLOV } from '../models/category-lov.model';

import { DataSourceLOV } from '../models/datasource-lov.model';
import { LookupDataService } from '../services/lookup-data.service';

import { of } from 'rxjs/observable/of';
import * as lookup from '../actions/lookup-actions'


@Injectable()
export class LookupEffects {
    constructor(
        private actions$: Actions,
        private lookupService: LookupDataService,
               
    ) { }
    @Effect()
    GetCustLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_CUST_LOOKUP)
        .map((action: lookup.GetCustAction) => action.payload)
        .switchMap(query => this.lookupService.getCustomerLOV(query))
        .map((custs: CustomerLOV[]) => new lookup.GetCustActionComplete(custs))
        .catch(() => of(new lookup.GetCustActionComplete([])));
    @Effect()
    GetCatLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_CAT_LOOKUP)
        .map((action: lookup.GetCatAction) => action.payload)
        .switchMap(query => this.lookupService.getCategoryLOV(query))
        .map((cats: CategoryLOV[]) => new lookup.GetCatActionComplete(cats))
        .catch(() => of(new lookup.GetCatActionComplete([])));
    @Effect()
    GetSuppLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_SUPP_LOOKUP)
        .map((action: lookup.GetSuppAction) => action.payload)
        .switchMap(query =>this.lookupService.getSupplierLOV(query))
            .map((supps: SupplierLOV[]) => new lookup.GetSuppActionComplete(supps))
            .catch(() => of(new lookup.GetSuppActionComplete([])));
    @Effect()
    GetCustDBLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_CUST_DB_LOOKUP)
        .map((action: lookup.GetCustDBAction) => action.payload)
        .filter(dbInput => lookup !== null)
        .switchMap(query => this.lookupService.getDBCustomerLOV(query))
        .map((custs: CustomerLOV[]) => new lookup.GetCustDBActionComplete(custs))
        .catch(() => of(new lookup.GetCustDBActionComplete([])));

    @Effect()
    GetSuppDBLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_SUPP_DB_LOOKUP)
        .map((action: lookup.GetSuppDBAction) => action.payload)
        .filter(dbInput => lookup !== null)
        .switchMap(query => this.lookupService.getDBSupplierLOV(query))
        .map((supps: SupplierLOV[]) => new lookup.GetSuppDBActionComplete(supps))
        .catch(() => of(new lookup.GetSuppDBActionComplete([])));
    @Effect()
    GetDSLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_DS_LOOKUP)
        .map((action: lookup.GetDSAction) => action.payload)
        .switchMap(query => this.lookupService.getDSLOV(query))
        .map((custs: DataSourceLOV[]) => new lookup.GetDSActionComplete(custs))
        .catch(() => of(new lookup.GetDSActionComplete([])));

    @Effect()
    GetBatchLOV$: Observable<Action> = this.actions$
        .ofType(lookup.ActionTypes.GET_BATCH_LOOKUP)
        .map((action: lookup.GetBatchAction) => action.payload)
       // .filter(dbInput => lookup !== null)
        .switchMap(query => this.lookupService.getBatchIdsLOV())
        .map((supps: string[]) => new lookup.GetBatchActionComplete(supps))
        .catch(() => of(new lookup.GetBatchActionComplete([])));
  
}
