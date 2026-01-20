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

const attendanceApiPaths = {
  //Attendance Flag
  attendanceFlag: '/api/v2/attendance-flags',

  // Annual Holiday
  annualHoliday: '/api/v2/annual-holidays',
  annualHolidayById: '/api/v2/annual-holidays/{holiday_id}',
  globalAnnualHoliday: '/api/v2/annual-holidays/global-holidays/{year}',
  createGlobalAnnualHoliday: '/api/v2/annual-holidays/global-holidays',

  // Attendance Approval
  attendanceApproval: '/api/v2/attendance-approvals',
  attendanceApprovalById: '/api/v2/attendance-approvals/{approval_id}',
  attendanceApprovalStatusDropdown: '/api/v2/attendance-approvals/attenance-approval-status-dropdown',

  // Attendance Policy
  attendancePolicy: '/api/v2/attendance-policies',
  attendancePolicyById: '/api/v2/attendance-policies/{attendance_policy_id}',
  attendancePolicyHistoryById: '/api/v2/attendance-policies/{attendance_policy_id}/histories',
  workingTypeDropdown: '/api/v2/attendance-policies/dropdowns',
  companyPolicyDropdown: '/api/v2/attendance-policies/attendance-policy-dropdowns',

  // Attendance Policy Mapping
  attendancePolicyMapping: '/api/v2/attendance-policy-mappings',
  attendancePolicyMappingById: '/api/v2/attendance-policy-mappings/{policy_mapping_id}',

  // Attendance Dashboard APIs
  attendanceDashboardSummary: '/api/v2/attendance-dashboards/attendance-summaries-by-date-range',
  todaysAttendance: '/api/v2/attendance-dashboards/today-attendances',
  missedAttendance: '/api/v2/attendance-dashboards/missed-attendances',
  cardWiseAttendanceSummary: '/api/v2/attendance-dashboards/card-wise-summaries',

  // Daily Attendance APIs
  dailyAttendance: '/api/v2/daily-attendance',
  deleteDailyAttendance: '/api/v2/daily-attendance/{daily_attendance_id}',
  dailyAttendanceTemplate: '/api/v2/daily-attendance/attendance-template',

  // Overtime Policy APIs
  overtimePolicy: '/api/v2/overtime-policies',
  overtimePolicyById: '/api/v2/overtime-policies/{over_time_policy_id}',
  applicableDayType: '/api/v2/overtime-policies/applicable-day-type-dropdown',
  overtimePolicyDropdown: '/api/v2/overtime-policies/over-time-policy-dropdown',
  
  // Overtime Policy Mapping APIs
  overtimePolicyMapping: '/api/v2/ot-policy-mappings',
  overtimePolicyMappingEmployee: '/api/v2/ot-policy-mappings/{employee_id}',

  // Eligible Employee API
  eligibleType: '/api/v2/attendance-eligible-employees',
  eligibleTypeById: '/api/v2/attendance-eligible-employees/{id}',

  // Attendance Deletion API
  attendanceDeletion: '/api/v2/attendance-deletions',
  attendanceDeletionDropdown: '/api/v2/attendance-deletions/dropdown',
  attendanceDeletionById: '/api/v2/attendance-deletions/{attendance_deletion_id}',

  // Attendance Configuration API
  attendanceConfiguration: '/api/v2/attendance-configurations',
  attendanceConfigurationTelegramTemplate: '/api/v2/attendance-configurations/download-telegram-template',
  attendanceOvertimePreapprovalConfiguration: '/api/v2/attendance-configurations/overtime-pre-approval-configuration',

  // Company Attendance Devices API
  companyAttendanceDevice: '/api/v2/company-attendance-devices',
  companyAttendanceDeviceById: '/api/v2/company-attendance-devices/{id}',
  pihrDeviceTypes: '/api/v2/company-attendance-devices/pihr-device-types',
  companyAttendanceDeviceDropdown: '/api/v2/company-attendance-devices/dropdown',

  // Employee Proximity Cards
  employeeProximityCards: '/api/v2/employee-proximity-cards',
  employeeProximityCardsById: '/api/v2/employee-proximity-cards/{card_id}',

  // Face Recognition Approval
  faceRecognitionApprovals: '/api/v2/face-recognition-approvals',
  verifyFaceRecognition: '/api/v2/face-recognition-approvals/verify-face/{face_recognition_id}',

  // Hotspots
  hotspots: '/api/v2/hotspots',
  companyHotspots: '/api/v2/hotspots/company-hotspots',
  hotspotById: '/api/v2/hotspots/{hotspot_id}',

  // Leave or Salary Deduction Policy API
  leaveOrSalaryDeductionPolicy : '/api/v2/deduction-policies',

  // Multiple Checking API
  multipleCheckins: '/api/v2/multiple-checking/checkins',
  multiCheckingAttendanceConfigurationPolicy: '/api/v2/multiple-checking/attendance-configuration-policy',
  dayWiseCheckIn: '/api/v2/multiple-checking/day-wise-check-in',
  checkInList: '/api/v2/multiple-checking/check-in-list',

  // OT Operation
  getDateWiseOT: '/api/v2/ot-operations/date-wise-ot',
  getEmployeeWiseOT: '/api/v2/ot-operations/employee-wise-ot',

  // Reconciliation API
  subordinatesReconciliation: '/api/v2/attendance-reconciliation/subordinates-reconciliations',

  // Break time Reconciliation API
  workBreakApi: '/api/v2/work-break-reconciliation/work-break',
  workBreakReconciliationGet : '/api/v2/work-break-reconciliation/get',
  workBreakReconciliationBreak : '/api/v2/work-break-reconciliation/breaks',
  subordinateWorkBreaks: '/api/v2/work-break-reconciliation/subordinate-breaks',
  generalEmployeeWorkBreaks: '/api/v2/work-break-reconciliation/general-employee-work-breaks',
  rosterEmployeeWorkBreaks: '/api/v2/work-break-reconciliation/roster-employee-work-breaks',

  // Overtime Pre Approval Application API
  overtimePreApprovalApplication: '/api/v2/ot-pre-approvals',
  overtimePreApprovalApplicationById: '/api/v2/ot-pre-approvals/{application_id}',
  overtimePreApprovalStatusDropdown: '/api/v2/ot-pre-approvals/overtime-pre-approval-status-dropdown',

  // Roster Attendance Reconciliation API
  filterDropdownData: '/api/v2/roster-attendance-reconciliations/filter-dropdown-data',
  rosterAttendanceReconciliation: '/api/v2/roster-attendance-reconciliations',
  reconciliationRosterEligibleEmployee: '/api/v2/roster-attendance-reconciliations/roster-eligible-employees',

  // Roster Eligible Employee API
  rosterEligibleEmployee: '/api/v2/roster-eligible-employees',
  rosterEligibleEmployeeDropdown: '/api/v2/roster-eligible-employees/dropdown',
  rosterEligibleEmployeeByEmployeeId: '/api/v2/roster-eligible-employees/{employee_id}/is-roster-eligible',

  // Roster Plan Modification API
  rosterPlanModification: '/api/v2/roster-plan-modifications',
  rosterPlanModificationUnassigned: '/api/v2/roster-plan-modifications/unassigned',
  rosterPlanModificationById: '/api/v2/roster-plan-modifications/{roster_id}',

  // Roster Setup API
  rosterSetupEligibleEmployee: '/api/v2/roster-setups/eligible-employees',
  rosterSetups: '/api/v2/roster-setups',
  copyRosterSetup: '/api/v2/roster-setups/copy-roster',

  // Shift Setup API
  shiftSetup: '/api/v2/shifts',
  shiftSetupById: '/api/v2/shifts/{shift_id}',
  shiftDropdown: '/api/v2/shifts/dropdown',

  // Shift Swap API
  adminShiftRequests: '/api/v2/shifts-swappings/admin-shift-requests',
  adminShiftRequestsById: '/api/v2/shifts-swappings/{request_id}',
  shiftSwapStatusDropdown: '/api/v2/shifts-swappings/shift-swap-status-dropdown',

  // Attendance Report API
  dailyAttendanceReport: '/api/v2/attendance-report/daily-attendance',
  monthlyAttendanceReport: '/api/v2/attendance-report/monthly-attendance',
  jobCardReport: '/api/v2/attendance-report/job-card',  // 504 Gateway Timeout
  attendanceAnalysisReport: '/api/v2/attendance-report/attendance-analysis',
  attendanceHistoryReport: '/api/v2/attendance-report/attendance-history',
  employeeBreakReport: '/api/v2/attendance-report/employee-break',
  multiCheckinCheckoutDetailReport: '/api/v2/attendance-report/multiple-check-in-check-out-details',
  multiCheckinCheckoutSummaryReport: '/api/v2/attendance-report/multiple-check-in-check-out-summary', 
  rosterScheduleReport: '/api/v2/attendance-report/roster-schedule',
  continuousAbsentReport: '/api/v2/attendance-report/continuous-absent',
  attendancePercentageWiseEmployeeRanking: '/api/v2/attendance-report/attendance-percentage-wise-employee-ranking',
  monthlySummaryReport: '/api/v2/attendance-report/monthly-summary',
  extraWorkDaysReport: '/api/v2/attendance-report/extra-work-days',
  reconciliationReport: '/api/v2/attendance-report/reconciliation',
  overtimeDetailsReport: '/api/v2/attendance-report/overtime-details',
  monthlyOvertimeSummaryReport: '/api/v2/attendance-report/monthly-overtime-summary',
  policyReport: '/api/v2/attendance-report/policy',
  employeeAttendancePolicyMappingReport: '/api/v2/attendance-report/employee-attendance-policy-mapping-report',
  employeeOtPolicyMappingReport: '/api/v2/attendance-report/employee-ot-policy-mapping-report',
  analysisTypeDropdown: '/api/v2/attendance-report/analysis-type-dropdown',
  rankingReportAnalysisTypeDropdown: '/api/v2/attendance-report/ranking-report-analysis-type-dropdown',
  terminalDropdown: '/api/v2/attendance-report/terminal-dropdown',
  approvalStatusDropdown: '/api/v2/attendance-report/approval-status-dropdown',

};

export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(attendanceApiPaths).forEach(([key, path]) => {
    const url = key === 'userLogin'
      ? `${SSO_URL}${path}`
      : `${BASE_URL}${path}`;

    apiMap[key] = { url };
  });

  return apiMap;
};
