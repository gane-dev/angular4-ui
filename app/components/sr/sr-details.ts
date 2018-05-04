import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { SpendRuleDtl } from '../../models/spend-rule-dtl.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { SrEditService } from '../../containers/services/sr-edit.service';
import { SrDetailsEditComponent } from './sr-details-edit';

@Component({
    selector: 'cia-sr-details',
    templateUrl: '../html/sr/sr-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrDetailsComponent implements OnChanges{
    @ViewChild(SrDetailsEditComponent) protected srDetailsEditComponent: SrDetailsEditComponent;
    @Input() spendRuleDtl: SpendRuleDtl[];
   //  @Output() suppChange = new EventEmitter();
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    public dataItem: SpendRuleDtl;
    constructor(private srEditService: SrEditService) {
     //   this.spendRuleDtl = Object.assign([], srEditService.details);  
      //  this.loadData();
      
     
    }
    ngOnChanges() {
        if (this.sort === null || this.sort === undefined || this.sort.length === 0)
            this.sort = [{ field: 'EFF_DATE', dir: 'desc' }];
        
        this.loadData();
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    private loadData(): void {
            this.gridView = {
                data: orderBy(this.spendRuleDtl, this.sort),
                total: this.spendRuleDtl != undefined ? this.spendRuleDtl.length : 0
            };
    }
    public onEdit(dataItem: SpendRuleDtl): void {
        this.dataItem = dataItem;
    }

   
  public onCancel(): void {
        this.dataItem = undefined;
    }
    public onAdd(): void {
        this.dataItem = <SpendRuleDtl>{};
        this.srDetailsEditComponent.add();
    }
    public onSave(): void {
        this.dataItem = <SpendRuleDtl>{};
    }
    public onDelete(dataItem: SpendRuleDtl): void {
        this.srEditService.tempDeleteDetail(dataItem);
    }
    selectionChange(selected: any) {
        if (selected.selected) {
            if (selected.index > -1) {
                this.srEditService.selectRuleDetail(selected.index);
            }

        }
    }

}