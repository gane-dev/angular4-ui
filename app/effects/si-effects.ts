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

import { SpendIncident } from '../models/spend-incident.model'
import { SiService } from '../services/si.service';
import { SpendIncidentHeader } from '../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../models/spend-incident-detail.model'
import { of } from 'rxjs/observable/of';
import * as si from '../actions/si-actions'


@Injectable()
export class SiEffects {
    constructor(
        private actions$: Actions,
        private siService: SiService,
               
    ) { }



 

    
    @Effect()
    searchSi$: Observable<Action> = this.actions$
        .ofType(si.ActionTypes.SEARCH_SI)
        .map((action: si.SearchSiAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.siService.searchSi(query)
            .map((sis: SpendIncidentHeader[]) => new si.SearchSiCompleteAction(sis))
            .catch(() => of(new si.SearchSiCompleteAction([])))
    );
    @Effect()
    selectSi$: Observable<Action> = this.actions$
        .ofType(si.ActionTypes.SELECT_SI)
        .map((action: si.SelectSiAction) => action.payload)
        //.filter(query => query !== '')
        .switchMap(query => this.siService.selectSi(query)
            .map((sis: SpendIncidentDetail[]) => new si.SelectSiCompleteAction(sis))
            .catch(() => of(new si.SelectSiCompleteAction([])))
        );
    @Effect()
    saveSiHeader$: Observable<Action> = this.actions$
        .ofType(si.ActionTypes.SAVE_SI_HEADER)
        .map((action: si.SaveSiHeaderAction) => action.payload)
        .filter(siInput => si !== null)
        .switchMap(siHeader => this.siService.saveSiHeader(siHeader)
            .map((result: string) => new si.SaveSiHeaderCompleteAction(result))
            .catch(() => of(new si.SaveSiHeaderCompleteAction(null)))
        );

    @Effect()
    ignoreSiTransaction$: Observable<Action> = this.actions$
        .ofType(si.ActionTypes.IGNORE_SI_TRANSACTION)
        .map((action: si.IgnoreSiTransactionAction) => action.payload)
        .filter(siInput => si !== null)
        .switchMap(siHeader => this.siService.ignoreSiTransaction(siHeader)
            .map((result: string) => new si.IgnoreSiTransactionCompleteAction(result))
            .catch(() => of(new si.IgnoreSiTransactionCompleteAction(null)))
        );

}
