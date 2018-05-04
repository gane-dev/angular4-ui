import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SpendRuleSupp } from '../../models/spend-rule-supp.model';
import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, orderBy } from '@progress/kendo-data-query';
import { SrEditService } from '../../containers/services/sr-edit.service';
import { CommonFunctionService } from '../../services/common-functions';
@Component({
    selector: 'cia-sr-supplier',
    templateUrl: '../html/sr/sr-supplier.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrSupplierComponent implements OnChanges {
    public dataItem: SpendRuleSupp;
    @Input() spendRuleSupp: SpendRuleSupp[];
    private gridView: GridDataResult;
    optionAdd: boolean = false;
    @Input() effDate: Date;
    @Input() ruleId: string;
    SUPPLIER_ID: string;
    constructor(private srEditService: SrEditService, private commonFunction: CommonFunctionService) {

    }
    
    private state: State = {
        skip: 0,
        take: 10
    };
    ngOnChanges() {
        console.log(this.spendRuleSupp);
        this.load();
    }
    load() {
        this.gridView = process(this.spendRuleSupp, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
    public onEdit(dataItem: SpendRuleSupp): void {
        this.effDate = dataItem.EFF_DATE;
        this.SUPPLIER_ID = dataItem.SUPPLIER_ID;
        this.optionAdd = true;
    }


    public onAdd(): void {
        this.optionAdd = true;
    }

    public onDelete(dataItem: SpendRuleSupp): void {

        this.srEditService.tempDeleteSupp(dataItem);
    }
    cancel() {
        this.optionAdd = false;
    }
  
    save() {
        this.srEditService.addSupp
            (Object.assign(<SpendRuleSupp>{}, { EFF_DATE: this.commonFunction.getFormatedDate(this.effDate), SUPPLIER_ID: this.SUPPLIER_ID, RULE_ID: this.ruleId }));
    }
}