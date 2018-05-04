import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import { DialogModule } from '@progress/kendo-angular-dialog';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SpendRuleSupp } from '../../models/spend-rule-supp.model';
import { SrEditService } from '../../containers/services/sr-edit.service';
@Component({
    selector: 'cia-sr-supp-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../html/sr/sr-supp-edit.html',
})
export class SrSuppEditComponent  {
    dataItem: SpendRuleSupp = <SpendRuleSupp>{};
   
    public active: boolean = false;
    @Input() public set model(product: SpendRuleSupp) {

        
          if (product === undefined ) 
        {
            this.active = false;
         
             this.dataItem = <SpendRuleSupp>{};
        } 
        else
        {
          this.active = true;
          this.dataItem = Object.assign(<SpendRuleSupp>{},product) ;
        }
    }
    //@Input() model: any;

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    
    constructor(private srEditService: SrEditService) {
      

    }
  

    public onSave(dataItem: SpendRuleSupp): void {


        this.active = false;
        this.srEditService.addSupp(dataItem);
    }
    public onCancel(): void {

        this.active = false;
        this.cancel.emit(undefined);
    }
 public add() {
        this.model = <SpendRuleSupp>{};
        this.active = true;
    }

    

}