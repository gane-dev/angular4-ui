import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { DataBatchTrans } from '../models/data-batch-trans.model'
import { DataBatchSearch } from '../models/data-batch-search.model'
import { DbtSearchService } from '../containers/services/dbt-search.service';

@Component({
    selector: 'cia-dbt-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/dbt-search-page.html',
    providers: [DbtSearchService]
})
export class DbtSearchPageComponent {

    dbt$: Observable<DataBatchTrans[]>;
    dbtSearch:DataBatchSearch;
    constructor(private dbtSearchService: DbtSearchService) {
        this.dbt$ = dbtSearchService.dbt$;
      // dbtSearchService.getSources();
        dbtSearchService.dbtSearch$.subscribe((query:DataBatchSearch)=>{
            this.dbtSearch = Object.assign({},query);
    }); 



    }

}
