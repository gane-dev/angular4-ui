
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { SpendRuleDtl } from '../../models/spend-rule-dtl.model';

import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { SrEditService } from '../../containers/services/sr-edit.service';
@Component({
    selector: 'cia-sr-eff-rule',
    templateUrl: '../html/sr/sr-eff-rule.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SrEffRuleComponent {

    public srEffRule: SpendRuleDtl = <SpendRuleDtl>{};
    constructor( private srEditService: SrEditService

    ) {
      //  this.srEffRule = Object.assign({}, srEditService.selectedRule$);

    }

}
