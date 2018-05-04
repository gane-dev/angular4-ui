import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service';

@Pipe({ name: 'psrOverride' })
export class PsrOverridePipe {
    constructor(private lookupDataService: LookupDataService
    ) {
    }
    transform(status: null | string) {
        return this.lookupDataService.getSuppOverrideValues().filter(x => x.value === status).pop().text;
    }
}
