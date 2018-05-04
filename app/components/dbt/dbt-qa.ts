import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DbtEditService } from '../../containers/services/dbt-edit.service';
import { DataBatchTransDetails } from '../../models/dbt-details.model';
import { DBTApplyFlag } from '../../models/dbt-apply-flag.model';
@Component({
    selector: 'cia-dbt-qa',
    templateUrl: '../html/dbt/dbt-qa.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbtQaComponent implements OnChanges {
    @Input() qadetails: DataBatchTransDetails[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private selIndex: number;


    constructor(private dbtEditService: DbtEditService
    ) {
        //   this.qadetails = Object.assign([], this.dbtEditService.dbt);
        //  this.loadData();
    }
    ngOnChanges() {
        this.loadData();
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    private loadData(): void {
        this.gridView = {
            data: orderBy(Object.assign([], this.qadetails), this.sort),
            total: this.qadetails.length
        };
    }
    private onSave(gridView: GridDataResult) {
        this.dbtEditService.saveTransactions(gridView.data);
    }
    private onClear() {
        this.qadetails = this.dbtEditService.dbt;
        this.loadData();
    }
   sortTransactions(rule1 : DataBatchTransDetails,rule2 : DataBatchTransDetails) :number
{   
    if (rule1.BATCH_ID > rule2.BATCH_ID)
        return 1;
    else if (rule1.BATCH_ID == rule2.BATCH_ID)   
        {
            if (rule1.CP_TRANS_ID_XREF < rule2.CP_TRANS_ID_XREF)
                return 1;
            else
                return -1;
        }
    else
        return -1;
}
    excludeAll(val: boolean) {

        this.qadetails = Object.assign([], this.qadetails.map((rec: DataBatchTransDetails) => { return Object.assign({}, rec, { PUBLISH_INC_EXC_IND: val ? "E" : "I" }) }));
        this.loadData();
        const flags : DBTApplyFlag[] = Object.assign([], this.qadetails.map((rec: DataBatchTransDetails) => { return Object.assign({}, this.getFlagObject(rec));}));
        this.dbtEditService.selectFlags(flags);
    }
     getFlagObject(rec:DataBatchTransDetails)
     {
            return <DBTApplyFlag>{
                SOURCE_ID:rec.SOURCE_ID,
                LOAD_YEAR:rec.LOAD_YEAR,
                LOAD_PERIOD:rec.LOAD_PERIOD,
                BATCH_ID:rec.BATCH_ID,
                CP_TRANS_ID_XREF:rec.CP_TRANS_ID_XREF,
                CP_CUST_XREF:rec.CP_CUST_XREF,
                CP_SUPP_XREF:rec.CP_SUPP_XREF,
                TRANS_TYPE:rec.TRANS_TYPE,
                PUBLISH_INC_EXC_IND:rec.PUBLISH_INC_EXC_IND,
                LAST_REVIEWED_BY:rec.LAST_REVIEWED_BY,
                LAST_REVIEWED_DATE:rec.LAST_REVIEWED_DATE

            };
     }
    excludeTransaction(dataItem: DataBatchTransDetails) {
        const temp: DataBatchTransDetails = Object.assign({}, dataItem, { PUBLISH_INC_EXC_IND: dataItem.PUBLISH_INC_EXC_IND === "E" ? "I" : "E" });
        const tempArry = this.qadetails.filter((rec: DataBatchTransDetails) => {
            return (rec.CP_TRANS_ID_XREF !== dataItem.CP_TRANS_ID_XREF
                || rec.BATCH_ID !== dataItem.BATCH_ID
                //|| rec.CP_CUST_XREF !== dataItem.CP_CUST_XREF
                //|| rec.CP_SUPP_XREF !== dataItem.CP_SUPP_XREF
            )

        });
        this.qadetails = tempArry.concat([temp]).sort((rule1,rule2)=> {return this.sortTransactions(rule1,rule2)});
        this.loadData();
         const flag : DBTApplyFlag = Object.assign({}, this.getFlagObject(temp));
         this.dbtEditService.selectFlag(flag);
    }
    selectionChange(selected: any) {
        if (selected.selected) {
            if (selected.index > -1) {
                this.selIndex = selected.index;
            }

        }
    }


}