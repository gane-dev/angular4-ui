import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { SpendIncident } from '../models/spend-incident.model'
import { SpendIncidentHeader } from '../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../models/spend-incident-detail.model'
import * as si from '../actions/si-actions'
import { createSelector } from 'reselect';
export interface State {
    auditIds: string[];
    siEntities: { [ruleId: string]: SpendIncidentHeader };
    header: SpendIncidentHeader;
    details: SpendIncidentDetail[];
    saveResult: string;
    searchQuery: SpendIncidentHeader;
    ignoreResult: string;

}


const initialState: State = {
    auditIds:[],
    siEntities: {},
    header: null,
    details: [],
    saveResult: '-1',
    ignoreResult: '-1',
    searchQuery: null

};

export function reducer(state = initialState, action: si.Actions): State {
    switch (action.type) {
         case si.ActionTypes.SEARCH_SI:
            {
                const psrQuery: any = action.payload;
                return Object.assign({}, initialState, { searchQuery: psrQuery });
            }
        case si.ActionTypes.CLEAR_SEARCH:
            {

                return initialState;
            }
        case si.ActionTypes.SEARCH_SI_COMPLETE:
            {

                const siHeaderArry: any = action.payload;
                
                if (siHeaderArry != undefined) {
                    const ids = siHeaderArry.map((rule: SpendIncidentHeader) => {
                        return rule.SPEND_AUDIT_ID;
                    });
                    const newRuleEntities = siHeaderArry.reduce((details: { [ruleId: string]: SpendIncidentHeader }, rule: SpendIncidentHeader) => {
                        return Object.assign(details, { [rule.SPEND_AUDIT_ID]: rule });
                    }, {});
                    return Object.assign({}, state, { auditIds: ids, siEntities: newRuleEntities });
                }
                else {
                    return state;
                }
            }
        case si.ActionTypes.SELECT_SI:
            {
                const siHeader: any = action.payload;
                return Object.assign({}, state,
                           {
                           header: Object.assign({}, state.siEntities[siHeader.SPEND_AUDIT_ID])
                    });
            }
        case si.ActionTypes.SELECT_SI_COMPLETE:
            {
                const siDetails: any = action.payload;
                if (siDetails != null) {
                    return Object.assign({}, state,

                        {
                            details: Object.assign([], siDetails),
                           
                        });
                }
                else {
                    return state;
                }
            }
        case si.ActionTypes.SAVE_SI_HEADER:
            {

                const hd: any = action.payload;
                return Object.assign({}, state,

                    {
                        header: Object.assign({}, hd),
                        saveResult: '-1'
                    });

            }
       
        case si.ActionTypes.SAVE_SI_HEADER_COMPLETE:
            {
                const addResult: any = action.payload;

                return Object.assign({}, state,

                    {
                        saveResult:  addResult

                    });

            }
        case si.ActionTypes.IGNORE_SI_TRANSACTION:
            {

                const hd: any = action.payload;
                return Object.assign({}, state,

                    {
                        header: Object.assign({}, hd),
                        ignoreResult: '-1'
                    });

            }

        case si.ActionTypes.IGNORE_SI_TRANSACTION_COMPLETE:
            {
                const addResult: any = action.payload;

                return Object.assign({}, state,

                    {
                        ignoreResult: addResult

                    });

            }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.siEntities;
export const getSelectedSiHeader = (state: State) => state.header;
export const getSelectedSiDetails = (state: State) => state.details;
export const getSiResult = (state: State) => state.saveResult;
export const getSiIgnoreResult = (state: State) => state.ignoreResult;
export const getSiQuery = (state: State) => state.searchQuery;
export const getIds = (state: State) => state.auditIds;
export const getSiEntities = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});



