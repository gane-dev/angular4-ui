import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { SpendRuleCust } from '../../models/spend-rule-cust.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { SrEditService } from '../../containers/services/sr-edit.service';
import { SrCustEditComponent } from './sr-cust-edit';
@Component({
    selector: 'cia-sr-cust',
    templateUrl: '../html/sr/sr-cust.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrCustComponent implements OnChanges{
    @ViewChild(SrCustEditComponent) protected srCustEditComponent: SrCustEditComponent;
    @Input() spendRuleCust: SpendRuleCust[];
  //  @Output() spendRuleCustChange = new EventEmitter();
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    public dataItem: SpendRuleCust;
    constructor(private srEditService: SrEditService) {
      
      //  this.loadData();
    }
    ngOnChanges() {
        if (this.sort === null || this.sort === undefined || this.sort.length === 0)
            this.sort = [{ field: 'CUST_ID', dir: 'asc' }];
        this.loadData();
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    private loadData(): void {
            this.gridView ={
                data: orderBy(Object.assign([],this.spendRuleCust), this.sort),
                total: this.spendRuleCust != undefined ?  this.spendRuleCust.length:0
            };
    }
    public onEdit(dataItem: SpendRuleCust): void {
        this.dataItem = dataItem;
    }

   

    public onAdd(): void {
        this.dataItem = <SpendRuleCust>{};
        this.srCustEditComponent.add();

    }
      public onDelete(dataItem: SpendRuleCust): void {
          this.srEditService.tempDeleteCust(dataItem);
    }
    public onCancel(): void {
        this.dataItem = undefined;
    }
}