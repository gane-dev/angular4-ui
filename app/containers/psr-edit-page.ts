import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, ChangeDetectionStrategy, ViewContainerRef} from '@angular/core';
import { PsrExceptionGroup } from '../models/psr-exception-group.model';
import { PsrTable } from '../models/psr-table.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/observable/fromEvent';
import 'rxjs/observable/merge';
import 'rxjs/add/operator/do';
import { PsrEditService } from './services/psr-edit.service';
import { ActivatedRoute } from '@angular/router';
import { LookupDataService } from '../services/lookup-data.service';
import { CustomerLOV } from '../models/customer-lov.model';
import { SupplierLOV } from '../models/supplier-lov.model';
import { ErrorLevel, MessageService } from '../services/message.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    //   moduleId: module.id,
    selector: 'cia-psr-rule-edit',
    templateUrl: 'html/psr-edit-page.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [PsrEditService]
})
export class PsrEditPageComponent {
    dataItem: PsrTable = <PsrTable>{};
    ruleSourceOptions: Array<{ text: string, value: string }>;
    reasonCodeOptions: Array<{ text: string, value: string }>;
    ruleStatusOptions: Array<{ text: string, value: string }>;
    suppOverrideOptions: Array<{ text: string, value: string }>;
    statusOptions: Array<{ text: string, value: string }>;
    scopeOptions: Array<{ text: string, value: string }>;
    oppOptions: Array<{ text: string, value: string }>;
    public ruleLevelOptions: Array<{ text: string, value: string }>;
    public custOptions: CustomerLOV[];
    public suppOptions: SupplierLOV[];
    constructor(private lookupService: LookupDataService,private route: ActivatedRoute,
        private psrEditService: PsrEditService, private msgService: MessageService
        , public toastr: ToastsManager, vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.ruleSourceOptions = lookupService.getPRSRuleSource();
        this.reasonCodeOptions = lookupService.getPublishStatus();
        this.ruleStatusOptions = lookupService.getPSRRuleStatus();
        this.statusOptions = lookupService.getPSRStatus();
        this.suppOverrideOptions = lookupService.getSuppOverrideValues();
        this.oppOptions = lookupService.getOppValues();
        this.scopeOptions = lookupService.getScopeValues();
        this.custOptions = lookupService.getFilteredPsrCust(undefined).slice();
        this.suppOptions = lookupService.getFilteredPsrSupp(undefined).slice();
        this.ruleLevelOptions = lookupService.getPsrRLItems();
        route.params.subscribe(
            params => {
                if (params['id'] === "0") {
                    psrEditService.psrException$.subscribe((data: PsrTable) => {

                        if (data != null && data != undefined) {

                            this.dataItem = Object.assign(<PsrTable>{}, data, { EFF_DATE: new Date(data.EFF_DATE),DATE_LAST_UPDATED: new Date(), UPDATED_BY: "USER" });
                        }
                        else {
                            this.dataItem = Object.assign(<PsrTable>{}, { DATE_LAST_UPDATED: new Date(), UPDATED_BY: "USER", CREATED_BY: "USER", DATE_CREATED: new Date().toLocaleDateString() });
                        }

                    });
                }
                else {
                    this.dataItem = Object.assign(<PsrTable>{}, { DATE_LAST_UPDATED: new Date(), UPDATED_BY: "USER", CREATED_BY: "USER", DATE_CREATED: new Date().toLocaleDateString() });
                }
            });
       

    }


    backToSearch() {
        this.psrEditService.goBack();
    }
    hStatusOption(value) {
        this.dataItem = Object.assign({}, this.dataItem, { STATUS: value });
    }
    hRuleStatus(value) {
        this.dataItem = Object.assign({}, this.dataItem, { RULE_STATUS: value });
    }
    hRuleSource(value) {
        this.dataItem = Object.assign({}, this.dataItem, { RULE_SOURCE: value });
    }
    hReasonCode(value) {
        this.dataItem = Object.assign({}, this.dataItem, { REASON_CODE: value });
    }
    hPSInd(value) {
        this.dataItem = Object.assign({}, this.dataItem, { PROGRAM_SCOPE_IND: value });
    }
    hGOppInd(value) {
        this.dataItem = Object.assign({}, this.dataItem, { GBS_OPP_IND: value });
    }
    hPSOverFlag(value) {
        this.dataItem = Object.assign({}, this.dataItem, { PROPOSED_SUPP_OVERRIDE_FLG: value });
    }
    hRuleLevel(value) {
        this.dataItem = Object.assign({}, this.dataItem, { RULE_LEVEL: value });
    }
    save(psrFields:PsrTable) {
        this.psrEditService.save(psrFields);
        this.psrEditService.waitForSave().subscribe(
            (result: string) => {
                if (result == '1') {
                    console.log(result);
                    this.toastr.success('PSR Save Completed', 'Success!');
                }
                else if (result == null)
                    this.toastr.error('PSR Save Failed!', 'Error!');
                else
                    this.toastr.error('PSR Save Failed!' + result, 'Error!');
            });

    }
            
    delete(psr: PsrTable): void {
        this.psrEditService.deletePsr(psr);
        this.psrEditService.waitForDelete().subscribe(
            (result: string) => {
                if (result == '1') {
                    console.log(result);
                    this.toastr.success('PSR Delete Completed', 'Success!');
                }
                else if (result == null)
                    this.toastr.error('PSR Delete Failed!', 'Error!');
                else
                    this.toastr.error('PSR Delete Failed!' + result, 'Error!');
            });

    }
}

