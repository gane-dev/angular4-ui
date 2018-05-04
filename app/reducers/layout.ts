import { createSelector } from 'reselect';
import * as layout from '../actions/layout';


export interface State {
 
    showProgress: boolean;
}

const initialState: State = {
 
    showProgress: false
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    
    case layout.ActionTypes.SHOW_PROGRESS:
      return {
          showProgress: true
      };
    case layout.ActionTypes.CLOSE_PROGRESS:
        return {
            showProgress: false
        };
    default:
      return state;
  }
}

export const getShowProgress = (state: State) => state.showProgress;