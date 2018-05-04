import { Component, Input, OnChanges,OnInit, ChangeDetectionStrategy} from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
//simport { DbEditService } from '../../containers/services/db-edit.service';
import { DataBatchDetails } from '../../models/data-batch-details.model';
import { DataBatch } from '../../models/data-batch.model';
@Component({
    selector: 'cia-db-details',
    templateUrl: '../html/db/db-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbDetailsComponent implements OnChanges, OnInit {
 
    @Input() details: DataBatchDetails[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
  
    constructor(
    ) {
       
    }
    ngOnChanges()
    {
        this.loadData();
    }
     ngOnInit()
    {
        this.loadData();
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    private loadData(): void {
        this.gridView = Object.assign({}, {
            data: orderBy(this.details, this.sort),
            total: this.details.length
        });
       
    }
}