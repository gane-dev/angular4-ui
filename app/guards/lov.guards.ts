
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class LovGuard implements CanActivate {
    constructor(
        private store: Store<fromRoot.State>,
        private router: Router
    ) { }

    /**
     * This method creates an observable that waits for the `loaded` property
     * of the collection state to turn `true`, emitting one time once loading
     * has finished.
     */
    waitForLovToLoad(): Observable<boolean> {
        return this.store.select(fromRoot.getLovLoaded)
            .filter(loaded => loaded)
            .take(1);
    }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.waitForLovToLoad();
        //return of(true);
    }
}
