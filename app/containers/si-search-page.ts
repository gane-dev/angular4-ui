import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { SpendIncidentHeader } from '../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../models/spend-incident-detail.model'
import { SpendIncident } from '../models/spend-incident.model'

import { SiSearchService } from '../containers/services/si-search.service';

@Component({
    selector: 'cia-si-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'html/si-search-page.html',
    providers: [SiSearchService]
})
export class SiSearchPageComponent {
  siSearch:SpendIncidentHeader;
  si$: Observable<SpendIncidentHeader[]>;
    constructor(private siSearchService: SiSearchService) {
        this.si$ = siSearchService.si$;
        siSearchService.siSearch$.subscribe((query:SpendIncidentHeader)=>{
            this.siSearch = Object.assign({},query);
    }); 
         }
}
