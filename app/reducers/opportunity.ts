import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Opportunity } from '../models/opportunity.model';
import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunityDetail } from '../models/opportunity-detail.model';
import { OpportunitySearch } from '../models/opportunity-search.model';
import { CommonFunctionService } from '../services/common-functions';
import * as opp from '../actions/opportunity-actions'
import { createSelector } from 'reselect';
//import * as _   from 'lodash';

export interface State {
    oppIds: string[];
    oppEntities: { [ruleId: string]: OpportunityHeader }; 
    header: OpportunityHeader,
    details: OpportunityDetail[],
    saveResult: string,
    searchQuery: OpportunitySearch;
}


const initialState: State = {
    oppIds:[],
    oppEntities: {},
    header: null,
    details: [],
    saveResult: '-1',
    searchQuery: <OpportunitySearch>{},

};
function getOppKey(custId: string, suppId: string) {
    return custId + '-' + suppId;
}
export function reducer(state = initialState, action: opp.Actions, commonFunctionService: CommonFunctionService): State {
    switch (action.type) {
        case opp.ActionTypes.SEARCH_OPP:
            {
                const psrQuery: any = action.payload;
                return Object.assign({}, initialState, { searchQuery: psrQuery });
            }
        case opp.ActionTypes.CLEAR_SEARCH:
            {

                return initialState;
            }

        case opp.ActionTypes.SEARCH_OPP_COMPLETE:
            {
                const opps: any = action.payload;

                

                if (opps != undefined) {
                    const ids = opps.map((rule: OpportunityHeader) => {
                        return getOppKey(rule.CUST_ID,rule.SUPPLIER_ID);
                    });
                    const newRuleEntities = opps.reduce((details: { [ruleId: string]: OpportunityHeader }, rule: OpportunityHeader) => {
                        return Object.assign(details, { [getOppKey(rule.CUST_ID, rule.SUPPLIER_ID)]: rule });
                    }, {});
                    return Object.assign({}, state, { oppIds: ids, oppEntities: newRuleEntities });
                }
                else {
                    return state;
                }
            }
        case opp.ActionTypes.SELECT_OPP:
            {
                const idx: any = action.payload;
                if (idx != null) {
                    return Object.assign({}, state, {
                        header: Object.assign({}, state.oppEntities[getOppKey(idx.CUST_ID, idx.SUPPLIER_ID)])
                    });
                }
                else {
                    return state;
                }
            }
        case opp.ActionTypes.SELECT_OPP_COMPLETE:
            {
                const idx: any = action.payload;
                if (idx != null) {
                    return Object.assign({}, state, {
                           details: Object.assign([], idx)
                    });
                }
                else {
                    return state;
                }
            }
        case opp.ActionTypes.SAVE_OPP_HEADER:
            {

                const hd: any = action.payload;
                return Object.assign({}, state, {
                    header: Object.assign({}, hd),
                    saveResult: '-1'
                });

            }
        case opp.ActionTypes.SAVE_OPP_HEADER_COMPLETE:
            {
                const addResult: any = action.payload;

                return Object.assign({}, state, {
                    saveResult: addResult
                });
            }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.oppEntities;
export const getSelectedOppHeader = (state: State) => state.header;
export const getSelectedOppDetails = (state: State) => state.details;
export const getOppResult = (state: State) => state.saveResult;
  export const getOppQuery = (state: State) => state.searchQuery;
  export const getIds = (state: State) => state.oppIds;
  export const getOppEntities = createSelector(getEntities, getIds, (entities, ids) => {
      return ids.map(id => entities[id]);
  });
