import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as filter from '../actions/filter-actions';
import { createSelector } from 'reselect';
import { FilterType } from '../models/filter-type.model';
export interface State {
    dbtKeys: string[],
    dbtFilters: { [name: string]: FilterType }
}
const initialState: State = {
    dbtKeys: [],
    dbtFilters:{}
}
export function reducer(state = initialState, action: filter.Actions): State {
    switch (action.type) {
        case filter.ActionTypes.DBT_ADD_FILTERS:
            {
                const addFilters:any = action.payload;
                const newKeys = addFilters.map(rule => {
                    return rule.name;
                }).sort((filter1,filter2) => {return filter1 > filter2? 1:- 1});
                const newRuleEntities = addFilters.reduce((details: { [name: string]: FilterType }, rule: FilterType) => {
                    return Object.assign(details, {
                        [rule.name]: rule
                    });
                }, {});
                return {
                    dbtKeys: newKeys,
                    dbtFilters: Object.assign({}, newRuleEntities),
                };
            }

        case filter.ActionTypes.DBT_ADD_FILTER:
            {
                const addFilter: any= action.payload;
                if (state.dbtKeys.indexOf(addFilter.name) < 0) {
                    return Object.assign({}, state, {
                        dbtKeys: [...state.dbtKeys, addFilter.name].sort((filter1,filter2) => {return filter1 > filter2? 1:- 1}),
                        dbtFilters: Object.assign({}, state.dbtFilters, { [addFilter.name]: addFilter }),

                    });
                }
                else {
                    const remKeys = state.dbtKeys.filter(key => key !== addFilter.name);
                    const remDetails = remKeys.reduce((details: { [name: string]: FilterType }, id: string) => {
                        return Object.assign(details, {
                            [id]: state.dbtFilters[id]
                        });
                    }, {});
                    const alteredKeys =  [...remKeys, addFilter.name].sort((filter1,filter2) => {return filter1 > filter2? 1:- 1});
                    const alteredObjects = Object.assign({}, remDetails, { [addFilter.name]: addFilter });
                    const resDetails = alteredKeys.reduce((details: { [name: string]: FilterType }, id: string) => {
                        return Object.assign(details, {
                            [id]: alteredObjects[id]
                        });
                    }, {});
                    return Object.assign({}, state, {

                        dbtKeys:alteredKeys,
                        dbtFilters: resDetails
                    });
                }
            }
        case filter.ActionTypes.DBT_REMOVE_FILTER:
            {
                const removeFilter: any = action.payload;

                if (state.dbtKeys.indexOf(removeFilter) > -1) {

                    const remKeys = state.dbtKeys.filter(effKey => effKey !== removeFilter);
                    const remItem = state.dbtFilters[removeFilter];
                    const remDetails = remKeys.reduce((details: { [name: string]: FilterType }, id: string) => {
                        return Object.assign(details, {
                            [id]: state.dbtFilters[id]
                        });
                    }, {});

                    const alteredKeys =  [...remKeys, removeFilter].sort((filter1,filter2) => {return filter1 > filter2? 1 : -1; });
                    const alteredObjects = Object.assign({}, remDetails, { [removeFilter]: { name: removeFilter, value: '' } });
                    const resDetails = alteredKeys.reduce((details: { [name: string]: FilterType }, id: string) => {
                        return Object.assign(details, {
                            [id]: alteredObjects[id]
                        });
                    }, {});
                    
                    return Object.assign({}, state, {

                        dbtKeys: alteredKeys,
                        dbtFilters: resDetails
                    });

                }

                else {
                    return state;
                }
            }
        default: {
            return state;
        }
    }
}
export const getDbt = (state: State) => state.dbtFilters;
export const getDbtKeys = (state: State) => state.dbtKeys;
export const getDbtFilter = createSelector(getDbt, getDbtKeys, (entities, ids) => {
    return ids.map(id => entities[id]);
});
