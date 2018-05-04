import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy,ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { SpendRuleCat } from '../../models/spend-rule-cat.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { SrEditService } from '../../containers/services/sr-edit.service';
import { SrCatEditComponent } from './sr-cat-edit';
@Component({
    selector: 'cia-sr-cat',
    templateUrl: '../html/sr/sr-cat.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrCatComponent  implements OnChanges{
    @ViewChild(SrCatEditComponent) protected srCatEditComponent: SrCatEditComponent;

    public dataItem: SpendRuleCat;
    @Input() spendRuleCat: SpendRuleCat[];
  //  @Output() spendRuleCatChange = new EventEmitter();
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    constructor(private srEditService: SrEditService) {
       
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    ngOnChanges()
    {
        if (this.sort === null || this.sort === undefined || this.sort.length === 0)
            this.sort = [{ field: 'CATEGORY', dir: 'asc' }];
        this.loadData();
    }
    private loadData(): void {
       

            this.gridView = {
                data: orderBy(Object.assign([],this.spendRuleCat), this.sort),
                total: this.spendRuleCat != undefined ? this.spendRuleCat.length : 0
            };
    }
    public onEdit(dataItem: SpendRuleCat): void {
        this.dataItem = dataItem;
        this.srCatEditComponent.add(this.dataItem);
    }

    public onCancel(): void {
        this.dataItem = undefined;
    }

    public onAdd(): void {
        this.dataItem = <SpendRuleCat>{};
        this.srCatEditComponent.add(this.dataItem);
    }
   
    public onDelete(dataItem: SpendRuleCat): void {
        
        this.srEditService.tempDeleteCat(dataItem);
    }
}