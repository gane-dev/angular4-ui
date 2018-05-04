import { Component, Input, Output, EventEmitter, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, orderBy } from '@progress/kendo-data-query';


import { SpendRule } from '../../models/spend-rule.model'
import { SpendRuleDtl } from '../../models/spend-rule-dtl.model'
import { SrSearchService } from '../../containers/services/sr-search.service';

@Component({
    selector: 'cia-sr-search-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../html/sr/sr-search-grid.html'
})
export class SrListComponent implements OnChanges{
    @Input() srs: SpendRuleDtl[];
   
    private gridView: GridDataResult;

    private selectedId: number;
    private active: boolean;
    constructor(private srSearchService: SrSearchService) {

    }
    private state: State = {
        skip: 0,
        take: 10
    };
    ngOnChanges() {
        this.load();
    }
    load() {
        this.gridView = process(this.srs, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }

    onEdit(ruleId: string) {
        //this.srSearchService.setSelectedId(selIndex);
        this.srSearchService.selectSr(ruleId);

    }
    
    }


