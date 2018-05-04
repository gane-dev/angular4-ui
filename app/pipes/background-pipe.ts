import { Pipe } from '@angular/core';
import { ErrorLevel } from '../services/message.service';

@Pipe({ name: 'dialogColor' })
export class DialogColorPipe {
    transform(status: null | ErrorLevel) {
     

        switch (status) {
            case ErrorLevel.Information:
                return 'dialog-bg-blue';
            case ErrorLevel.Error:
                return 'dialog-bg-red';
            case ErrorLevel.Success:
                return 'dialog-bg-green';
            default:
                return 'dialog-bg-blue';
        }
    }
}