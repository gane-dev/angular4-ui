import { Component, ChangeDetectionStrategy,AfterViewInit,DoCheck } from '@angular/core';
import { SrEditService } from './services/sr-edit.service';

import { SpendRuleCat } from '../models/spend-rule-cat.model';
import { SpendRuleCust } from '../models/spend-rule-cust.model';
import { SpendRuleSupp } from '../models/spend-rule-supp.model';
import { SpendRuleDtl } from '../models/spend-rule-dtl.model';
import { SpendRuleFields } from '../models/spend-rule-fields.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LookupDataService } from '../services/lookup-data.service';
@Component({
    //   moduleId: module.id,
    selector: 'cia-sr-edit-page',
    templateUrl: 'html/sr-edit-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SrEditService]
})
export class SrEditPageComponent implements DoCheck{

    public cat: SpendRuleCat[];
    public cust: SpendRuleCust[];
    public supp: SpendRuleSupp[];
    public spendRuleDtl: SpendRuleDtl = <SpendRuleDtl>{};
    public spendRuleFields: SpendRuleFields = <SpendRuleFields>{};

    customers$: Observable<SpendRuleCust[]>;
    categories$: Observable<SpendRuleCat[]>;
    suppliers$: Observable<SpendRuleSupp[]>;
   // details$: Observable<SpendRuleDtl>;
    statusOptions: Array<{ text: string, value: string }>;
    reasonOptions: Array<{ text: string, value: string }>;
    rlItems: Array<{ text: string, value: string }>;
    expSupplier: boolean = false;
    expCustomer: boolean = false;
    expCategory: boolean = false;
   // ignoreFlg: boolean;
    constructor(private lookupService: LookupDataService, private srEditService: SrEditService, private route: ActivatedRoute) {
        this.rlItems = lookupService.getRLItems();
        this.customers$ = srEditService.customers$;
        this.categories$ = srEditService.categories$;
        this.suppliers$ = srEditService.suppliers$;
       // this.details$ = srEditService.details$;
        this.statusOptions = lookupService.getPSRStatus();
        this.reasonOptions = lookupService.getReasonCode();
      //  this.suppliers$.subscribe(x=> console.log(x));
        this.route.params.subscribe(
            params => {
                if (params['id'] === "0") {
                    // this.spendRuleFields = Object.assign({}, <SpendRuleFields>{}, { RULE_ID: srEditService.selectedRule.RULE_ID });
                    this.srEditService.details$.subscribe(x => this.spendRuleDtl = x);
                    this.srEditService.selectedRule$.subscribe(x => this.spendRuleFields = x);
                }
                else {
                    this.srEditService.addSr();
                    this.srEditService.newRuleId$.subscribe((id: string) => {

                        this.spendRuleFields = Object.assign({}, <SpendRuleFields>{}, { RULE_ID: id });
                    }
                    );

                }
            }

        );
    }

    toleranceChange(value)
    {
        this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { TOLERANCE_PCT: value });
    }
    backToSearch() {
        this.srEditService.goBack();
    }
    hStatusOption(value) {
        this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { STATUS: value });
    }
    hReasonOption(value) {
        this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { REASON_CODE: value });
    }
    ignoreTransaction(value) {
        this.spendRuleDtl= Object.assign({}, this.spendRuleDtl, {IGNORE_FLG: value ? 'Y' : 'N'  }); 
    }
    public onSave(): void {
        if (confirm("Make the changes permanent?")) {
            this.srEditService.saveRule(this.spendRuleFields, Object.assign({}, this.spendRuleDtl, { RULE_ID: this.spendRuleFields.RULE_ID, CREATED_BY: 'USER', UPDATED_BY:'USER', DATE_CREATED: new Date(), DATE_LAST_UPDATED:new Date()}));
            this.srEditService.waitForSave().subscribe(
                (result: string) => {
                    if (result === '1')
                        alert('Save Completed');
                    else
                        alert('Error: ' + result);
                });
            }
        }


    public onDelete(): void {
        if (confirm("Are you sure about this delete?")) {
            this.srEditService.deleteRule(this.spendRuleFields);
            this.srEditService.waitForDelete().subscribe(
                (result: string) => {
                    if (result == "1")
                        alert("Delete Completed:");
                    else
                        alert("Delete Error:" + result)
                });

        }
    }

    ngDoCheck() {
       
      
    }


hRlItme(value)
{
    this.spendRuleFields = Object.assign({}, this.spendRuleFields, { RULE_LEVEL: value });
}
}