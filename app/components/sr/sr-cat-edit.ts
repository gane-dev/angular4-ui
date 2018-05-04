import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import { DialogModule } from '@progress/kendo-angular-dialog';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SpendRuleCat } from '../../models/spend-rule-cat.model';
import { SrEditService } from '../../containers/services/sr-edit.service';
@Component({
    selector: 'cia-sr-cat-edit',
    templateUrl: '../html/sr/sr-cat-edit.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrCatEditComponent  {
    dataItem: SpendRuleCat = <SpendRuleCat>{};
   
    public active: boolean = false;
  //  @Input() model : SpendRuleCat;
    @Input() public set model(product: SpendRuleCat) {

       if (product === undefined) 
        {
            this.active = false;
         
             this.dataItem = <SpendRuleCat>{};
        } 
        else
        {
          this.active = true;
          this.dataItem = Object.assign(<SpendRuleCat>{},product ) ;
        }
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    
    constructor(private srEditService:SrEditService) {
      

    }
  

    public onSave(dataItem: SpendRuleCat): void {
            
        this.active = false;
        this.srEditService.addCat(dataItem);
    }
    public onCancel(): void {

        this.active = false;
        this.cancel.emit(undefined);
    }
    public edit
    (dataItem:SpendRuleCat) {
        this.model = dataItem;
        this.active = true;
    }

    public add(dataItem:SpendRuleCat) {
      //  this.model = dataItem;
        this.active = true;
    }

}