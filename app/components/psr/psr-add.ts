import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';


import { LookupDataService } from '../../services/lookup-data.service';

import { PsrTable } from '../../models/psr-table.model';

import { PsrEditService } from '../../containers/services/psr-edit.service';
@Component({
    selector: 'cia-psr-add',
    templateUrl: '../html/psr/psr-add.html',
})
export class PsrAddComponent implements OnChanges {
    dataItem: PsrTable = <PsrTable>{};
    //editForm: FormGroup;
    public active: boolean = false;
    public mask: string = "MM/DD/YYYY";
    @Input() public set model(product: PsrTable) {
        if (product === undefined || product.CUST_ID === undefined) {
          this.dataItem = Object.assign(<PsrTable>{}, { DATE_LAST_UPDATED: new Date().toLocaleDateString(), UPDATED_BY: "USER", CREATED_BY: "USER", DATE_CREATED: new Date().toLocaleDateString() });
        }
        else {
          
            this.dataItem = Object.assign(<PsrTable>{}, product, { DATE_LAST_UPDATED: new Date().toLocaleDateString(), UPDATED_BY: "USER" });
        }

    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    ruleSourceOptions: Array<{ text: string, value: string }>;
    reasonCodeOptions: Array<{ text: string, value: string }>;
    ruleStatusOptions: Array<{ text: string, value: string }>;
    suppOverrideOptions: Array<{ text: string, value: string }>;
    statusOptions: Array<{ text: string, value: string }>;
    scopeOptions: Array<{ text: string, value: string }>;
    oppOptions: Array<{ text: string, value: string }>;
    constructor(private lookupService: LookupDataService, private psrEditService: PsrEditService) {
        this.ruleSourceOptions = lookupService.getPRSRuleSource();
        this.reasonCodeOptions = lookupService.getPublishStatus();
        this.ruleStatusOptions = lookupService.getPSRRuleStatus();
        this.statusOptions = lookupService.getPSRStatus();
        this.suppOverrideOptions = lookupService.getSuppOverrideValues();
        this.oppOptions = lookupService.getOppValues();
        this.scopeOptions = lookupService.getScopeValues();
    }
    ngOnChanges() {
    }
    public onSave(psr: PsrTable): void {
        if (psr.EFF_DATE !== null && psr.EFF_DATE !== undefined) {
            this.active = false;
            this.psrEditService.addPsr(psr);
        }
        else {
            alert('No data to save');
        }
    }
    public onCancel(): void {
        this.active = false;
        this.cancel.emit(undefined);
    }

    public add() {
        this.model = <PsrTable>{};
        this.active = true;
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
}