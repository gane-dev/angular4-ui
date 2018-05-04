import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SiEditService } from './services/si-edit.service';
import { SpendIncidentHeader } from '../models/spend-incident-header.model';
import { SpendIncidentDetail } from '../models/spend-incident-detail.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
@Component({
    //   moduleId: module.id,
    selector: 'cia-si-edit',
    templateUrl: 'html/si-edit-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SiEditService]
})
export class SiEditPageComponent {
    siHeader: SpendIncidentHeader = <SpendIncidentHeader>{};
    siDetails: Observable<SpendIncidentDetail[]>;
    private transactions: boolean = false;
    constructor(private siEditService: SiEditService, private route: ActivatedRoute) {
        siEditService.header$.subscribe(x => this.siHeader = x);
        this.siDetails = this.siEditService.details$;
        this.route.params.subscribe(
            params => {
                if (params['id'] === "0") {
                    this.transactions = true;
                }
                else
                    this.transactions = false;
            });
    }


    backToSearch() {
        this.siEditService.goBack();
    }
    onSave() {
        if (confirm("Do you want save changes to database?")) {
            this.siEditService.saveHeader(this.siHeader);
            this.siEditService.waitForSave().subscribe(
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