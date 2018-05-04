import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as sr from '../actions/spend-rule-actions'

import { SpendRuleDtlSelect } from '../models/sr-details-select.model';
import { SpendRuleDetails } from '../models/spend-rule-details.model';
import { SpendRuleDtl } from '../models/spend-rule-dtl.model';

export interface State {
    //effDates: string[],
    //delEffDates: string[],
    //details: { [effDate: string]: SpendRuleDtl },
    selectedDetail: SpendRuleDtl,
    //deletedDetails: { [effDate: string]: SpendRuleDtl },
    delResult: string,
    saveResult: string
}


const initialState: State = {
   
    delResult: '-1',
    saveResult: '-1',
    selectedDetail: <SpendRuleDtl>{}

};
function getDateFormat( dt:Object)
{
    return  dt.toString();
}
export function reducer(state = initialState, action: sr.Actions): State {
    switch (action.type) {
    //     case sr.ActionTypes.INITIAL_ADD_SR_ACTION:
    //    {
         
    //     return {
    //     effDates: [],
    //delEffDates: [],
    //deletedDetails: {},
    //details: {},
    //delResult: '-1',
    //saveResult: '-1',
    //selectedDetail: null
    //    };
    //    }
        //case sr.ActionTypes.SELECT_EFF_DATE:
        //{
        //        const selectEffDate: any = action.payload;
        //    return Object.assign({},state,{selectedDetail:selectEffDate});
        //}
        //load details for the given rule
        //case sr.ActionTypes.SELECTED_DETAIL:
        //    {
        //        const selectedSrDetail: any = action.payload;
        //        //effective dates
        //        const newDates = selectedSrDetail.map(rule => 
        //                                                {
        //                                                return getDateFormat(rule.EFF_DATE)});
        //        const newRuleEntities = selectedSrDetail.reduce((details: { [effDate: string]: SpendRuleDtl }, rule: SpendRuleDtl) => {
        //            return Object.assign(details, {
        //                [getDateFormat(rule.EFF_DATE)]: rule
        //            });
        //        }, {});
        //        return Object.assign({}, state, {
        //            effDates: newDates,
        //            details: Object.assign({}, newRuleEntities),
        //        });

        //    }
        //case sr.ActionTypes.ADD_SR_DETAILS:
        //    {
        //        const srDetail: any = action.payload;
        //        const newEffDate: string = getDateFormat(srDetail.EFF_DATE);
        //        if (state.effDates.indexOf(newEffDate) < 0) {
        //            return Object.assign({}, state, {
        //                effDates:  [ ...state.effDates, newEffDate ],
        //                details: Object.assign({}, state.details, { [newEffDate]: srDetail }),
        //            });
        //        }
        //        else {
        //            const remEffDates = state.effDates.filter(effDate => effDate !== newEffDate);
        //            const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleDtl },id: string) => {
        //            return Object.assign(details, {
        //                 [id]: state.details[id]
        //            });
        //        }, {});
        //            return Object.assign({}, state, {
        //                effDates:  [ ...remEffDates, newEffDate ],
        //                details: Object.assign({}, remDetails, {[newEffDate]:srDetail}),
        //            });
        //        }
             
        //    }
        //case sr.ActionTypes.TEMP_SAVE_SR_DETAILS:
        //    {
        //        const srTempDetail: any = action.payload;
        //        const newEffDate: string = getDateFormat(srTempDetail.EFF_DATE);
        //        if (state.effDates.indexOf(newEffDate) > -1) {
        //            const remEffDates = state.effDates.filter(effDate => effDate !== newEffDate);
        //            const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleDtl },id: string) => {
        //            return Object.assign(details, {
        //                 [id]: state.details[id]
        //            });
        //        }, {});
        //            return Object.assign({}, state, {
        //                effDates:  [ ...remEffDates, newEffDate ],
        //                details: Object.assign({}, remDetails, {[newEffDate]:srTempDetail}),
        //            });
        //        }
        //        else {
        //            return state;
        //        }
             
        //    }
        case sr.ActionTypes.SAVE_SR_DETAILS:
            {
                return Object.assign({}, state, { saveResult: '-1' });

            }
        case sr.ActionTypes.SAVE_SR_DETAILS_COMPLETE:
            {
                const saveResult: any = action.payload;
                return Object.assign({}, state, { saveResult: saveResult });

            }
        //case sr.ActionTypes.TEMP_DELETE_SR_DETAILS:
        //    {
        //        const deleteDetail: any = action.payload;
        //        const delEffDate: string = getDateFormat(deleteDetail.EFF_DATE);

        //        if (state.effDates.indexOf(delEffDate) > -1 && state.delEffDates.indexOf(delEffDate) < 0) {
                    
        //            const deletedItem = state.details[delEffDate];
        //            const remEffDates = state.effDates.filter(effDate => effDate !== delEffDate);
                    
        //            const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleDtl },id: string) => {
        //            return Object.assign(details, {
        //                 [id]: state.details[id]
        //            });
        //        }, {});
        //            return Object.assign({}, state, {
        //                effDates: remEffDates,
        //                delEffDates: [...state.delEffDates, delEffDate],
        //                details: remDetails,
        //                deletedDetails: Object.assign({}, state.deletedDetails, { [delEffDate]: deletedItem }),
        //            });
        //        }
        //        else {
        //            return state;
        //        }

        //    }
        
        case sr.ActionTypes.DELETE_SR_DETAILS:
            {
                return Object.assign({}, state, { delResult: '-1' });

            }
        case sr.ActionTypes.DELETE_SR_DETAILS_COMPLETE:
            {
                const deleteCustResult: any = action.payload;
                if (deleteCustResult === '1')
                    return Object.assign({}, state, { deletedDetails: {}, delResult: '1' });
                else
                    return Object.assign({}, state, { delResult: deleteCustResult });


            }
        default: {
            return state;
        }
    }
}
export const getSaveResult = (state: State) => state.saveResult;
export const getDelResult = (state: State) => state.delResult;

//export const getEntities = (state: State) => state.details;
//export const getIds = (state: State) => state.effDates;
//export const getDelEntities = (state: State) => state.deletedDetails;
//export const getDelIds = (state: State) => state.delEffDates;


//export const getSrSelectedDetail = (state: State) => state.selectedDetail;


//export const getSrDetails = createSelector(getEntities, getIds, (entities, ids) => {
//    return ids.map(id => {if (entities[id] !== null) return entities[id]});
//});

//export const getSrDeletedDetails = createSelector(getDelEntities, getDelIds, (entities, ids) => {
//    return ids.map(id => entities[id]);
//});
//export const getSelectedId = (state: State) => state.selectedDetail;

//export const getSrSelDetails = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
//  return entities[selectedId];
//});

