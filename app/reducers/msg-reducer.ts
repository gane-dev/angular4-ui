import { createSelector } from 'reselect';
import * as msgActions from '../actions/msg-actions';
import { MsgModel, ConfirmMsgModel } from '../models/msg.model';

export interface State {
    openConfirm: boolean;
    openInfo: boolean;
    infoMessage: string;
    dialogTitle: string;
    dialogColor: string;
    confirmSelection: string;
    confirmMessage: string;
    titleMessage: string;
}

const initialState: State = {
    openConfirm: false,
    openInfo: false,
    infoMessage: '',
    dialogTitle: '',
    dialogColor:'',
    confirmSelection: '-1',
    confirmMessage: '',
    titleMessage: ''
};

export function reducer(state = initialState, action: msgActions.Actions): State {
    switch (action.type) {
        case msgActions.ActionTypes.CLEAR_DIALOG:
            {
                return Object.assign({}, state, {
                    confirmSelection: '-1',
                    openConfirm:false,
                    openInfo:false
                });
            }
        case msgActions.ActionTypes.SAVE_CONFIRM_MSG:
            {
                const msg: any = action.payload;
                return Object.assign({}, state, {
                    confirmSelection: '-1',
                    openConfirm: true,
                    confirmMessage: msg.confirmMessage,
                    titleMessage: msg.titleMessage
                });
            }
        case msgActions.ActionTypes.CLOSE_CONFIRM:
            {
              //  const sel: any = action.payload;
//                console.log(sel);
                return Object.assign({}, state, {
                    openConfirm: false,
                  //  confirmSelection: sel
                });
            }
        case msgActions.ActionTypes.CLOSE_INFO:
            {
                return Object.assign({}, state, {
                    confirmSelection: '-1',
                    openInfo: false
                  
                });
            }
        case msgActions.ActionTypes.DELETE_CONFIRM_MSG:
            {
                const msg: any = action.payload;
                return Object.assign({}, state, {
                    confirmSelection: '-1',
                    openConfirm: true,
                    confirmMessage: msg.confirmMessage,
                    titleMessage: msg.titleMessage
                   
                });
            }
        case msgActions.ActionTypes.EXCLUDE_CONFIRM_MSG:
            {
                const msg: any = action.payload;
                console.log(msg.confirmMessage);
                return Object.assign({}, state, {
                    confirmSelection: '-1',
                    openConfirm: true,
                    confirmMessage: msg.confirmMessage,
                    titleMessage: msg.titleMessage
                    
                });
            }
        case msgActions.ActionTypes.SHOW_INFO_MSG:
            {
                console.log('show info');
                const msg: any = action.payload;
                return Object.assign({}, state, {
                    confirmSelection: '-1',
                    openInfo: true,
                    infoMessage: msg.infoMessage,
                    dialogTitle: msg.dialogTitle,
                    dialogColor: msg.dialogColor
                });
            }
        default:
            return state;
    }
}

export const getOpenConfirm = (state: State) => state.openConfirm;
export const getOpenInfo = (state: State) => state.openInfo;
export const getConfirmSelection = (state: State) => state.confirmSelection;
export const getDialogColor = (state: State) => state.dialogColor;
export const getDialogTitle = (state: State) => state.dialogTitle;
export const getInfoMessage = (state: State) => state.infoMessage;
export const getConfirmMessage = (state: State) => state.confirmMessage;
export const getTitleMessage = (state: State) => state.titleMessage;


