import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunitySearch } from '../models/opportunity-search.model';
import { OppSearchService } from './services/opp-search.service';

@Component({
    selector: 'cia-opp-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/opp-search-page.html',
    providers: [OppSearchService]
})
export class OppSearchPageComponent {

    opp$: Observable<OpportunityHeader[]>;
    oppSearch:OpportunitySearch;
    constructor(private oppSearchService: OppSearchService) {
        this.opp$ = oppSearchService.opp$;
        oppSearchService.oppSearch$.subscribe((query: OpportunitySearch) => {
            this.oppSearch = Object.assign({}, query);
        });
    }
       
}
