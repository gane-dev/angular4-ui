import { Action } from '@ngrx/store';
import { type } from '../util';

import { SpendRule } from '../models/spend-rule.model'
import { SpendRuleSearch } from '../models/spend-rule-search.model'
import { SpendRuleDtl } from '../models/spend-rule-dtl.model';
import { SpendRuleFields } from '../models/spend-rule-fields.model';
import { SpendRuleCat } from '../models/spend-rule-cat.model';
import { SpendRuleSupp } from '../models/spend-rule-supp.model';
import { SpendRuleCust } from '../models/spend-rule-cust.model';

import { SpendRuleDtlSelect } from '../models/sr-details-select.model';
import { SpendRuleDetails } from '../models/spend-rule-details.model';
/**

* For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
     CLEAR_SEARCH: type('[Spend Rule] Clear Search'),
    INITIAL_ADD_SR_ACTION: type('[Spend Rule] Initial Add'),
    SEARCH_SR: type('[Spend Rule] Search'),
    SEARCH_SR_COMPLETE: type('[Spend Rule] Search Complete'),
    SELECT_SR: type('[Spend Rule] Select'),
    SELECTED_DETAIL: type('[Spend Rule] Selected Detail '),
    SELECT_SR_DETAIL: type('[Spend Rule Detail] Select'),
    SELECT_EFF_DATE: type('[Spend Rule Detail] Select Eff Date'),
    SELECT_SR_DETAIL_COMPLETE: type('[Spend Rule Detail] Select Complete' ),
    ADD_SR_RULE: type('[Spend Rule Fields] Add'),
    ADD_SR_RULE_COMPLETE: type('[Spend Rule Fields] Add Complete'),
    SAVE_SR_RULE: type('[Spend Rule Fields] Save'),
    SAVE_SR_RULE_COMPLETE: type('[Spend Rule Fields] Save Complete'),
    DELETE_SR_RULE: type('[Spend Rule Fields] Delete'),
    DELETE_SR_RULE_COMPLETE: type('[Spend Rule Fields] Delete Complete'),

    ADD_SR_DETAILS: type('[Spend Rule Details]  Add'),
    ADD_SR_DETAILS_COMPLETE: type('[Spend Rule Details]  Add Complete'),
    SAVE_SR_DETAILS: type('[Spend Rule Details]  Save'),
    SAVE_SR_DETAILS_COMPLETE: type('[Spend Rule Details]  Save Complete'),
    TEMP_SAVE_SR_DETAILS: type('[Spend Rule Details]  Temp Save Complete'),
    DELETE_SR_DETAILS: type('[Spend Rule Details]  Delete'),
    TEMP_DELETE_SR_DETAILS: type('[Spend Rule Details]  Temp Delete'),
    DELETE_SR_DETAILS_COMPLETE: type('[Spend Rule Details]  Delete Complete'),

    INITIAL_ADD_SR_CUST: type('[Spend Rule Customer] Initial Add'),
    ADD_SR_CUST: type('[Spend Rule Customer]  Add'),
    ADD_SR_CUST_COMPLETE: type('[Spend Rule Customer]  Add Complete'),
    SAVE_SR_CUST: type('[Spend Rule Customer]  Save'),
    SAVE_SR_CUST_COMPLETE: type('[Spend Rule Customer]  Save Complete'),
    TEMP_DELETE_SR_CUST: type('[Spend Rule Customer]  Temp Delete'),
    DELETE_SR_CUST: type('[Spend Rule Customer]  Delete'),
    DELETE_SR_CUST_COMPLETE: type('[Spend Rule Customer]  Delete Complete'),

    INITIAL_ADD_SR_SUPP: type('[Spend Rule Supplier] Initial Add'),
    ADD_SR_SUPP: type('[Spend Rule Supplier]  Add'),
    ADD_SR_SUPP_COMPLETE: type('[Spend Rule Supplier]  Add Complete'),
    SAVE_SR_SUPP: type('[Spend Rule Supplier]  Save'),
    SAVE_SR_SUPP_COMPLETE: type('[Spend Rule Supplier]  Save Complete'),
    TEMP_DELETE_SR_SUPP: type('[Spend Rule Supplier]  Temp Delete'),
    DELETE_SR_SUPP: type('[Spend Rule Supplier]  Delete'),
    DELETE_SR_SUPP_COMPLETE: type('[Spend Rule Supplier]  Delete Complete'),
    INITIAL_ADD_SR_DETAILS :type('[Spend Rule Details] Initial Add'),
    INITIAL_ADD_SR_CAT: type('[Spend Rule Category] Initial Add'),
    ADD_SR_CAT: type('[Spend Rule Category  Add'),
    ADD_SR_CAT_COMPLETE: type('[Spend Rule Category  Add Complete'),
    SAVE_SR_CAT: type('[Spend Rule Category  Save'),
    SAVE_SR_CAT_COMPLETE: type('[Spend Rule Category  Save Complete'),
    TEMP_DELETE_SR_CAT: type('[Spend Rule Category]  Temp Delete'),
    DELETE_SR_CAT: type('[Spend Rule Category  Delete'),
    DELETE_SR_CAT_COMPLETE: type('[Spend Rule Category  Delete Complete'),
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
export class SearchSrAction implements Action {
    type = ActionTypes.SEARCH_SR;

    constructor(public payload: SpendRuleSearch) { }
}
export class InitialAddSrAction implements Action {
    type = ActionTypes.INITIAL_ADD_SR_ACTION;

    constructor(public payload: null) { }
}

export class SearchSrCompleteAction implements Action {
    type = ActionTypes.SEARCH_SR_COMPLETE;

    constructor(public payload: SpendRuleDtl[]) { }
}
export class SelectSr implements Action {
    type = ActionTypes.SELECT_SR;

    constructor(public payload: string) { }
}
export class SelectedSrDetail implements Action {
    type = ActionTypes.SELECTED_DETAIL;

    constructor(public payload: SpendRuleDtl[]) { }
}
export class SelectSrDetailAction implements Action {
    type = ActionTypes.SELECT_SR_DETAIL;

    constructor(public payload: SpendRuleDtlSelect) { }
}
export class SelectSrDetailCompleteAction implements Action {
    type = ActionTypes.SELECT_SR_DETAIL_COMPLETE;

    constructor(public payload: SpendRuleDetails) { }
}
export class AddSrRuleAction implements Action {
    type = ActionTypes.ADD_SR_RULE;

    constructor(public payload: null) { }
}
export class AddSrRuleCompleteAction implements Action {
    type = ActionTypes.ADD_SR_RULE_COMPLETE;

    constructor(public payload: string) { }
}
export class SaveSrRuleAction implements Action {
    type = ActionTypes.SAVE_SR_RULE;

    constructor(public payload: SpendRuleFields) { }
}
export class SaveSrRuleCompleteAction implements Action {
    type = ActionTypes.SAVE_SR_RULE_COMPLETE;

    constructor(public payload: string) { }
}
export class DeleteSrRuleAction implements Action {
    type = ActionTypes.DELETE_SR_RULE;

    constructor(public payload: SpendRuleFields) { }
}
export class DeleteSrRuleCompleteAction implements Action {
    type = ActionTypes.DELETE_SR_RULE_COMPLETE;

    constructor(public payload: string) { }
}

export class AddSrDetailsAction implements Action {
    type = ActionTypes.ADD_SR_DETAILS;

    constructor(public payload: SpendRuleDtl) { }
}
export class AddSrDetailsCompleteAction implements Action {
    type = ActionTypes.ADD_SR_DETAILS_COMPLETE;

    constructor(public payload: string) { }
}
export class SaveSrDetailsAction implements Action {
    type = ActionTypes.SAVE_SR_DETAILS;

    constructor(public payload: SpendRuleDtl) { }
}
export class TempSaveSrDetailsAction implements Action {
    type = ActionTypes.TEMP_SAVE_SR_DETAILS;

    constructor(public payload: SpendRuleDtl) { }
}
export class SaveSrDetailsCompleteAction implements Action {
    type = ActionTypes.SAVE_SR_DETAILS_COMPLETE;

    constructor(public payload: string) { }
}
export class DeleteSrDetailsAction implements Action {
    type = ActionTypes.DELETE_SR_DETAILS;

    constructor(public payload: SpendRuleDtl) { }
}
export class TempDeleteSrDetailsAction implements Action {
    type = ActionTypes.TEMP_DELETE_SR_DETAILS;

    constructor(public payload: SpendRuleDtl) { }
}
export class DeleteSrDetailsCompleteAction implements Action {
    type = ActionTypes.DELETE_SR_DETAILS_COMPLETE;

    constructor(public payload: string) { }
}
export class AddSrCustAction implements Action {
    type = ActionTypes.ADD_SR_CUST;

    constructor(public payload: SpendRuleCust) { }
}
export class InitialAddSrCustAction implements Action {
    type = ActionTypes.INITIAL_ADD_SR_CUST;

    constructor(public payload: null) { }
}
export class AddSrCustCompleteAction implements Action {
    type = ActionTypes.ADD_SR_CUST_COMPLETE;

    constructor(public payload: string) { }
}
export class SaveSrCustAction implements Action {
    type = ActionTypes.SAVE_SR_CUST;

    constructor(public payload: SpendRuleCust[]) { }
}
export class SaveSrCustCompleteAction implements Action {
    type = ActionTypes.SAVE_SR_CUST_COMPLETE;

    constructor(public payload: string) { }
}
export class DeleteSrCustAction implements Action {
    type = ActionTypes.DELETE_SR_CUST;

    constructor(public payload: SpendRuleCust[]) { }
}
export class TempDeleteSrCustAction implements Action {
    type = ActionTypes.TEMP_DELETE_SR_CUST;

    constructor(public payload: SpendRuleCust) { }
}
export class DeleteSrCustCompleteAction implements Action {
    type = ActionTypes.DELETE_SR_CUST_COMPLETE;

    constructor(public payload: string) { }
}
export class InitialAddSrDetailsAction implements Action {
    type = ActionTypes.INITIAL_ADD_SR_DETAILS;

    constructor(public payload: null) { }
}

export class InitialAddSrSuppAction implements Action {
    type = ActionTypes.INITIAL_ADD_SR_SUPP;

    constructor(public payload: null) { }
}
export class AddSrSuppAction implements Action {
    type = ActionTypes.ADD_SR_SUPP;

    constructor(public payload: SpendRuleSupp) { }
}
export class AddSrSuppCompleteAction implements Action {
    type = ActionTypes.ADD_SR_SUPP_COMPLETE;

    constructor(public payload: string) { }
}
export class SaveSrSuppAction implements Action {
    type = ActionTypes.SAVE_SR_SUPP;

    constructor(public payload: SpendRuleSupp[]) { }
}
export class SaveSrSuppCompleteAction implements Action {
    type = ActionTypes.SAVE_SR_SUPP_COMPLETE;

    constructor(public payload: string) { }
}
export class TempDeleteSrSuppAction implements Action {
    type = ActionTypes.TEMP_DELETE_SR_SUPP;

    constructor(public payload: SpendRuleSupp) { }
}
export class DeleteSrSuppAction implements Action {
    type = ActionTypes.DELETE_SR_SUPP;

    constructor(public payload: SpendRuleSupp[]) { }
}
export class DeleteSrSuppCompleteAction implements Action {
    type = ActionTypes.DELETE_SR_SUPP_COMPLETE;

    constructor(public payload: string) { }
}
export class InitialAddSrCatAction implements Action {
    type = ActionTypes.INITIAL_ADD_SR_CAT;

    constructor(public payload: null) { }
}
export class AddSrCatAction implements Action {
    type = ActionTypes.ADD_SR_CAT;

    constructor(public payload: SpendRuleCat) { }
}
export class AddSrCatCompleteAction implements Action {
    type = ActionTypes.ADD_SR_CAT_COMPLETE;

    constructor(public payload: string) { }
}
export class SaveSrCatAction implements Action {
    type = ActionTypes.SAVE_SR_CAT;

    constructor(public payload: SpendRuleCat[]) { }
}
export class SaveSrCatCompleteAction implements Action {
    type = ActionTypes.SAVE_SR_CAT_COMPLETE;

    constructor(public payload: string) { }
}
export class TempDeleteSrCatAction implements Action {
    type = ActionTypes.TEMP_DELETE_SR_CAT;

    constructor(public payload: SpendRuleCat) { }
}
export class DeleteSrCatAction implements Action {
    type = ActionTypes.DELETE_SR_CAT;

    constructor(public payload: SpendRuleCat[]) { }
}
export class DeleteSrCatCompleteAction implements Action {
    type = ActionTypes.DELETE_SR_CAT_COMPLETE;

    constructor(public payload: string) { }
}
export class SelectEffDateAction implements Action {
    type = ActionTypes.SELECT_EFF_DATE;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = SearchSrAction
    | SearchSrCompleteAction
    | SelectSr
    | SelectedSrDetail
    | SelectSrDetailAction
    | SelectSrDetailCompleteAction
    | AddSrRuleAction
    | AddSrRuleCompleteAction
    | SaveSrRuleAction
    | SaveSrRuleCompleteAction
    | DeleteSrRuleAction
    | DeleteSrRuleCompleteAction
    | AddSrDetailsAction
    | AddSrDetailsCompleteAction
    | SaveSrDetailsAction
    | TempSaveSrDetailsAction
    | SaveSrDetailsCompleteAction
    | DeleteSrDetailsAction
    | TempDeleteSrDetailsAction
    | DeleteSrDetailsCompleteAction
    | AddSrCustAction
    | InitialAddSrCustAction
    | AddSrCustCompleteAction
    | SaveSrCustAction
    | SaveSrCustCompleteAction
    | DeleteSrCustAction
    | TempDeleteSrCustAction
    | DeleteSrCustCompleteAction
    | InitialAddSrSuppAction
    | InitialAddSrDetailsAction
    | AddSrSuppAction
    | AddSrSuppCompleteAction
    | SaveSrSuppAction
    | SaveSrSuppCompleteAction
    | TempDeleteSrSuppAction
    | DeleteSrSuppAction
    | DeleteSrSuppCompleteAction
    | InitialAddSrCatAction
    | AddSrCatAction
    | AddSrCatCompleteAction
    | SaveSrCatAction
    | SaveSrCatCompleteAction
    | TempDeleteSrCatAction
    | DeleteSrCatAction
    | DeleteSrCatCompleteAction
    | SelectEffDateAction
    | InitialAddSrAction
    | ClearSearchAction;


