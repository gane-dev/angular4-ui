import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SpendRuleCat } from '../../models/spend-rule-cat.model';
import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, orderBy } from '@progress/kendo-data-query';
import { SrEditService } from '../../containers/services/sr-edit.service';
import { CommonFunctionService } from '../../services/common-functions';
@Component({
    selector: 'cia-sr-category',
    templateUrl: '../html/sr/sr-category.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SrCategoryComponent implements OnChanges {
    public dataItem: SpendRuleCat;
    @Input() spendRuleCat: SpendRuleCat[];
    private gridView: GridDataResult;
    optionAdd: boolean = false;
    @Input() effDate: Date;
    CATEGORY: string;
    @Input() ruleId: string;
    constructor(private srEditService: SrEditService, private commonFunction: CommonFunctionService) {

    }
    
    private state: State = {
        skip: 0,
        take: 10
    };
    ngOnChanges() {
        this.load();
        console.log(this.spendRuleCat);
    }
    load() {
        this.gridView = process(this.spendRuleCat, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
    public onEdit(dataItem: SpendRuleCat): void {
        this.dataItem = dataItem;
    }


    public onAdd(): void {
        this.optionAdd = true;
    }

    public onDelete(dataItem: SpendRuleCat): void {

        this.srEditService.tempDeleteCat(dataItem);
    }
    cancel() {
        this.optionAdd = false;
    }
    save() {
        this.srEditService.addCat
            (Object.assign(<SpendRuleCat>{}, { EFF_DATE: this.commonFunction.getFormatedDate(this.effDate), CATEGORY: this.CATEGORY, RULE_ID: this.ruleId }));
    }
}