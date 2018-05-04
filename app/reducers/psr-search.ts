import { createSelector } from 'reselect';
import * as psrActions from '../actions/psr-rule-actions';
import { PsrTable } from '../models/psr-table.model';
export interface State {
 // ids: string[];
  loading: boolean;
  query: PsrTable;
};

const initialState: State = {
   // ids: [],
    loading: false,
    query: <PsrTable>{}
};

export function reducer(state = initialState, action: psrActions.Actions): State {
  switch (action.type) {
    case psrActions.ActionTypes.SEARCH: {
      const query = action.payload;

      if (query == null) {
        return {
     //     ids: [],
          loading: false,
          query:state.query
        };
      }

      return Object.assign({}, state, {
          query,
        loading: true
      });
    }

    case psrActions.ActionTypes.SEARCH_COMPLETE: {
      const  psrs= action.payload;

      return {
       //   ids: psrs.map(book => book.id),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}




export const getPsrQuery = (state: State) => state.query;

export const getPsrLoading = (state: State) => state.loading;