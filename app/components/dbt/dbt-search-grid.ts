import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
   } from '@progress/kendo-angular-grid';

import { process, State } from '@progress/kendo-data-query';
import { DataBatchTrans } from '../../models/data-batch-trans.model'
import { DbtSearchService } from '../../containers/services/dbt-search.service';

@Component({
    selector: 'cia-dbt-search-grid',
    templateUrl: '../html/dbt/dbt-search-grid.html'
})
export class DbtListComponent implements OnChanges{
    @Input() dbts: DataBatchTrans[];
   // private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private selectedId: number;
    private active: boolean;
    constructor(private dbtsearchService: DbtSearchService) {

    }
    private state: State = {
        skip: 0,
        take: 5
    };
    
    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.loadData();
        
    }
    ngOnChanges() {

        this.loadData();
    }
    /*protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }*/
    private loadData(): void {

        /*this.gridView = {
            data: orderBy(this.dbts, this.sort),
            total: this.dbts.length
        };*/

        this.gridView = process(this.dbts, this.state);

    }
    onEdit(sourceId: string,batchId: number) {
        /* if (selIndex > -1) {
                this.selectedId = selIndex;
                this.active = true;
            }
        else {
            this.selectedId = null;
            this.active = false;
        }*/
        this.dbtsearchService.selectDbt( sourceId,batchId);
    }
    selectionChange(selected: any) {
       /* if (selected.selected) {
            if (selected.index > -1) {
                this.selectedId = selected.index;
                this.active = true;
            }
        }
        else {
            this.selectedId = null;
            this.active = false;
        }*/
    }


}