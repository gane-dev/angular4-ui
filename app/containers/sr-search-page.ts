import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SpendRule } from '../models/spend-rule.model'
import { SpendRuleDtl } from '../models/spend-rule-dtl.model'
import { SpendRuleSearch } from '../models/spend-rule-search.model'
import { SrSearchService } from '../containers/services/sr-search.service';

@Component({
    selector: 'cia-sr-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/sr-search-page.html',
    providers: [SrSearchService]
})
export class SrSearchPageComponent {
  srSearch:SpendRuleSearch;
  sr$: Observable<SpendRuleDtl[]>;
    constructor(private srSearchService: SrSearchService) {
        this.sr$ = srSearchService.sr$;
          srSearchService.srSearch$.subscribe((query:SpendRuleSearch)=>{
            this.srSearch = Object.assign({},query);
    }); 
    }
}
