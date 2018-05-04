import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions/*, Jsonp, JsonpModule*/ } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { CustomerLOV } from '../models/customer-lov.model';
import { SupplierLOV } from '../models/supplier-lov.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { DataSourceLOV } from '../models/datasource-lov.model';
import { CategoryLOV } from '../models/category-lov.model';

import { api } from '../../environments/apipath'
@Injectable()
export class LookupDataService {
    public custLOV$: Observable<CustomerLOV[]>;
    public custLOV: CustomerLOV[];
    public suppLOV$: Observable<SupplierLOV[]>;
    public suppLOV: SupplierLOV[];

    public custDBLOV$: Observable<CustomerLOV[]>;
    public custDBLOV: CustomerLOV[];
    public suppDBLOV$: Observable<SupplierLOV[]>;
    public suppDBLOV: SupplierLOV[];

    public dsLOV$: Observable<DataSourceLOV[]>;
    public dsLOV: DataSourceLOV[];

    public batchIds$: Observable<string[]>;
    public batchIds: string[];
    constructor(private http: Http, private store: Store<fromRoot.State>/*, private jsonp: Jsonp*/) {
        this.custLOV$ = store.select(fromRoot.getCustomerLOV);
        this.custLOV$.subscribe((data: CustomerLOV[]) => {
            this.custLOV = data;
        });
        this.suppLOV$ = store.select(fromRoot.getSupplierLOV);
        this.suppLOV$.subscribe((data: SupplierLOV[]) => {
            this.suppLOV = data;
        });

        this.custDBLOV$ = store.select(fromRoot.getDBCustomerLOV);
        this.custDBLOV$.subscribe((data: CustomerLOV[]) => {
            this.custDBLOV = data;
        });
        this.suppDBLOV$ = store.select(fromRoot.getDBSupplierLOV);
        this.suppDBLOV$.subscribe((data: SupplierLOV[]) => {
            this.suppDBLOV = data;
        });

        this.dsLOV$ = store.select(fromRoot.getDataSourceLOV);
        this.dsLOV$.subscribe((data: DataSourceLOV[]) => {
            this.dsLOV = data;
        });
        this.batchIds$ = store.select(fromRoot.getSourceBatchsLOV);
        this.batchIds$.subscribe((data: string[]) => {
            this.batchIds = Object.assign([], data);
        });

    }
    /* fetchData(action: string = "", data?: CustomerLOV): Observable<CustomerLOV[]>{
         return this.jsonp.get(`${this.API_PATH}${this.GET_DB_CUSTOMER}?callback=JSONP_CALLBACK${this.serializeModels(data)}`).map(response => response.json());
     } 
 */
    /* private serializeModels(data?: CustomerLOV): string {
       return data ? `&models=${JSON.stringify([data])}` : '';
     }*/
    getFilteredDS(srcId: string): DataSourceLOV[] {
        if (srcId != undefined)
            return this.dsLOV.filter((s) => s.SOURCE_ID.toLowerCase().indexOf(srcId.toLowerCase()) !== -1);
        else
            return this.dsLOV;
    }
    getFilteredBatch(srcId: string): string[] {
        if (srcId != undefined)
            return this.batchIds.filter((s) => s.toLowerCase().indexOf(srcId.toLowerCase()) !== -1);
        else
            return this.batchIds;
    }
    getFilteredDS1(srcName: string): DataSourceLOV[] {
        if (srcName != undefined)
            return this.dsLOV.filter((s) => s.SOURCE_NAME.toLowerCase().indexOf(srcName.toLowerCase()) !== -1);
        else
            return this.dsLOV;
    }
    getFilteredPsrCust(custId: string): CustomerLOV[] {
        if (custId != undefined)
            return this.custLOV.filter((s) => s.CUST_ID.toLowerCase().indexOf(custId.toLowerCase()) !== -1);
        else
            return this.custLOV;
    }
    getFilteredPsrCust1(custName: string): CustomerLOV[] {
        if (custName != undefined)
            return this.custLOV.filter((s) => s.CUST_NAME.toLowerCase().indexOf(custName.toLowerCase()) !== -1);
        else
            return this.custLOV;
    }
    getFilteredPsrSupp(suppId: string): SupplierLOV[] {
        if (suppId != undefined)
            return this.suppLOV.filter((s) => s.SUPPLIER_ID.toLowerCase().indexOf(suppId.toLowerCase()) !== -1);
        else
            return this.suppLOV;
    }
    getFilteredPsrSupp1(suppName: string): SupplierLOV[] {
        if (suppName != undefined)
            return this.suppLOV.filter((s) => s.SUPPLIER_NAME.toLowerCase().indexOf(suppName.toLowerCase()) !== -1);
        else
            return this.suppLOV;
    }
    private API_PATH: string = api.apiPath;

   // private GET_CUSTOMER: string = 'Lookup/GetPsrCustomers';
    private GET_CUSTOMER: string = 'Lookup/GetCustomerLOV';
    private GET_CATEGORY: string = 'Lookup/GetCategoryLOV';
    private GET_SUPPLIER: string = 'Lookup/GetSupplierLOV';

    private GET_DB_CUSTOMER: string = 'DataBatch/GetDBCustomers';
    private GET_DB_SUPPLIER: string = 'DataBatch/GetDBSuppliers';
    private GET_BATCH_IDS: string = 'DataBatch/GetBatchIds';
    private GET_DATA_SOURCES: string = 'Lookup/GetDataSources';


    getDSLOV(ds: DataSourceLOV): Observable<DataSourceLOV[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_DATA_SOURCES}`, ds, options)
            .map(res => res.json());

      
    }
    getBatchIdsLOV(): Observable<string[]> {
     //   let body = JSON.stringify({ dataRecord });
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //return this.http.post(`${this.API_PATH}${this.GET_BATCH_IDS}`, body, options)
        //    .map(res => res.json());
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.API_PATH}${this.GET_BATCH_IDS}`)
            .map(res => res.json());
    }
    getDBCustomerLOV(dataRecord: string): Observable<CustomerLOV[]> {
        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_DB_CUSTOMER}`, body, options)
            .map(res => res.json());
    }
    getCategoryLOV(dataRecord: string): Observable<CategoryLOV[]> {
        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_CATEGORY}`, dataRecord, options)
            .map(res => res.json());
    }
    getDBSupplierLOV(dataRecord: string): Observable<SupplierLOV[]> {
        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_DB_SUPPLIER}`, body, options)
            .map(res => res.json());
    }
    getCustomerLOV(dataRecord:CustomerLOV): Observable<CustomerLOV[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_CUSTOMER}`, dataRecord, options)
            .map(res => res.json());
       
    }
    getSupplierLOV(dataRecord: SupplierLOV): Observable<SupplierLOV[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_SUPPLIER}`, dataRecord, options)
            .map(res => res.json());
        
    }


    getPsrRLItems(): Array<{ text: string, value: string }> {
        return [
            // { text: "Select ", value: null },
            // { text: "Global", value: "G" },
            { text: "Supplier", value: "S" },
            { text: "Customer", value: "C" },
            // { text: "Item Category", value: "I" }
        ];
    }
     getRLItems(): Array<{ text: string, value: string }> {
        return [
            { text: "Select ", value: null },
            { text: "Global", value: "G" },
            { text: "Supplier", value: "S" },
            { text: "Customer", value: "C" },
            { text: "Item Category", value: "I" }
        ];
    }
    getTransTypes(): Array<{ text: string, value: string }> {
        return [
            { text: "", value: null },
            { text: "PO", value: "PO" },
            { text: "Invoice", value: "INV" },

        ];
    }
    getScopeValues(): Array<{ text: string, value: string }> {
        return [
            { text: "", value: null },
            { text: "Out-Of-Scope", value: "OS" },
            { text: "In-Scope", value: "IS" }

        ];
    }
    getOppValues(): Array<{ text: string, value: string }> {
        return [
            { text: "Opportunity", value: "OP" },
            { text: "Bad Spend", value: "BS" },
            { text: "Good Spend", value: "GS" },
        ];
    }
    getSuppOverrideValues(): Array<{ text: string, value: string }> {
        return [
            { text: "Override", value: "Y" },
            { text: "Do not Override", value: "N" },

        ];
    }
    getQAReviewStatus(): Array<{ text: string, value: string }> {
        return [
            { text: "Not Reviewed", value: "N" },

            { text: "In Process", value: "I" },
            { text: "Complete", value: "C" },
            { text: "On Hold", value: "H" },
        ];
    }
    getQAPassStatus(): Array<{ text: string, value: string }> {
        return [
            { text: "Pass", value: "P" },

            { text: "Fail", value: "F" },
            { text: "New / None", value: "N" },
        ];
    }
    getPublishStatus(): Array<{ text: string, value: string }> {
        return [
            { text: 'Complete', value: 'C' },
            { text: 'Partial', value: 'P' },
            { text: 'None', value: 'N' },
        ];
    }
    publishActionOptions(): Array<{ text: string, value: string }> {
        return [
            { text: 'Publish', value: 'P' },
            { text: 'UnPublish', value: 'U' },
            { text: 'None', value: 'N' },
        ];
    }
    getPSRStatus(): Array<{ text: string, value: string }> {
        return [
            { text: "Active", value: "A" },

            { text: "Inactive", value: "I" },
        ];
    }
    getPSRRuleStatus(): Array<{ text: string, value: string }> {
        return [
            { text: "Production", value: "P" },

            { text: "Draft", value: "D" },
        ];
    }
    getPRSRuleSource(): Array<{ text: string, value: string }> {
        return [
            { text: "User", value: "U" },

            { text: "System", value: "S" },
        ];
    }
    getDisposition(): Array<{ text: string, value: string }> {
        return [
            { text: "Ignore", value: "I" },

            { text: "Report", value: "R" },
            { text: "Hold", value: "H" },
        ];
    }
    getReviewStatus(): Array<{ text: string, value: string }> {
        return [
            { text: "New", value: "N" },

            { text: "Complete", value: "C" },
            { text: "Hold", value: "H" },
        ];
    }
    getCustType(): Array<{ text: string, value: string }> {
        return [
            { text: "Parent", value: "P" },

            { text: "Customer", value: "C" },
        ];
    }
    getReasonCode(): Array<{ text: string, value: string }> {
        return [
            { text: "Parent", value: "P" },

            { text: "Customer", value: "C" },
        ];
    }

}