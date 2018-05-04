import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';

import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, GroupDescriptor, State, GroupResult, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { OpportunityHeader } from '../../models/opportunity-header.model';
import { OppSearchService } from '../../containers/services/opp-search.service';
@Component({
    selector: 'cia-opp-list',
    templateUrl: '../html/opp/opportunity-search-grid.html'
})
export class OppListComponent implements OnChanges{
    @Input() opps: OpportunityHeader[];
   
    private gridView: GridDataResult;
    private selectedId: number;
    private active: boolean;
    private state: State = {
        skip: 0,
        take: 10
    };

    constructor(private oppSearchService: OppSearchService) {

    }
    ngOnChanges() {
        this.load();
    }
   
    load() {
        this.gridView = process(this.opps, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }

    onEdit(custId: string, suppId: string) {

        //this.oppSearchService.setSelectedId(selIndex);
        this.oppSearchService.selectOpp(custId, suppId);
    }
    selectionChange(selected: any) {
       
    }


}