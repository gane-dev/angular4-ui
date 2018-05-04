import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DbtEditService } from '../../containers/services/dbt-edit.service';
import { DataBatchTransSpend } from '../../models/dbt-spend.model';
@Component({
    selector: 'cia-dbt-spend',
    templateUrl: '../html/dbt/dbt-spend.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbtSpendComponent   implements OnChanges{
    @Input() spenddetails: DataBatchTransSpend[];
        private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
  
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    constructor(private dbtEditService: DbtEditService
    ) {
       // this.spenddetails = Object.assign([], this.dbtEditService.dbt);
      //  this.loadData();
    }
     ngOnChanges()
    {
         this.loadData();
    }
    private loadData(): void {
        this.gridView = {
            data: orderBy(Object.assign([],this.spenddetails), this.sort),
            total: this.spenddetails.length
        };
    }
}