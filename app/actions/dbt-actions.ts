import { Action } from '@ngrx/store';
import { type } from '../util';

import { DataBatchTrans } from '../models/data-batch-trans.model';
import { DataBatchTransDetails } from '../models/dbt-details.model';
import { DataBatchSearch } from '../models/data-batch-search.model';
import { DBTApplyFlag } from '../models/dbt-apply-flag.model';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
    CLEAR_SEARCH: type('[Data Batch Transactions] Clear Search'),
    SEARCH_DBT: type('[Data Batch Transactions] Search'),
    SEARCH_DBT_COMPLETE: type('[Data Batch Transactions] Search Complete'),
    SELECT_DBT: type('[Data Batch Transactions] Select'),
    SAVE_DBT: type('[Data Batch Transactions] Save'),
    SAVE_DBT_COMPLETE: type('[Data Batch Transactions] Save Complete'),

    SELECT_IE_FLAG: type('[DBT Incl / Excl ] Select'),
    SELECT_IE_FLAGS: type('[DBT All Incl / Excl Flags] Select'),
    APPLY_IE_FLAGS: type('[DBT All Incl / Excl Flags] Apply'),
     APPLY_IE_FLAGS_COMPLETE: type('[DBT All Incl / Excl Flags] Apply Complete'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchDbtAction implements Action {
    type = ActionTypes.SEARCH_DBT;

    constructor(public payload: DataBatchSearch) { }
}
 export class ClearSearchAction implements Action {
     type = ActionTypes.CLEAR_SEARCH;
 
     constructor(public payload: null) { }
}

export class SearchDbtCompleteAction implements Action {
    type = ActionTypes.SEARCH_DBT_COMPLETE;

    constructor(public payload: DataBatchTrans[]) { }
}
export class SelectDbt implements Action {
    type = ActionTypes.SELECT_DBT;

    constructor(public payload: string) { }
}
export class SaveDbtAction implements Action {
    type = ActionTypes.SAVE_DBT;

    constructor(public payload: DataBatchTransDetails[] ) { }
}
export class SaveDbtCompleteAction implements Action {
    type = ActionTypes.SAVE_DBT_COMPLETE;

    constructor(public payload: string) { }
}
export class SelectIEFlagAction implements Action {
    type = ActionTypes.SELECT_IE_FLAG;

    constructor(public payload: DBTApplyFlag) { }
}
export class SelectIEFlagsAction implements Action {
    type = ActionTypes.SELECT_IE_FLAGS;

    constructor(public payload: DBTApplyFlag[]) { }
}
export class ApplyIEFlagsAction implements Action {
    type = ActionTypes.APPLY_IE_FLAGS;

    constructor(public payload: DBTApplyFlag[]) {
        console.log('apply flag');}
}
export class ApplyIEFlagsCompleteAction implements Action {
    type = ActionTypes.APPLY_IE_FLAGS_COMPLETE;

    constructor(public payload: string) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = SearchDbtAction
    | SearchDbtCompleteAction
    | SelectDbt
    | SaveDbtAction
    | SaveDbtCompleteAction
    | SelectIEFlagAction
    | SelectIEFlagsAction
    | ApplyIEFlagsAction
    | ApplyIEFlagsCompleteAction
    | ClearSearchAction;


