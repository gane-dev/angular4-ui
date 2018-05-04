import { Action } from '@ngrx/store';
import { type } from '../util';
import { SpendIncidentHeader } from '../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../models/spend-incident-detail.model'

import { SpendIncident } from '../models/spend-incident.model'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
    SEARCH_SI: type('[Spend Incident] Search'),
     CLEAR_SEARCH: type('[Spend Incident] Clear Search'),
 
    SEARCH_SI_COMPLETE: type('[Spend Incident] Search Complete'),
    SELECT_SI: type('[Spend Incident] Select'),
    SELECT_SI_COMPLETE: type('[Spend Incident] Select Complete'),
    SAVE_SI_HEADER: type('[Spend Incident] Save'),
    SAVE_SI_HEADER_COMPLETE: type('[Spend Incident] Save Complete'),
    IGNORE_SI_TRANSACTION: type('[Spend Incident] Ignore Transaction'),
    IGNORE_SI_TRANSACTION_COMPLETE: type('[Spend Incident] Ignore Transaction Complete'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchSiAction implements Action {
    type = ActionTypes.SEARCH_SI;

    constructor(public payload: SpendIncidentHeader) { }
}
 export class ClearSearchAction implements Action {
     type = ActionTypes.CLEAR_SEARCH;
 
     constructor(public payload: null) { }
}
export class SearchSiCompleteAction implements Action {
    type = ActionTypes.SEARCH_SI_COMPLETE;

    constructor(public payload: SpendIncidentHeader[]) { }
}
export class SelectSiAction implements Action {
    type = ActionTypes.SELECT_SI;

    constructor(public payload: SpendIncidentHeader) { }
}
export class SelectSiCompleteAction implements Action {
    type = ActionTypes.SELECT_SI_COMPLETE;

    constructor(public payload: SpendIncidentDetail[]) { }
}
export class SaveSiHeaderAction implements Action {
    type = ActionTypes.SAVE_SI_HEADER;

    constructor(public payload: SpendIncidentHeader) { }
}
export class IgnoreSiTransactionAction implements Action {
    type = ActionTypes.IGNORE_SI_TRANSACTION;

    constructor(public payload: SpendIncidentDetail[]) { }
}
export class IgnoreSiTransactionCompleteAction implements Action {
    type = ActionTypes.IGNORE_SI_TRANSACTION_COMPLETE;

    constructor(public payload: string) { }
}
export class SaveSiHeaderCompleteAction implements Action {
    type = ActionTypes.SAVE_SI_HEADER_COMPLETE;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = SearchSiAction
    | SearchSiCompleteAction
    | SelectSiAction
    | SelectSiCompleteAction
    | SaveSiHeaderAction
    |SaveSiHeaderCompleteAction
    | ClearSearchAction
    | IgnoreSiTransactionAction
    | IgnoreSiTransactionCompleteAction;


