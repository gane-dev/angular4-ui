import { Component, Directive, Input, OnInit, Output, EventEmitter, ViewChild,OnChanges } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormControlName, FormGroup, FormControl, FormsModule,Form } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs/Rx';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { DropDownsModule  } from '@progress/kendo-angular-dropdowns';
import { LookupDataService } from '../../services/lookup-data.service';
import {CalendarModule} from 'primeng/primeng';
import { PsrTable } from '../../models/psr-table.model';
//import { PsrRule } from '../../models/psr-rule.model';
import { PsrEditService } from '../../containers/services/psr-edit.service';
@Component({
    selector: 'cia-psr-grid-edit',
    templateUrl: '../html/psr/psr-grid-edit.html',
})
export class PsrGridEditComponent implements OnChanges{
    dataItem: PsrTable =  <PsrTable>{};
    //editForm: FormGroup;
    public active: boolean = false;
    public mask: string = "MM/DD/YYYY";
    @Input() public set model(product: PsrTable) {
        if (product === undefined || product.CUST_ID === undefined) 
        {
            this.active = false;
            //this.dataItem = <PsrTable>{CUST_ID:"",SUPPLIER_ID:"",RULE_LEVEL:"",RULE_DESCRIPTION:"",PROGRAM_SCOPE_IND:"",
                      //      GBS_OPP_IND:"",PROPOSED_SUPP_OVERRIDE_FLG:"",PROPOSED_SUPPLIER:"",COMMENTS:"",PROCESS_ID: null,
                   //         EFF_DATE:null,STATUS:"",RULE_STATUS: "",CREATED_BY:"USER",UPDATED_BY:"USER",DATE_CREATED:new Date(),
                     //       DATE_LAST_UPDATED:new Date(),REASON_CODE:"",REASON_DESC:"",RULE_SOURCE:""};

             this.dataItem = Object.assign(<PsrTable>{},{DATE_LAST_UPDATED:new Date().toLocaleDateString(),UPDATED_BY:"USER", CREATED_BY:"USER",DATE_CREATED:new Date().toLocaleDateString()} ) ;
        } 
        else
        {
          this.active = true;
          this.dataItem = Object.assign(<PsrTable>{},product,{DATE_LAST_UPDATED:new Date().toLocaleDateString(),UPDATED_BY:"USER"} ) ;
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
    constructor(private formBuilder: FormBuilder, private lookupService: LookupDataService, private psrEditService: PsrEditService) {
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
    public onSave(psr:PsrTable): void {
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
 hStatusOption(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{STATUS : value});
    }
    hRuleStatus(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{RULE_STATUS : value});
    }
      hRuleSource(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{RULE_SOURCE : value});
    }
        hReasonCode(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{REASON_CODE : value});
    }
         hPSInd(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{PROGRAM_SCOPE_IND : value});
    }
         hGOppInd(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{GBS_OPP_IND : value});
    }
         hPSOverFlag(value)
    {
          this.dataItem = Object.assign({},this.dataItem,{PROPOSED_SUPP_OVERRIDE_FLG : value});
    }
}