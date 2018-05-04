import { SpendIncidentHeader} from './spend-incident-header.model'
import { SpendIncidentDetail } from './spend-incident-detail.model'

export interface SpendIncident {
    header: SpendIncidentHeader;
    details: SpendIncidentDetail[];
}