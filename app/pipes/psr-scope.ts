import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service';

@Pipe({ name: 'psrScope' })
export class PsrScopePipe {
    constructor(private lookupDataService: LookupDataService
    ) {
    }
    transform(status: null | string) {
        return this.lookupDataService.getScopeValues().filter(x => x.value === status).pop().text;
    }
}
