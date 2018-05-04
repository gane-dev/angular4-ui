import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as dbActions from '../../actions/db-actions';
import * as layoutActions from '../../actions/layout';
import * as lookupActions from '../../actions/lookup-actions';
import { DataBatchDetails } from '../../models/data-batch-details.model';
import { DataBatchSearch } from '../../models/data-batch-search.model';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import * as msgActions from '../../actions/msg-actions';
import { ErrorLevel } from '../../services/message.service';
@Injectable()
export class DbSearchService {
    public db$: Observable<DataBatchDetails[]>;
    public dbSearch$: Observable<DataBatchSearch>;
    constructor(private store: Store<fromRoot.State>, private router: Router) {
        this.db$ = store.select(fromRoot.getDbSearchResults);
        this.dbSearch$ = store.select(fromRoot.getDbQuery);
    }
    searchAction(query: DataBatchSearch) {
        this.store.dispatch(new layoutActions.ShowProgressnavAction());
        this.store.dispatch(new dbActions.SearchDbAction(query));
        this.store.select(fromRoot.getSearchComplete)
            .filter(loaded => loaded)
            .take(1).subscribe(x => this.store.dispatch(new layoutActions.CloseProgressnavAction()));
    }
    selectDb(sourceId:string, batchId:string) {
        this.store.dispatch(new dbActions.SelectDb(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId })));
    }
    reject() {
        this.router.navigate(['db/0']);
    }
        unPublish()
        {
            this.router.navigate(['db/1']);
        }
        getTransactions(sourceId: string, batchId: string,recordCount:number)
        {
            this.router.navigate(['dbt', { count: recordCount, batchId: batchId, sourceId: sourceId }]);
            //this.store.dispatch(new layoutActions.ShowProgressnavAction()); 
            //this.store.dispatch(new dbActions.GetTransactionsAction(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId,move:0,remote:true })));
            //this.store.select(fromRoot.getDbtLoaded)
            //    .filter(loaded => loaded)
            //    .take(1).subscribe(x => {
            //        this.store.dispatch(new layoutActions.CloseProgressnavAction());
            //        this.router.navigate(['dbt', { count: recordCount, batchId: batchId, sourceId: sourceId }]);
            //    });
            
        }
        
    getSources() {
        this.store.dispatch(new lookupActions.GetDSAction(null));
    }
    getBatchIds(sourceId: string) {
        this.store.dispatch(new lookupActions.GetBatchAction(sourceId));
    }
    clearSearch() {
        this.store.dispatch(new dbActions.ClearSearchAction(null));

    }
    publishBatch(sourceId: string, batchId: Number)
    {
        this.store.dispatch(new dbActions.PublishDBAction(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId })));
        //this.store.dispatch(new msgActions.SaveConfirmAction(null));
        //this.store.select(fromRoot.getConfirmSelection).filter(loaded => loaded).take(1).subscribe(saveSuccess => {
        //    this.store.dispatch(new dbActions.PublishDBAction(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId })));
        //});
        //this.store.select(fromRoot.getDbPublishResult).filter(loaded => loaded !== '-1').take(1).subscribe(saveSuccess => {
        //    if (saveSuccess == '1') {
        //        this.store.dispatch(new msgActions.ShowInfoAction({ infoLevel: ErrorLevel.Information, infoMessage: 'Publish Complete:' }));
        //    }
        //    else if (saveSuccess == null) {
        //        this.store.dispatch(new msgActions.ShowInfoAction({ infoLevel: ErrorLevel.Error, infoMessage: 'Publish Failed, try again' }));

        //    }
        //    else {
        //        this.store.dispatch(new msgActions.ShowInfoAction({ infoLevel: ErrorLevel.Error, infoMessage: 'Publish Failed, try again' + saveSuccess }));

        //    }
        //});
    }
    waitForPublish(): Observable<string> {
        return this.store.select(fromRoot.getDbPublishResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                return of(saveSuccess);
            });
    }
}