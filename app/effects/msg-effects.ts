import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as msgActions from '../actions/msg-actions';
import { ErrorLevel, MessageService } from '../services/message.service';
import { ConfirmMsgModel, MsgModel } from '../models/msg.model';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { LoginService } from '../services/login.service';
@Injectable()
export class MsgEffects {
    constructor(
        private actions$: Actions, private msgService: MessageService, private store: Store<fromRoot.State>,
        private loginService: LoginService
    ) { }
    @Effect()
    saveConfirm$: Observable<Action> = this.actions$
        .ofType(msgActions.ActionTypes.SAVE_CONFIRM)
        .map((action: msgActions.SaveConfirmAction) => new msgActions.SaveConfirmMsgAction(Object.assign(<ConfirmMsgModel>{}, { confirmMessage: this.msgService.getConfirmMessage(), titleMessage: this.msgService.getTitleMessage() })));
    @Effect()
    deleteConfirm$: Observable<Action> = this.actions$
        .ofType(msgActions.ActionTypes.DELETE_CONFIRM)
        .map((action: msgActions.DeleteConfirmAction) => 
        new msgActions.DeleteConfirmMsgAction(Object.assign(<ConfirmMsgModel>{}, { confirmMessage: this.msgService.getDeleteConfirmMessage(), titleMessage: this.msgService.getTitleMessage() })));  
    @Effect()
    excludeConfirm$ = this.actions$
        .ofType(msgActions.ActionTypes.EXCLUDE_CONFIRM)
        .map((action: msgActions.ExcludeConfirmAction) => new msgActions.ExcludeConfirmMsgAction(Object.assign(<ConfirmMsgModel>{}, { confirmMessage: this.msgService.getConfirmMessage(), titleMessage: this.msgService.getTitleMessage() })));
                
    @Effect()
    showInfo$: Observable<Action> = this.actions$
        .ofType(msgActions.ActionTypes.SHOW_INFO)
        .map((action: msgActions.ShowInfoAction) => new msgActions.ShowInfoMsgAction(Object.assign(<ConfirmMsgModel>{}, { infoMessage: action.payload.infoMessage, dialogTitle: this.getTitle(action.payload.infoLevel), dialogColor: this.getColor(action.payload.infoLevel) })));
    //@Effect()
    //closeConfirm$: Observable<void> = this.actions$
    //    .ofType(msgActions.ActionTypes.CLOSE_CONFIRM)
    //    .map((action: msgActions.CloseConfirmAction) => this.loginService.selectionConfirmed(action.payload));
    
    getTitle(infoLevel: ErrorLevel): string {
    switch (infoLevel) {
        case ErrorLevel.Information:
            return this.msgService.getInfoTitle();
        case ErrorLevel.Error:
            return this.msgService.getErrorTitle();
        case ErrorLevel.Success:
            return this.msgService.getSuccessTitle();
        default:
            return this.msgService.getInfoTitle();
    }

    }
   

   
 getColor(infoLevel: ErrorLevel): string {
    switch (infoLevel) {
        case ErrorLevel.Information:
            return 'dialog-bg-blue';
        case ErrorLevel.Error:
            return 'dialog-bg-red';
        case ErrorLevel.Success:
            return 'dialog-bg-green';
        default:
            return 'dialog-bg-blue';
    }

}
}
