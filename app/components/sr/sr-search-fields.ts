import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, ViewChild, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { SpendRuleSearch } from '../../models/spend-rule-search.model'
import { CategoryLOV } from '../../models/category-lov.model'

import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SrSearchService } from '../../containers/services/sr-search.service';
@Component({
    selector: 'cia-sr-search-fields',
    templateUrl: '../html/sr/sr-search-fields.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SrSearchFieldsComponent implements OnChanges {
    public rlItems: Array<{ text: string, value: string }>;
    @Input() query: SpendRuleSearch;// = Object.assign({}, <SpendRuleSearch>{});
    public CUST_ID: string;
    public SUPPLIER_ID: string;
    public CATEGORY: string;
    constructor(private lookupDataService: LookupDataService, private srSearchService: SrSearchService
    ) {
        this.rlItems = lookupDataService.getRLItems();
    }
    search() {
        this.query = Object.assign({}, this.query, { CUST_ID: this.CUST_ID, SUPPLIER_ID: this.SUPPLIER_ID, CATEGORY:this.CATEGORY });
        this.srSearchService.searchAction(this.query);
    }
    ngOnChanges() {

    }
    clear() {
    
        this.CUST_ID = null;
        this.SUPPLIER_ID = null;
        this.CATEGORY = null;
        this.srSearchService.clearSearchAction();
    }
    add()
    {
        this.srSearchService.addSr();
    }
     hRlItme(value)
    {
          this.query = Object.assign({}, this.query, {RULE_LEVEL : value});
    }


}
