import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { GridDataResult, GridComponent, DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { process, GroupDescriptor, State, GroupResult, SortDescriptor, orderBy } from '@progress/kendo-data-query';


import { SpendIncident } from '../../models/spend-incident.model'
import { SiSearchService } from '../../containers/services/si-search.service';

@Component({
    selector: 'cia-si-search-grid',
    templateUrl: '../html/si/si-search-grid.html'
})
export class SiListComponent implements OnChanges{
    @Input() sis: SpendIncident[];
 
    private gridView: GridDataResult;
    private selectedId: number;
    private active: boolean;
    constructor(private siSearchService: SiSearchService) {

    }
    private state: State = {
        skip: 0,
        take: 10
    };
    ngOnChanges() {
        this.load();
    }
    load() {
        this.gridView = process(this.sis, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
  
    onEdit(auditId: number) {
       // this.siSearchService.setSelectedId(selIndex);
        this.siSearchService.viewTransactions(auditId);
    }
    
    onIgnore(auditId: number)
    {
        this.siSearchService.ignoreIncident(auditId);
    }

}