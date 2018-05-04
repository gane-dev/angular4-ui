import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { SpendRuleSupp } from '../../models/spend-rule-supp.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { SrSuppEditComponent } from './sr-supp-edit';
import { SrEditService } from '../../containers/services/sr-edit.service';
@Component({
    selector: 'cia-sr-supp',
    templateUrl: '../html/sr/sr-supp.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrSuppComponent implements OnChanges{
    @ViewChild(SrSuppEditComponent) protected srSuppEditComponent: SrSuppEditComponent;
   @Input() supp: SpendRuleSupp[];
  //  @Output() suppChange = new EventEmitter();
     //   public supp: SpendRuleSupp[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    public dataItem: SpendRuleSupp;
    constructor(private srEditService: SrEditService) {
       
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    ngOnChanges() {
        if (this.sort === null || this.sort === undefined || this.sort.length === 0)
            this.sort = [{ field: 'SUPPLIER_ID', dir: 'asc' }];
        this.loadData();
    }
    private loadData(): void {
     
            
        this.gridView = {
                data: orderBy(Object.assign([],this.supp), this.sort),
                total: this.supp != undefined ? this.supp.length : 0
            };
    }
    public onEdit(dataItem: SpendRuleSupp): void {
        this.dataItem = dataItem;
    }

    public onCancel(): void {
        this.dataItem = undefined;
    }

    public onAdd(): void {
        this.dataItem = <SpendRuleSupp>{ };
        this.srSuppEditComponent.add();
    }
   
    public onDelete(dataItem: SpendRuleSupp): void {
        this.srEditService.tempDeleteSupp(dataItem);
    }
}