import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as msgActions from '../../actions/msg-actions';
@Component({
    selector: 'confirm-dialog',
    templateUrl: '../html/common/confirm-dialog.component.html'
    
      
    
})
export class ConfirmDialogComponent {
    public opened: Observable<boolean>;
    public confirmMessage: Observable<string>;
    public titleMessage: Observable<string>;
    constructor(private msgService: MessageService, private store: Store<fromRoot.State>)
    {
        this.confirmMessage = store.select(fromRoot.getConfirmMessage);
        this.titleMessage = store.select(fromRoot.getTitleMessage);
        this.opened = store.select(fromRoot.getOpenConfirm);
    }
    public close(status) {
        console.log(status);
        if (status == 'yes')
            this.store.dispatch(new msgActions.CloseConfirmAction('1'));
        else
            this.store.dispatch(new msgActions.CloseConfirmAction('0'));
      
    }
   
}

