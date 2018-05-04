import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { PsrTable } from '../models/psr-table.model';
import { PsrExceptionGroup } from '../models/psr-exception-group.model';
import { Opportunity } from '../models/opportunity.model';
import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunityDetail } from '../models/opportunity-detail.model';
import { SpendRule } from '../models/spend-rule.model';
import { SpendRuleDtl } from '../models/spend-rule-dtl.model';
import { SpendRuleFields } from '../models/spend-rule-fields.model';
import { SpendRuleCat } from '../models/spend-rule-cat.model';
import { SpendRuleSupp } from '../models/spend-rule-supp.model';
import { SpendRuleCust } from '../models/spend-rule-cust.model';

import { SpendIncident } from '../models/spend-incident.model';
import { SpendIncidentHeader } from '../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../models/spend-incident-detail.model'
import { DataBatch } from '../models/data-batch.model'
import { DataBatchSearch } from '../models/data-batch-search.model'
import { DataBatchTrans } from '../models/data-batch-trans.model'
import { DataBatchTransDetails } from '../models/dbt-details.model'
import { CustomerLOV } from '../models/customer-lov.model';
import { SupplierLOV } from '../models/supplier-lov.model';
import { DataSourceLOV } from '../models/datasource-lov.model';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from './layout';
import * as fromPsrSearch from './psr-search';
import * as fromPsrRules from './psr-rules';
import * as fromOpp from './opportunity';
import * as fromSpendRule from './spend-rule';
import * as fromSrDetail from './spend-rule-detail';
import * as fromSrCustomer from './spend-rule-customer';
import * as fromSrSupplier from './spend-rule-supplier';
import * as fromSrCategory from './spend-rule-cat';
import * as fromSpendIncident from './spend-incident';
import * as fromDb from './data-batch';
import * as fromDbt from './data-batch-trans';
import * as fromLookup from './lookup';
import * as fromLogin from './login';
import * as fromFilters from './filter';
import * as fromMsg from './msg-reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    psrSearch: fromPsrSearch.State;
    psrRules: fromPsrRules.State;
    opp: fromOpp.State;
    db: fromDb.State;
    dbt: fromDbt.State;
    login:fromLogin.State;
    filter : fromFilters.State;
    spendIncident: fromSpendIncident.State;
    spendRule: fromSpendRule.State;
    srDetail: fromSrDetail.State;
    srCustomer: fromSrCustomer.State;
    srSupplier: fromSrSupplier.State;
    srCategory: fromSrCategory.State;
    lookup: fromLookup.State;
    layout: fromLayout.State;
    msg: fromMsg.State;
  router: fromRouter.RouterState;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
    psrSearch: fromPsrSearch.reducer,
    psrRules: fromPsrRules.reducer,
    opp: fromOpp.reducer,
    spendRule: fromSpendRule.reducer,
    srDetail : fromSrDetail.reducer,
    srCustomer : fromSrCustomer.reducer,
    srCategory : fromSrCategory.reducer,
    srSupplier : fromSrSupplier.reducer,
    spendIncident: fromSpendIncident.reducer,
    db: fromDb.reducer,
    dbt: fromDbt.reducer,
    login: fromLogin.reducer,
    filter:fromFilters.reducer,
    lookup: fromLookup.reducer,
    layout: fromLayout.reducer,
    msg : fromMsg.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the books state then we pass the state to the book
 * reducer's getBooks selector, finally returning an observable
 * of search results.
 *
 * Share memoizes the selector functions and publishes the result. This means
 * every time you call the selector, you will get back the same result
 * observable. Each subscription to the resultant observable
 * is shared across all subscribers.
 */


/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */


/**
 * *****************/
 
 
export const getPsrSearchState = (state: State) => state.psrSearch;
/*export const getPsrQuery = createSelector(getPsrSearchState, fromPsrSearch.getPsrQuery);
export const getPsrLoading = createSelector(getPsrSearchState, fromPsrSearch.getPsrLoading);*/

export const getPsrRulesState = (state: State) => state.psrRules;
export const getPsrSearchResults = createSelector(getPsrRulesState, fromPsrRules.getEntities);
export const getEditPsr = createSelector(getPsrRulesState, fromPsrRules.getEditRule);
export const getDeletedPsr = createSelector(getPsrRulesState, fromPsrRules.getDeletedRules);
export const getSaveResult = createSelector(getPsrRulesState, fromPsrRules.getSaveResult);
export const getDelResult = createSelector(getPsrRulesState, fromPsrRules.getDelResult);
export const getSearchQuery = createSelector(getPsrRulesState, fromPsrRules.getSearchQuery);
export const getSelectedPsr = createSelector(getPsrRulesState, fromPsrRules.getSelectedPsr);

export const getOppState = (state: State) => state.opp;
export const getOppSearchResults = createSelector(getOppState, fromOpp.getOppEntities);
export const getSelectedOppHeader = createSelector(getOppState, fromOpp.getSelectedOppHeader);
export const getSelectedOppDetails = createSelector(getOppState, fromOpp.getSelectedOppDetails);
export const getOppResult = createSelector(getOppState, fromOpp.getOppResult);
export const getOppQuery = createSelector(getOppState, fromOpp.getOppQuery);

export const getSiState = (state: State) => state.spendIncident;
export const getSiSearchResults = createSelector(getSiState, fromSpendIncident.getSiEntities);
export const getSelectedSiHeader = createSelector(getSiState, fromSpendIncident.getSelectedSiHeader);
export const getSelectedSiDetail = createSelector(getSiState, fromSpendIncident.getSelectedSiDetails);
export const getSiResult = createSelector(getSiState, fromSpendIncident.getSiResult);
export const getSiIgnoreResult = createSelector(getSiState, fromSpendIncident.getSiIgnoreResult);

export const getSiQuery = createSelector(getSiState, fromSpendIncident.getSiQuery);

export const getSrState = (state: State) => state.spendRule;
export const getSrSearchResults = createSelector(getSrState, fromSpendRule.getSrEntities);
export const getSrSelectedRule = createSelector(getSrState, fromSpendRule.getSrSelectedRule);
export const getSrNewId = createSelector(getSrState, fromSpendRule.getSrNewId);
export const getSrSaveResult = createSelector(getSrState, fromSpendRule.getSaveResult);
export const getSrDelResult = createSelector(getSrState, fromSpendRule.getDelResult);
export const getSrSelDetail = createSelector(getSrState, fromSpendRule.getSrSelectedDetail);
export const getSrQuery = createSelector(getSrState, fromSpendRule.getSrQuery);
export const getSrLoaded = createSelector(getSrState, fromSpendRule.getSrLoaded);

export const getSrCatState = (state: State) => state.srCategory;
export const getSrCategories = createSelector(getSrCatState, fromSrCategory.getSrCategories);
export const getCatSaveResult = createSelector(getSrCatState, fromSrCategory.getSaveResult);
export const getCatDelResult = createSelector(getSrCatState, fromSrCategory.getDelResult);
export const getDeletedSrCat = createSelector(getSrCatState, fromSrCategory.getSrDeletedCategories);

export const getSrCustState = (state: State) => state.srCustomer;
export const getSrCustomers = createSelector(getSrCustState, fromSrCustomer.getSrCustomers);
export const getCustSaveResult = createSelector(getSrCustState, fromSrCustomer.getSaveResult);
export const getCustDelResult = createSelector(getSrCustState, fromSrCustomer.getDelResult);
export const getDeletedSrCust = createSelector(getSrCustState, fromSrCustomer.getSrDeletedCustomers);

export const getSrSuppState = (state: State) => state.srSupplier;
export const getSrSuppliers = createSelector(getSrSuppState, fromSrSupplier.getSrSuppliers);
export const getSuppSaveResult = createSelector(getSrSuppState, fromSrSupplier.getSaveResult);
export const getSuppDelResult = createSelector(getSrSuppState, fromSrSupplier.getDelResult);
export const getDeletedSrSupp = createSelector(getSrSuppState, fromSrSupplier.getSrDeletedSuppliers);

export const getSrDetailState = (state: State) => state.srDetail;
//export const getSrDetails = createSelector(getSrDetailState, fromSrDetail.getSrDetails);
//export const getSrSelDetail = createSelector(getSrDetailState, fromSrDetail.getSrSelectedDetail);
export const getDetailSaveResult = createSelector(getSrDetailState, fromSrDetail.getSaveResult);
export const getDetailDelResult = createSelector(getSrDetailState, fromSrDetail.getDelResult);
//export const getSrDeletedDetails = createSelector(getSrDetailState, fromSrDetail.getSrDeletedDetails);

export const getDbState = (state: State) => state.db;
export const getDbSearchResults = createSelector(getDbState, fromDb.getDbEntities);
export const getSelectedDb = createSelector(getDbState, fromDb.getSelectedDb);
export const getDbQuery = createSelector(getDbState, fromDb.getDbQuery);
export const getDbSaveResult = createSelector(getDbState, fromDb.getDbSaveResult);
export const getDbPublishResult = createSelector(getDbState, fromDb.getDbPublishResult);
export const getSearchComplete = createSelector(getDbState, fromDb.getSearchComplete);
export const getDbForSource= createSelector(getDbState, fromDb.getDbForSource);
export const getDbtState = (state: State) => state.dbt;
export const getFilterState = (state: State) => state.filter;
export const getDbtFilter = createSelector(getFilterState, fromFilters.getDbtFilter);
//export const getDbtSearchResults = createSelector(getDbtState, fromDbt.getDbtEntities);
export const getSelectedDbt = createSelector(getDbtState, fromDbt.getSelectedDbt);
//export const getSelectedDbtHeader = createSelector(getDbtState, fromDbt.getSelectedDbtHeader);
export const getDbtApplyResult = createSelector(getDbtState, fromDbt.getDbtApplyResult);
export const getDbtSaveResult = createSelector(getDbtState, fromDbt.getDbtSaveResult);
export const getDbtFlags = createSelector(getDbtState, fromDbt.getFlags);
//export const getDbtQuery = createSelector(getDbtState, fromDbt.getDbtQuery);
export const getDbtLoaded = createSelector(getDbtState, fromDbt.getDbtLoaded);
export const getDbtCurrentSet = createSelector(getDbtState, fromDbt.getDbtCurrentSet);
export const getDbtCount = createSelector(getDbtState, fromDbt.getDbtCount);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
/*Login*/
export const getLoginState = (state: State) => state.login;
export const getLoginResult = createSelector(getLoginState, fromLogin.getLoginResult);

/*lookup*/
export const getLookupState = (state: State) => state.lookup;
export const getCustomerLOV = createSelector(getLookupState, fromLookup.getCustomersLOV);
export const getCategoryLOV = createSelector(getLookupState, fromLookup.getCategoryLOV);
export const getSupplierLOV = createSelector(getLookupState, fromLookup.getSuppliersLOV);
export const getDBCustomerLOV = createSelector(getLookupState, fromLookup.getDBCustomersLOV);
export const getDBSupplierLOV = createSelector(getLookupState, fromLookup.getDBSuppliersLOV);

export const getDataSourceLOV = createSelector(getLookupState, fromLookup.getDataSourceLOV);
export const getSourceBatchsLOV = createSelector(getLookupState, fromLookup.getSourceBatchsLOV);
export const getDsLoaded = createSelector(getLookupState, fromLookup.getDsLoaded);
export const getLovLoaded = createSelector(getLookupState, fromLookup.getLovLoaded);

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;

export const getShowProgress = createSelector(getLayoutState, fromLayout.getShowProgress);

//message confirmation
export const getMsgState = (state: State) => state.msg;
export const getOpenConfirm = createSelector(getMsgState, fromMsg.getOpenConfirm);
export const getOpenInfo = createSelector(getMsgState, fromMsg.getOpenInfo);
export const getConfirmSelection = createSelector(getMsgState, fromMsg.getConfirmSelection);
export const getInfoMessage = createSelector(getMsgState, fromMsg.getInfoMessage);
export const getDialogColor = createSelector(getMsgState, fromMsg.getDialogColor);
export const getDialogTitle = createSelector(getMsgState, fromMsg.getDialogTitle);
export const getConfirmMessage = createSelector(getMsgState, fromMsg.getConfirmMessage);
export const getTitleMessage = createSelector(getMsgState, fromMsg.getTitleMessage);