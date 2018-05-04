export interface PsrTable {
    CUST_ID: string;
    SUPPLIER_ID: string;
    RULE_LEVEL: string;
    RULE_DESCRIPTION: string;
    PROGRAM_SCOPE_IND: string;
    GBS_OPP_IND: string;
    PROPOSED_SUPP_OVERRIDE_FLG: string;
    PROPOSED_SUPPLIER: string;
    COMMENTS: string;
    PROCESS_ID: number;
    EFF_DATE: Date;
    STATUS: string;
    RULE_STATUS: string;
    CREATED_BY: string;
    UPDATED_BY: string;
    DATE_CREATED: Date;
    DATE_LAST_UPDATED: Date;
    REASON_CODE: string;
    REASON_DESC: string;
    RULE_SOURCE: string;
    SOURCE_ID: string;

    CUST_STATE: string;
    MARKET_SEGMENT: string;
    ERM_PARENT_ID: string;
    ERM_BRAND_ID: string;
}