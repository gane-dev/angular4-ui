import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Form } from '@angular/forms';
import { SpendRuleFields } from '../../models/spend-rule-fields.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { LookupDataService } from '../../services/lookup-data.service';
import { SrEditService } from '../../containers/services/sr-edit.service';
@Component({
    selector: 'cia-sr-header',
    templateUrl: '../html/sr/sr-header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrHeaderComponent {

    @Input() spendRuleFields: SpendRuleFields;
    @Output() spendRuleFieldsChange = new EventEmitter();
    public rlItems: Array<{ text: string, value: string }>;
    constructor(private lookupDataService: LookupDataService,private srEditService: SrEditService) {
        this.rlItems = lookupDataService.getRLItems();
    }
     hRlItme(value)
    {
          this.spendRuleFields = Object.assign({}, this.spendRuleFields, {RULE_LEVEL : value});
          this.spendRuleFieldsChange.emit(this.spendRuleFields);
    }
    descriptionChange(value)
    {
        this.spendRuleFields = Object.assign({}, this.spendRuleFields, {RULE_DESCRIPTION : value});
         this.spendRuleFieldsChange.emit(this.spendRuleFields);
    }
    ruleIdChange(value)
    {
            this.spendRuleFields = Object.assign({}, this.spendRuleFields, {RULE_ID : value});
             this.spendRuleFieldsChange.emit(this.spendRuleFields);
    }
}