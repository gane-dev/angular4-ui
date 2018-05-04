
import { Component, Input,ChangeDetectionStrategy,OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { SpendIncidentHeader } from '../../models/spend-incident-header.model';

import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CustomerLOV } from '../../models/customer-lov.model';
import { SiEditService } from '../../containers/services/si-edit.service';

@Component({
    selector: 'cia-si-header',
    templateUrl: '../html/si/si-header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SiHeaderComponent {

    @Input() siHeader: SpendIncidentHeader;// = <SpendIncidentHeader>{};
    public dispositionOptions: Array<{ text: string, value: string }>;

    public statusOptions: Array<{ text: string, value: string }>;
    
    constructor(private lookupDataService: LookupDataService, private siEditService: SiEditService

    ) {
       // this.siHeader = Object.assign({}, siEditService.header);
        this.dispositionOptions = lookupDataService.getDisposition();
        this.statusOptions = lookupDataService.getPSRStatus();
        
    }
        hReviewStatus(value)
    {
          this.siHeader = Object.assign({}, this.siHeader, {REVIEW_STATUS : value});
    }
      hUDispOption(value)
    {
          this.siHeader = Object.assign({}, this.siHeader, {USER_DISPOSITION : value});
    }
        hSDispOption(value)
    {
          this.siHeader = Object.assign({}, this.siHeader, {SYSTEM_DISPOSITION : value});
      }
        onSave()
        {
            if (confirm("Do you want save changes to database?")) {
                this.siEditService.saveHeader(this.siHeader);
                this.siEditService.waitForSave().subscribe(
                    (result: string) => {
                        if (result === '1')
                            alert('Save Completed');
                        else
                            alert('Error: ' + result);
                    }
                );
            }
        }
        backToSearch()
        {
            this.siEditService.goBack();
        }
}
