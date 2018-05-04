import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { SpendRule } from '../models/spend-rule.model';
import { SpendRuleSearch } from '../models/spend-rule-search.model';
import * as sr from '../actions/spend-rule-actions'
import { SpendRuleDetails } from '../models/spend-rule-details.model';
import { SpendRuleFields } from '../models/spend-rule-fields.model';
import { SpendRuleDtl } from '../models/spend-rule-dtl.model';
import { createSelector } from 'reselect';
export interface State {
    ruleIds: string[];
    //srEntities: SpendRuleDtl[];
    srEntities: { [ruleId: string]: SpendRuleDtl };
    selectedRule: SpendRuleFields;
    selectedDetail: SpendRuleDtl;
    newRuleId:string;
    delResult: string;
    saveResult: string;
    searchQuery: SpendRuleSearch;
    srLoadComplete: boolean;
}
const initialState: State = {
    ruleIds :[],
    srEntities: {},
    selectedRule: <SpendRuleFields>{},
    selectedDetail: <SpendRuleDtl>{},
    newRuleId:"",
    delResult: '-1',
    saveResult: '-1',
    searchQuery: null,
    srLoadComplete: false
};

export function reducer(state = initialState, action: sr.Actions): State {
    switch (action.type) {
         case sr.ActionTypes.SEARCH_SR:
            {
                const psrQuery = action.payload;
                return Object.assign({}, initialState, { searchQuery: psrQuery });
            }
        case sr.ActionTypes.CLEAR_SEARCH:
        case sr.ActionTypes.INITIAL_ADD_SR_ACTION:
            {
                return initialState;
            }
        case sr.ActionTypes.SEARCH_SR_COMPLETE:
            {
                const dtl: any = action.payload;
                if (dtl != undefined) {
                    const ids = dtl.map(rule => {
                        return rule.RULE_ID;
                    });
                    const newRuleEntities = dtl.reduce((details: { [ruleId: string]: SpendRuleDtl }, rule: SpendRuleDtl) => {
                        return Object.assign(details, { [rule.RULE_ID]: rule });
                    }, {});
                    return Object.assign({},state, { ruleIds:ids, srEntities: newRuleEntities});
                }
                else {
                    return state;
                }
            }
        case sr.ActionTypes.SELECT_SR:
            {
                const ruleId: any = action.payload;
                return Object.assign({}, state, {
                    selectedDetail: Object.assign({}, state.srEntities[ruleId] )
                
                });
                
            }
        case sr.ActionTypes.SELECT_SR_DETAIL:
            {
              
                    return Object.assign({}, state, {
                                      srLoadComplete: false
                    });
              
            }
        case sr.ActionTypes.SELECT_SR_DETAIL_COMPLETE:
            {
                const spendRule: any = action.payload;
                if (spendRule != undefined)
                    return Object.assign({}, state, {
                        selectedRule: Object.assign({}, spendRule.rule),
                        srLoadComplete: true
                    });
                else
                    return state;
            }
   
        case sr.ActionTypes.ADD_SR_RULE_COMPLETE:
            {
                const newRuleId: any = action.payload;

                return Object.assign({},state,{
                newRuleId: newRuleId
                    
              });

            }
        case sr.ActionTypes.SAVE_SR_RULE:
            {
                return Object.assign({}, state, { saveResult: '-1' });

            }
         case sr.ActionTypes.SAVE_SR_RULE_COMPLETE:
            {
                const saveResult: any = action.payload;
                return Object.assign({}, state, { saveResult:saveResult});

            }
        case sr.ActionTypes.DELETE_SR_RULE:
            {
                const srDRule: any = action.payload;
                return Object.assign({}, state, { 
                    selectedRule: null,
                    delResult: '-1'
                });
            }

        case sr.ActionTypes.DELETE_SR_RULE_COMPLETE:
            {
                const deleteSrResult: any = action.payload;
               return Object.assign({},state,
                   { selectedRule: null,
                  newRuleId:"",
                  delResult: deleteSrResult
               });
            }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.srEntities;
export const getSrSelectedRule = (state: State) => state.selectedRule;
export const getSaveResult = (state: State) => state.saveResult;
export const getDelResult = (state: State) => state.delResult;
export const getSrLoaded = (state: State) => state.srLoadComplete;
export const getSrNewId = (state: State) => state.newRuleId;
export const getSrQuery = (state: State) => state.searchQuery;
export const getIds = (state: State) => state.ruleIds;
export const getDeletedRules = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getSrEntities = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getSrSelectedDetail = (state: State) => state.selectedDetail;


