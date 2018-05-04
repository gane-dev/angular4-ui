import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as db from '../actions/db-actions';
import { DataBatch } from '../models/data-batch.model';
import { DataBatchSearch } from '../models/data-batch-search.model';
import { DataBatchDetails } from '../models/data-batch-details.model';
import { createSelector } from 'reselect';

export interface State {
    batchIds: string[];
    dbEntities: { [batchId: string]: DataBatchDetails };
    selectedDb:  DataBatchDetails;
    searchQuery: DataBatchSearch;
    saveResult: string;
}


const initialState: State = {
    batchIds: [],
    dbEntities: {},
    selectedDb: null,
    searchQuery: null,
    saveResult: '-1'

};
function getKeyFormat( sourceId: string, batchId: number)
{
    return  sourceId + '|' + batchId.toString();
}

export function reducer(state = initialState, action: db.Actions): State {
    switch (action.type) {
        case db.ActionTypes.SEARCH_DB:
            {
                const psrQuery: any = action.payload;
                return Object.assign({}, initialState, { searchQuery: psrQuery });
            }
        case db.ActionTypes.CLEAR_SEARCH:
            {

                return {
                    batchIds: [],
                    dbEntities: {},
                    selectedDb: null,
                    searchQuery: null,
                    saveResult: '-1'
                };
            }
        case db.ActionTypes.SEARCH_DB_COMPLETE:
            {
                const dbs: any = action.payload;
                const newDbs = dbs.filter(db => !state.batchIds[getKeyFormat(db.SOURCE_ID, db.BATCH_ID)]);

                const newDbIds = newDbs.map(db => getKeyFormat(db.SOURCE_ID, db.BATCH_ID));
                const newDbEntities = newDbs.reduce((entities: { [batchId: string]: DataBatchDetails }, db: DataBatchDetails) => {
                    return Object.assign(entities, {
                        [getKeyFormat(db.SOURCE_ID, db.BATCH_ID)]: db
                    });
                }, {});

                return Object.assign({}, state, {
                    batchIds: [...state.batchIds, ...newDbIds],
                    dbEntities: Object.assign({}, state.dbEntities, newDbEntities),
                });

            }
        case db.ActionTypes.SELECT_DB:
            {
                const idx: any = action.payload;
                if (idx != null) {
                    return Object.assign({}, state, {
                        selectedDb: Object.assign({}, state.dbEntities[idx]),
                    });
                }
                else {
                    return Object.assign({}, state, {
                        selectedDb: null
                    });
                }
            }
        case db.ActionTypes.SAVE_DB:
            {
                return Object.assign({}, state, {
                    saveResult: '-1'
                });
            }
        case db.ActionTypes.SAVE_DB_COMPLETE:
            {
                const saveResult: any = action.payload;
                return Object.assign({}, state, {
                    saveResult: saveResult
                });
            }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.dbEntities;
export const getSelectedDb = (state: State) => state.selectedDb;
export const getDbQuery = (state: State) => state.searchQuery;
export const getDbSaveResult = (state: State) => state.saveResult;
export const getIds = (state: State) => state.batchIds;
export const getSelectedSourceIds = (state: State) => state.selectedDb.SOURCE_ID;
export const getDbEntities = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getDbForSource = createSelector(getEntities, getSelectedSourceIds, getIds, (entities, source, ids) => {
    return ids.map(id => { 
            if (id.startsWith(source + '|')) return entities[id];
    });
});

