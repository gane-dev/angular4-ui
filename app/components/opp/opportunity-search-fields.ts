import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { Opportunity } from '../../models/opportunity.model';
import { OpportunitySearch } from '../../models/opportunity-search.model';

import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { OppSearchService } from '../../containers/services/opp-search.service';
@Component({
    selector: 'cia-opp-search',
    templateUrl: '../html/opp/opportunity-search-fields.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OpportunitySearchComponent implements OnChanges {
    public CUST_ID: string;
    public SUPPLIER_ID: string;
   
    @Input() query: OpportunitySearch = Object.assign({}, <OpportunitySearch>{});
    public statusOptions: Array<{ text: string, value: string }>;
    constructor(private lookupDataService: LookupDataService, private oppSearchService: OppSearchService
    ) {
        this.statusOptions = lookupDataService.getPSRStatus();
   
    }
   
    search() {
        this.query = Object.assign({}, this.query, { CUST_ID: this.CUST_ID, SUPPLIER_ID: this.SUPPLIER_ID });
        this.oppSearchService.searchAction(this.query);
    }
    ngOnChanges() {
        this.CUST_ID = this.query.CUST_ID;
        this.SUPPLIER_ID = this.query.SUPPLIER_ID;

    }
    clear() {
        this.CUST_ID = null;
        this.SUPPLIER_ID = null;

           this.oppSearchService.clearSearch();
    }
      hStatus(value)
    {
          this.query = Object.assign({},this.query,{STATUS : value});
    }
}
