import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/max';
import 'rxjs/add/observable/from';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as dbtActions from '../../actions/dbt-actions';
import * as msgActions from '../../actions/msg-actions';
import { DataBatchTrans } from '../../models/data-batch-trans.model';
import { DataBatchTransDetails } from '../../models/dbt-details.model';
import { DataBatchSearch } from '../../models/data-batch-search.model';
import { Location } from '@angular/common';
import { DBTApplyFlag } from '../../models/dbt-apply-flag.model';
import { of } from 'rxjs/observable/of';
import * as layout from '../../actions/layout';
import { ErrorLevel, MessageService } from '../../services/message.service';
import * as layoutActions from '../../actions/layout';
import * as dbActions from '../../actions/db-actions';
@Injectable()
export class DbtEditService {
    public dbt$: Observable<DataBatchTransDetails[]>;
    public dbt: DataBatchTransDetails[];
    public dbtHeader$: Observable<DataBatchSearch>;
    public dbtHeader: DataBatchSearch = <DataBatchSearch>{};
   
    public dbtFlags$: Observable<DBTApplyFlag[]>;
    public dbtFlags: DBTApplyFlag[];
    public dbtCount$: Observable<number>;
  //  public getConfirmation$: Observable<boolean>;
//public getApplyResult$: Observable<string>;
    confirmSub: any;
    applySub: any;
    constructor(private location: Location, private store: Store<fromRoot.State> ) {
        this.dbt$ = store.select(fromRoot.getSelectedDbt);
        this.dbtCount$ = store.select(fromRoot.getDbtCount);
     //   this.dbtHeader$ = store.select(fromRoot.getSelectedDbtHeader);
         this.dbtFlags$ = store.select(fromRoot.getDbtFlags);
     //   this.dbtHeader$.subscribe((data: DataBatchSearch) => {
     //       this.dbtHeader = data;
     //   });
         this.dbtFlags$.subscribe((data: DBTApplyFlag[]) => {
            this.dbtFlags = Object.assign([],data);
        });
         this.confirmSub = null;
         this.applySub = null;
         
    }
    clearSearch()
    {
        this.store.dispatch(new dbtActions.ClearSearchAction(null));
    }
    goBack() {
        this.location.back();
    }
    saveTransactions(data: DataBatchTransDetails[])
    {
        this.store.dispatch(new dbtActions.SaveDbtAction(data));
    }
   selectFlag(item:DBTApplyFlag)
   {
 this.store.dispatch(new dbtActions.SelectIEFlagAction(item));
   }
   selectFlags(items:DBTApplyFlag[])
   {
 this.store.dispatch(new dbtActions.SelectIEFlagsAction(items));
   }
   
   getCurrentSet():Observable<number>
   {
       return this.store.select(fromRoot.getDbtCurrentSet).switchMap(x => {return of(x + 1) });
   }
   applyFlags(dbtFlags: DBTApplyFlag[]) {
       this.store.dispatch(new layout.ShowProgressnavAction);
       this.store.dispatch(new dbtActions.ApplyIEFlagsAction(dbtFlags));
   }
   waitForApply(): Observable<string> {
       return this.store.select(fromRoot.getDbtApplyResult)
           .filter(loaded => loaded !== '-1')
           .take(1)
           .switchMap(saveSuccess => {
               this.store.dispatch(new layout.CloseProgressnavAction);
               return of(saveSuccess);
           });
   }
   selectionConfirmed(val: string) {
      
       if (val == '1')
       {
           this.store.dispatch(new layout.ShowProgressnavAction);
           this.store.dispatch(new dbtActions.ApplyIEFlagsAction(this.dbtFlags));
       }     
       
   }

   getTransactions(sourceId: string, batchId: string, custName: string, suppName: string, firstAttempt: boolean,ascending:boolean) {
       var startKey: number = 0;
       if (!firstAttempt)
           startKey = -1;
       this.store.dispatch(new dbActions.GetTransactionsCountAction(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId,  CP_CUST_NAME: custName, CP_SUPP_NAME: suppName })));
       this.store.dispatch(new layoutActions.ShowProgressnavAction());
       this.store.dispatch(new dbActions.GetTransactionsAction(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId, move: 0, remote: true, CP_CUST_NAME: custName, CP_SUPP_NAME: suppName, SORTED_KEY: startKey, SPEND: ascending ? -1 : 1})));
       this.store.select(fromRoot.getDbtLoaded)
           .filter(loaded => loaded)
           .take(1).subscribe(x => {
               this.store.dispatch(new layoutActions.CloseProgressnavAction());
               
           });

   }
   getNextTransactions(sourceId: string, batchId: string, move: number, lastTransaction: number, remote: boolean, ascending: boolean)
   //    : Observable<number>
   {
       if (remote)
        this.store.dispatch(new layoutActions.ShowProgressnavAction());
       this.store.dispatch(new dbActions.GetTransactionsAction(Object.assign(<DataBatchSearch>{}, { SOURCE_ID: sourceId, BATCH_ID: batchId, move: move, SORTED_KEY: lastTransaction, remote: remote,SPEND:ascending?-1:1 })));
       this.store.select(fromRoot.getDbtLoaded)
           .filter(loaded => loaded)
           .take(1).subscribe(x => {
               this.store.dispatch(new layoutActions.CloseProgressnavAction());
     //          return of(1);
           });
      // return of(0);
   }
   applyCompleted(saveSuccess:string):void {
       this.store.dispatch(new layout.CloseProgressnavAction);
       if (saveSuccess == '-1')
       {
           //skip
       }
       else if (saveSuccess == '1') {
           this.store.dispatch(new msgActions.ShowInfoAction({ infoLevel: ErrorLevel.Information, infoMessage: 'Include / Exclude completed:' }));
       }
       else if (saveSuccess == null) {
           this.store.dispatch(new msgActions.ShowInfoAction({ infoLevel: ErrorLevel.Error, infoMessage: 'Include / Exclude: Failed, try again' }));

       }
       else {
           this.store.dispatch(new msgActions.ShowInfoAction({ infoLevel: ErrorLevel.Error, infoMessage: 'Include / Exclude: Failed, try again' + saveSuccess }));

       }
       this.store.dispatch(new msgActions.ClearDialogAction(null));
        
   }
  
  
}