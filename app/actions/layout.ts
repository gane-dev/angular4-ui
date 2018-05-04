import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  OPEN_SIDENAV:   type('[Layout] Open Sidenav'),
  CLOSE_SIDENAV: type('[Layout] Close Sidenav'),
  SHOW_PROGRESS: type('[Layout] Show Progress'),
  CLOSE_PROGRESS: type('[Layout] Close Progress')
};


export class OpenSidenavAction implements Action {
  type = ActionTypes.OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  type = ActionTypes.CLOSE_SIDENAV;
}
export class ShowProgressnavAction implements Action {
    type = ActionTypes.SHOW_PROGRESS;
}
export class CloseProgressnavAction implements Action {
    type = ActionTypes.CLOSE_PROGRESS;
}

export type Actions
  = OpenSidenavAction
    | CloseSidenavAction
    | CloseProgressnavAction
    | ShowProgressnavAction;