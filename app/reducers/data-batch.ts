import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as db from '../actions/db-actions';
import { DataBatch } from '../models/data-batch.model';
import { DataBatchSearch } from '../models/data-batch-search.model';
import { DataBatchDetails } from '../models/data-batch-details.model';
import { DataBatchTransDetails } from '../models/dbt-details.model';
import { createSelector } from 'reselect';

export interface State {
    batchIds: string[];
    dbEntities: { [batchId: string]: DataBatchDetails };
    selectedDb:  DataBatchDetails;
    searchQuery: DataBatchSearch;
    saveResult: string;
    publishResult: string;
    searchComplete: boolean;
}


const initialState: State = {
    batchIds: [],
    dbEntities: {},
    selectedDb: null,
    searchQuery: null,
    saveResult: '-1',
    publishResult: '-1',
    searchComplete:false

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
                return Object.assign({}, initialState, { searchQuery: psrQuery, searchComplete: false });
            }
        case db.ActionTypes.CLEAR_SEARCH:
            {

                return {
                    batchIds: [],
                    dbEntities: {},
                    selectedDb: null,
                    searchQuery: null,
                    saveResult: '-1',
                    publishResult: '-1',
                    searchComplete: false
                };
            }
        case db.ActionTypes.SEARCH_DB_COMPLETE:
            {
                const dbs: any = action.payload;
                if (dbs != null) {
                    const newDbs = dbs.filter(db => !state.batchIds[getKeyFormat(db.SOURCE_ID, db.BATCH_ID)]);

                    const newDbIds = newDbs.map(db => getKeyFormat(db.SOURCE_ID, db.BATCH_ID));
                    const newDbEntities = newDbs.reduce((entities: { [batchId: string]: DataBatchDetails }, db: DataBatchDetails) => {
                        return Object.assign(entities, {
                            [getKeyFormat(db.SOURCE_ID, db.BATCH_ID)]: db
                        });
                    }, {});

                    return Object.assign({}, state, {
                        searchComplete: true,
                        batchIds: [...state.batchIds, ...newDbIds],
                        dbEntities: Object.assign({}, state.dbEntities, newDbEntities),
                    });
                }
                else
                    return state;

            }
        case db.ActionTypes.SELECT_DB:
            {
                const idx: any = action.payload;
              //  console.log(idx);
             //   console.log(state.dbEntities);
                if (idx != null) {
                  //  console.log(state.dbEntities[idx]);
                    return Object.assign({}, state, {
                        selectedDb: Object.assign({}, state.dbEntities[getKeyFormat(idx.SOURCE_ID, idx.BATCH_ID)])
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
                const saveBatch: any = action.payload;
                const saveId: string = getKeyFormat(saveBatch.SOURCE_ID, saveBatch.BATCH_ID);
                if (state.batchIds.indexOf(saveId) > -1) {

                   
                    const remIds = state.batchIds.filter(id => id !== saveId);
                    const remDetails = remIds.reduce((details: { [effDate: string]: DataBatchDetails }, id: string) => {
                        return Object.assign(details, {
                            [id]: state.dbEntities[id]
                        });
                    }, {});

                    return Object.assign({}, state, {
                        saveResult: '-1',
                        dbEntities: Object.assign({}, remDetails, { [saveId]: saveBatch })
                    });
                }
                else
                    return state;
               
            }
        case db.ActionTypes.SAVE_DB_COMPLETE:
            {
                const saveResult: any = action.payload;
                return Object.assign({}, state, {
                    saveResult: saveResult
                });
            }
        case db.ActionTypes.PUBLISH_DB:
            {
                const editBatch: any = action.payload;
                const editId: string = getKeyFormat(editBatch.SOURCE_ID, editBatch.BATCH_ID);

                if (state.batchIds.indexOf(editId) > -1) {

                    const editItem: DataBatchDetails = Object.assign({}, state.dbEntities[editId], { PUBLISH_ACTION: 'P' });
                    const remIds = state.batchIds.filter(id => id !== editId);
                    const remDetails = remIds.reduce((details: { [effDate: string]: DataBatchDetails }, id: string) => {
                        return Object.assign(details, {
                            [id]: state.dbEntities[id]
                        });
                    }, {});

                    return Object.assign({}, state, {
                        publishResult: '-1',
                        dbEntities: Object.assign({}, remDetails, { [editId]: editItem })
                    });
                }
                else
                    return state;
                
            }
        case db.ActionTypes.PUBLISH_DB_COMPLETE:
            {
                const publishResult: any = action.payload;
                return Object.assign({}, state, {
                    publishResult: publishResult
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
export const getDbPublishResult = (state: State) => state.publishResult;
export const getSearchComplete = (state: State) => state.searchComplete;

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

