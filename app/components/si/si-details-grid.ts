import { Component, ChangeDetectionStrategy,Input,OnChanges } from '@angular/core';
import { GridDataResult, GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';


import { SpendIncidentDetail } from '../../models/spend-incident-detail.model';
import { SiEditService } from '../../containers/services/si-edit.service';
import { process, GroupDescriptor, State, GroupResult, SortDescriptor, orderBy } from '@progress/kendo-data-query';
@Component({
    selector: 'cia-si-details',
    templateUrl: '../html/si/si-details-grid.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiDetailsComponent implements OnChanges {

    @Input() siDetails: SpendIncidentDetail[];
   // private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private sort: SortDescriptor[];
    
    private state: State = {
        skip: 0,
        take: 10,
        sort: Object.assign([], <SortDescriptor>{}, { field: 'TRANSACTION_ID', dir: 'asc' })
    };
   
    constructor(private siEditService: SiEditService
    ) {
        //this.siDetails = this.siEditService.details;
        //this.loadData();
      
    }
    load() {
        this.gridView = process(this.siDetails, this.state);
    }

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
       ngOnChanges()
       {
           //if (this.sort === null || this.sort === undefined || this.sort.length === 0)
           //    this.sort = [{ field: 'TRANSACTION_DATE', dir: 'desc' }];
        this.load();
    }
       ignoreTransaction(item: SpendIncidentDetail)
       {
           const temp: SpendIncidentDetail = Object.assign({}, item, { IGNORE_FLG: item.IGNORE_FLG === "E" ? "I" : "E" });
           const tempArry = this.siDetails.filter((rec: SpendIncidentDetail) => {
               return (rec.TRANSACTION_ID !== item.TRANSACTION_ID
               )

           });
           this.siDetails = tempArry.concat([temp]);
           this.load();
       }
       onIgnore()
       {
           if (confirm("Do you want save changes to database?")) {
               const recToChange: SpendIncidentDetail[] = this.siDetails.map(x => Object.assign(<SpendIncidentDetail>{}, {
                   SPEND_AUDIT_ID: x.SPEND_AUDIT_ID, TRANSACTION_ID: x.TRANSACTION_ID,
                   SPEND_YEAR: x.SPEND_YEAR, SPEND_PERIOD: x.SPEND_PERIOD, SOURCE_ID: x.SOURCE_ID, CUST_ID: x.CUST_ID, SUPPLIER_ID: x.SUPPLIER_ID, ITEM_CATEGORY: x.ITEM_CATEGORY,  TRANSACTION_DATE:x.TRANSACTION_DATE,
                   IGNORE_FLG: x.IGNORE_FLG
               }));
               this.siEditService.ignoreTransactions(recToChange);
               this.siEditService.waitForIgnore().subscribe(
                   (result: string) => {
                       if (result === '1')
                           alert('Save Completed');
                       else
                           alert('Error: ' + result);
                   }
               );
           }
           
           
       }
       backToSearch() {
           this.siEditService.goBack();
       }
}