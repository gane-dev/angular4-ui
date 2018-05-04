import { OpportunityDetail } from './opportunity-detail.model'
import { OpportunityHeader } from './opportunity-header.model'
export interface Opportunity {
    header: OpportunityHeader;
    details: OpportunityDetail[];
}