import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as msgActions from '../../actions/msg-actions';
@Component({
    selector: 'msg-box',
    templateUrl: '../html/common/msg-box.component.html'
    //,     changeDetection: ChangeDetectionStrategy.OnPush,


})
export class MsgBoxComponent{
 
    public infoMessage: Observable<string>;
    public infoOpened: Observable<boolean>;
    public dialogColor: Observable<string>;
    public dialogTitle: Observable<string>;
    constructor (private store: Store<fromRoot.State>) {
        this.infoMessage = store.select(fromRoot.getInfoMessage);
        this.infoOpened = store.select(fromRoot.getOpenInfo);
        this.dialogColor = store.select(fromRoot.getDialogColor);
        this.dialogTitle = store.select(fromRoot.getDialogTitle);
    }
    public infoClose(status) {
      this.store.dispatch(new msgActions.CloseInfoAction(null));
    }
   
}

