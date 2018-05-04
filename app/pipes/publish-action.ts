import { Pipe } from '@angular/core';
import { DataBatchDetails } from '../models/data-batch-details.model'

@Pipe({ name: 'publishAction' })
export class PublishActionPipe {
    transform(status: null | DataBatchDetails) {
        if (status.PUBLISH_ACTION === 'P' && status.PUBLISH_STATUS !== 'C')
            return 'fa fa-clock-o';
        else if (status.PUBLISH_ACTION === 'U' && status.PUBLISH_STATUS !== 'U')
            return 'fa fa-clock-o';
        else
            return null;
        
        }
    }

