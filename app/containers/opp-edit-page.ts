import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OppEditService } from './services/opp-edit.service';
import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunityDetail } from '../models/opportunity-detail.model';
import { Observable } from 'rxjs/Observable';
@Component({
    //   moduleId: module.id,
    selector: 'cia-opp-edit',
    templateUrl: 'html/opp-edit-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OppEditService]
})
export class OppEditPageComponent {
    oppHeader: OpportunityHeader =<OpportunityHeader>{};
    oppDetails: Observable<OpportunityDetail[]>;
    constructor(private oppEditService: OppEditService) {
        oppEditService.header$.subscribe(x => this.oppHeader = x);
        this.oppDetails = oppEditService.details$;//Object.assign([], oppEditService.details);
    }


    backToSearch() {
        this.oppEditService.goBack();
    }
    onSave() {
        if (confirm("Do you want save changes to database?")) {
            this.oppEditService.saveHeader(this.oppHeader);
            this.oppEditService.waitForSave().subscribe(
                (result: string) => {
                    if (result === '1')
                        alert('Save Completed');
                    else
                        alert('Error: ' + result);
                }
            );
        }
    }
}