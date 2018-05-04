import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
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
export class PageGuard implements CanActivate {
    constructor(
        private store: Store<fromRoot.State>,
        private router: Router
    ) { }

    /**
     * This method creates an observable that waits for the `loaded` property
     * of the collection state to turn `true`, emitting one time once loading
     * has finished.
     */
    waitForDsToLoad(): Observable<boolean> {
        return this.store.select(fromRoot.getDsLoaded)
            .filter(loaded => loaded)
            .take(1);
    }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.waitForDsToLoad();
        //return of(true);
    }
}