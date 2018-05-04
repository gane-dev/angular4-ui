import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/max';
import 'rxjs/add/observable/from';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as srActions from '../../actions/spend-rule-actions';
import { SpendRule } from '../../models/spend-rule.model';
import { SpendRuleDtl } from '../../models/spend-rule-dtl.model';
import { SpendRuleDtlSelect } from '../../models/sr-details-select.model';
import { SpendRuleFields } from '../../models/spend-rule-fields.model';
import { SpendRuleCat } from '../../models/spend-rule-cat.model';
import { SpendRuleSupp } from '../../models/spend-rule-supp.model';
import { SpendRuleCust } from '../../models/spend-rule-cust.model';


import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
@Injectable()
export class SrEditService {
    //sr$: Observable<SpendRule>;
    selectedRule$: Observable<SpendRuleFields>;
    selectedRule: SpendRuleFields;
    details$: Observable<SpendRuleDtl>;
    details: SpendRuleDtl[];

    deletedDetails$: Observable<SpendRuleDtl[]>;
    deletedDetails: SpendRuleDtl[];
    customers$: Observable<SpendRuleCust[]>;
    customers: SpendRuleCust[];
    suppliers$: Observable<SpendRuleSupp[]>;
    categories$: Observable<SpendRuleCat[]>;
    categories: SpendRuleCat[];
    suppliers: SpendRuleSupp[];
    // selectedDetail$: Observable<SpendRuleDtl>;
    // selectedDetail: SpendRuleDtl;


    deletedCust$ :Observable<SpendRuleCust[]>;
    deletedCust:SpendRuleCust[];

    deletedSupp$ :Observable<SpendRuleSupp[]>;
    deletedSupp:SpendRuleSupp[];

    deletedCat$ :Observable<SpendRuleCat[]>;
    deletedCat:SpendRuleCat[];
    
newRuleId$:Observable<string>;
newRuleId: string;
    constructor(private location: Location,private store: Store<fromRoot.State>) {
        //this.selectedDetail$= store.select(fromRoot.getSrSelDetail);
        this.selectedRule$ = store.select(fromRoot.getSrSelectedRule);
        this.details$ = store.select(fromRoot.getSrSelDetail);
        //this.deletedDetails$ = store.select(fromRoot.getSrDeletedDetails);
        this.customers$ = store.select(fromRoot.getSrCustomers);
        this.deletedCust$ = store.select(fromRoot.getDeletedSrCust);
        this.deletedSupp$ = store.select(fromRoot.getDeletedSrSupp);
        this.deletedCat$ = store.select(fromRoot.getDeletedSrCat);
        this.suppliers$ = store.select(fromRoot.getSrSuppliers);
        this.categories$ = store.select(fromRoot.getSrCategories);
        this.newRuleId$ = store.select(fromRoot.getSrNewId);
         this.newRuleId$.subscribe((id: string) => {
            if (id != "") {
                this.newRuleId = id;

            }
        });
        // this.suppliers$.subscribe(x=>console.log(x));
        //this.selectedRule$.subscribe((fields: SpendRuleFields) => {
        //    if (fields != null) {
        //        this.selectedRule = fields;

        //    }
        //}
        //);
        //this.customers$.subscribe((cust: SpendRuleCust[]) => {
        //    if (cust != null) {
        //        this.customers = Object.assign([], cust);
              
        //    }
        //}
        //);
        // this.suppliers$.subscribe((supp: SpendRuleSupp[]) => {
        //    if (supp != null) {
        //        this.suppliers = Object.assign([], supp);
              
        //    }
        //}
        //);
        // this.categories$.subscribe((cat: SpendRuleCat[]) => {
        //    if (cat != null) {
        //        this.categories = Object.assign([], cat);
              
        //    }
        //}
        //);
 
        //this.details$.subscribe((det: SpendRuleDtl[]) => {
        //    if (det != null) {
        //        this.details = det;

        //    }
        //}
        //);
        //this.deletedDetails$.subscribe((det: SpendRuleDtl[]) => {
        //    if (det != null) {
        //        this.deletedDetails = det;

        //    }
        //}
        //);
        //this.deletedCust$.subscribe((data: SpendRuleCust[]) => {
        //      if (data != null && data != undefined) {
        //          if (data!= null && data != undefined && data.length > 0) {
        //              this.deletedCust = data;
                    
        //          }
        //      }
        //});
        // this.deletedSupp$.subscribe((data: SpendRuleSupp[]) => {
        //      if (data != null && data != undefined) {
        //          if (data!= null && data != undefined && data.length > 0) {
        //              this.deletedSupp = data;
                    
        //          }
        //      }
        //});
        //this.deletedCat$.subscribe((data: SpendRuleCat[]) => {
        //      if (data != null && data != undefined) {
        //          if (data!= null && data != undefined && data.length > 0) {
        //              this.deletedCat = data;
                    
        //          }
        //      }
        //});
        
    }
    
    selectRuleDetail(idx: number) {
        this.store.dispatch(new srActions.SelectEffDateAction(this.details[idx].EFF_DATE.toString()));
        // this.customers$ = this.store.select(fromRoot.getSrCustomers);
        // this.suppliers$ = this.store.select(fromRoot.getSrSuppliers);
        // this.categories$ = this.store.select(fromRoot.getSrCategories);

    }
    goBack() {
        this.location.back();
    }
    saveRule(rule: SpendRuleFields, dtl: SpendRuleDtl) {
       
        this.deletedCat$.distinctUntilChanged().take(1).subscribe(x => this.store.dispatch(new srActions.DeleteSrCatAction(x)));
        this.deletedCust$.distinctUntilChanged().take(1).subscribe(x => this.store.dispatch(new srActions.DeleteSrCustAction(x)));
        this.deletedSupp$.distinctUntilChanged().take(1).subscribe(x => this.store.dispatch(new srActions.DeleteSrSuppAction(x)));
      //  this.store.dispatch(new srActions.DeleteSrDetailsAction(dtl));
        

        this.store.dispatch(new srActions.SaveSrRuleAction(rule));
        this.store.dispatch(new srActions.SaveSrDetailsAction(dtl));
        this.categories$.distinctUntilChanged().take(1).subscribe(x => this.store.dispatch(new srActions.SaveSrCatAction(x)));
        this.customers$.distinctUntilChanged().take(1).subscribe(x => this.store.dispatch(new srActions.SaveSrCustAction(x)));
        this.suppliers$.distinctUntilChanged().take(1).subscribe(x => this.store.dispatch(new srActions.SaveSrSuppAction(x)));


    }
    addSr() {
        this.store.dispatch(new srActions.AddSrRuleAction(null));
     
    }
    checkKey(rule:SpendRuleFields,details:any) : any
    {
        if (details !== undefined && details!== null)
        {
        return details.map(detail => {
            if (detail.RULE_ID === null || detail.RULE_ID === undefined)
                return Object.assign({},detail, {RULE_ID : rule.RULE_ID});
            else
                return detail;
        });
        }
    }
    deleteRule(rule: SpendRuleFields) {
        this.store.dispatch(new srActions.DeleteSrRuleAction(rule));
    }

    addDetail(rule: SpendRuleDtl) {
    //    const newValue: SpendRuleDtl = Object.assign({},rule,{RULE_ID:this.selectedRule.RULE_ID});
        if (rule != null)
            this.store.dispatch(new srActions.AddSrDetailsAction(rule));
    }
    tempSaveDetail(rule: SpendRuleDtl) {
            const newValue: SpendRuleDtl = Object.assign({},rule,{RULE_ID:this.selectedRule.RULE_ID});
        this.store.dispatch(new srActions.TempSaveSrDetailsAction(newValue));
    }
    tempDeleteDetail(rule: SpendRuleDtl) {

        this.store.dispatch(new srActions.TempDeleteSrDetailsAction(rule));
    }

    addCust(rule: SpendRuleCust) {
        //const newValue: SpendRuleCust = Object.assign({},rule,{RULE_ID:this.selectedRule.RULE_ID});
        if (rule != null)
            this.store.dispatch(new srActions.AddSrCustAction(rule));
    }
    tempDeleteCust(rule: SpendRuleCust) {

        this.store.dispatch(new srActions.TempDeleteSrCustAction(rule));
    }

    addSupp(rule: SpendRuleSupp) {
     //   const newValue: SpendRuleSupp = Object.assign({},rule,{RULE_ID:this.selectedRule.RULE_ID});
        if (rule != null)
            this.store.dispatch(new srActions.AddSrSuppAction(rule));
    }
    tempDeleteSupp(rule: SpendRuleSupp) {

        this.store.dispatch(new srActions.TempDeleteSrSuppAction(rule));
    }

    addCat(rule: SpendRuleCat) {
  //const newValue: SpendRuleCat = Object.assign({},rule,{RULE_ID:this.selectedRule.RULE_ID});
    if (rule != null)
        this.store.dispatch(new srActions.AddSrCatAction(rule));
    }
    tempDeleteCat(rule: SpendRuleCat) {

        this.store.dispatch(new srActions.TempDeleteSrCatAction(rule));
    }
    waitForDelete(): Observable<string> {
        return this.store.select(fromRoot.getSrDelResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                 return of(saveSuccess);
            });
    }
    waitForSave(): Observable<string> {
       
        return this.store.select(fromRoot.getCatDelResult)
            .filter(loaded => loaded !== '-1')
            .take(1)
            .switchMap(saveSuccess => {
                if (saveSuccess !== '1') {
                
                    return of(saveSuccess);
                }
                
                return this.store.select(fromRoot.getCustDelResult)
                .filter(loaded => loaded !== '-1')
                .take(1)
                    .switchMap(saveSuccess => {
                    if (saveSuccess !== '1') {
                        return of(saveSuccess);
                    }
                    return this.store.select(fromRoot.getSuppDelResult)
                    .filter(loaded => loaded !== '-1')
                    .take(1)
                        .switchMap(saveSuccess => {
                        if (saveSuccess !== '1') {
                            return of(saveSuccess);
                        }
                        //return this.store.select(fromRoot.getDetailDelResult)
                        //.filter(loaded => loaded !== '-1')
                        //.take(1)
                        //    .switchMap(saveSuccess => {
                        //    if (saveSuccess !== '1') {
                        //        return of(saveSuccess);
                        //    }
                            return this.store.select(fromRoot.getSrSaveResult)
                            .filter(loaded => loaded !== '-1')
                            .take(1)
                                .switchMap(saveSuccess => {
                                if (saveSuccess !== '1') {
                                    return of(saveSuccess);
                                }
                                return this.store.select(fromRoot.getCatSaveResult)
                                .filter(loaded => loaded !== '-1')
                                .take(1)
                                    .switchMap(saveSuccess => {
                                    if (saveSuccess !== '1') {
                                        return of(saveSuccess);
                                    }
                                    return this.store.select(fromRoot.getSuppSaveResult)
                                    .filter(loaded => loaded !== '-1')
                                        .take(1).switchMap(saveSuccess => {
                                        if (saveSuccess !== '1') {
                                            return of(saveSuccess);
                                        }
                                        return this.store.select(fromRoot.getCustSaveResult)
                                            .filter(loaded => loaded !== '-1')
                                            .take(1).switchMap(saveSuccess => {
                                                if (saveSuccess !== '1') {
                                                    return of(saveSuccess);
                                                }
                                                 return this.store.select(fromRoot.getDetailSaveResult)
                                                .filter(loaded => loaded !== '-1')
                                                     .take(1).switchMap(saveSuccess => {
                                                    return of(saveSuccess);
                                                });
                                            });
    
                                        });

                                    });
                                });
                            });

                        });

                    });
          //  });
         }
}