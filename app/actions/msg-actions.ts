import { Action } from '@ngrx/store';
import { type } from '../util';
import { MsgModel,ConfirmMsgModel } from '../models/msg.model';

export const ActionTypes = {
    SAVE_CONFIRM: type('[Msg] Open Save Confirm'),
    SAVE_CONFIRM_MSG: type('[Msg] Open Save Confirm msg'),
    DELETE_CONFIRM: type('[Msg] Open Delete Confirm'),

    DELETE_CONFIRM_MSG: type('[Msg] Open Delete Confirm msg'),
    EXCLUDE_CONFIRM: type('[Msg] Open Exclude Confirm'),
    EXCLUDE_CONFIRM_MSG: type('[Msg] Open Exclude Confirm msg'),
    SHOW_INFO: type('[Msg] Show Information'),
    SHOW_INFO_MSG: type('[Msg] Show Information msg'),
    CLOSE_INFO: type('[Msg] Close Information'),
    CLOSE_CONFIRM: type('[Msg] Close Confirmation'),
    
    CLEAR_DIALOG: type('[Layout] Clear Dialog')
};


export class SaveConfirmAction implements Action {
    type = ActionTypes.SAVE_CONFIRM;
    constructor(public payload: null) { }
}
export class SaveConfirmMsgAction implements Action {
    type = ActionTypes.SAVE_CONFIRM_MSG;
    constructor(public payload: ConfirmMsgModel) { }
}
export class DeleteConfirmAction implements Action {
    type = ActionTypes.DELETE_CONFIRM;
    constructor(public payload: null) { }
}
export class DeleteConfirmMsgAction implements Action {
    type = ActionTypes.DELETE_CONFIRM_MSG;
    constructor(public payload: ConfirmMsgModel) { }
}
export class ExcludeConfirmAction implements Action {
    type = ActionTypes.EXCLUDE_CONFIRM;
    constructor(public payload: null) {
        console.log('inside');}
}
export class ExcludeConfirmMsgAction implements Action {
    type = ActionTypes.EXCLUDE_CONFIRM_MSG;
    constructor(public payload: ConfirmMsgModel) {
        console.log('inside confirm msg');
    }
}
export class ShowInfoAction implements Action {
    type = ActionTypes.SHOW_INFO;
    constructor(public payload: MsgModel) { }
}
export class ShowInfoMsgAction implements Action {
    type = ActionTypes.SHOW_INFO_MSG;
    constructor(public payload: ConfirmMsgModel) { }
}
export class CloseConfirmAction implements Action {
    type = ActionTypes.CLOSE_CONFIRM;
    constructor(public payload: string) { }
}
export class CloseInfoAction implements Action {
    type = ActionTypes.CLOSE_INFO;
    constructor(public payload: null) { }
   
}
export class ClearDialogAction implements Action {
    type = ActionTypes.CLEAR_DIALOG;
    constructor(public payload: null) { }
}
export type Actions
    = SaveConfirmAction
    | DeleteConfirmAction
    | ExcludeConfirmAction
    | ShowInfoAction
    | CloseConfirmAction
    | CloseInfoAction
    | SaveConfirmMsgAction
    | DeleteConfirmMsgAction
    | ExcludeConfirmMsgAction
    | ShowInfoMsgAction
    | ClearDialogAction;

