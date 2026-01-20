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

const taxApiPaths = {
  // Bonus Year Month Api
  bonusYearMonth:"/api/v2/bonus-year-months",
  bonusYearByMonthId:"/api/v2/bonus-year-months/{year_month_id}",

  //Employee Tax Provision API
  getTaxConfiguration:"/api/v2/employee-tax-provisions/tax-configurations",
  getEmployeeTaxProvisions:"/api/v2/employee-tax-provisions",
  getTaxProvisionById:"/api/v2/employee-tax-provisions/{tax_provision_id}",
  getEmployeeYearlyImcomeTax:"/api/v2/employee-yearly-income-taxes",

  // Investment API
  getInvestmentTypeSli:"/api/v2/investments/investment-type-sli",
  getInvestmentDetails:"/api/v2/investments",
  getInvestmentById:"/api/v2/investments/{investment_id}",

  //Investment Type API
  getInvestmentTypes:"/api/v2/investment-types",
  getInvestmentTypeById:"/api/v2/investment-types/{investment_type_id}",

  //Medical Information API
  getMedicalInformation:"/api/v2/medical-information",
  getMedicalInfoById:"/api/v2/medical-information/{medical_info_id}",

  //Monthly Tax Collection API
  monthlyTaxCollectedList:"/api/v2/monthly-tax-collections/collected-list",
  getEmployeeTaxByCollectionId:"/api/v2/monthly-tax-collections/employee-tax",

  //Tax Calculation API
  getEmployeeTaxCalculation:"/api/v2/tax-calculations",
  getTaxChallan:"/api/v2/tax-challans",
  getTaxChallanById:"/api/v2/tax-challans/{tax_challan_id}/details",
  taxChallanTemplate:"/api/v2/tax-challans/download-tax-challan-template",
  getTaxEligibleEmployees:"/api/v2/tax-challans/tax-eligible-employees",
  
  //Tax Factor API
  getFactorCodeDropdown:"/api/v2/tax-factors/factor-code-drop-down/{tax_year}",
  getFactorsByTaxYear:"/api/v2/tax-factors/factors/{tax_year}",
  factorDetailsById:"/api/v2/tax-factors/details/{factor_id}",

  //Tax Global Configuration
  getTaxGlobalConfiguration:"/api/v2/tax-global-configurations",
  salaryPercentageTypeDropdown:"/api/v2/tax-global-configurations/salary-percentage-types-dropdown",
  texableBreakupsDropdown:"/api/v2/tax-global-configurations/taxable-breakups-dropdown",

  //Tax Policies
  getAllTaxPolicies:"/api/v2/tax-policies",
  taxPoliciesById:"/api/v2/tax-policies/{policy_id}",
  getTaxPolicyDropdown:"/api/v2/tax-policies/policy-for-drop-down",
  getPolicyAmountRulesById:"/api/v2/tax-policies/amount-rules/{policy_id}",
  getAmountRuleDetailsByRuleId:"/api/v2/tax-policies/amount-rules-details/{rule_id}",

  // Tax Report API
  monthlyTaxProvisionReport:"/api/v2/tax-reports/monthly-tax-provision",
  monthlyTaxCollectionReport:"/api/v2/tax-reports/monthly-tax-collection",
  provisionStatementReport:"/api/v2/tax-reports/provision-statement",
  yearlyStatementReport:"/api/v2/tax-reports/yearly-statement",
  taxChallanReport:"/api/v2/tax-reports/tax-challan",
  taxStatusDropdown:"/api/v2/tax-reports/tax-status-dropdown",
  adjustmentTypeDropdown:"/api/v2/tax-reports/adjustment-type-dropdown",
  taxYearDropdown:"/api/v2/tax-reports/tax-year-dropdown",

  //Tax Year Sli
  taxYearSli:"/api/v2/tax-years/tax-year-sli",
  currentTaxYear:"/api/v2/tax-years/current-tax-year",
  previousTaxYears:"/api/v2/tax-years/previous-tax-years",
  taxYearDropdown:"/api/v2/tax-years/tax-year-dropdowns",
}   

export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(taxApiPaths).forEach(([key, path]) => {
    const url = key === 'userLogin'
      ? `${SSO_URL}${path}`
      : `${BASE_URL}${path}`;

    apiMap[key] = { url };
  });

  return apiMap;
};
