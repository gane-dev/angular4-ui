import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DialogModule } from '@progress/kendo-angular-dialog';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LookupDataService } from '../../services/lookup-data.service';
import { CalendarModule } from 'primeng/primeng';
import { SpendIncidentDetail } from '../../models/spend-incident-detail.model';
@Component({
    selector: 'cia-si-details-edit',
   
    templateUrl: '../html/si/si-details-edit.html',
})
export class SiDetailsEditComponent  {
    dataItem: SpendIncidentDetail;
    public active: boolean = false;
    @Input() public set model(product: any) {

        this.dataItem = product;
        product === undefined ? this.active = false : this.active = true;
    }
  

    @Output() cancel: EventEmitter<SpendIncidentDetail> = new EventEmitter();
    @Output() save: EventEmitter<SpendIncidentDetail> = new EventEmitter();
   
    constructor() {
        

    }
    

    public onSave(): void {

        this.save.emit(this.dataItem);
        this.active = false;
    }
    public onCancel(): void {

        this.active = false;
        this.cancel.emit(undefined);
    }

    public add() {
        this.model = <SpendIncidentDetail>{};
        this.active = true;
    }

}