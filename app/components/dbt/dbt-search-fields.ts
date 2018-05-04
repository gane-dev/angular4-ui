import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DataBatchSearch } from '../../models/data-batch-search.model'
import { DbtSearchService } from '../../containers/services/dbt-search.service';
import { DataSourceLOV } from '../../models/datasource-lov.model';
@Component({
    selector: 'cia-dbt-search-fields',
    templateUrl: '../html/dbt/dbt-search-fields.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DbtSearchFieldsComponent implements OnChanges {
    @Input() query: DataBatchSearch;// = Object.assign({}, <DataBatchSearch>{});
    public transTypeOptions: Array<{ text: string, value: string }>;
    public srcOptions: DataSourceLOV[];
    public srcOptions1: DataSourceLOV[];
    public batchOptions: string[];
    public ds: DataSourceLOV;
    public ds1: DataSourceLOV;
    public batchId: string;
     public publishOptions: Array<{ text: string, value: string }>;
    constructor(private lookupDataService: LookupDataService, private dbtSearchService: DbtSearchService
    ) {
         this.publishOptions = lookupDataService.getPublishStatus();
        this.transTypeOptions = lookupDataService.getTransTypes();
            this.srcOptions = this.lookupDataService.getFilteredDS(undefined).slice();
             this.srcOptions1 =  this.lookupDataService.getFilteredDS1(undefined).slice();
              this.batchOptions = this.lookupDataService.getFilteredBatch(undefined).slice();
    }
    search() {
        this.dbtSearchService.searchAction(this.query);
    }
    ngOnChanges() {
    }
   
    clear() {
          this.dbtSearchService.clearSearch();
    }
    filterSource
        (event: any) {
        this.srcOptions =
            this.lookupDataService.getFilteredDS(event.query);
    }
    filterSource1
        (event: any) {
        this.srcOptions1 =
            this.lookupDataService.getFilteredDS1(event.query);
    }
    selectSource(val: any) {
        if (val != undefined)
        {
            this.query = Object.assign({}, this.query, { SOURCE_ID: val });
            this.dbtSearchService.getBatchIds(val);
        }

    }
    selectSource1(val: any) {
        if (val != undefined)
        {
            const source = this.srcOptions1.filter((s) => s.SOURCE_NAME.toLowerCase() === val.toLowerCase()).pop();
            if (source != undefined)
            {
                this.query = Object.assign({}, this.query, { SOURCE_ID:source.SOURCE_ID });
            //    this.dbtSearchService.getBatchIds(source.SOURCE_ID);
            //      this.batchOptions = this.lookupDataService.getFilteredBatch(undefined);
            }
        }
    }
    selectBatchId(val: any) {
        if (val != undefined)
            this.query = Object.assign({}, this.query, { BATCH_ID: val });
    }
    handleDropdown(event: any) {
        //this.batchOptions =
        //    this.lookupDataService.getFilteredBatch(event.query);
        //console.log(event.query);
    }
    searchBatch(event: any) {
        this.batchOptions =
            this.lookupDataService.getFilteredBatch(event);
    }
    hPubStatus(value)
    {
         this.query = Object.assign({},this.query,{PUBLISH_STATUS:value});
    }
      hTransType(value)
    {
         this.query = Object.assign({},this.query,{TRANS_TYPE:value});
    }
}
