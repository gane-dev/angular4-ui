import { Action } from '@ngrx/store';
import { type } from '../util';

import { DataBatch } from '../models/data-batch.model'
import { DataBatchDetails } from '../models/data-batch-details.model'
import { DataBatchTransDetails } from '../models/dbt-details.model';
import { DataBatchSearch } from '../models/data-batch-search.model'
import {GridSelection} from '../models/grid-selection.model';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
     CLEAR_SEARCH: type('[Data Batch] Clear Search'),
    SEARCH_DB: type('[Data Batch] Search'),
    SEARCH_DB_COMPLETE: type('[Data Batch] Search Complete'),
    SELECT_DB: type('[Data Batch] Select'),
    SAVE_DB: type('[Data Batch] Save'),
    SAVE_DB_COMPLETE: type('[Data Batch] Save Complete'),
    GET_TRANSACTIONS: type('[Data Batch] Get Transactions'),
    GET_TRANSACTIONS_COMPLETE: type('[Data Batch] Get Transactions Complete'),
    PUBLISH_DB: type('[Data Batch] Publish Batch '),
    PUBLISH_DB_COMPLETE: type('[Data Batch] Publish Batch Complete'),
    GET_TRANSACTIONS_COUNT: type('[Data Batch] Get Transactions Count'),
    GET_TRANSACTIONS_COUNT_COMPLETE: type('[Data Batch] Get Transactions Count Complete'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
 export class ClearSearchAction implements Action {
     type = ActionTypes.CLEAR_SEARCH;
 
     constructor(public payload: null) { }
}
export class GetTransactionsAction implements Action {
    type = ActionTypes.GET_TRANSACTIONS;

    constructor(public payload: DataBatchSearch) { }
 }
export class GetTransactionsCountAction implements Action {
    type = ActionTypes.GET_TRANSACTIONS_COUNT;

    constructor(public payload: DataBatchSearch) { }
}
export class GetTransactionsCountCompleteAction implements Action {
    type = ActionTypes.GET_TRANSACTIONS_COUNT_COMPLETE;

    constructor(public payload: number) { }
}
export class GetTransactionsCompleteAction implements Action {
    type = ActionTypes.GET_TRANSACTIONS_COMPLETE;

    constructor(public payload: DataBatchTransDetails[]) { }
}

export class SearchDbAction implements Action {
    type = ActionTypes.SEARCH_DB;

    constructor(public payload: DataBatchSearch) { }
}

export class SearchDbCompleteAction implements Action {
    type = ActionTypes.SEARCH_DB_COMPLETE;

    constructor(public payload: DataBatchDetails[]) { }
}
export class SelectDb implements Action {
    type = ActionTypes.SELECT_DB;

    constructor(public payload: DataBatchSearch) { }
}
export class SaveDbAction implements Action {
    type = ActionTypes.SAVE_DB;

    constructor(public payload: DataBatchDetails) { }
}
export class SaveDbCompleteAction implements Action {
    type = ActionTypes.SAVE_DB_COMPLETE;

    constructor(public payload: string) { }
}
export class PublishDBAction implements Action {
    type = ActionTypes.PUBLISH_DB;
    constructor(public payload: DataBatchSearch) { }
}
export class PublishDBCompleteAction implements Action {
    type = ActionTypes.PUBLISH_DB_COMPLETE;
    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = SearchDbAction
    | SearchDbCompleteAction
    | SelectDb
    | SaveDbAction
    | SaveDbCompleteAction
    | ClearSearchAction
    | GetTransactionsAction
    | GetTransactionsCompleteAction
    |GetTransactionsCountAction
        |GetTransactionsCountCompleteAction
    | PublishDBAction
    | PublishDBCompleteAction;


