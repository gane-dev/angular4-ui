import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as sr from '../actions/spend-rule-actions'

import { SpendRuleCust } from '../models/spend-rule-cust.model';
import { SpendRuleDtlSelect } from '../models/sr-details-select.model';
import { SpendRuleDetails } from '../models/spend-rule-details.model';


export interface State {


    custIds: string[],
    delCustIds: string[],
    editCustomers: { [custId: string]: SpendRuleCust },
    deleteCustomers: { [custId: string]: SpendRuleCust },
    delResult: string,
    saveResult: string,
    selectedId: string | null
}


const initialState: State = {
  
    custIds: [],
    delCustIds: [],
    editCustomers: {},
    deleteCustomers:{},
    delResult: '-1',
    saveResult: '-1',
    selectedId:null

};
function getKeyFormat( dt:Object,cust: string)
{
    return  dt.toString() + cust;
}
export function reducer(state = initialState, action: sr.Actions): State {
    switch (action.type) {
    //      case sr.ActionTypes.INITIAL_ADD_SR_ACTION:
    //    {
         
    //     return {
    //          effDates: [],
    //delEffDates: [],
    //editCustomers: {},
    //deleteCustomers:{},
    //delResult: '-1',
    //saveResult: '-1',
    //selectedId:null};
    //    }
     //case sr.ActionTypes.SELECT_EFF_DATE:
     //   {
     //       const selectEffDate : any = action.payload;
     //       return Object.assign({},state,{selectedId:selectEffDate});
     //   }
        case sr.ActionTypes.SELECT_SR:
            {
                const ruleId: any = action.payload;
                return Object.assign({}, state, { selectedId: ruleId });
            }

        case sr.ActionTypes.SELECT_SR_DETAIL_COMPLETE:
      
            {
                const details: any = action.payload;
                if (details != null) {
                    //effective dates
                    const newIds = details.customers.map(rule => rule.CUST_ID);

                    const newRuleEntities = details.customers.reduce((details: { [custId: string]: SpendRuleCust }, rule: SpendRuleCust) => {
                        return Object.assign(details, {
                            [rule.CUST_ID]: rule
                        });
                    }, {});
                    return Object.assign({}, state, {
                        custIds: newIds,
                       editCustomers: Object.assign({}, newRuleEntities),
                                          });
                }
                return state;
            }
      
        case sr.ActionTypes.ADD_SR_CUST:
            {

                 const srDetail: any = action.payload;
                const newEffId: string = srDetail.CUST_ID;
                if (state.custIds.indexOf(newEffId) < 0) {
                    return Object.assign({}, state, {
                        custIds: state.custIds.concat(newEffId),
                        editCustomers: Object.assign({}, state.editCustomers, { [newEffId]: srDetail }),
                    });
                }
                else {
                    const remEffDates = state.custIds.filter(effDate => effDate !== newEffId);
                    const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleCust },id: string) => {
                    return Object.assign(details, {
                         [id]: state.editCustomers[id]
                    });
                }, {});
                    return Object.assign({}, state, {
                        custIds: [...remEffDates, newEffId ],
                        editCustomers: Object.assign({}, remDetails, { [newEffId]:srDetail}),
                    });
                }
              
                
            }
        

        case sr.ActionTypes.DELETE_SR_CUST:
            {
                return Object.assign({}, state, { delResult: '-1' });

            }
        case sr.ActionTypes.DELETE_SR_CUST_COMPLETE:
            {
                const deleteCustResult: any = action.payload;
                if (deleteCustResult === '1')
                    return Object.assign({}, state, { deleteCustomers: {}, delResult: '1' });
                else
                    return Object.assign({},state,{delResult:deleteCustResult});


            }
        case sr.ActionTypes.TEMP_DELETE_SR_CUST:
            {

                 const deleteDetail: any = action.payload;
                const delId: string = deleteDetail.CUST_ID;

                if (state.custIds.indexOf(delId) > -1 && state.delCustIds.indexOf(delId) < 0) {
                    const deletedItem = state.editCustomers[delId];
                    const remEffDates = state.custIds.filter(effDate => effDate !== delId);
                
                const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleCust },id: string) => {
                    return Object.assign(details, {
                         [id]: state.editCustomers[id]
                    });
                }, {});
                return Object.assign({}, state, {
                    custIds: remEffDates,
                    delCustIds: state.delCustIds.concat(delId),
                    editCustomers: remDetails,
                    deleteCustomers: Object.assign({}, state.deleteCustomers, { [delId]: deletedItem }),
                });
                }
                else {
                    return state;
                }
            }
        case sr.ActionTypes.SAVE_SR_CUST:
            {
                return Object.assign({}, state, { saveResult: '-1' });

            }
        case sr.ActionTypes.SAVE_SR_CUST_COMPLETE:
            {
                const saveResult: any = action.payload;
                return Object.assign({}, state, { saveResult: saveResult });

            }
        default: {
            return state;
        }
    }
}


export const getSaveResult = (state: State) => state.saveResult;
export const getDelResult = (state: State) => state.delResult;

export const getEntities = (state: State) => state.editCustomers;
export const getIds = (state: State) => state.custIds;
export const getDelEntities = (state: State) => state.deleteCustomers;
export const getDelIds = (state: State) => state.delCustIds;
/*
export const getSrCustomers = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});*/

export const getSrDeletedCustomers = createSelector(getDelEntities, getDelIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

//export const getSelectedId = (state: State) => state.selectedId;

export const getSrCustomers = createSelector(getEntities,getIds, (entities,ids) => {
   // const selIds = ids.filter(id => id.startsWith(selectedId));
    return ids.map(id => {
        return entities[id];
    });;
});

