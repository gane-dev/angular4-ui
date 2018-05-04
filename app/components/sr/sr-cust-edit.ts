import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { DialogModule } from '@progress/kendo-angular-dialog';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SpendRuleCust } from '../../models/spend-rule-cust.model';
import { SrEditService } from '../../containers/services/sr-edit.service';
import { LookupDataService } from '../../services/lookup-data.service';
@Component({
    selector: 'cia-sr-cust-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../html/sr/sr-cust-edit.html',
})
export class SrCustEditComponent {
    dataItem: SpendRuleCust = <SpendRuleCust>{};

    public active: boolean = false;
    
     custTypeOptions: Array<{ text: string, value: string }>;
    @Input() public set model(product: SpendRuleCust) {

     
          if (product === undefined) 
        {
            this.active = false;
         
             this.dataItem = <SpendRuleCust>{} ;
        } 
        else
        {
          this.active = true;
          this.dataItem = Object.assign(<SpendRuleCust>{},product) ;
        }
    }
    //@Input() model: any;

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private lookupService: LookupDataService,private srEditService: SrEditService) {

  this.custTypeOptions = lookupService.getCustType();
    }


    public onSave(dataItem: SpendRuleCust): void {
        this.active = false;
        this.srEditService.addCust(dataItem);
    }
    public onCancel(): void {

        this.active = false;
        this.cancel.emit(undefined);
    }

    public add() {
       this.model = <SpendRuleCust>{};
       this.active = true;
    }
hCustType(value)
    {
          this.dataItem = Object.assign({}, this.dataItem, {CUST_TYPE : value});
    }

}