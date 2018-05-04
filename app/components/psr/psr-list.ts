import { Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
import { GridDataResult, GridComponent,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

import { PsrTable } from '../../models/psr-table.model';
import { PsrSearchService } from '../../containers/services/psr-search.service';
@Component({
    selector: 'cia-psr-list',
    templateUrl: '../html/psr/psr-list.html'
})
export class PsrListComponent  implements OnChanges {
    @Input() psrrule: PsrTable[];
    private selectedId: number;
    private active: boolean;
    private gridData: GridDataResult;
    private state: State = {
        skip: 0,
        take: 10
    };
    constructor(private psrSearchService:PsrSearchService) {
        
    }
    onEdit(selIndex: PsrTable ) {
        this.psrSearchService.selectPsr(selIndex);
    }
  
    ngOnChanges() 
    {
        this.load();
    }
    load()
    {
        this.gridData = process(this.psrrule, this.state);
    }
     protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
 

}