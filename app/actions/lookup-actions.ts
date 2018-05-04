import { Action } from '@ngrx/store';
import { type } from '../util';
import { CustomerLOV } from '../models/customer-lov.model';
import { CategoryLOV } from '../models/category-lov.model';
import { SupplierLOV } from '../models/supplier-lov.model';
import { DataSourceLOV } from '../models/datasource-lov.model';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
    GET_CUST_LOOKUP: type('[Customer LOV] Get'),
    GET_CUST_LOOKUP_COMPLETE: type('[Customer LOV] Get Complete'),
    GET_CAT_LOOKUP: type('[Category LOV] Get'),
    GET_CAT_LOOKUP_COMPLETE: type('[Category LOV] Get Complete'),
    GET_SUPP_LOOKUP: type('[Supplier LOV] Get'),
    GET_SUPP_LOOKUP_COMPLETE: type('[Supplier LOV] Get Complete'),

    GET_CUST_DB_LOOKUP: type('[Customer DB_LOV] Get'),
    GET_CUST_DB_LOOKUP_COMPLETE: type('[Customer DB_LOV] Get Complete'),
    GET_SUPP_DB_LOOKUP: type('[Supplier DB_LOV] Get'),
    GET_SUPP_DB_LOOKUP_COMPLETE: type('[Supplier DB_LOV] Get Complete'),

    GET_DS_LOOKUP: type('[DS LOV] Get'),
    GET_DS_LOOKUP_COMPLETE: type('[DS LOV] Get Complete'),
    GET_BATCH_LOOKUP: type('[BATCH LOV] Get'),
    GET_BATCH_LOOKUP_COMPLETE: type('[BATCH LOV] Get Complete'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class GetCustAction implements Action {
    type = ActionTypes.GET_CUST_LOOKUP;
    constructor(public payload: CustomerLOV) { }
}
export class GetCustActionComplete implements Action {
    type = ActionTypes.GET_CUST_LOOKUP_COMPLETE;

    constructor(public payload: CustomerLOV[]) { }
}
export class GetCatAction implements Action {
    type = ActionTypes.GET_CAT_LOOKUP;
    constructor(public payload: string) { }
}
export class GetCatActionComplete implements Action {
    type = ActionTypes.GET_CAT_LOOKUP_COMPLETE;

    constructor(public payload: CategoryLOV[]) { }
}
export class GetSuppAction implements Action {
    type = ActionTypes.GET_SUPP_LOOKUP;
    constructor(public payload: SupplierLOV) { }
    
}
export class GetSuppActionComplete implements Action {
    type = ActionTypes.GET_SUPP_LOOKUP_COMPLETE;

    constructor(public payload: SupplierLOV[]) { }
}

export class GetCustDBAction implements Action {
    type = ActionTypes.GET_CUST_DB_LOOKUP;
    constructor(public payload: null) { }
}
export class GetCustDBActionComplete implements Action {
    type = ActionTypes.GET_CUST_DB_LOOKUP_COMPLETE;

    constructor(public payload: CustomerLOV[]) { }
}
export class GetSuppDBAction implements Action {
    type = ActionTypes.GET_SUPP_DB_LOOKUP;
    constructor(public payload: null) { }

}
export class GetSuppDBActionComplete implements Action {
    type = ActionTypes.GET_SUPP_DB_LOOKUP_COMPLETE;

    constructor(public payload: SupplierLOV[]) { }
}

export class GetDSAction implements Action {
    type = ActionTypes.GET_DS_LOOKUP;
    constructor(public payload: DataSourceLOV) { }
}
export class GetDSActionComplete implements Action {
    type = ActionTypes.GET_DS_LOOKUP_COMPLETE;

    constructor(public payload: DataSourceLOV[]) { }
}
export class GetBatchAction implements Action {
    type = ActionTypes.GET_BATCH_LOOKUP;
    constructor(public payload: string) { }

}
export class GetBatchActionComplete implements Action {
    type = ActionTypes.GET_BATCH_LOOKUP_COMPLETE;

    constructor(public payload: string[]) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = GetCustAction
    | GetCustActionComplete
    | GetSuppAction
    | GetSuppActionComplete
    | GetCustDBAction
    | GetCustDBActionComplete
    | GetSuppDBAction
    | GetSuppDBActionComplete
    | GetBatchAction
    | GetBatchActionComplete
    | GetDSAction
    | GetDSActionComplete
    | GetCatAction
    | GetCatActionComplete;


