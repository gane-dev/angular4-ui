import { SpendRuleFields } from './spend-rule-fields.model';
//import { SpendRuleDetails } from './spend-rule-details.model';
//import { SpendRuleCust } from './spend-rule-cust.model';
import { SpendRuleDtl } from './spend-rule-dtl.model';
//import { SpendRuleSupp } from './spend-rule-supp.model';
//import { SpendRuleCat } from './spend-rule-cat.model';
export interface SpendRule {
    rules: SpendRuleFields;
    details: SpendRuleDtl[];
    //customers: SpendRuleCust[];
    //suppliers: SpendRuleSupp[];
    //categories: SpendRuleCat[];
}