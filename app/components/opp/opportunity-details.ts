import { Component,  ChangeDetectionStrategy,Input,OnChanges} from '@angular/core';

import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, GroupDescriptor, State, GroupResult, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { OpportunityDetail } from '../../models/opportunity-detail.model';
import { OppEditService } from '../../containers/services/opp-edit.service';

@Component({
    selector: 'cia-opp-details',
    templateUrl: '../html/opp/opportunity-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OppDetailsComponent implements OnChanges {
    @Input() oppDetails: OpportunityDetail[];
    private gridView: GridDataResult;
    private state: State = {
        skip: 0,
        take: 10
    };
    constructor(private oppEditService: OppEditService
    ) {
        //this.oppDetails = this.oppEditService.details;
    }
   
    ngOnChanges()
    {
        //if (this.sort === null || this.sort === undefined || this.sort.length === 0)
        //    this.sort = [{ field: 'TRANSACTION_DATE', dir: 'desc' }];
      //  this.loadData();
        this.load();
    }
    load() {
        this.gridView = process(this.oppDetails, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }

    }
