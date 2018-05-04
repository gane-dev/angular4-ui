import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
    selector: 'cia-app',
   changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/app.html'
})
export class AppComponent {
    public showProgess$: Observable<boolean>;
    public ciaUser$: Observable<string>;
    constructor(private store: Store<fromRoot.State>) {
        this.showProgess$ = store.select(fromRoot.getShowProgress);
    }

  
}
