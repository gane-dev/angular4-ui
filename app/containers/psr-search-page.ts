import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PsrTable } from '../models/psr-table.model';
import { PsrExceptionGroup } from '../models/psr-exception-group.model';
import { PsrSearchService } from './services/psr-search.service';

@Component({
    selector: 'cia-psr-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/psr-search-page.html',
    providers: [PsrSearchService]
})
export class PsrSearchPageComponent {
    public query: Observable<PsrTable>;// = <PsrTable>{};
    psrExceptions$: Observable<PsrTable[]>;
    constructor( private psrSearchService: PsrSearchService) {
       this.psrExceptions$ = psrSearchService.psrExceptions$;
       this.query = psrSearchService.psrSearch$;
       //psrSearchService.psrSearch$.subscribe((query: PsrTable) => {
       //     this.query = Object.assign({},query);
           
       // });  
    }
}
