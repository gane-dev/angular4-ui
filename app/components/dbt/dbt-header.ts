import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Form } from '@angular/forms';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { LookupDataService } from '../../services/lookup-data.service';
import { DataBatchSearch } from '../../models/data-batch-search.model';
import { DbtEditService } from '../../containers/services/dbt-edit.service';
@Component({
    selector: 'cia-dbt-header',
    templateUrl: '../html/dbt/dbt-header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbtHeaderComponent {


    @Input() dataBatchHeader: DataBatchSearch;//= <DataBatchSearch>{};
    public publishOptions: Array<{ text: string, value: string }>;

    constructor(private lookupDataService: LookupDataService, private dbtEditService: DbtEditService) {
        this.publishOptions = lookupDataService.getPublishStatus();
      

    }
 hPubStatus(value)
    {
          this.dataBatchHeader = Object.assign({},this.dataBatchHeader,{PUBLISH_STATUS : value});
    }
}