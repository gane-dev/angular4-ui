import { SupplierLOV } from '../../models/supplier-lov.model';
import { Component, ViewChild, Input, ChangeDetectionStrategy, EventEmitter, Output, OnChanges } from '@angular/core';
import * as fromRoot from '../../reducers';
import { HomePageService } from '../../containers/services/home-page.service'
import * as lookupActions from '../../actions/lookup-actions';
import { LookupDataService } from '../../services/lookup-data.service';
@Component({
    selector: 'cia-supplier-search',
    templateUrl: '../html/common/supplier-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierSearchComponent implements OnChanges{
    @ViewChild("suppId") suppId;
    @ViewChild("suppName") suppName;
    @Input() supplierId: string;
    @Output() supplierIdChange: EventEmitter<string> = new EventEmitter();
    private supplierName: string;
    private suppData: SupplierLOV[]=[];
    constructor(private lookupService: LookupDataService,private  homePageService: HomePageService) {

    }
    ngOnChanges() {
        if (this.supplierId === null)
            this.supplierName = null;
    }
    selectSupplierId(val: any) {
        // if (this.custData != undefined)
        this.supplierId = val;
        this.supplierIdChange.emit(this.supplierId);
        const tmp = this.suppData.filter(x => x.SUPPLIER_ID === val).pop();
        if (tmp != undefined)
            this.supplierName = tmp.SUPPLIER_NAME;

    }
    selectSupplierName(val: any) {
        const tmp = this.suppData.filter(x => x.SUPPLIER_NAME === val).pop()
        if (tmp != undefined)
            this.supplierId = tmp.SUPPLIER_ID;

    }
    //applyfilter(val: any)
    //{
    //    this.lookupService.getSupplierLOV(<SupplierLOV>{ SUPPLIER_ID: val, SUPPLIER_NAME: null })
    //            .do(() => this.suppId.loading = true)
    //            .subscribe(x => {
    //            this.suppData = x;
    //            this.suppId.loading = false;
    //        });
    //}
    //applyfilter1(val: any) {
    //    this.lookupService.getSupplierLOV(<SupplierLOV>{ SUPPLIER_ID: null, SUPPLIER_NAME: val })
    //        .do(() => this.suppId.loading = true)
    //        .subscribe(x => {
    //            this.suppData = x;
    //            this.suppId.loading = false;
    //        });
    //}
    ngAfterViewInit() {
      //  const contains = value => s => s.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        //this.suppId.filterChange.asObservable().debounceTime(1000).switchMap(value =>
        //    this.lookupService.getSupplierLOV(<SupplierLOV>{ SUPPLIER_ID: value, SUPPLIER_NAME: null })
        //        .do(() => this.suppId.loading = true)
        //        .delay(1000))
        //        //.map((data) => { if (data !== null) return data.filter(contains(value))}))
        //    .subscribe(x => {
        //        this.suppData = x;
        //        this.suppId.loading = false;
        //    });
       // mouseSubscription: Subscription;
        //this.suppName.filterChange.asObservable().debounceTime(1000)
        //    .switchMap(value => this.lookupService.getSupplierLOV(<SupplierLOV>{ SUPPLIER_ID: null, SUPPLIER_NAME: value })
        //        .do(() => this.suppName.loading = true)
        //    .delay(1000))
        //    //.map((data) => { if (data !== null) return data.filter(contains(value))}))
        //    .subscribe(x => {
        //        this.suppData = x;
        //        this.suppName.loading = false;
        //    });
    }
    //public ngOnDestroy(): void {
    //    this.subscriptions.forEach((subscription: Subscription) => {
    //        subscription.unsubscribe();
    //    });
    //}
}
