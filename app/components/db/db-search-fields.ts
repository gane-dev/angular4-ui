import { Component, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DataBatchSearch } from '../../models/data-batch-search.model'
import { DbSearchService } from '../../containers/services/db-search.service';

@Component({
    selector: 'cia-db-search-fields',
    templateUrl: '../html/db/db-search-fields.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DbSearchFieldsComponent implements OnChanges {
    public batchOptions: string[];
    private sourceName: string;
    public SOURCE_ID: string;
    @Input() query: DataBatchSearch;// = Object.assign({}, <DataBatchSearch>{});
  
    public batchId: string;
  //  public srcValue: string;
    pubStatus: Array<{ text: string, value: string }>;
    constructor(private lookupDataService: LookupDataService, private dbSearchService: DbSearchService
     ) {
      
              this.batchOptions = this.lookupDataService.getFilteredBatch(undefined).slice();
              this.pubStatus = this.lookupDataService.getPublishStatus();
    }
    search() {
        this.query = Object.assign({}, this.query, { SOURCE_ID: this.SOURCE_ID });
        this.dbSearchService.searchAction(this.query);
    }
    ngOnChanges() {
        this.SOURCE_ID = this.query.SOURCE_ID;
    }
    clear() {
    //    this.srcValue =null;
        this.SOURCE_ID = null;
        this.dbSearchService.clearSearch();
        this.query = Object.assign({}, <DataBatchSearch>{});
        this.sourceName = null;
    }

    selectBatchId(val: any) {
        if (val != undefined)
            this.query = Object.assign({}, this.query, { BATCH_ID: val });
    }
    handleDropdown(event: any) {
        // this.batchOptions =
        //     this.lookupDataService.getFilteredBatch(event.query);
        //console.log(event.query);
    }
    searchBatch(event: any) 
        {
            this.batchOptions =
                this.lookupDataService.getFilteredBatch(event.query);
        }
}
