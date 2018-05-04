import { CustomerLOV } from '../models/customer-lov.model';
import { SupplierLOV } from '../models/supplier-lov.model';
import { DataSourceLOV } from '../models/datasource-lov.model';
import { CategoryLOV } from '../models/category-lov.model';

import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as lookup from '../actions/lookup-actions'
export interface State {
    category : CategoryLOV[],
    customers: CustomerLOV[],
    suppliers: SupplierLOV[],
    dbCustomers: CustomerLOV[],
    dbSuppliers: SupplierLOV[],
    dsLoaded: boolean,
    dataSource: DataSourceLOV[],
    sourceBatchs: string[],
    lovLoaded:boolean
}
const initialState: State = {
    category:[],
    customers: [],
    suppliers: [],
    dbCustomers: [],
    dbSuppliers: [],
    dsLoaded: false,
    dataSource: [],
    sourceBatchs: [],
    lovLoaded:false
}

export function reducer(state = initialState, action: lookup.Actions): State {
    switch (action.type) {
        case lookup.ActionTypes.GET_CUST_LOOKUP_COMPLETE:
            {
                const customers: any = action.payload;
                return Object.assign({}, state, {customers: Object.assign([], customers)});
            }
        case lookup.ActionTypes.GET_CAT_LOOKUP_COMPLETE:
            {
                const cats: any = action.payload;
                return Object.assign({}, state, { category: Object.assign([], cats) });
            }
        case lookup.ActionTypes.GET_SUPP_LOOKUP_COMPLETE:
            {
                const suppliers: any = action.payload;
                return Object.assign({}, state, {suppliers: Object.assign([], suppliers)});
            }
        case lookup.ActionTypes.GET_CUST_DB_LOOKUP_COMPLETE:
            {
                const customersDB: any = action.payload;
                return Object.assign({},state, {  dbCustomers: Object.assign([],customersDB)});
            }
        case lookup.ActionTypes.GET_SUPP_DB_LOOKUP:
            {
                const suppliersDB: any = action.payload;
                return Object.assign({}, state, {  dsLoaded: false });
            }
        case lookup.ActionTypes.GET_SUPP_DB_LOOKUP_COMPLETE:
            {
                const suppliersDB: any= action.payload;
                return Object.assign({}, state, { dbSuppliers: Object.assign([], suppliersDB), dsLoaded: true});
            }
        case lookup.ActionTypes.GET_DS_LOOKUP_COMPLETE:
            {
                const ds: any = action.payload;
               return Object.assign({}, state, {dataSource: Object.assign([], ds), dsLoaded: true});
            }
        case lookup.ActionTypes.GET_BATCH_LOOKUP_COMPLETE:
            {
                const batchs: any= action.payload;

                return Object.assign({},state, {sourceBatchs: Object.assign([],batchs)});
            }
        default:
            return state;
    }
}
export const getCustomersLOV = (state: State) => state.customers;
export const getCategoryLOV = (state: State) => state.category;
export const getSuppliersLOV = (state: State) => state.suppliers;
export const getDBCustomersLOV = (state: State) => state.dbCustomers;
export const getDBSuppliersLOV = (state: State) => state.dbSuppliers;
export const getDataSourceLOV = (state: State) => state.dataSource;
export const getSourceBatchsLOV = (state: State) => state.sourceBatchs;
export const getDsLoaded = (state: State) => state.dsLoaded;
export const getLovLoaded = (state: State) => state.lovLoaded;