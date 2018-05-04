import { CustomerLOV } from '../../models/customer-lov.model';
import { Component, ViewChild, Input, ChangeDetectionStrategy, EventEmitter,Output,OnChanges } from '@angular/core';
import * as fromRoot from '../../reducers';
import { HomePageService } from '../../containers/services/home-page.service'
import * as lookupActions from '../../actions/lookup-actions';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
@Component({
    selector: 'cia-customer-search',
    templateUrl: '../html/common/customer-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSearchComponent implements OnChanges{

    @ViewChild("custId") public custId : AutoCompleteComponent;
    @ViewChild("custName") custName;
    @Input() customerId: string;
    @Output() customerIdChange: EventEmitter<string> = new EventEmitter();
    private customerName: string;
    private custData: CustomerLOV[]=[];
    constructor(private homePageService: HomePageService) {
       
    }
    ngOnChanges()
    {
        if (this.customerId === null)
            this.customerName = null;
    }
    selectCustomerId(val: any) {
       // if (this.custData != undefined)
        this.customerId = val;
        this.customerIdChange.emit(this.customerId);
        const tmp = this.custData.filter(x => x.CUST_ID === val).pop();
        if (tmp != undefined)
            this.customerName = tmp.CUST_NAME;

    }
    selectCustomerName(val: any) {
        this.customerName = val;
        const tmp = this.custData.filter(x => x.CUST_NAME === val).pop()
        if (tmp != undefined)
            this.customerId = tmp.CUST_ID;
       
    }
    ngAfterViewInit() {
        
        this.custId.filterChange.asObservable().debounceTime(2000).switchMap(value => 
                    this.homePageService.getCustomers(<CustomerLOV>{ CUST_ID: value,CUST_NAME :null }).delay(1000)
            
        ).subscribe(x => {
            this.custData = x;
         
        });

        this.custName.filterChange.asObservable().debounceTime(2000).switchMap(value => 
            this.homePageService.getCustomers(<CustomerLOV>{ CUST_ID: null, CUST_NAME: value }).delay(1000)
            //return this.homePageService.custList$;
        ).subscribe(x => this.custData = x);
    }
}