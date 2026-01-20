import { test } from '@playwright/test';
import { LeaveApis } from '../../pages/Leave/leaveApi.js';
import * as payloads from '../../config/leavePayloadData.js';
Object.assign(globalThis, payloads);
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


test.describe('Approver Setup API - PROD vs DEV comparison', () => {
  test('Employee Leave information should be same in PROD & DEV @GET_API_Test Leave-1001', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getProcessingApplications", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Approver Setup Details By Id should be same in PROD & DEV @GET_API_Test Leave-1002', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getApproverSetupDetailsById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Approver details should be same in PROD & DEV @GET_API_Test Leave-1003', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getapproverSetupApproverInfo", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Employee details should be same in PROD & DEV @GET_API_Test Leave-1004', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getapproverSetupEmployeeInfo", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  // test('Set Approver for Employee  @POST_API_Test Employee-1005', async ({ request }) => {
  //   await LeaveApis.compareProdVsDev(request, "setApprover", 'POST', PROD_TOKEN, DEV_TOKEN, setApproverPayload);
  // });

  // test('Delete Approver for Employee  @Delete_API_Test Employee-1006', async ({ request }) => {
  //   await LeaveApis.compareProdVsDev(request, "deleteApprover", 'DELETE', PROD_TOKEN, DEV_TOKEN, setApproverPayload);
  // });

}); 
test.describe('Current Leave Status API - PROD vs DEV comparison',()=>{
  test('Create Leave Status for Employee  @POST_API_Test Leave-1007', async ({ request }) => {
  await LeaveApis.compareProdVsDev(request, "createLeaveStatusForMultipleEmployees", 'POST', PROD_TOKEN, DEV_TOKEN, createLeaveStatusForMultipleEmployeesPayload);
});
  test('Create Leave Status for Single Employee  @POST_API_Test leave-1008', async ({ request }) => {
  await LeaveApis.compareProdVsDev(request, "createLeaveStatusForSingleEmployee", 'POST', PROD_TOKEN, DEV_TOKEN, createCurrentLeaveStatusPayload);
});
test('Employee Leave Balance should be same in PROD & DEV @GET_API_Test Leave-1009', async ({ request }) => {
  await LeaveApis.compareProdVsDev(request, "getCurrentLeaveBalance", 'GET', PROD_TOKEN, DEV_TOKEN);
});
  test(' Leave Group should be same in PROD & DEV @GET_API_Test Leave-1010', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveGroupDetails", 'GET', PROD_TOKEN, DEV_TOKEN);
});
});

  test.describe('Earn Leave Api - PROD vs DEV comparison',()=>{

    test(' Earn Leave should be same in PROD & DEV @GET_API_Test Leave-1011', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getEarnLeave", 'GET', PROD_TOKEN, DEV_TOKEN);
    })
    });
    test.describe('Earn Leave Rule Api - PROD vs DEV comparison',()=>{

      test(' Earn Leave Rules should be same in PROD & DEV @GET_API_Test Leave-1012', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getEarnLeaveRules", 'GET', PROD_TOKEN, DEV_TOKEN);
      });
      test(' Earn Leave Policy Categories should be same in PROD & DEV @GET_API_Test Leave-1015', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getEarnLeavePolicyCategories", 'GET', PROD_TOKEN, DEV_TOKEN);
      });
    });
    test.describe('Leave Adjusment Api - PROD vs DEV comparison',()=>{
      
      test(' Leave Adjustment History should be same in PROD & DEV @GET_API_Test Leave-1016', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getLeaveAdjustmentHistory", 'GET', PROD_TOKEN, DEV_TOKEN);
      });
      test('Create Leave Adjustment for Single Employee  @POST_API_Test Employee-1017', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "createLeaveAdjustment", 'POST', PROD_TOKEN, DEV_TOKEN, createLeaveAdjustment);
      });
    });
    test.describe('Leave Api - PRDO vs DEV comparison',()=>{
      test(' Employee Leave Type Sli should be same in PROD & DEV @GET_API_Test Leave-1018', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getEmployeeLeaveTypeSli", 'GET', PROD_TOKEN, DEV_TOKEN);
      });
      test(' Employee Leave Application ID  should be same in PROD & DEV @GET_API_Test Leave-1019', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getLeaveApplication", 'GET', PROD_TOKEN, DEV_TOKEN);
      });
      test(' Approver History  should be same in PROD & DEV @GET_API_Test Leave-1021', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getApproverHistoryUsingLeaveApplicationId", 'GET', PROD_TOKEN, DEV_TOKEN);
      });
      // test('Employee Apply Leave for Single Employee  @POST_API_Test Employee-10', async ({ request }) => {
      // await LeaveApis.compareProdVsDev(request, "employeeApplyLeave", 'POST',PROD_TOKEN, DEV_TOKEN, EMP_DEV_TOKEN, employeeApplyLeavePayload);
      // });
    test(' Leave Type Dropdown  should be same in PROD & DEV @GET_API_Test Leave-1022', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Admin Leave History  should be same in PROD & DEV @GET_API_Test Leave-1024', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "adminGetLeaveHistory", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Policy should be same in PROD & DEV @GET_API_Test Leave-1025', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeavePolicy", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Approver History  should be same in PROD & DEV @GET_API_Test Leave-1026', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getApproverHistoryByApplicationIdAndEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Employee Leave Balance should be same in PROD & DEV @GET_API_Test Leave-1027', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getEmployeeLeaveBalance", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Configuration should be same in PROD & DEV @GET_API_Test Leave-1028', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "checkLeaveConfiguration", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Calendar should be same in PROD & DEV @GET_API_Test Leave-1029', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveCalendar", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Current Leave Balance All Employee should be same in PROD & DEV @GET_API_Test Leave-1030', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "currentLeaveBalanceAllEmployees", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Days Count should be same in PROD & DEV @GET_API_Test Leave-1031', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveDaysCount", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Filter Data for list view should be same in PROD & DEV @GET_API_Test Leave-1032', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "leaveFilters", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Status should be same in PROD & DEV @GET_API_Test Leave-1033', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "leaveStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Employee Roast Data Eligibility should be same in PROD & DEV @GET_API_Test Leave-1037', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "checkEmployeeRoastEligibility", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Extra Days Sli should be same in PROD & DEV @GET_API_Test Leave-1038', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getExtraDaysSli", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  });
  test.describe('Leave Dashboard Api',()=>{
    test(' Yearly Leave Approval Status should be same in PROD & DEV @GET_API_Test Leave-1038', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getYearlyLeaveApprovalStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Monthly Leave Application Status should be same in PROD & DEV @GET_API_Test Leave-1039', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getMonthlyLeaveApplicationStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Month Wise Leave Application Status should be same in PROD & DEV @GET_API_Test Leave-1040', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getMonthWiseLeaveApplicationStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Employee Current Leave Status should be same in PROD & DEV @GET_API_Test Leave-1041', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getEmployeeCurrentLeaveStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Calendar should be same in PROD & DEV @GET_API_Test Leave-1042', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveCalendar", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  })
  test.describe('Leave Eligible Employee Api - PROD vs DEV comparison',()=>{
    test(' Leave Eligible Employees should be same in PROD & DEV @GET_API_Test Leave-1043', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveEligibleEmployees", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    // test('Create Leave Eligible Employee @POST_API_Test Employee-1044', async ({ request }) => {
    // await LeaveApis.compareProdVsDev(request, "createLeaveEligibleEmployees", 'POST', PROD_TOKEN, DEV_TOKEN, createLeaveEligibleEmployeesPayload);
    // });
    // test('Update Leave Status for Single Employee  @POST_API_Test Employee-1045', async ({ request }) => {
    // await LeaveApis.compareProdVsDev(request, "createLeaveEligibleEmployees", 'PUT', PROD_TOKEN, DEV_TOKEN, createLeaveEligibleEmployeesPayload);
    // });
    // test('Delete Leave Status for Single Employee  @POST_API_Test Employee-1046', async ({ request }) => {
    // await LeaveApis.compareProdVsDev(request, "createLeaveEligibleEmployees", 'DELETE', PROD_TOKEN, DEV_TOKEN, createLeaveEligibleEmployeesPayload);
    // });
    test(' Leave Eligible Employee should be same in PROD & DEV @GET_API_Test Leave-1047', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveEligibleEmployeeById", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Eligible Employee in All Condition Types should be same in PROD & DEV @GET_API_Test Leave-1048', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getEligibleEmployeesAllConditionTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  });
  test.describe('Leave EncashmentPolicyApi - PROD vs DEV comparasion',()=>{
    test(' Leave Encashment Polices should be same in PROD & DEV @GET_API_Test Leave-1049', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveEncashment", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test('Create Leave Encashment for Single Employee  @POST_API_Test Employee-1050', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "createLeaveEncashmentPolicies", 'POST', PROD_TOKEN, DEV_TOKEN,createLeaveEncashmentPolicies );
    });
  });
  test.describe('Leave Encashment ProcessApi - PROD vs DEV comparasion',()=>{
    test(' Leave Encashment Process Policy should be same in PROD & DEV @GET_API_Test Leave-1051', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveEncashmentProcessFlag", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Encashment Already Processed Details should be same in PROD & DEV @GET_API_Test Leave-1052', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "checkLeaveEncashmentAlreadyProcessed", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  })
  test.describe('Leave Groups API - PROD vs DEV comaparison',()=>{
    test(' Leave Groups should be same in PROD & DEV @GET_API_Test Leave-1056', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveGroups", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Group By Id should be same in PROD & DEV @GET_API_Test Leave-1059', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveGroupById", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Groups Flag Dropdown should be same in PROD & DEV @GET_API_Test Leave-1061', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveGroupsFlagDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Leave Groups Categories should be same in PROD & DEV @GET_API_Test Leave-1063', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveGroupDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  });
  test.describe('Leave Process Policies API PROD vs DEV comparison',()=>{
    test(' Leave Groups Categories should be same in PROD & DEV @GET_API_Test Leave-1064', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getLeaveProcessPolicies", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    // test('Create Leave Process Policies for Single Employee  @POST_API_Test Employee-1065', async ({ request }) => {
    // await LeaveApis.compareProdVsDev(request, "createLeaveProcessPolicies", 'POST', PROD_TOKEN, DEV_TOKEN,createLeaveProcessPoliciesPayload);
    // });
    test(' Extra Work Attendance should be same in PROD & DEV @GET_API_Test Leave-1066', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getExtraWorkAttendanceFlag", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  })
  test.describe('Leave Report API PROD vs DEV comparasion',()=>{
    test(' Employee Leave Report should be same in PROD & DEV @GET_API_Test Leave-1067', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveReportByLeaveApplicationId", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Balance Report should be same in PROD & DEV @GET_API_Test Leave-1068', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveBalanceReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Summary Report should be same in PROD & DEV @GET_API_Test Leave-1069', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveSummaryReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Analysis Report should be same in PROD & DEV @GET_API_Test Leave-1070', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveAnalysisReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Compensated Extra Work Time Report should be same in PROD & DEV @GET_API_Test Leave-1071', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveCompensatedExtraTimeReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Visit Report should be same in PROD & DEV @GET_API_Test Leave-1072', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getVisitReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Adjustment Report should be same in PROD & DEV @GET_API_Test Leave-1073', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveAdjustmentReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Adjustment Type Dropdown Report should be same in PROD & DEV @GET_API_Test Leave-1074', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveAdjustmentTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Approver Type History Report should be same in PROD & DEV @GET_API_Test Leave-1075', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveApproverHistory", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Employee Earn Report should be same in PROD & DEV @GET_API_Test Leave-1076', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getEmployeeEarnReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
    test(' Leave Encashment Report should be same in PROD & DEV @GET_API_Test Leave-1077', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveEncashmentReport", 'GET', PROD_TOKEN, DEV_TOKEN);
    });    
  })
  test.describe('Leave Types API PROD vs DEV comparison',()=>{
    test(' Leave Types should be same in PROD & DEV @GET_API_Test Leave-1079', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test('Create Leave Types  @POST_API_Test Leave-1080', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "createLeaveType", 'POST', PROD_TOKEN, DEV_TOKEN,createLeaveTypePayload);
    });
  })
  test.describe('Leave Year API PROD vs DEV comparison',()=>{
    test(' Leave Year Dropdown should be same in PROD & DEV @GET_API_Test Leave-1086', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getLeaveYearDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Running Leave Year should be same in PROD & DEV @GET_API_Test Leave-1087', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getRunningLeaveYear", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Closed Leave Year should be same in PROD & DEV @GET_API_Test Leave-1088', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getClosedLeaveYear", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  })
  test.describe('Visit Application API PROD vs DEV comparasion',()=>{
    test(' Visit Application should be same in PROD & DEV @GET_API_Test Leave-1091', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getVisitApplications", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Get Visit Application By ID should be same in PROD & DEV @GET_API_Test Leave-1092', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getVisitApplicationById", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test(' Get Approver History By Visit Application ID should be same in PROD & DEV @GET_API_Test Leave-1094', async ({ request }) => {
    await LeaveApis.compareProdVsDev(request, "getApproverHistoryVisitApplicationById", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test('Employee Apply Visit Application  @POST_API_Test Employee-1095', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "emplpoyeeCreateVisitApplication", 'POST', PROD_TOKEN, DEV_TOKEN,createVisitApplicationPayload );
    });
    test(' Visit Days Count should be same in PROD & DEV @GET_API_Test Leave-1098', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "getVisitDaysCount", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test('Admin Apply Visit Application For Employee  @POST_API_Test Employee-1099', async ({ request }) => {
      await LeaveApis.compareProdVsDev(request, "adminCreateVisitApplication", 'POST', PROD_TOKEN, DEV_TOKEN,adminCreateVisitApplicationForEmployeePayload );
    });
      test(' Visit Application Filer should be same in PROD & DEV @GET_API_Test Leave-1100', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getVisitApplicationFilter", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
      test(' Visit Application Date should be same in PROD & DEV @GET_API_Test Leave-1101', async ({ request }) => {
        await LeaveApis.compareProdVsDev(request, "getVisitApplicationByDate", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    
  })
