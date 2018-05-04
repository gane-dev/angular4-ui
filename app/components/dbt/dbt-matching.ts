import { Component, Input, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DataBatchTransMatching } from '../../models/dbt-matching.model';
import { DbtEditService } from '../../containers/services/dbt-edit.service';

@Component({
    selector: 'cia-dbt-matching',
    templateUrl: '../html/dbt/dbt-matching.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbtMatchingComponent implements OnChanges{
   
    @Input() matchingdetails: DataBatchTransMatching[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
   
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    ngOnChanges()
    {
         this.loadData();
    }
    constructor(private dbtEditService: DbtEditService
    ) {
      //  this.matchingdetails = Object.assign([], this.dbtEditService.dbt);
       // this.loadData();
    }
    private loadData(): void {
       // if (this.matchingdetails != null && this.matchingdetails != undefined)
        this.gridView = {
            data: orderBy(Object.assign([],this.matchingdetails), this.sort),
            total: this.matchingdetails.length
        };
    }
}