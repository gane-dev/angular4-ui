import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as sr from '../actions/spend-rule-actions'

import { SpendRuleSupp } from '../models/spend-rule-supp.model';
import { SpendRuleDtlSelect } from '../models/sr-details-select.model';
import { SpendRuleDetails } from '../models/spend-rule-details.model';


export interface State {


    suppIds: string[],
    delSuppIds: string[],
    editSuppliers: { [suppId: string]: SpendRuleSupp },
    deleteSuppliers: { [suppId: string]: SpendRuleSupp },
    delResult: string,
    saveResult: string,
    selectedId: string | null
}


const initialState: State = {
  
    suppIds: [],
    delSuppIds: [],
    editSuppliers: {},
    deleteSuppliers:{},
    delResult: '-1',
    saveResult: '-1',
    selectedId: null

};
function getKeyFormat( dt:Object,supp: string)
{
    return  dt.toString() + supp;
}
export function reducer(state = initialState, action: sr.Actions): State {
    switch (action.type) {
    //      case sr.ActionTypes.INITIAL_ADD_SR_ACTION:
    //    {
         
    //     return {
    //       effDates: [],
    //delEffDates: [],
    //editSuppliers: {},
    //deleteSuppliers:{},
    //delResult: '-1',
    //saveResult: '-1',
    //selectedId: null
    //    };
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
                if (details != undefined)
                { 
                //effective dates
                const newSupps = details.suppliers.map(rule => {
                    return rule.SUPPLIER_ID;
                });
                const newRuleEntities = details.suppliers.reduce((details: { [suppIds: string]: SpendRuleSupp }, rule: SpendRuleSupp) => {
                    return Object.assign(details, {
                        [ rule.SUPPLIER_ID]: rule
                    });
                }, {});
                return Object.assign({}, state, {
                    suppIds: newSupps,
                    editSuppliers: Object.assign({}, newRuleEntities),
                   
                });
            }
            else
                return state;
            }
      
        case sr.ActionTypes.ADD_SR_SUPP:
            {

                const srDetail: any =  action.payload;
                console.log(srDetail);
                const newSuppId: string = srDetail.SUPPLIER_ID;
                if (state.suppIds.indexOf(newSuppId) < 0) {
                    console.log(state.suppIds.concat(newSuppId));
                    console.log(Object.assign({}, state.editSuppliers, { [newSuppId]: srDetail }));
                    return Object.assign({}, state, {
                        suppIds: state.suppIds.concat(newSuppId),
                        editSuppliers: Object.assign({}, state.editSuppliers, { [newSuppId]: srDetail })
                    });
                }
                else {
                    const remEffDates = state.suppIds.filter(effDate => effDate !== newSuppId);
                    const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleSupp },id: string) => {
                            return Object.assign(details, {
                            [id]: state.editSuppliers[id]
                    });
                }, {});
                    return Object.assign({}, state, {
                        suppIds: [...remEffDates, newSuppId ],
                        editSuppliers: Object.assign({}, remDetails, { [newSuppId]:srDetail}),
                    });
                }
                
            }
        

        case sr.ActionTypes.DELETE_SR_SUPP:
            {
                return Object.assign({}, state, { delResult: '-1' });

            }
        case sr.ActionTypes.DELETE_SR_SUPP_COMPLETE:
            {
                const deleteCustResult: any = action.payload;
                
                if (deleteCustResult === '1')
                    return Object.assign({}, state, { deleteSuppliers: {}, delResult: '1'});
                else
                    return Object.assign({},state,{result:deleteCustResult});


            }
        case sr.ActionTypes.TEMP_DELETE_SR_SUPP:
            {

                 const deleteDetail: any = action.payload;
                const delId: any = deleteDetail.SUPPLIER_ID;

                if (state.suppIds.indexOf(delId) > -1 && state.delSuppIds.indexOf(delId) < 0) {
                    const deletedItem = state.editSuppliers[delId];
                    const remSuppIds = state.suppIds.filter(id => id !== delId);
                    const remDetails = remSuppIds.reduce((details: { [id: string]: SpendRuleSupp },id: string) => {
                    return Object.assign(details, {[id]: state.editSuppliers[id]
                    });
                    }, {});
                    console.log(state.delSuppIds.concat(delId));
                    console.log(Object.assign({}, state.deleteSuppliers, deletedItem));
                    

                    
                    return Object.assign({}, state, {
                        suppIds: remSuppIds,
                        delSuppIds: state.delSuppIds.concat(delId),
                        editSuppliers: remDetails,
                        deleteSuppliers: Object.assign({}, state.deleteSuppliers, { [delId]: deletedItem }),
                    })
                }
                else {
                    return state;
                }

              

            }
        case sr.ActionTypes.SAVE_SR_SUPP:
            {
                return Object.assign({}, state, { saveResult: '-1' });

            }
        case sr.ActionTypes.SAVE_SR_SUPP_COMPLETE:
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

export const getEntities = (state: State) => state.editSuppliers;
export const getIds = (state: State) => state.suppIds;
export const getDelEntities = (state: State) => state.deleteSuppliers;
export const getDelIds = (state: State) => state.delSuppIds;



export const getSrDeletedSuppliers = createSelector(getDelEntities, getDelIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

//export const getSelectedId = (state: State) => state.selectedId;

export const getSrSuppliers = createSelector(getEntities, getIds, (entities, ids) => {

    return ids.map(id => entities[id]);
});

