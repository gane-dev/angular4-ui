import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as lookupActions from '../../actions/lookup-actions';
import { CategoryLOV } from '../../models/category-lov.model'
import { CustomerLOV } from '../../models/customer-lov.model'
import { SupplierLOV } from '../../models/supplier-lov.model'
import {DataSourceLOV } from '../../models/datasource-lov.model'
@Injectable()
export class HomePageService {
    catList$: Observable<CategoryLOV[]>;
    custList$: Observable<CustomerLOV[]>;
    suppList$: Observable<SupplierLOV[]>;
    dsList$: Observable<DataSourceLOV[]>;
    constructor(private store: Store<fromRoot.State>, ) {
        //this.getSources();
        //this.getCustomers();
        //this.getSuppliers();
        //this.getBatchIds();
        this.custList$ = store.select(fromRoot.getCustomerLOV)
        this.suppList$ = store.select(fromRoot.getSupplierLOV)
        this.catList$ = store.select(fromRoot.getCategoryLOV)
        this.dsList$ = store.select(fromRoot.getDataSourceLOV)
    }
    getSources(input: any) {
        this.store.dispatch(new lookupActions.GetDSAction(input));
    }
    getCustomers(input: any): Observable<CustomerLOV[]> {
        this.store.dispatch(new lookupActions.GetCustAction(input));
        return this.custList$;
    }

    getSuppliers(input: any) {
        this.store.dispatch(new lookupActions.GetSuppAction(input));
    }
    //getBatchIds(input: any)
    //{
    //    this.store.dispatch(new lookupActions.GetBatchAction(input));
    //}
    getCategory(input: any) {
        this.store.dispatch(new lookupActions.GetCatAction(input));
    }

}
