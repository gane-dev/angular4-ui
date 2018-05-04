import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PsrTable } from '../../models/psr-table.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as psrActions from '../../actions/psr-rule-actions';
import { PsrExceptionGroup } from '../../models/psr-exception-group.model';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import * as msgActions from '../../actions/msg-actions';
import { ErrorLevel } from '../../services/message.service';
import * as layout from '../../actions/layout';
@Injectable()
export class PsrEditService {
    public psrException$: Observable<PsrTable>;
    public psrFields$: PsrTable;
    public psrs:PsrTable[];
    public deletedPsr$ :Observable<PsrTable[]>;
    public deletedPsr:PsrTable[];
  
    constructor(private location: Location,private store: Store<fromRoot.State>) {
       
        this.psrException$ = store.select(fromRoot.getSelectedPsr);
        this.deletedPsr$ = store.select(fromRoot.getDeletedPsr);
  
        this.deletedPsr$.subscribe((data: PsrTable[]) => {
            if (data != null && data != undefined) {
                if (data!= null && data != undefined && data.length > 0) {
                    this.deletedPsr = data;
                }
            }
        });
    }
    goBack() {
        this.location.back();
    }
  
    save(psrTable:PsrTable)
    {
        this.store.dispatch(new layout.ShowProgressnavAction);
        //this.store.dispatch(new msgActions.SaveConfirmAction(null));
        this.store.dispatch(new psrActions.SavePsrAction(psrTable));
       
        
    }
    deletePsr(psr: PsrTable) {
        this.store.dispatch(new layout.ShowProgressnavAction);
       // this.store.dispatch(new msgActions.SaveConfirmAction(null));
        this.store.dispatch(new psrActions.DeletePsrAction(psr));
     
        
        
    }
    tempSave(psr: PsrTable): void
    {
        this.store.dispatch(new psrActions.TempPsrAdd(psr));
     }
    addPsr(psr:PsrTable)
    {
        this.store.dispatch(new psrActions.TempPsrAdd(psr));
    }
    checkKeys(custId:string, suppId:string, ruleLevel:string) :void 
    {

        this.psrs = this.psrs.map(psr => {
           if (psr.CUST_ID === null || psr.CUST_ID === undefined) 
                psr = Object.assign({},psr,{CUST_ID : custId});
        if (psr.SUPPLIER_ID ===  null || psr.SUPPLIER_ID === undefined) 
            psr = Object.assign({},psr,{SUPPLIER_ID : suppId});
        if (psr.RULE_LEVEL ===  null || psr.RULE_LEVEL === undefined) 
            psr = Object.assign({},psr,{RULE_LEVEL : ruleLevel});
        return psr;
            });
    }
    waitForDelete(): Observable<string> {
        return this.store.select(fromRoot.getDelResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                this.store.dispatch(new layout.CloseProgressnavAction);
                    return of(saveSuccess);
                });
    }

    waitForSave(): Observable<string> {
        
        return this.store.select(fromRoot.getSaveResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                this.store.dispatch(new layout.CloseProgressnavAction);
                //if (saveSuccess !== '1') {
                    return of(saveSuccess);
                //}
                //return this.store.select(fromRoot.getDelResult)
                //    .filter(loaded => loaded !== '-1')
                //    .take(1);
            });
    }
      

}