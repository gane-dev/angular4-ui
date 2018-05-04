import { Pipe } from '@angular/core';
import { ErrorLevel,MessageService} from '../services/message.service';

@Pipe({ name: 'dialogTitle' })
export class DialogTitlePipe {
    constructor(private msgService:MessageService) { }

    transform(status: null | ErrorLevel) {


        switch (status) {
            case ErrorLevel.Information:
                return this.msgService.getInfoTitle();
            case ErrorLevel.Error:
                return this.msgService.getErrorTitle();
            case ErrorLevel.Success:
                return this.msgService.getSuccessTitle();
            default:
                return this.msgService.getInfoTitle();
        }
    }
}