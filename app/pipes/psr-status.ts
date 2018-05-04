import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service';

@Pipe({ name: 'psrStatus' })
export class PsrStatusPipe {
    constructor(private lookupDataService: LookupDataService
    ) {
    }
    transform(status: null | string) {
       return this.lookupDataService.getPSRRuleStatus().filter(x => x.value === status).pop().text;
             }
    }

