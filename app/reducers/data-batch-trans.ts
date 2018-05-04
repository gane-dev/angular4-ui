import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as dbt from '../actions/dbt-actions';
import * as db from '../actions/db-actions';
import { DataBatchTrans } from '../models/data-batch-trans.model';
import { DataBatchTransDetails } from '../models/dbt-details.model';
import { DataBatchSearch } from '../models/data-batch-search.model';
import { DBTApplyFlag } from '../models/dbt-apply-flag.model';

export interface State {
    flagKeys: string[];
    entitiesToflag: { [key: string]: DBTApplyFlag };
    flagIds: number[];
    currentSet: number;
 //    batchIds: string[];
 //   dbtEntities: { [batchId: string]: DataBatchTrans };
    selectedDbt: { [batch: number]: DataBatchTransDetails[] };
  //  selectedDbtHeader: DataBatchSearch;
    saveResult: string;
    applyResult: string;
  //  searchQuery: DataBatchSearch;
    dbtLoadComplete: boolean;
    dbtCount: number;
}


const initialState: State = {
    flagKeys: [],
    flagIds:[],
    entitiesToflag: {},
    currentSet:-1,
    selectedDbt: {},
    saveResult: '-1',
    applyResult: '-1',
    dbtLoadComplete: false,
    dbtCount : -1
};

function getKey(SOURCE_ID: string,
   
    AV_TRANSACTION_ID: number) {
    return SOURCE_ID + AV_TRANSACTION_ID.toString();
}
function getSelectionKey( sourceId: string, batchId: number)
{
    return  sourceId + '|' + batchId.toString();
}
function sortTransactions(rule1: DataBatchTransDetails, rule2: DataBatchTransDetails): number {
    if (rule1.BATCH_ID > rule2.BATCH_ID)
        return 1;
    else if (rule1.BATCH_ID === rule2.BATCH_ID) {
        if (rule1.CP_TRANS_ID_XREF < rule2.CP_TRANS_ID_XREF)
            return 1;
        else
            return -1;
    }
    else
        return -1;
}
export function reducer(state = initialState, action: dbt.Actions | db.Actions): State {
    switch (action.type) {
       case dbt.ActionTypes.SEARCH_DBT:
            {
                const psrQuery: any = action.payload;
                return Object.assign({}, initialState, { searchQuery: psrQuery });
            }
        case dbt.ActionTypes.CLEAR_SEARCH:
            {

                return {
                    flagIds: [],
                    flagKeys: [],
                    entitiesToflag: {},
                    currentSet:-1,
                    selectedDbt: {},
                    saveResult: '-1',
                    applyResult: '-1',
                    dbtLoadComplete: false, dbtCount:-1
                };
            }

        case dbt.ActionTypes.SELECT_IE_FLAG:
            {
                const singleflag: any = action.payload;
                const newKey: string = getKey(singleflag.SOURCE_ID,
                   
                    singleflag.AV_TRANSACTION_ID);
                if (state.flagKeys.indexOf(newKey) < 0) {
                    const newFlagEntity: any = Object.assign({}, action.payload, { [newKey]: singleflag });
                    return Object.assign({}, state, {
                        flagKeys: [...state.flagKeys, newKey],
                        entitiesToflag: Object.assign({}, state.entitiesToflag, newFlagEntity)
                    });
                }
                else {
                    const remKeys = state.flagKeys.filter(key => key !== newKey);
                    const remFlags = remKeys.reduce((details: { [key: string]: DBTApplyFlag }, id: string) => {
                        return Object.assign(details, {
                            [id]: state.entitiesToflag[id]
                        });
                    }, {});
                    return Object.assign({}, state, {
                        flagKeys: [...remKeys, newKey],
                        entitiesToflag: Object.assign({}, remFlags, { [newKey]: singleflag })
                    });
                }
            }
        case dbt.ActionTypes.SELECT_IE_FLAGS:
            {
                const details: any = action.payload;
                const newKeys = details.map(rule => {
                    return getKey(rule.SOURCE_ID,
                        rule.AV_TRANSACTION_ID)
                });
                const newRuleEntities = details.reduce((details: { [key: string]: DBTApplyFlag }, rule: DBTApplyFlag) => {
                    return Object.assign(details, {
                        [getKey(rule.SOURCE_ID,
                           
                            rule.AV_TRANSACTION_ID)]: rule
                    });
                }, {});
                return Object.assign({}, state, { flagKeys: newKeys, entitiesToflag: newRuleEntities });
            }
     
        case dbt.ActionTypes.APPLY_IE_FLAGS:
            {
                const flags: any = action.payload;
                const newKeys = flags.map(rule => rule.AV_TRANSACTION_ID);
                             
                return Object.assign({}, state, { flagIds: newKeys ,applyResult: '-1'});
            }
        case dbt.ActionTypes.APPLY_IE_FLAGS_COMPLETE:
            {
                const applyResult: any = action.payload;
                return Object.assign({}, state, {
                    applyResult: applyResult, flagIds: [],
                    selectedDbt: Object.assign({},
                        state.selectedDbt, {
                            [state.currentSet]:
                            state.selectedDbt[state.currentSet].map((rec: DataBatchTransDetails) => {
                                if (state.flagIds.indexOf(rec.AV_TRANSACTION_ID) > -1)
                                    return Object.assign({}, rec, { PUBLISH_INC_EXC_IND: rec.PUBLISH_INC_EXC_IND === "E" ? "I" : "E" });
                            })})
                                  
                });
            }
       
        case db.ActionTypes.GET_TRANSACTIONS:
            {
                const idx: any = action.payload;
                if (idx.move == 1) {
                    const tmp = state.currentSet + 1;
                    return Object.assign({}, state, {
                        currentSet: tmp,
                        dbtLoadComplete: false
                    });
                }
            
                else if (idx.move == -1)
                {
                    const tmp1 = state.currentSet - 1;
                    return Object.assign({}, state, {
                        currentSet: tmp1,
                        dbtLoadComplete: true,
                       
                    });
                }
                else {
                    return Object.assign({}, state, {
                        currentSet: idx.move,
                        dbtLoadComplete: false
                    });
                }

            }
        case db.ActionTypes.GET_TRANSACTIONS_COMPLETE:
            {
                const recs: any = action.payload;

                console.log('inside complete');
                if (recs != null) {
                    return Object.assign({}, state, {
                        selectedDbt: Object.assign({}, state.selectedDbt, { [state.currentSet]: recs }),
                        //dbtCount: recs.length,
                        dbtLoadComplete: true
                    });
                }
                else
                {
                    return Object.assign({}, state, {
                        
                        dbtLoadComplete: true
                    });
                }

            }
      
        case db.ActionTypes.GET_TRANSACTIONS_COUNT_COMPLETE:
            {
                const recCount: any = action.payload;
                if (recCount == null)
                    return Object.assign({}, state, {

                        dbtCount: -1
                    });
                else
                    return Object.assign({}, state, {

                        dbtCount: recCount
                    });
            }

        default: {
            return state;
        }
    }
}

//export const getEntities = (state: State) => state.dbtEntities;
export const getFlagEntities = (state: State) => state.entitiesToflag;
export const getSelectedDbt = (state: State) => (state.currentSet in state.selectedDbt) ? state.selectedDbt[state.currentSet]:null;
//export const getSelectedDbtHeader = (state: State) => state.selectedDbtHeader;
export const getDbtSaveResult = (state: State) => state.saveResult;
export const getDbtApplyResult = (state: State) => state.applyResult;
export const getKeys = (state: State) => state.flagKeys;

export const getFlags = createSelector(getFlagEntities, getKeys, (entities, ids) => {
    return ids.map(id => entities[id]);
});
//export const getDbtQuery = (state: State) => state.searchQuery;
export const getDbtLoaded = (state: State) => state.dbtLoadComplete;
export const getDbtCurrentSet = (state: State) => state.currentSet;
export const getDbtCount = (state: State) => state.dbtCount;

//export const getIds = (state: State) => state.batchIds;
//export const getDbtEntities = createSelector(getEntities, getIds, (entities, ids) => {
 //   return ids.map(id => entities[id]);
//});


