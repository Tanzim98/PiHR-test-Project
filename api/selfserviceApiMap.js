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

const selfServiceApiPaths = {
    myAttendanceInTime:"/api/v2/my-attendances/in-time",
    myAttendanceOutTime:"/api/v2/my-attendances/out-time",
    getTodayAttendance:"/api/v2/my-attendances/today-attendance",
    getTodayBreakTime:"/api/v2/my-attendances/today-break-time",
    saveBreakTime:"/api/v2/my-attendances/save-break-time",
    getMyMovements:"/api/v2/my-attendances/my-movements",
    getCompanyAttendanceRules:"/api/v2/my-attendances/company-attendance-rules",

    //My Dashboard API
    createMyDashboardData:"/api/v2/my-dashboard/dashboard-data",
    getNotifications:"/api/v2/my-dashboard/notifications",
    getUpComingRosterPlan:"/api/v2/my-dashboard/upcoming-roster-plan",
    myDashboard:"/api/v2/my-dashboard",
    attendanceCalendar:"/api/v2/my-dashboard/attendance-calendar",
    flagWiseAttendanceCount:"/api/v2/my-dashboard/flag-wise-attendance-count",
    notices:"/api/v2/my-dashboard/notices",
    hierarchy:"/api/v2/my-dashboard/hierarchy",

    //My Document
    getEmployeeDocumentRequests:"/api/v2/my-document-request/get-employee-document-requests",
    getDocumentRequestByApplicationId:"/api/v2/my-document-request/get-document-request",

    //My Extra Time API
    getMyExtraTime:"/api/v2/my-extra-times",

    //My Shifts
    myShifts:"/api/v2/my-shifts",

    //My Shift Swap APi
    swappableShiftDropdown:"/api/v2/my-shifts-swappings/swappable-shift-dropdown",
    shiftSwappableEmployeeDropdown:"/api/v2/my-shifts-swappings/shift-swappable-employee-dropdown",
    requestingEmployeeDropdown:"/api/v2/my-shifts-swappings/requesting-employee-dropdown",
    shiftOffers:"/api/v2/my-shifts-swappings/shift-offers",
    myShiftRequest:"/api/v2/my-shifts-swappings/my-shift-requests",

    //SelfService Report API
    myAttendanceReport:"/api/v2/self-service-reports/my-attendance",
    myJobCard:"/api/v2/self-service-reports/my-job-card",
    monthlyAttendanceReport:"/api/v2/self-service-reports/subordinate-monthly-attendance",
    advanceSalaryStatement:"/api/v2/self-service-reports/my-advance-salary-statement",
    subordinateJobCard:"/api/v2/self-service-reports/subordinate-job-card",

    //Self Service Salary Report API
    claimReport:"/api/v2/self-service-salary-reports/claim-report",
}   

export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(selfServiceApiPaths).forEach(([key, path]) => {
    const url = key === 'userLogin'
      ? `${SSO_URL}${path}`
      : `${BASE_URL}${path}`;

    apiMap[key] = { url };
  });

  return apiMap;
};
