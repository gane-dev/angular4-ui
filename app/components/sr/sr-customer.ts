import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SpendRuleCust } from '../../models/spend-rule-cust.model';
import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, orderBy } from '@progress/kendo-data-query';
import { SrEditService } from '../../containers/services/sr-edit.service';
import { CommonFunctionService } from '../../services/common-functions';
import { LookupDataService } from '../../services/lookup-data.service';
@Component({
    selector: 'cia-sr-customer',
    templateUrl: '../html/sr/sr-customer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrCustomerComponent implements OnChanges {
    public dataItem: SpendRuleCust;
    @Input() spendRuleCust: SpendRuleCust[];
    private gridView: GridDataResult;
    optionAdd: boolean = false;
    @Input() effDate: Date;
    @Input() ruleId: string;

    CUST_ID: string;
    typeOptions: Array<{ text: string, value: string }>;
    constructor(private lookupService: LookupDataService,private srEditService: SrEditService, private commonFunction: CommonFunctionService) {
        this.typeOptions = lookupService.getCustType();
    }
    
    private state: State = {
        skip: 0,
        take: 10
    };
    ngOnChanges() {
        this.load();
        console.log(this.spendRuleCust);
    }
    load() {
        this.gridView = process(this.spendRuleCust, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
    public onEdit(dataItem: SpendRuleCust): void {
        this.dataItem = dataItem;
    }


    public onAdd(): void {
        this.optionAdd = true;
    }

    public onDelete(dataItem: SpendRuleCust): void {

        this.srEditService.tempDeleteCust(dataItem);
    }
    cancel()
    {
        this.optionAdd = false;
    }
    save() {
        this.srEditService.addCust
            (Object.assign(<SpendRuleCust>{}, this.dataItem, { EFF_DATE: this.commonFunction.getFormatedDate(this.effDate), CUST_ID: this.CUST_ID, RULE_ID: this.ruleId    }));
    }
    
    hCustOption(value) {
        this.dataItem = Object.assign({}, this.dataItem, { CUST_TYPE: value });
    }
}