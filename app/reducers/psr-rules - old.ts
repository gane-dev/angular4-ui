import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { PsrTable } from '../models/psr-table.model';
import { PsrExceptionGroup } from '../models/psr-exception-group.model';
import * as psr from '../actions/psr-rule-actions'

import { createSelector } from 'reselect';

export interface State {
    entities: PsrTable[];
    selectedPsr: PsrExceptionGroup;
    effDates: string[];
    delEffDates: string[];
    editPsr: { [effDate: string]: PsrTable };
    deletePsr: { [effDate: string]: PsrTable };
    saveResult: string;
    delResult: string;
    searchQuery: PsrTable;
}
const initialState: State = {
    entities: [],
    effDates: [],
    delEffDates: [],
    editPsr: {},
    deletePsr: {},
    saveResult: '-1',
    delResult: '-1',
    selectedPsr: null,
    searchQuery: <PsrTable>{}
};
function getDateFormat(dt: Object) {
    return dt.toString();
}
export function reducer(state = initialState, action: psr.Actions): State {
    switch (action.type) {
        case psr.ActionTypes.CLEAR_SEARCH:
            {

                return {
                    entities: [],
                    effDates: [],
                    delEffDates: [],
                    editPsr: {},
                    deletePsr: {},
                    saveResult: '-1',
                    delResult: '-1',
                    selectedPsr: null,
                    searchQuery: <PsrTable>{}

                };
            }
        case psr.ActionTypes.SEARCH:
            {
                const psrQuery = action.payload;
                return Object.assign({}, initialState, { searchQuery: psrQuery });
            }
        case psr.ActionTypes.SEARCH_COMPLETE:
            {
                const psrExceptionRules = action.payload;

                return Object.assign({}, state, { entities: Object.assign([], psrExceptionRules) });
            }
        case psr.ActionTypes.INITIAL_ADD:
            {

                return {
                    entities: [],
                    effDates: [],
                    delEffDates: [],
                    editPsr: {},
                    deletePsr: {},
                    saveResult: '-1',
                    delResult: '-1',
                    selectedPsr: <PsrExceptionGroup>{},
                    searchQuery: <PsrTable>{}

                };
            }
     
        //case psr.ActionTypes.SELECT_PSR:
        //    {
        //        const idx: any = action.payload;
        //        if (idx != null) {
        //            //effective dates
        //            const newDates = state.entities[idx].psrTable.map(rule => {
        //                return getDateFormat(rule.EFF_DATE)
        //            });
        //            const newRuleEntities = state.entities[idx].psrTable.reduce((details: { [effDate: string]: PsrTable }, rule: PsrTable) => {
        //                return Object.assign(details, {
        //                    [getDateFormat(rule.EFF_DATE)]: rule
        //                });
        //            }, {});

        //            return Object.assign({}, state, {
        //                effDates: newDates,
        //                editPsr: Object.assign({}, newRuleEntities),
        //                selectedPsr: state.entities[idx]
        //            });

        //        }
        //        else {
        //            return state;
        //        }
        //    }
        //case psr.ActionTypes.TEMP_ADD:
        //    {

        //        const tempRule = action.payload;


        //        const srDetail: any = action.payload;
        //        const newPsr: PsrTable = Object.assign({}, srDetail,
        //            {
        //                CUST_ID: state.selectedPsr.CUST_ID,
        //                SUPPLIER_ID: state.selectedPsr.SUPPLIER_ID,
        //                RULE_LEVEL: state.selectedPsr.RULE_LEVEL
        //            });
        //        const newEffDate: string = getDateFormat(srDetail.EFF_DATE);
        //        if (state.effDates.indexOf(newEffDate) < 0) {
        //            return Object.assign({}, state, {
        //                effDates: [...state.effDates, newEffDate],

        //                editPsr: Object.assign({}, state.editPsr, { [newEffDate]: newPsr }),

        //            });
        //        }
        //        else {
        //            const remEffDates = state.effDates.filter(effDate => effDate !== newEffDate);
        //            const remDetails = remEffDates.reduce((details: { [effDate: string]: PsrTable }, id: string) => {
        //                return Object.assign(details, {
        //                    [id]: state.editPsr[id]
        //                });
        //            }, {});
        //            return Object.assign({}, state, {

        //                effDates: [...remEffDates, newEffDate],

        //                editPsr: Object.assign({}, remDetails, { [newEffDate]: srDetail })
        //            });
        //        }

        //    }
        //case psr.ActionTypes.TEMP_DELETE_PSR:
        //    {

        //        const deleteDetail: any = action.payload;
        //        const delEffDate: string = getDateFormat(deleteDetail.EFF_DATE);

        //        if (state.effDates.indexOf(delEffDate) > -1 && state.delEffDates.indexOf(delEffDate) < 0) {

        //            const deletedItem = state.editPsr[delEffDate];
        //            const remEffDates = state.effDates.filter(effDate => effDate !== delEffDate);

        //            const remDetails = remEffDates.reduce((details: { [effDate: string]: PsrTable }, id: string) => {
        //                return Object.assign(details, {
        //                    [id]: state.editPsr[id]
        //                });
        //            }, {});
        //            return {
        //                entities: state.entities,
        //                effDates: remEffDates,
        //                delEffDates: [...state.delEffDates, delEffDate],
        //                editPsr: remDetails,
        //                deletePsr: Object.assign({}, state.deletePsr, { [delEffDate]: deletedItem }),
        //                saveResult: state.saveResult,
        //               delResult: state.delResult,
        //                selectedPsr: state.selectedPsr,
        //                searchQuery: state.searchQuery
        //            }
        //        }
        //        else {
        //            return state;
        //        }

        //    }

      
        case psr.ActionTypes.SAVE_PSR_COMPLETE:
            {
                const saveResult: any = action.payload;
                return Object.assign({}, state, { saveResult: saveResult });

            }
        case psr.ActionTypes.DELETE_PSR_COMPLETE:
            {
                const delResult: any = action.payload;
                return Object.assign({}, state, { deletePsr: {}, delResult: delResult });

            }
        case psr.ActionTypes.SAVE_PSR:
            {
                return Object.assign({}, state, { saveResult: '-1' });
            }
        case psr.ActionTypes.DELETE_PSR:
            {
                return Object.assign({}, state, { delResult: '-1' });
            }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.entities;
export const getSearchQuery = (state: State) => state.searchQuery;

export const getEditEntities = (state: State) => state.editPsr;
export const getDeletedEntities = (state: State) => state.deletePsr;
//export const getPsrResult = (state: State) => state.result;

export const getDelIds = (state: State) => state.delEffDates;
export const getIds = (state: State) => state.effDates;
export const getDeletedRules = createSelector(getDeletedEntities, getDelIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getEditRule = createSelector(getEditEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getSaveResult = (state: State) => state.saveResult;
export const getDelResult = (state: State) => state.delResult;




