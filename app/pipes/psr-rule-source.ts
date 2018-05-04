import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service';

@Pipe({ name: 'psrRuleLevel' })
export class PsrRuleLevelPipe {
    constructor(private lookupDataService: LookupDataService
    ) {
    }
    transform(status: null | string) {
        return this.lookupDataService.getPsrRLItems().filter(x => x.value === status).pop().text;
    }
}

