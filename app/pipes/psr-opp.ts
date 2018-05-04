import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service';

@Pipe({ name: 'psrOpp' })
export class PsrOppPipe {
    constructor(private lookupDataService: LookupDataService
    ) {
    }
    transform(status: null | string) {
        return this.lookupDataService.getOppValues().filter(x => x.value === status).pop().text;
    }
}
