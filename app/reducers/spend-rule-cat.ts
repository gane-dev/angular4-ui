import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as sr from '../actions/spend-rule-actions'

import { SpendRuleCat } from '../models/spend-rule-cat.model';
import { SpendRuleDtlSelect } from '../models/sr-details-select.model';
import { SpendRuleDetails } from '../models/spend-rule-details.model';


export interface State {


    cats: string[],
    delCats: string[],
    editCategories: { [effDate: string]: SpendRuleCat },
    deleteCategories: { [effDate: string]: SpendRuleCat },
    delResult: string,
    saveResult: string,
    selectedId: string | null 
}


const initialState: State = {
  
    cats: [],
    delCats: [],
    editCategories: {},
    deleteCategories:{},
    delResult: '-1',
    saveResult: '-1',
    selectedId:null

};
function getKeyFormat( dt:Object,cat: string)
{
    return  dt.toString() + cat;
}
export function reducer(state = initialState, action: sr.Actions): State {
    switch (action.type) {
    //    case sr.ActionTypes.INITIAL_ADD_SR_ACTION:
    //    {
         
    //     return {effDates: [],
    //delEffDates: [],
    //editCategories: {},
    //deleteCategories:{},
    //delResult: '-1',
    //saveResult: '-1',
    //     selectedId:null};
    //    }
     //case sr.ActionTypes.SELECT_EFF_DATE:
     //   {
     //           const selectEffDate: any = action.payload;
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
                if (details != undefined) {
                    //effective dates
                    const newDates = details.categories.map(rule => rule.CATEGORY);

                    const newRuleEntities = details.categories.reduce((details: { [cats: string]: SpendRuleCat }, rule: SpendRuleCat) => {
                        return Object.assign(details, {
                            [rule.CATEGORY]: rule
                        });
                    }, {});
                    return Object.assign({}, state,
                        {
                            cats: newDates,
                            editCategories: Object.assign({}, newRuleEntities)
                        }
                    );
                }
                else
                    return state;
            }
      
        case sr.ActionTypes.ADD_SR_CAT:
            {

                const srDetail: any = action.payload;
                const newId: string = srDetail.CATEGORY;

                if (state.cats.indexOf(newId) < 0) {
                    return Object.assign({}, state,
                        {
                            cats: state.cats.concat(newId),
                            editCategories: Object.assign({}, state.editCategories, { [newId]: srDetail }),
                    });
                }
                else {
                    const remEffDates = state.cats.filter(effDate => effDate !== newId);
                    const remDetails = remEffDates.reduce((details: { [effDate: string]: SpendRuleCat },id: string) => {
                    return Object.assign(details, {
                         [id]: state.editCategories[id]
                    });
                }, {});
                    return Object.assign({}, state,
                        {
                            cats: [...remEffDates, newId ],
                            editCategories: Object.assign({}, remDetails, { [newId]:srDetail}),
                    });
                }
                
            }
        

        case sr.ActionTypes.DELETE_SR_CAT:
            {
                return Object.assign({}, state, { delResult: '-1' });

            }
        case sr.ActionTypes.DELETE_SR_CAT_COMPLETE:
            {
                const deleteCustResult: any = action.payload;
                if (deleteCustResult === '1')
                    return Object.assign({}, state, { deleteCategories: {},delResult:'1'});
                else
                    return Object.assign({}, state, { delResult:deleteCustResult});


            }
        case sr.ActionTypes.TEMP_DELETE_SR_CAT:
            {

                const deleteDetail: any = action.payload;
                const delId: string = deleteDetail.CATEGORY;

                if (state.cats.indexOf(delId) > -1 && state.delCats.indexOf(delId) < 0) {
                    const deletedItem = state.editCategories[delId];
                    const remIds = state.cats.filter(effDate => effDate !== delId);
                 
                    const remDetails = remIds.reduce((details: { [effDate: string]: SpendRuleCat },id: string) => {
                    return Object.assign(details, {
                         [id]: state.editCategories[id]
                    });
                }, {});
                return Object.assign({}, state, {
                    cats: remIds,
                    delCats: state.delCats.concat(delId),
                    editCategories: remDetails,
                    deleteCategories: Object.assign({}, state.deleteCategories, { [delId]: deletedItem }),
                });
                }
                else {
                    return state;
                }

              

            }
        case sr.ActionTypes.SAVE_SR_CAT:
            {
                return Object.assign({}, state, { saveResult: '-1' });

            }
        case sr.ActionTypes.SAVE_SR_CAT_COMPLETE:
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

export const getEntities = (state: State) => state.editCategories;
export const getIds = (state: State) => state.cats;
export const getDelEntities = (state: State) => state.deleteCategories;
export const getDelIds = (state: State) => state.delCats;

/*export const getSrCategories = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});*/

export const getSrDeletedCategories = createSelector(getDelEntities, getDelIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

//export const getSelectedId = (state: State) => state.selectedId;

export const getSrCategories = createSelector(getEntities, getIds, (entities,ids) => {
    //const selIds = ids.filter(id => { return id.startsWith(selectedId) });
    return ids.map(id => {
        return entities[id];
    });;
});

