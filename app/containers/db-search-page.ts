import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { DataBatchDetails } from '../models/data-batch-details.model'
import { DataBatchSearch } from '../models/data-batch-search.model'
import { DbSearchService } from '../containers/services/db-search.service';
import { DbEditService } from '../containers/services/db-edit.service';

@Component({
    selector: 'cia-db-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/db-search-page.html',
    providers: [DbSearchService,DbEditService]
})
export class DbSearchPageComponent {

    db$: Observable<DataBatchDetails[]>;
    dbSearch:DataBatchSearch;
    constructor(private dbSearchService: DbSearchService) {
          this.db$ = dbSearchService.db$;
          dbSearchService.dbSearch$.subscribe((query:DataBatchSearch)=>{
            this.dbSearch = Object.assign({},query);
            }); 
    }
}
