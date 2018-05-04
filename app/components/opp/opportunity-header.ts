
import { Component, ChangeDetectionStrategy, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { OpportunityHeader } from '../../models/opportunity-header.model';
import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { OppEditService } from '../../containers/services/opp-edit.service';
@Component({
    selector: 'cia-opp-header',
    templateUrl: '../html/opp/opportunity-header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OppHeaderComponent {

    @Input() oppHeader: OpportunityHeader;// = <OpportunityHeader>{};
    @Output() oppHeaderChange = new EventEmitter();
     public statusOptions: Array<{ text: string, value: string }>;
    constructor(private lookupDataService: LookupDataService, private oppEditService: OppEditService

    ) {
         this.statusOptions = this.lookupDataService.getPSRStatus();
    }
    
  hStatus(value)
  {
      this.oppHeader = Object.assign({}, this.oppHeader, { STATUS: value });
    }
}
