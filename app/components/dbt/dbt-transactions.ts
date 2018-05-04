import { Component, Input, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DbtEditService } from '../../containers/services/dbt-edit.service';
import { DataBatchTransTransactions } from '../../models/dbt-transactions.model';
@Component({
    selector: 'cia-dbt-transactions',
    templateUrl: '../html/dbt/dbt-transactions.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbtTransactionComponent    implements OnChanges{
 
    @Input() transactions: DataBatchTransTransactions[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
  
    constructor(private dbtEditService: DbtEditService
    ) {
       // this.transactions = Object.assign([], this.dbtEditService.dbt);
        //this.loadData();
    }
     ngOnChanges()
    {
         this.loadData();
    }
    
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    private loadData(): void {
        this.gridView = Object.assign({}, {
            data: orderBy(Object.assign([],this.transactions), this.sort),
            total: this.transactions.length
        });
       
    }
}