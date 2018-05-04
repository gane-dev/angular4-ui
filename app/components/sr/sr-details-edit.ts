import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import { DialogModule } from '@progress/kendo-angular-dialog';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SpendRuleDtl } from '../../models/spend-rule-dtl.model';
import { SrEditService } from '../../containers/services/sr-edit.service';
import { LookupDataService } from '../../services/lookup-data.service';
@Component({
    selector: 'cia-sr-details-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../html/sr/sr-details-edit.html',
})
export class SrDetailsEditComponent {
    dataItem: SpendRuleDtl = <SpendRuleDtl>{};

    public active: boolean = false;
     statusOptions: Array<{ text: string, value: string }>;
      reasonOptions: Array<{ text: string, value: string }>;
      ignoreFlag:boolean =false;
    @Input() public set model(product: SpendRuleDtl) {

           if (product === undefined ) 
        {
           
          this.active = false;
         //this.dataItem = Object.assign(<SpendRuleDtl>{},{DATE_LAST_UPDATED:new Date().toLocaleDateString(),UPDATED_BY:"USER", CREATED_BY:"USER",DATE_CREATED:new Date().toLocaleDateString()} ) ;
        } 
        else if (product.EFF_DATE === undefined) 
        {
             this.dataItem = Object.assign(<SpendRuleDtl>{},{DATE_LAST_UPDATED:new Date().toLocaleDateString(),UPDATED_BY:"USER", CREATED_BY:"USER",DATE_CREATED:new Date().toLocaleDateString(), IGNORE_FLG: "N" }) ;
        }
        else
        {
           
        this.active = true;  
        this.ignoreFlag = product.IGNORE_FLG ==='Y'?true:false;
          this.dataItem = Object.assign(<SpendRuleDtl>{},product,{DATE_LAST_UPDATED:new Date().toLocaleDateString(),UPDATED_BY:"USER"} ) ;
        }
        
    }
    //@Input() model: any;

  @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private lookupService: LookupDataService,private srEditService: SrEditService) {

        this.statusOptions = lookupService.getPSRStatus();
       this.reasonOptions   = lookupService.getReasonCode();
    }



    public onSave(dataItem: SpendRuleDtl): void {


        this.active = false;
        this.srEditService.addDetail(dataItem);
    }
    public onCancel(): void {
        this.active = false;
        this.cancel.emit(undefined);
    }

    public add() {
        
        this.model = <SpendRuleDtl>{};
        this.active = true;

       
    }
   switchFlag(val:boolean)
    {
        if (val)
        {
            this.dataItem = Object.assign({}, this.dataItem, { IGNORE_FLG: "Y" });
            this.ignoreFlag = true;
        }
        else
        {
            this.dataItem = Object.assign({}, this.dataItem, { IGNORE_FLG: "N" });
            this.ignoreFlag = false;
        }

    }
hStatusOption(value)
    {
          this.dataItem = Object.assign({}, this.dataItem, {STATUS : value});
    }
    hReasonOption(value)
    {
          this.dataItem = Object.assign({}, this.dataItem, {REASON_CODE : value});
    }
}