import { test } from '@playwright/test';
import { TaxApis } from '../../pages/Tax/taxApi.js';
import dotenv from 'dotenv';
dotenv.config();
const API_TEST_USER = (process.env.API_TEST_USER || 'admin').toLowerCase();
function pickToken(env, role) {
  // env: 'PROD' | 'DEV'
  const e = String(env).toUpperCase();
  const r = String(role || 'admin').toLowerCase();
  if (e === 'PROD') {
    if (r === 'employee') return process.env.PIHR_PROD_API_EMPLOYEE_TOKEN || process.env.PIHR_PROD_API_TOKEN;
    if (r === 'supervisor') return process.env.PIHR_PROD_API_SUPERVISOR_TOKEN || process.env.PIHR_PROD_API_TOKEN;
    return process.env.PIHR_PROD_API_TOKEN;
  }
  // DEV
  if (r === 'employee') return process.env.PIHR_DEV_API_EMPLOYEE_TOKEN || process.env.PIHR_DEV_API_TOKEN;
  if (r === 'supervisor') return process.env.PIHR_DEV_API_SUPERVISOR_TOKEN || process.env.PIHR_DEV_API_TOKEN;
  return process.env.PIHR_DEV_API_TOKEN;
}

// Tokens passed into the compare runner (prodToken, devToken)
const PROD_TOKEN = pickToken('PROD', API_TEST_USER);
const DEV_TOKEN = pickToken('DEV', API_TEST_USER);
console.log(`API Test user: ${API_TEST_USER}. Using PROD token: ${Boolean(PROD_TOKEN)}, DEV token: ${Boolean(DEV_TOKEN)}`);
const PROD_EMPLOYEE_TOKEN = pickToken('PROD', 'employee');
const DEV_EMPLOYEE_TOKEN = pickToken('DEV', 'employee');

test.describe('Bonus Year Month API - PROD vs DEV comparison', () => {
  test('Bonus Year Months should be same in PROD & DEV @GET_API_Test Tax-1001', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getBonusYearMonth", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Bonus Year By Month Id should be same in PROD & DEV @GET_API_Test Tax-1002', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getBonusYearByMonthId", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});
test.describe('Employee Tax Provision API - PROD vs DEV comparison', () => {
  test('Tax Configuration should be same in PROD & DEV @GET_API_Test Tax-1003', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxConfiguration", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Get Employee Tax Provisins should be same in PROD & DEV @GET_API_Test Tax-1004', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getEmployeeTaxProvision", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Employee Tax Provisins By Id should be same in PROD & DEV @GET_API_Test Tax-1005', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxProvisionById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
});
test.describe('Employee Yearly Income Tax API - PROD vs DEV comparison', () => {
  test('Yearly Income Tax should be same in PROD & DEV @GET_API_Test Tax-1006', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getEmployeeYearlyImcomeTax", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});
test.describe('Investment API - PROD vs DEV comparison', () => {
  test('Invesment Type Sli should be same in PROD & DEV @GET_API_Test Tax-1007', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getInvestmentTypeSli", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Invesments should be same in PROD & DEV @GET_API_Test Tax-1008', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getInvestmentDetails", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Invesment By Id should be same in PROD & DEV @GET_API_Test Tax-1009', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getInvestmentById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Investment Types API - PROD vs DEV comparison', () => {
  test('All Investment Types should be same in PROD & DEV @GET_API_Test Tax-1010', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getInvestmentDetails", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Investment Type By Id should be same in PROD & DEV @GET_API_Test Tax-1011', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getInvestmentTypeById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Medical Information API - PROD vs DEV comparison', () => {
  test('Medical Information should be same in PROD & DEV @GET_API_Test Tax-1012', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getMedicalInformation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Medical Information By Id should be same in PROD & DEV @GET_API_Test Tax-1013', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getMedicalInfoById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Monthly Tax Collection API - PROD vs DEV comparison', () => {
  test('Monthly Collected Tax should be same in PROD & DEV @GET_API_Test Tax-1014', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getMonthlyCollectedList", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Monthly Employee Tax should be same in PROD & DEV @GET_API_Test Tax-1015', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getMonthlyEmployeeTax", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 }); 
test.describe('Tax Calculation API - PROD vs DEV comparison', () => {
  test('Employee Tax Collection should be same in PROD & DEV @GET_API_Test Tax-1016', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getEmployeeTaxCalculation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
}); 
test.describe('Tax Challan API - PROD vs DEV comparison',()=>{
  test('Tax Challan should be same in PROD & DEV @GET_API_Test Tax-1017', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxChallan", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Tax Challan By Id should be same in PROD & DEV @GET_API_Test Tax-1018', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxChallanById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Tax Challan Template should be same in PROD & DEV @GET_API_Test Tax-1019', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "downloadTaxChallanTemplate", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Tax Eligible Employees should be same in PROD & DEV @GET_API_Test Tax-1020', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxEligibleEmployees", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

});
test.describe('Tax Factor API - PROD vs DEV comparison',()=>{
  test('Factor Code Dropdown should be same in PROD & DEV @GET_API_Test Tax-1021', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getFactorCodeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Factors should be same in PROD & DEV @GET_API_Test Tax-1022', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getFactorsByTaxYear", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Factor By Tax Year in PROD & DEV @GET_API_Test Tax-1023', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getsFactorDetailsById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});
test.describe('Tax Global Configuration API - PROD vs DEV comparison',()=>{
  test('Tax Global Configuration should be same in PROD & DEV @GET_API_Test Tax-1024', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxGlobalConfiguration", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Salary Percentage Type Dropdown should be same in PROD & DEV @GET_API_Test Tax-1025', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getSalaryPercentageTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Texable Break Ups Dropdown should be same in PROD & DEV @GET_API_Test Tax-1026', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTexableBreakupsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  });
  test.describe('Tax Policies API - PROD vs DEV comparison',()=>{
  test('Tax Policies should be same in PROD & DEV @GET_API_Test Tax-1027', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getAllTaxPolicies", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Tax Policy By Id should be same in PROD & DEV @GET_API_Test Tax-1028', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxPolicyById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Tax Policy Dropdown should be same in PROD & DEV @GET_API_Test Tax-1029', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxPolicyDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Tax Policy Amount Rules should be same in PROD & DEV @GET_API_Test Tax-1030', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getPolicyAmountRulesById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Tax Policy Rules Details  should be same in PROD & DEV @GET_API_Test Tax-1031', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getRuleDetailsByRuleId", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  });
    test.describe('Tax Report API - PROD vs DEV comparison',()=>{
  test('Monthly Tax Provision Report should be same in PROD & DEV @GET_API_Test Tax-1032', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getMonthlyTaxProvisionReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Monthly Tax Collection Report should be same in PROD & DEV @GET_API_Test Tax-1033', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getMonthlyTaxCollectionReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Provision Statement Report should be same in PROD & DEV @GET_API_Test Tax-1034', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "provisionStatementPayload", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Yearly Statement Report should be same in PROD & DEV @GET_API_Test Tax-1035', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getYearlyStatementReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Challan Report should be same in PROD & DEV @GET_API_Test Tax-1036', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getChallanReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Status Dropdown should be same in PROD & DEV @GET_API_Test Tax-1037', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Adjustment Type Dropdown should be same in PROD & DEV @GET_API_Test Tax-1038', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getAdjustmentTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Year Dropdown should be same in PROD & DEV @GET_API_Test Tax-1039', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxYearDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});
    test.describe('Tax Year API - PROD vs DEV comparison',()=>{
  test('Tax Year Sli should be same in PROD & DEV @GET_API_Test Tax-1040', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxYearSli", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Current Tax Year should be same in PROD & DEV @GET_API_Test Tax-1041', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getCurrentTaxYear", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('All Previous Year should be same in PROD & DEV @GET_API_Test Tax-1042', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getAllPreviousYear", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
  test('Tax Year Dropdown should be same in PROD & DEV @GET_API_Test Tax-1043', async ({ request }) => {
    await TaxApis.compareProdVsDev(request, "getTaxYearDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
});