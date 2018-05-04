import { Pipe } from '@angular/core';
import { LookupDataService } from '../services/lookup-data.service'; 

@Pipe({ name: 'publishText' })
export class PublishTextPipe {
    pubStatus: Array<{ text: string, value: string }>;
    constructor(private lookupDataService: LookupDataService
    ) {
        this.pubStatus = this.lookupDataService.publishActionOptions();
    }
    transform(status: null | string) {
    //    console.log(this.pubStatus);
        const result:any =this.pubStatus.filter(x => x.value === status).pop();
        if (result != undefined)
            return result.text;
        else
            return null;
    }
}

