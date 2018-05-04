
import { Component, Input/*, Output, EventEmitter*/, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { SpendIncidentHeader } from '../../models/spend-incident-header.model'


import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SiSearchService } from '../../containers/services/si-search.service';


@Component({
    selector: 'cia-si-search-fields',
    templateUrl: '../html/si/si-search-fields.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SiSearchFieldsComponent implements OnChanges{
   
    @Input() query: SpendIncidentHeader;// = Object.assign({}, <SpendIncidentHeader>{});
    public CUST_ID: string;
    public SUPPLIER_ID: string;
    public SOURCE_ID: string;
    constructor(private lookupDataService: LookupDataService, private siSearchService: SiSearchService
    ) {
       
    }
    ngOnChanges() {

    }
    search() {
        this.query = Object.assign({}, this.query, { CUST_ID: this.CUST_ID, SUPPLIER_ID: this.SUPPLIER_ID, SOURCE_ID: this.SOURCE_ID });
        this.siSearchService.searchAction(this.query);
    }

    clear() {
           this.siSearchService.clearSearch();
        this.CUST_ID = null;
        this.SUPPLIER_ID = null;
        this.SOURCE_ID = null;
    }
   hStatusOption(value)
    {
          this.query = Object.assign({}, this.query, {REVIEW_STATUS : value});
    }
  
  
}
