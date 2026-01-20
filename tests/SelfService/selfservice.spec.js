import { test } from '@playwright/test';
import { selfServiceApis } from '../../pages/SelfService/selfservice.js';

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


test.describe('My Attendance - PROD vs DEV comparison', () => {
  test('Today Attendance should be same in PROD & DEV @GET_API_Test Self Service-1003', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getTodayAttendance", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Today Break Time should be same in PROD & DEV @GET_API_Test Self Service-1004', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getTodayBreakTime", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Company Attendance Rules should be same in PROD & DEV @GET_API_Test Self Service-1007', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getCompanyAttendanceRules", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 
test.describe('Self Service My Dashboard API - PROD vs DEV comparison', () => {
  test('All Notifications should be same in PROD & DEV @GET_API_Test Self Service-1009', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getAllNotifications", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Upcoming Roster should be same in PROD & DEV @GET_API_Test Self Service-1012', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getUpComingRoster", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('My Dashboard should be same in PROD & DEV @GET_API_Test Self Service-1013', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyDashboardData", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Attendance Calendar should be same in PROD & DEV @GET_API_Test Self Service-1014', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getAttendanceCalendar", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Flag Wise Attendance Count should be same in PROD & DEV @GET_API_Test Self Service-1015', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getFlagWiseAttendance", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Noticies should be same in PROD & DEV @GET_API_Test Self Service-1016', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getNoticies", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Hierarchy should be same in PROD & DEV @GET_API_Test Self Service-1017', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getHierarchy", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 

test.describe('Self Service My Documnet Request API - PROD vs DEV comparison', () => {
  test('Employee Documnet should be same in PROD & DEV @GET_API_Test Leave-1018', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getEmployeeDocumentRequests", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Document Request By Emplyee Id should be same in PROD & DEV @GET_API_Test Leave-1019', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getDocumentRequestByApplicationId", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 
test.describe('My Extra Times API - PROD vs DEV comparison', () => {
  test('My Extra Time should be same in PROD & DEV @GET_API_Test Leave-1020', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyExtraTimes", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 
test.describe('My Shifts API - PROD vs DEV comparison', () => {
  test('My Shifts should be same in PROD & DEV @GET_API_Test Leave-1021', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyShifts", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 
test.describe('My Shift Swap API - PROD vs DEV comparison', () => {
  test('Swappable Shift Dropdown should be same in PROD & DEV @GET_API_Test Leave-1022', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyShiftSwapDropdown", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Employee Swappable Shift Dropdown should be same in PROD & DEV @GET_API_Test Leave-1023', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getShiftSwappableEmployee", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Requesting Employee Dropdown should be same in PROD & DEV @GET_API_Test Leave-1024', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getRequestingEmployeeDropdown", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Get Shift Offers should be same in PROD & DEV @GET_API_Test Leave-1026', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getShiftOffers", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Get My Shifts Request should be same in PROD & DEV @GET_API_Test Leave-1033', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyShiftRequest", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 
test.describe('Self Service Report API - PROD vs DEV comparison', () => {
  test('My Attendance Report should be same in PROD & DEV @GET_API_Test Leave-1037', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyAttendanceReport", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('My Job Card should be same in PROD & DEV @GET_API_Test Leave-1038', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMyJobCardReport", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Monthly Attendance Report should be same in PROD & DEV @GET_API_Test Leave-1039', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getMonthlyAttendanceReport", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Advance Salary Report should be same in PROD & DEV @GET_API_Test Leave-1040', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getAdvanceSalaryReport", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
  test('Subordinate JobCard Report Report should be same in PROD & DEV @GET_API_Test Leave-1041', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getSubordinateJobCardReport", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
}); 
test.describe('Self Service Salary Report API - PROD vs DEV comparison', () => {
  test('Salary Claim Report should be same in PROD & DEV @GET_API_Test Leave-1042', async ({ request }) => {
    await selfServiceApis.compareProdVsDev(request, "getSalaryClaimReport", 'GET', PROD_EMPLOYEE_TOKEN, DEV_EMPLOYEE_TOKEN);
  });
});