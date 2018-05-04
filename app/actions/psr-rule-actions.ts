import { Action } from '@ngrx/store';
import { type } from '../util';
import { PsrExceptionGroup } from '../models/psr-exception-group.model';
import { PsrTable } from '../models/psr-table.model';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
    SEARCH: type('[PSR] Search'),
    SEARCH_COMPLETE: type('[PSR] Search Complete'),
    CLEAR_SEARCH: type('[PSR] Clear Search'),
    SELECT_PSR: type('[PSR] Select'),
    INITIAL_ADD : type('[PSR] Initial Add'),
    TEMP_ADD : type('[PSR] Temp Add'),
    ADD_PSR: type('[PSR] Add'),
    ADD_PSR_COMPLETE: type('[PSR] Add Complete'),
    SAVE_PSR: type('[PSR] Save'),
    SAVE_PSR_COMPLETE: type('[PSR] Save Complete'),
    DELETE_PSR: type('[PSR] Delete'),
    DELETE_PSR_COMPLETE: type('[PSR] Delete Complete'),
    TEMP_DELETE_PSR:type('[PSR] Temp Delete'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
    type = ActionTypes.SEARCH;

    constructor(public payload: PsrTable) { }
}
export class ClearSearchAction implements Action {
    type = ActionTypes.CLEAR_SEARCH;

    constructor(public payload: null) { }
}
export class SearchCompleteAction implements Action {
    type = ActionTypes.SEARCH_COMPLETE;

    constructor(public payload: PsrTable[]) { }
}
export class SelectPsr implements Action {
    type = ActionTypes.SELECT_PSR;

    constructor(public payload: PsrTable) { }
}
export class InitialPsrAdd implements Action {
    type = ActionTypes.INITIAL_ADD;

    constructor(public payload: null) { }
}
export class TempPsrAdd implements Action {
    type = ActionTypes.TEMP_ADD;

    constructor(public payload: PsrTable) { }
}
export class AddPsrAction implements Action {
    type = ActionTypes.ADD_PSR;

    constructor(public payload: PsrTable) { }
}
export class AddPsrCompleteAction implements Action {
    type = ActionTypes.ADD_PSR_COMPLETE;

    constructor(public payload: String) { }
}
export class SavePsrAction implements Action {
    type = ActionTypes.SAVE_PSR;

    //constructor(public payload: PsrTable[]) { }
    constructor(public payload: PsrTable) { }
}
export class SavePsrCompleteAction implements Action {
    type = ActionTypes.SAVE_PSR_COMPLETE;

    constructor(public payload: string) { }
}
export class TempDeletePsrAction implements Action {
    type = ActionTypes.TEMP_DELETE_PSR;

    constructor(public payload: PsrTable) { }
}
export class DeletePsrAction implements Action {
    type = ActionTypes.DELETE_PSR;

    constructor(public payload: PsrTable) { }
}
export class DeletePsrCompleteAction implements Action {
    type = ActionTypes.DELETE_PSR_COMPLETE;

    constructor(public payload: string) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = SearchAction
    | SearchCompleteAction
    | SelectPsr
    | AddPsrAction
    | AddPsrCompleteAction
    | SavePsrAction
    | SavePsrCompleteAction
    | DeletePsrAction
    | DeletePsrCompleteAction
    | InitialPsrAdd
    | TempPsrAdd
    | TempDeletePsrAction
    | ClearSearchAction;


