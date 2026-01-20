import dotenv from 'dotenv';
dotenv.config();

const baseUrlMap = {
  PIHR_PROD: 'https://api.pihr.xyz',
  PIHR_DEV: 'https://api.pisales.xyz',
};

const ssoUrlMap = {
  PIHR_PROD: 'https://sso.pihr.xyz',
  PIHR_DEV: 'https://accounts.pisales.xyz',
};

const pfApiPaths = {
  //PFYearApi
  pfYearSli:'/api/v2/pf-years/pf-year-sli',
  pfCurrentYear:"/api/v2/pf-years/current-pf-year",
  pfPreviousYear:'/api/v2/pf-years/previous-pf-years',
  pfYearDropdowns:'/api/v2/pf-years/pf-year-dropdowns',
  //PFCalculationPolicyApi
  pfCalculationPolicy:'/api/v2/pf-calculation-policies',
  pfFinancialYear:'/api/v2/pf-calculation-policies/pf-financial-year/{year}',
  pfFinancialYearDateRange:'/api/v2/pf-calculation-policies/pf-financial-year-date-range',
  //PFInterestCalculationPolicyApi
  pfInterestCalculationPolicies:'/api/v2/pf-interest-calculation-policies',
  pfInterestCalculationPolicyByID:'/api/v2/pf-interest-calculation-policies/{pf_interest_calculation_policy_id}',
  //PFMemberSetupApi
  pfStatusDropdown:'/api/v2/pf-member-setups/pf-status-dropdown',
  pfMemberHistoryByEmpID:'/api/v2/pf-member-setups/member-history/{employee_id}',
  pfCurrentStatusBYEmpID:'/api/v2/pf-member-setups/current-pf-status/{employee_id}',
  pfMemberSetupsTemplate:'/api/v2/pf-member-setups/template',
  //PFReportApi
  pfStatementReport:'/api/v2/pf-reports/pf-statement',
  pfAnnualBalanceReport:'/api/v2/pf-reports/pf-annual-balance',
  pfMonthlyCollectionReport:'/api/v2/pf-reports/pf-monthly-collection',
  pfMemberListReport:'/api/v2/pf-reports/pf-member-list',
  pfWithdrawalListReport:'/api/v2/pf-reports/pf-withdrawal-list',
  pfBenefitListReport:'/api/v2/pf-reports/pf-benefit-list',
  //PFMonthlyCollectionApi
  pfMonthlyCollections:'/api/v2/pf-monthly-collections',
  //PFWithdrawalPolicyApi
  pfWithdrawalPolicies:'/api/v2/pf-with-drawal-policies',
  pfWithdrawalPoliciesByID:'/api/v2/pf-with-drawal-policies/{policy_id}',
  //PfWithdrawalApi
  pfWithdrawals:'/api/v2/pf-with-drawals',
  pfWithdrawalsByID:'/api/v2/pf-with-drawals/{withdrawal_id}',
  pfWithdrawalsWithdrawable:'/api/v2/pf-with-drawals/withdrawable',
};

export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(pfApiPaths).forEach(([key, path]) => {
    const url = key === 'userLogin'
      ? `${SSO_URL}${path}`
      : `${BASE_URL}${path}`;

    apiMap[key] = { url };
  });

  return apiMap;
};
