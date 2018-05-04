import { Action } from '@ngrx/store';
import { type } from '../util';
import { Opportunity } from '../models/opportunity.model';
import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunityDetail } from '../models/opportunity-detail.model';
import { OpportunitySearch } from '../models/opportunity-search.model';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
     CLEAR_SEARCH: type('[Opportunity] Clear Search'),
 
     SEARCH_OPP: type('[Opportunity] Search'),

    SEARCH_OPP_COMPLETE: type('[Opportunity] Search Complete'),
    SELECT_OPP: type('[Opportunity] Select'),
    SELECT_OPP_COMPLETE: type('[Opportunity] Details'),
    SAVE_OPP_HEADER: type('[Opportunity] Save'),
    SAVE_OPP_HEADER_COMPLETE: type('[Opportunity] Save Complete'),
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
export class SearchOppAction implements Action {
    type = ActionTypes.SEARCH_OPP;

    constructor(public payload: OpportunitySearch) { }
}

export class SearchOppCompleteAction implements Action {
    type = ActionTypes.SEARCH_OPP_COMPLETE;

    constructor(public payload: OpportunityHeader[]) { }
}
export class SelectOppAction implements Action {
    type = ActionTypes.SELECT_OPP;

    constructor(public payload: OpportunityHeader) { }
}
export class SelectOppCompleteAction implements Action {
    type = ActionTypes.SELECT_OPP_COMPLETE;

    constructor(public payload: OpportunityDetail[]) { }
}

export class SaveOppHeaderAction implements Action {
    type = ActionTypes.SAVE_OPP_HEADER;

    constructor(public payload: OpportunityHeader) { }
}
export class SaveOppHeaderCompleteAction implements Action {
    type = ActionTypes.SAVE_OPP_HEADER_COMPLETE;

    constructor(public payload: string) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = SearchOppAction
    | SearchOppCompleteAction
    | SelectOppAction
    | SelectOppCompleteAction
    | SaveOppHeaderAction
    | SaveOppHeaderCompleteAction
    | ClearSearchAction;


