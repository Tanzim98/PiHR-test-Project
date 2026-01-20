import { test } from '@playwright/test';
import { PFApis } from '../../pages/PF/pfApi.js';
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

test.describe('PF Year Api - PROD vs DEV comparison', () => {
  test('PF Year Sli should be same in PROD & DEV @API_Test PF-1001', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFYearSli", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Current Year  should be same in PROD & DEV @API_Test PF-1002', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getCurrentPFYear", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Previous Years  should be same in PROD & DEV @API_Test PF-1003', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFPreviousYear", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Year Dropdowns should be same in PROD & DEV @API_Test PF-1006', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFYearDropdowns", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
}); 


test.describe('PF Calculation Policy Api - PROD vs DEV comparison', () => {
  test('PF Calculation Policies should be same in PROD & DEV @API_Test PF-1007', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFCalculationPolicy", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Financial Year Policy should be same in PROD & DEV @API_Test PF-1008', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFFinancialYear", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Financial Year Date Range should be same in PROD & DEV @API_Test PF-1010', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFFinancialYearDateRange", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  

}); 


test.describe('PF Interest Calculation Policy Api - PROD vs DEV comparison', () => {
  test('PF Interest Calculation policies should be same in PROD & DEV @API_Test PF-1011', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFInterestCalculationPolicies", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Interest Calculation Policy By ID should be same in PROD & DEV @API_Test PF-1014', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFInterestCalcuationByID", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe('PF Member Setup Api - PROD vs DEV comparison', () => {
 test('PF Status Dropdown should be same in PROD & DEV @API_Test PF-1016', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Member History By Emp ID should be same in PROD & DEV @API_Test PF-1017', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFMemberHistoryByEmpID", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Current Status By Emp ID should be same in PROD & DEV @API_Test PF-1018', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getCurrentPFStatusByEmpID", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('PF Member Setups Template should be same in PROD & DEV @API_Test PF-1020', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFMemberSetupsTemplate", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

});


test.describe('PF Report Api - PROD vs DEV comparison', () => {
 test('PF Statement Report should be same in PROD & DEV @API_Test PF-1022', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFStatementReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Annual Balance Report should be same in PROD & DEV @API_Test PF-1023', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFAnnualBalanceReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Monthly Collection Report should be same in PROD & DEV @API_Test PF-1024', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFMonthlyCollectionReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Member list Report should be same in PROD & DEV @API_Test PF-1025', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFMemberListReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Withdrawal list Report should be same in PROD & DEV @API_Test PF-1026', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFWithdrawalListReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Benefit list Report should be same in PROD & DEV @API_Test PF-1027', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFBenefitListReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe('PF Monthly Colections Api - PROD vs DEV comparison', () => {
 test('PF Monthly Collections should be same in PROD & DEV @API_Test PF-1029', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFMonthlyCollections", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe('PF Withdrawal Policies Api - PROD vs DEV comparison', () => {
 test('PF Withdrawal Policies should be same in PROD & DEV @API_Test PF-1037', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFWithdrawalPolicies", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Withdrawal Policies By ID should be same in PROD & DEV @API_Test PF-1040', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFWithdrawalPoliciesByID", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe('PF Withdrawals Api - PROD vs DEV comparison', () => {
 test('PF Withdrawals should be same in PROD & DEV @API_Test PF-1031', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFWithdrawals", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Withdrawal ID should be same in PROD & DEV @API_Test PF-1034', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFWithdrawalID", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
 test('PF Withdrawals withdrawable should be same in PROD & DEV @API_Test PF-1036', async ({ request }) => {
    await PFApis.compareProdVsDev(request, "getPFWithdrawalsWithdrawable", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
})
