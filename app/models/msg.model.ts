import { ErrorLevel } from '../services/message.service';
export interface MsgModel {
    infoLevel: ErrorLevel;
    infoMessage: string;
}
export interface ConfirmMsgModel {
    dialogTitle: string;
    dialogColor: string;
    confirmMessage: string;
    titleMessage: string;
    infoMessage: string;
}