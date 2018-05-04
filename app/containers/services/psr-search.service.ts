import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PsrTable } from '../../models/psr-table.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as psrActions from '../../actions/psr-rule-actions';
import { PsrExceptionGroup } from '../../models/psr-exception-group.model';
import { Router } from '@angular/router';
@Injectable()
export class PsrSearchService {
    public psrExceptions$: Observable<PsrTable[]>;
   public psrSearch$: Observable<PsrTable>;
   constructor(private store: Store<fromRoot.State>, private router: Router) {
       this.psrExceptions$ = store.select(fromRoot.getPsrSearchResults);
       this.psrSearch$ = store.select(fromRoot.getSearchQuery);

   }
searchPsr(query: PsrTable) {
        this.store.dispatch(new psrActions.SearchAction(query));
    }
     
    selectPsr(psr: PsrTable)
    {
        this.store.dispatch(new psrActions.SelectPsr(psr));
        this.router.navigate(['psr/0']);
    }
    addPsr() {
        this.store.dispatch(new psrActions.InitialPsrAdd(null));
        this.router.navigate(['psr/1']);
    }
    clearSearch()
    {
        this.store.dispatch(new psrActions.ClearSearchAction(null));
    
     }
}