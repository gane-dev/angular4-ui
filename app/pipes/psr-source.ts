import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service';

@Pipe({ name: 'psrSource' })
export class PsrSourcePipe {
    constructor(private lookupDataService: LookupDataService
    ) {
    }
    transform(status: null | string) {
        return this.lookupDataService.getPRSRuleSource().filter(x => x.value === status).pop().text;
    }
}
