import { Injectable, Inject } from '@angular/core';
@Injectable()
export class MessageService {
    constructor()
    { }
    getConfirmMessage(): string
    {
        return 'Do you want to save changes';
    }
    getDeleteConfirmMessage(): string
    {
        return 'Do you want to delete record';
    }
    getTitleMessage(): string {
        return 'Please Confirm';
    }
    getInfoTitle(): string { return 'Information Message'; }
    getErrorTitle(): string { return 'Error Message'; }
    getSuccessTitle(): string { return 'Success Message'; }
}
export enum ErrorLevel {
    Error = 0,
    Warning = 1,
    Information = 2,
    Success =3
}