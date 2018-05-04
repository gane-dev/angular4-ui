import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SpendRuleDtl } from '../../models/spend-rule-dtl.model';
import { SrEditService } from '../../containers/services/sr-edit.service';
import { LookupDataService } from '../../services/lookup-data.service';
import { SpendRuleFields } from '../../models/spend-rule-fields.model';
@Component({
    selector: 'cia-sr-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../html/sr/sr-edit.html',
})
export class SrEditComponent {
  
    statusOptions: Array<{ text: string, value: string }>;
    reasonOptions: Array<{ text: string, value: string }>;
    ignoreFlag: boolean = false;
    @Input() spendRuleDtl: SpendRuleDtl;
    @Input() spendRuleFields: SpendRuleFields;


    constructor(private lookupService: LookupDataService, private srEditService: SrEditService) {

        this.statusOptions = lookupService.getPSRStatus();
        this.reasonOptions = lookupService.getReasonCode();
    }



    public onSave(spendRuleDtl: SpendRuleDtl): void {

        this.srEditService.addDetail(spendRuleDtl);
    }
    public onCancel(): void {

    }

    switchFlag(val: boolean) {
        if (val) {
            this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { IGNORE_FLG: "Y" });
            this.ignoreFlag = true;
        }
        else {
            this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { IGNORE_FLG: "N" });
            this.ignoreFlag = false;
        }

    }
    hStatusOption(value) {
        this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { STATUS: value });
    }
    hReasonOption(value) {
        this.spendRuleDtl = Object.assign({}, this.spendRuleDtl, { REASON_CODE: value });
    }
}