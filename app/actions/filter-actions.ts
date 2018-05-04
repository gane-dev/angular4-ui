import { Action } from '@ngrx/store';
import { type } from '../util';
import { FilterType } from '../models/filter-type.model'
export const ActionTypes = {
    DBT_ADD_FILTERS: type('[Data Batch Transactions] Add Filters'),
    DBT_ADD_FILTER: type('[Data Batch Transactions] Add Filter'),
    DBT_REMOVE_FILTER: type('[Data Batch Transactions] Remove Filter')
    };

export class DbtAddFilter implements Action {
    type = ActionTypes.DBT_ADD_FILTER;

    constructor(public payload: FilterType) { }
}
export class DbtAddFilters implements Action {
    type = ActionTypes.DBT_ADD_FILTERS;

    constructor(public payload: FilterType[]) { }
}

export class DbtRemoveFilter implements Action {
    type = ActionTypes.DBT_REMOVE_FILTER;

    constructor(public payload: string) { }
}
export type Actions
    = DbtAddFilter
    | DbtRemoveFilter
    | DbtAddFilters
