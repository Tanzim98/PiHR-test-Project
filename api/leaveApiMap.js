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

const leaveApiPaths = {
  //Approver Setup API
  checkProcessingApplications: "/api/v2/approver-setups/{employee_id}/check-for-any-under-processing-application",
  approverSetupApproverInfo:"/api/v2/approver-setups/{employee_id}/approvers",
  setApprover:"/api/v2/approver-setups",
  deleteApprover:"/api/v2/approver-setups/{id}",
  getApprover:"/api/v2/approver-setups/{id}",
  approverSetupEmployeeInfo:"/api/v2/approver-setups/{approver_id}/employee-info",

  // Current Leave Status API
  currentLeaveBalance:"/api/v2/current-leave-statuses/{employee_id}/current-leave-balances",
  createLeaveStatusForEmployees:"/api/v2/current-leave-statuses/employees",
  createLeaveStatusForSingleEmployee:"/api/v2/current-leave-statuses",
  leaveGroupDetails:"/api/v2/current-leave-statuses/leave-group-details",

  //Earn Leave API
  earnLeave:"/api/v2/earn-leave/assign",

  //Earn Leave Rules API
  earnLeaveRules:"/api/v2/earn-leave-rules",
  createEarnLeaveRules:"/api/v2/earn-leave-rules",//Not execute
  updateEarnLeaveRules:"/api/v2/earn-leave-rules",//Not execute
  earnLeavePolicyCategories:"/api/v2/earn-leave-rules/policy-categories",

  //Leave Adjustment API
  leaveAdjustmentHistory:"/api/v2/leave-adjustments/{employee_id}/history",
  createLeaveAdjustment:"/api/v2/leave-adjustments",

  //Leave API
  employeeLeaveType:"/api/v2/leave/leave-type-sli",
  leaveApplicationId:"/api/v2/leave/{leave_application_id}",
  deleteLeaveApplicationById:"/api/v2/leave/{leave_application_id}",          //Not execute delete
  employeeApplyLeave:"/api/v2/leave/apply-leave", //Not execute post
  adminApplyLeave:"/api/v2/leave/admin-apply-leave",//Not execute post
  createLeaveAttachments:"/api/v2/leave/admin-apply-leave",//Not execute post
  approverHistory:"/api/v2/leave/approver-history/{leave_application_id}",
  leaveTypeDropdown:"/api/v2/leave/paid-unpaid-dropdown",
  adminLeaves:"/api/v2/leave/admin-leaves",
  leavePolicy:"/api/v2/leave/policy/{leave_type_id}",
  getLeaveApproverHistory:"/api/v2/leave/approver-history",
  checkLeaveConfiguration:"/api/v2/leave/check-leave-configuration", // Internal Server Error
  leaveCalendar:"/api/v2/leave/leave-calendar",
  employeeLeaveBalance:"/api/v2/leave/employee-leave-balance",
  extraDaysSli:"/api/v2/leave/extra-days-sli",
  currentLeaveBalanceAllEmployees:"/api/v2/leave/current-leave-balance",
  leaveDaysCount:"/api/v2/leave/leave-days-count",
  leaveFilters:"/api/v2/leave/filters",
  employeeRoasterEligible:"/api/v2/leave/26604/roster-eligible",
  leaveStatusDropdown:"/api/v2/leave/leave-status-dropdown",

  // Leave Dashboard APIs
  yearlyLeaveApprovalStatus:"/api/v2/leave-dashboards/yearly-leave-approval-status",
  monthlyLeaveApplicationStatus:"/api/v2/leave-dashboards/monthly-leave-application-status",
  monthWiseLeaveApplicationStatus:"/api/v2/leave-dashboards/month-wise-leave-application-status",
  employeeCurrentLeaveStatus:"/api/v2/leave-dashboards/employee-current-leave-status",
  leaveCalendar:"/api/v2/leave-dashboards/leave-calendar",

  //Leave Eligible Employees
  leaveEligibleEmployees:"/api/v2/leave-eligible-employees",
  leaveEligibleEmployeeById:"/api/v2/leave-eligible-employees",
  leaveEligibleEmployeeAllCondition:"/api/v2/leave-eligible-employees/all-condition-types",
  createLeaveEligibleEmployees:"/api/v2/leave-eligible-employees",        //Not execute
  updateLeaveEligibleEmployees:"/api/v2/leave-eligible-employees",        //Not execute
  deleteLeaveEligibleEmployees:"/api/v2/leave-eligible-employees/{id}",   //Not execute  

  //Leave Encashment Policy
  getLeaveEncashmentPolices:"/api/v2/leave-encashment-policies",
  createLeaveEncashmentPolices:"/api/v2/leave-encashment-policies", 

   //Leave Encashment Process APIs
   leaveEncashmentProcessExists:"/api/v2/leave-encashment-processes/policy-exists",
   leaveEncashmentAlreadyProcessed:"/api/v2/leave-encashment-processes/already-processed",
   leaveEncashmentPreviewProcessed:"/api/v2/leave-encashment-processes/preview-processed", //got 500 error
   createLeaveEncashmentProcess:"/api/v2/leave-encashment-processes",       //not execute
   revertLeaveEncashmentProcess:"/api/v2/leave-encashment-processes/revert/{leave_encashment_id}",  //Not execute

   //Leave Group API
   getLeaveGroups:"/api/v2/leave-groups",
   getLeaveGroupById:"/api/v2/leave-groups/{leave_group_id}",
   leaveGroupsFlagDropdown:"/api/v2/leave-groups/flags-dropdown",
   earnLeavePolicyCategories:"/api/v2/leave-groups/earn-leave-policy-categories", 
   leaveGroupDropdown:"/api/v2/leave-groups/dropdown",
   createLeaveGroup:"/api/v2/leave-groups",    //Not execute
   updateLeaveGroup:"/api/v2/leave-groups",    //Not execute
   deleteLeaveGroup:"/api/v2/leave-groups/{leave_group_id}",    //Not execute
   

   //Leave Process Policy API
   leaveProcessPolicies:"/api/v2/leave-process-policies",
   extraWorkAttendanceFlags:"/api/v2/leave-process-policies/extra-work-attendance-flags",
   createLeaveProcessPolicies:"/api/v2/leave-process-policies",  

   //Leave Report API
   leaveReportByLeaveApplicationId:"/api/v2/leave-reports/{leave_application_id}",
   leaveBalanceReport:"/api/v2/leave-reports/leave-balance",
   leaveSummaryReport:"/api/v2/leave-reports/leave-summary",
   leaveAnalysisReport:"/api/v2/leave-reports/leave-analysis",
   compensatedExtraTimeReport:"/api/v2/leave-reports/compensated-extra-time-report",
   visitReport:"/api/v2/leave-reports/visit-report",
   leaveAdjustmentReport:"/api/v2/leave-reports/leave-adjustment",
   leaveAdjustmentTypeDropdownReport:"/api/v2/leave-reports/leave-adjustment-type-dropdown",
   leaveApproverHistoryReport:"/api/v2/leave-reports/leave-approver-history",
   employeeEarnReport:"/api/v2/leave-reports/employee-earn-report",
   leaveEncashmentReport:"/api/v2/leave-reports/leave-encashment-report",

   //Leave Type API
   leaveTypes:"/api/v2/leave-types",
   leaveTypeById:"/api/v2/leave-types/{leave_type_id}",
   employeeLeaveTypeDropdown:"/api/v2/leave-types/drop-down",
   leaveTypeDropdownByEmployeeId:"/api/v2/leave-types/drop-down/{employee_id}",
   leaveTypeDropdown:"/api/v2/leave-types/dropdown",
   createLeaveType:"/api/v2/leave-types",
   updateLeaveType:"/api/v2/leave-types",//NOt execute
   deleteLeaveType:"/api/v2/leave-types/{leave_type_id}",   //NOt execute

   //Leave Year API
   leaveYearDropdown:"/api/v2/leave-years/dropdown",
   runningLeaveYear:"/api/v2/leave-years/running-leave-year",
   closedLeaveYear:"/api/v2/leave-years/closed-leave-years",
   createLeaveYears:"/api/v2/leave-years",  //Not execute
   closeLeaveYears:"/api/v2/leave-years", //Not execute

   //Visit API
   allVisitApplications:"/api/v2/visit-application/visits",
   visitApplicationById:"/api/v2/visit-application/{visit_application_id}",
   deleteVisitApplication:"/api/v2/visit-application/{visit_application_id}",  // Not execute
   approverHistoryByVisitApplicationId:"/api/v2/visit-application/approver-history/{visit_application_id}",
   createVisitApplication:"/api/v2/visit-application/apply-visit",  //Not execute
   checkProcessingAppByVisitApplicationId:"/api/v2/visit-application/check-processing-app/{visit_application_id}", //Internal Server error show nullable object maybe App api
   checkForLeave:"/api/v2/visit-application/check-for-leave", //500
   visitDaysCount:"/api/v2/visit-application/visit-days-count",
   adminCreateVisitApplicationForEmployee:"/api/v2/visit-application/admin-apply",  // Not execute
   visitApplicationsFilter:"/api/v2/visit-application/filters",
   visitApplicationByDate:"/api/v2/visit-application/applications-by-date",
};

export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(leaveApiPaths).forEach(([key, path]) => {
    const url = key === 'userLogin'
      ? `${SSO_URL}${path}`
      : `${BASE_URL}${path}`;

    apiMap[key] = { url };
  });

  return apiMap;
};
