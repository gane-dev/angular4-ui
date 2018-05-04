
import { SpendRuleCust } from './spend-rule-cust.model';
//import { SpendRuleDtl } from './spend-rule-dtl.model';
import { SpendRuleSupp } from './spend-rule-supp.model';
import { SpendRuleCat } from './spend-rule-cat.model';
import { SpendRuleFields } from './spend-rule-fields.model';
export interface SpendRuleDetails {
   // details: SpendRuleDtl;
    rule: SpendRuleFields;
    customers: SpendRuleCust[];
    suppliers: SpendRuleSupp[];
    categories: SpendRuleCat[];
}