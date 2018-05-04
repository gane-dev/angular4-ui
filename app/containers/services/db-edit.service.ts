import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/max';
import 'rxjs/add/observable/from';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as dbActions from '../../actions/db-actions';
import { DataBatch } from '../../models/data-batch.model';
import { DataBatchDetails } from '../../models/data-batch-details.model';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import * as msgActions from '../../actions/msg-actions';
import { ErrorLevel } from '../../services/message.service';
import * as layout from '../../actions/layout';
@Injectable()
export class DbEditService {
    public db$: Observable<DataBatchDetails>;
    public records$: Observable<DataBatchDetails>;
    public details$: Observable<DataBatchDetails[]>;
    public maxDb$: Observable<DataBatchDetails>;
  
    constructor(private location: Location, private store: Store<fromRoot.State>) {
        this.db$ = store.select(fromRoot.getSelectedDb);
        this.details$ = store.select(fromRoot.getDbForSource);
    }
    comparer(x: DataBatchDetails, y: DataBatchDetails) {
        if ("" + x.LOAD_YEAR + x.LOAD_PERIOD > "" + y.LOAD_YEAR + y.LOAD_PERIOD) {
            return 1;
        } else if ("" + x.LOAD_YEAR + x.LOAD_PERIOD < "" + y.LOAD_YEAR + y.LOAD_PERIOD) {
            return -1;
        }
        return 0;
    }

    goBack() {
        this.location.back();
    }
    saveTransactions(data: DataBatchDetails) {
        this.store.dispatch(new layout.ShowProgressnavAction);
        this.store.dispatch(new dbActions.SaveDbAction(data));
       
        
    }
    waitForSave(): Observable<string> {
        return this.store.select(fromRoot.getDbSaveResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                this.store.dispatch(new layout.CloseProgressnavAction);
                return of(saveSuccess);
            });
    }
}