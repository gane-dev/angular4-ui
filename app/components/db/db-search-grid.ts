import { Component, Input, OnChanges, ChangeDetectionStrategy, ViewContainerRef} from '@angular/core';
import { GridDataResult, GridComponent, DataStateChangeEvent} from '@progress/kendo-angular-grid';

import { process, GroupDescriptor, State, GroupResult, SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { DataBatchDetails } from '../../models/data-batch-details.model'
import { DbSearchService } from '../../containers/services/db-search.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'cia-db-search-grid',
    templateUrl: '../html/db/db-search-grid.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbListComponent implements OnChanges {
    @Input() dbs: DataBatchDetails[];
    private dataBatch: DataBatchDetails;
  
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private selectedId: number;
    private active: boolean;
    private state: State = {
        skip: 0,
        take: 10
    };
    constructor(private dbSearchService: DbSearchService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnChanges() {
        this.load();
    }
  
    load() {
        this.gridView = process(this.dbs, this.state);
    }
    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
    onEdit(sourceId: string, batchId: number,transCount:number) {
       
        this.dbSearchService.getTransactions(sourceId, batchId.toString(),transCount);

    }
    onPublish(sourceId: string, batchId: number
    ) {
        this.dbSearchService.publishBatch(sourceId, batchId);
        this.dbSearchService.waitForPublish().subscribe(
            (result: string) => {
                if (result == '1') {
                    console.log(result);
                    this.toastr.success('Data Batch Publish Completed', 'Success!');
                }
                else if (result == null)
                    this.toastr.error('Data Batch Publish Failed!', 'Error!');
                else
                    this.toastr.error('Data Batch Publish Failed!' + result, 'Error!');
            });
    }
    onReject(sourceId: string, batchId: number) {
       
     
        this.dbSearchService.selectDb(sourceId,batchId.toString());
        this.dbSearchService.reject();
    }
    onUnPublish(sourceId: string, batchId: number ) {
       
        this.dbSearchService.selectDb(sourceId, batchId.toString());
        this.dbSearchService.unPublish();
    }
    selectionChange(selected: any) {

    }


}