export interface SpendIncidentHeader {
        SPEND_AUDIT_ID : number;
        SPEND_YEAR : number;
        SPEND_PERIOD : number;
        SOURCE_ID : string;
        CUST_ID : string;
        SUPPLIER_ID : string;
        ITEM_CATEGORY : string;
        CP_SPEND : number;
        SP_SPEND : number;
        RULE_ID : string;
        IGNORE_FLG : string;
        TOLERANCE_PCT : number;
        DATE_AUDITED  :Date;
        REVIEW_STATUS : string;
        SYSTEM_DISPOSITION : string;
        USER_DISPOSITION : string;
        COMMENTS : string;
        LAST_UDATED_DATE: Date;
        LAST_UPDATED_BY: string;
        BATCH_ID: number;
}