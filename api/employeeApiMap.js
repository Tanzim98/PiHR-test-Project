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
const employeeApiPaths = {
  // employee profile
  employeeProfileInfo: '/api/v2/employee-profiles/employee-information',
  employeeCard: '/api/v2/employee-profiles/employee-cards',
  emplyeeLifeEvent: '/api/v2/employee-profiles/life-events',
  employeeTaskOverview: '/api/v2/employee-profiles/employee-tasks-overview',
  
  // employee department
  getEmployeeDepartmentData: '/api/v2/employee/departments',
  employeeDepartment: '/api/v2/departments',
  deleteEmployeeDepartment: '/api/v2/departments/{department_id}',

  // employee department unit
  employeeDepartmentUnitDropdownData: '/api/v2/department-units/dropdown',
  employeeDepartmentUnit: '/api/v2/department-units',
  deleteEmployeeDepartmentUnit: '/api/v2/department-units/{department_unit_id}',

  // employee designation
  employeedesignations: '/api/v2/designations',
  getEmployeedesignationsById: '/api/v2/designations/{designation_id}',
  deleteEmployeedesignations: '/api/v2/designations/{designation_id}',
  employeedesignationsDropdown: '/api/v2/designations/dropdown',

  // employee designation groups
  employeedesignationsGroups: '/api/v2/designation-groups',
  deleteEmployeedesignationsGroups: '/api/v2/designation-groups/{designation_group_id}',
  employeedesignationsGroupsDropdown: '/api/v2/designation-groups/dropdown',
  
  // employee status
  employeeStatus: '/api/v2/employees/{employee_id}/statuses',
  
  // employee company divisions
  employeeCompanyDivisions: '/api/v2/company-divisions',
  createCompanyDivision: '/api/v2/company-divisions',
  updateCompanyDivision: '/api/v2/company-divisions',
  deleteCompanyDivision: '/api/v2/company-divisions/{company_division_id}',

  // Employee Document Category
  employeeDocumentCategory: '/api/v2/document-categories',
  employeeDocumentCategoryDropdown: '/api/v2/document-categories/dropdown',
  deleteEmployeeDocumentCategory: '/api/v2/document-categories/{document_category_id}',
  employeeDocumentCategoryById: '/api/v2/document-categories/{document_category_id}',

  // Employee Education Api
  emoloyeeEducation: '/api/v2/educations',
  emoloyeeEducationById: '/api/v2/educations/{education_id}',
  deleteEmployeeEducation: '/api/v2/educations/{education_id}',

  //Employee Education Grade divisons
   employeeEducationGradeDivisions: '/api/v2/education-grade-divisions',
   employeeEducationGradeDivisionsDropdown: '/api/v2/education-grade-divisions/dropdown',
   deleteEmployeeEducationGradeDivisions: '/api/v2/education-grade-divisions/{grade_id}',
   employeeEducationGradeDivisionsById: '/api/v2/education-grade-divisions/{grade_id}',

   // employee Education group
   employeeEducationGroups: '/api/v2/education-groups',
   employeeEducationGroupsDropdown: '/api/v2/education-groups/education-group-dropdown',
   deleteEmployeeEducationGroups: '/api/v2/education-groups/{education_group_id}',
   employeeEducationGroupsById: '/api/v2/education-groups/{education_group_id}',
  
   // employee education institute api
   employeeEducationInstitutes: '/api/v2/education-institutes',
   employeeEducationInstitutesDropdown: '/api/v2/education-institutes/dropdown',
   employeeEducationInstitutesById: '/api/v2/education-institutes/{institute_id}',
   deleteEmployeeEducationInstitutes: '/api/v2/education-institutes/{institute_id}',

   // employee supervisor api 
   getEmployeeSupervisorsByEmployeeId: '/api/v2/employees/{employee_id}/supervisors',
   getEmployeeSupervisorsBySupervisorId: '/api/v2/employees/supervisors/{supervisor_id}',
   employeeSupervisors: '/api/v2/employees/supervisors',
   deleteEmployeeSupervisors: '/api/v2/employees/{employee_id}/supervisors/{supervisor_id}',

  // employee job status api
   employeeJobStatuses: '/api/v2/job-status',
   employeeJobStatusesDropdown: '/api/v2/job-status/job-status-sli',
   deleteEmployeeJobStatuses: '/api/v2/job-status/{job_status_id}',

   // Employee job level api
   employeeJobLevels:'/api/v2/job-levels',
   employeeJobLevelDropdown:'/api/v2/job-levels/dropdown',
   deleteEmployeeJobLevels: '/api/v2/job-levels/{job_level_id}',

   // employeee job Base api
   employeeJobBases:'/api/v2/job-bases',
   employeeJobBaseDropdown:'/api/v2/job-bases/job-base-sli',
   deleteEmployeeJobBases: '/api/v2/job-bases/{job_base_id}',
   
   // employee job group api
   employeeJobGroups:'/api/v2/job-groups',
   deleteEmployeeJobGroups: '/api/v2/job-groups/{job_group_id}',

   // employee Organogram Api
    employeeOrganograms: '/api/v2/organograms',
    employeeOrganogramsById: '/api/v2/organograms/employee_details/{employee_id}',

   // Employee Status tobe effective api
    employeeStatusEffective : '/api/v2/status-to-be-effectives',
    getEmployeeStatusEffectiveById : '/api/v2/status-to-be-effectives/{status_effective_id}',
    deleteEmployeeStatusEffective : '/api/v2/status-to-be-effectives/{status_effective_id}',

  // Employee Approval Workflow Api
    employeeApprovalWorkflows : '/api/v2/approval-work-flows',
    getEmployeeApprovalWorkflowsById : '/api/v2/approval-work-flows/{work_flow_id}',
    deleteEmployeeApprovalWorkflows : '/api/v2/approval-work-flows/{work_flow_id}',
    updateEmployeeApprovalWorkflows : '/api/v2/approval-work-flows/{approval_work_flow_id}',
    getEmployeeApprovalWorkflowsDropdown : '/api/v2/approval-work-flows/dropdown',
    getEmployeeApprovalWorkflowApplicationTypeDropdown : '/api/v2/approval-work-flows/application-type-drop-down',
    getEmployeeApprovalWorkflowApproverTypeDropdown: '/api/v2/approval-work-flows/approver-type-dropdown',

  // employee Approval Work Flow Mapping Api
    employeeApprovalWorkFlowMapping : '/api/v2/approval-work-flow-mappings',
    getEmployeeApprovalWorkFlowMappingByID: '/api/v2/approval-work-flow-mappings/{work_flow_mapping_id}',
    updateEmployeeApprovalWorkflowMapping : '/api/v2/approval-work-flow-mappings/{work_flow_mapping_id}',
    deleteEmployeeApprovalWorkFlowMapping : '/api/v2/approval-work-flow-mappings/{work_flow_mapping_id}',

  // employee Asset Api
    employeeAssets : '/api/v2/asset',
    employeeAssetsDropdown: '/api/v2/asset/asset-dropdown',
    employeeAssetsStatusDropdown: '/api/v2/asset/asset-status-dropdown',
    employeeAssetsDistributionHistory : '/api/v2/asset/distribution-history',
    getAssetDetailsById : '/api/v2/asset/{asset_id}',
    getAssignedAssetsData: '/api/v2/asset/assigned',
    getCompanyAssetsData: '/api/v2/asset/company-assets',
    getAssetsAttachmentsById: '/api/v2/asset/download-attachment/{attachment_id}',
    getAssetImagesById: '/api/v2/asset/image-preview/{attachment_id}',
    deleteAssetById: '/api/v2/asset/{asset_id}',

  // employee Asset Category Api
    employeeAssetsCategory : '/api/v2/asset-category/categories',
    employeeAssetsCategoryDropdown : '/api/v2/asset-category/categories-sli',
    deleteEmployeeAssetsCategoryById : '/api/v2/asset-category/{asset_category_id}',
    getEmployeeAssetsCategoryAttachmentById : '/api/v2/asset-category/{asset_category_id}/attachment',
    downloadEmployeeAssetsCategoryAttachmentById : '/api/v2/asset-category/{asset_category_id}/download-attachment',
    assetCategoryPreviewURL: '/api/v2/asset-category/{asset_category_id}/preview-url',

  // Asset Distribution Api
    getAssetDistributionsData: '/api/v2/asset-distribution/distributed-assets',
    getAssetDistributionsCreateUpdateData: '/api/v2/asset-distribution/create-update',

  // Asset requisition Api
    employeeAssetRequisitions: '/api/v2/asset-requisition/employee-requisitions',
    getEmployeeAssetRequisitionsById: '/api/v2/asset-requisition/{asset_requisition_id}',
    getSubordinateAssetRequisitions: '/api/v2/asset-requisition/subordinate-requisitions',

  // asset report api
    employeeAssetReports: '/api/v2/asset-reports/generate-report',

  // Employee award type api
    employeeAwardType: '/api/v2/award-types',
    employeeAwardTypeDropdown: '/api/v2/award-types/dropdown',
    getEmployeeAwardTypeById: '/api/v2/award-types/{award_type_id}',

  // Employee Birhthday Notification Api
    employeeBirthdayNotification: '/api/v2/birthday-notification/birthday-notification-settings',
    employeeBirthdayNotificationReminderTypeDropdown: '/api/v2/birthday-notification/notification-reminder-type-dropdown',
    createBirthdayNotification: '/api/v2/birthday-notification',
    sendBirthdayNotification: '/api/v2/birthday-notification/send-notification',
    
  // Employee Accommodation Api
    employeeAccommodation: '/api/v2/employee-accommodations',
    getEmployeeAccommodationById: '/api/v2/employee-accommodations/{accommodation_id}',
    deleteEmployeeAccommodationById: '/api/v2/employee-accommodations/{accommodation_id}',
    downloadAccommodationAttachmentById: '/api/v2/employee-accommodations/{attachment_id}/download-attachment',

  // Employee Air Ticketing Api
    employeeAirTicketing: '/api/v2/employee-air-tickets',
    getEmployeeAirTicketingById: '/api/v2/employee-air-tickets/{air_ticket_id}',
    deleteEmployeeAirTicketingById: '/api/v2/employee-air-tickets/{air_ticket_id}',
    downloadAirTicketingAttachmentById: '/api/v2/employee-air-tickets/{attachment_id}/download-attachment',

  // Employee Api
    getEmployeesQRCode: '/api/v2/employee/qr-code',
    getEmployeeProfileData: '/api/v2/employee/profile',
    getEmployeeDepartmentData: '/api/v2/employee/departments',
    getEmployeeSubordinatesData: '/api/v2/employee/subordinates',
    getEmployeesData: '/api/v2/employee/employees',
    getEmployeesWithTalentData: '/api/v2/employee/employees-with-talent',
    getEmployeeSupervisorsData: '/api/v2/employee/supervisors',
    getEmployeeAdminUsersData: '/api/v2/employee/admin-users',
    getEmployeesByBranchData: '/api/v2/employee/employees-by-branch',
    getRosterEligibleEmployeesData: '/api/v2/employee/roster-eligible-employees',
    getPendingProfileImagesData: '/api/v2/employee/pending-profile-images',
    getDirectoryEmployeesData: '/api/v2/employee/directory-employees',
    getEmployeeFiltersData: '/api/v2/employee/employee-filters-sli',
    getPaginatedEmployeesData: '/api/v2/employee/paginated-employees',
    getEmployeeDataDropdown: '/api/v2/employee',
    getEmployeeById: '/api/v2/employee/{employee_id}',
    getEmploymentStatusDropdown: '/api/v2/employee/employment-status-dropdown',
    getEmployeeCode: '/api/v2/employee/employee_code',

    // Employee Award Api
    employeeAwards: '/api/v2/awards',
    getAwardDetailsById: '/api/v2/awards/{award_id}',

    // Employee Bank Account Api
    getAllBankAccounts: '/api/v2/employees/get-all-bank-accounts',
    getBankAccountsByEmployeeId: '/api/v2/employees/{employee_id}/bank-accounts',
    getBankAccountById: '/api/v2/employees/bank-accounts/{employee_bank_account_id}',

    // Employee Car Api
    employeeCar: '/api/v2/employee-cars',
    getEmployeeCarById: '/api/v2/employee-cars/{car_id}',
    downloadEmployeeCarAttachmentById: '/api/v2/employee-cars/{attachment_id}/download-attachment',

    // employee contact api
    employeeContactInfoById: '/api/v2/employees/{employee_id}/contacts',

    // employee dashboard api
    employeeDasboardStatusGraph: '/api/v2/employee-dashboards/load-job-status-graph',
    employeeDashboardMonthlyActiveGraph: '/api/v2/employee-dashboards/load-monthly-active-employee-graph',
    employeeDashboardReligionGraph: '/api/v2/employee-dashboards/load-religion-graph',
    employeeDashboardBranchBloodGroupGraph: '/api/v2/employee-dashboards/load-branch-blood-group-graph',
    
    // employee document api 
    getEmployeeDocumentsByEmployeeId: '/api/v2/employees/{employee_id}/documents',
    getEmployeeDocumentById: '/api/v2/employees/documents/{document_id}',
    getEmployeeDocumentCategoryDropdown: '/api/v2/employees/documents/document-category-sli',
    downloadEmployeeDocumentById: '/api/v2/employees/documents/{document_id}/download',

    // employee document request api
    getEmployeeDocumentRequest: '/api/v2/employee-document-request/get-document-request',
    getEmployeeDocumentRequestDetails: '/api/v2/employee-document-request/get-document-request-details',
    getEmployeeDocumentApplicationStatusDropdown: '/api/v2/employee-document-request/application-status-dropdown',

    // employee education api
    getEmployeeEducationsByEmployeeId: '/api/v2/employees/{employee_id}/educations',
    getEmployeeEducationById: '/api/v2/employees/educations/{emp_education_id}',
    getEmployeeEducationDropdown: '/api/v2/employees/educations/dropdown',

    // employee family details api
    getEmployeeFamilyDetailsByEmployeeId: '/api/v2/employees/{employee_id}/family-details',
    getEmployeeFamilyDetailsById: '/api/v2/employees/family-details/{family_details_id}',

    // employee health insurance api
    getEmployeeHealthInsurances: '/api/v2/health-insurances',
    getEmployeeHealthInsuranceById: '/api/v2/health-insurances/{health_insurance_id}',
    downloadEmployeeHealthInsuranceAttachmentById: '/api/v2/health-insurances/{attachment_id}/download-attachment',

    // employee insentive api
    employeeIncentives: '/api/v2/employee-incentives',
    getEmployeeIncentiveById: '/api/v2/employee-incentives/{incentive_id}',

    // employee language api
    getEmployeeLanguagesDropdown: '/api/v2/employees/languages/dropdown',
    getEmployeeLanguagesByEmployeeId: '/api/v2/employees/{employee_id}/languages',
    getEmployeeLanguageById: '/api/v2/employees/languages/{employee_language_id}',

    // employee mobile api
    getEmployeeMobiles: '/api/v2/employee-mobiles',
    getEmployeeMobileById: '/api/v2/employee-mobiles/{mobile_id}',
    downloadEmployeeMobileAttachmentById: '/api/v2/employee-mobiles/{attachment_id}/download-attachment',

    // employee passport api
    getEmployeePassportsByEmployeeId: '/api/v2/employees/{employee_id}/passports',
    getEmployeePassportById: '/api/v2/employees/passports/{passport_id}',
    downloadEmployeePassportAttachmentById: '/api/v2/employees/passports/{passport_id}/download',

    // employee report api 
    employeeReportsPosition: '/api/v2/employee-reports/position',
    employeeReportsProfile: '/api/v2/employee-reports/profile',
    employeeReportBlood: '/api/v2/employee-reports/religion_and_blood_group',
    employeeReportAlert: '/api/v2/employee-reports/alert',
    employeeReportContact: '/api/v2/employee-reports/contact',
    employeeReportMonthWiseJoiningDismissEmployee: '/api/v2/employee-reports/month-wise-joining-dismiss-employee',
    employeeReportAgeOrServiceLength: '/api/v2/employee-reports/age-or-service-length',
    employeeReportSupervisorAndLeaveApprover: '/api/v2/employee-reports/supervisor-and-leave-approver',
    employeeReportTransferHistory: '/api/v2/employee-reports/transfer-history',
    employeeReportPassportAndVisa: '/api/v2/employee-reports/passport-and-visa',
    employeeReportTemplateReport: '/api/v2/employee-reports/template-report',
    employeeReportExpirationCheckDropdown: '/api/v2/employee-reports/expiration-check-dropdown',
    employeeReportTemplateDropdown: '/api/v2/employee-reports/template-dropdown',
    employeeReportEmployeeOrderByDropdown: '/api/v2/employee-reports/employee-order-by-dropdown',

    // employee status api
    employeeStatuses: '/api/v2/employees/{employee_id}/statuses',
    employeeLocationChangeHistory: '/api/v2/employees/{employee_id}/location-change-history',
    employeeJobStatusChangeHistory: '/api/v2/employees/{employee_id}/job-status-change-history',
    employeeJobBaseChangeHistory: '/api/v2/employees/{employee_id}/job-base-change-history',
    employeeCategoryChangeHistory: '/api/v2/employees/{employee_id}/employee-category-change-history',
    employeeDesignationChangeHistory: '/api/v2/employees/{employee_id}/employee-designation-change-history',
    employeeJobLevelChangeHistory: '/api/v2/employees/{employee_id}/job-level-change-history',
    employeeFunctionalDesignationChangeHistory: '/api/v2/employees/{employee_id}/functional-designation-change-history',

    // employee talent api
    getEmployeeTalentsByEmployeeId: '/api/v2/employees/{employee_id}/talents',
    getEmployeeTalentsByEmployeeIds: '/api/v2/employees/talents-by-employee-ids',
    getEmployeeTalentById: '/api/v2/employees/talents/{talent_id}',

    // employee visa api
    employeeVisa: '/api/v2/employees/{employee_id}/visas/{passport_id}/visas',
    getEmployeeVisaById: '/api/v2/employees/visas/{visa_id}',
    getEmployeeVisaTypeDropdown: '/api/v2/employees/visas/visa-type-dropdown',
    downloadEmployeeVisaAttachmentById: '/api/v2/employees/visas/{visa_id}/download',

    // employee warning api 
    employeeWarning: '/api/v2/employee-warning',
    employeeWarningById: '/api/v2/employee-warning/{warning_id}',
    employeeWarningGetImageAttachment: '/api/v2/employee-warning/get-image-attachment',
    employeeWarningDownloadAttachment: '/api/v2/employee-warning/download-attachment',
    employeeWarningShowReport: '/api/v2/employee-warning/show-employee-warning-report',

    // employee work experience api
    employeeWorkExperience: '/api/v2/employee/{employee_id}/experiences',

    // employee employment category api
    employmentCategoriesDropdown: '/api/v2/employment-categories/dropdown',
    employmentCategories: '/api/v2/employment-categories',

    // employee functional designation api
    functionalDesignations: '/api/v2/functional-designations',
    functionalDesignationById: '/api/v2/functional-designations/{functional_designation_id}',
    functionalDesignationsDropdown: '/api/v2/functional-designations/dropdown',

    // employee task api
    employeeTasktStatus: '/api/v2/task/task-status',
    employeeTaskCreateUpdate: '/api/v2/task/create-update',
    employeeTaskInfoDropdown: '/api/v2/task/customer-info-sli',
    employeeTaskIsCheckInEnabled: '/api/v2/task/is-check-in-enabled',
    employeeTaskCustomerBranchDropdown: '/api/v2/task/customer-branch-dropdown',
    employeeTaskAdminTasks: '/api/v2/task/admin-tasks',
    employeeTaskEmployeeTasks: '/api/v2/task/employee-tasks',
    employeeTaskById: '/api/v2/task/{task_id}',

    // employee talent type api
    talentTypesDropdown: '/api/v2/talent-types/dropdown',
    talentTypes: '/api/v2/talent-types',

    // employee task category api
    taskCategories: '/api/v2/task-categories',
    taskCategoriesDropdown: '/api/v2/task-categories/dropdown',
    taskCategoriesById: '/api/v2/task-categories/{category_id}',

    // employee task priority api
    taskPriorities: '/api/v2/task-priorities',
    taskPrioritiesDropdown: '/api/v2/task-priorities/dropdown',
    taskPrioritiesById: '/api/v2/task-priorities/{task_priority_id}',

    // employee task report api
    taskReportPdfExcel: '/api/v2/task-report/report-pdf-excel',
    taskReportCustomerBranchDropdown: '/api/v2/task-report/customer-branch-dropdown',

    // employee task status api
    taskStatus: '/api/v2/task-status',
    taskStatusDropdown: '/api/v2/task-status/dropdown',
    taskStatusById: '/api/v2/task-status/{task_status_id}',

    // employee tracking and monitoring api
    trackingMonitoringFilterTrackedUsers: '/api/v2/tracking-monitoring/filter-tracked-users',
    trackingMonitoringEmployeeLiveTracking: '/api/v2/tracking-monitoring/employee-live-tracking/{employee_id}',
    trackingMonitoringEmployeeTrackHistory: '/api/v2/tracking-monitoring/employee-track-history',

    // employee tracking enables api
    trackingEnables: '/api/v2/tracking-enables',
    trackingEnablesAlreadyActiveTrackedUsers: '/api/v2/tracking-enables/already-active-tracked-users',
    
    // employee tracking history reports api
    trackingHistoryReports: '/api/v2/tracking-history-reports',

    // employee tracking schedule api
    trackingSchedules: '/api/v2/tracking-schedules',
    trackingSchedulesById: '/api/v2/tracking-schedules/{tracking_schedule_id}',
    trackingSchedulesMappingsById: '/api/v2/tracking-schedules/mappings/{tracking_schedule_id}',

    // employee travel allowance api
    travelAllowances: '/api/v2/travel-allowances',
    travelAllowancesById: '/api/v2/travel-allowances/{travel_allowance_id}',

    // employee warning type api
    warningTypes: '/api/v2/warning-types',
    warningTypesDropdown: '/api/v2/warning-types/dropdown',
    warningTypesById: '/api/v2/warning-types/{warning_type_id}',

    // company wings api
    wings: '/api/v2/wings',
    wingsDropdown: '/api/v2/wings/wing-sli',
    wingsById: '/api/v2/wings/{wing_id}',

    // employee birthday notification api
    employeeBirthdays: '/api/v2/employee-birthday/birthdays',
    employeeBirthdayWishes: '/api/v2/employee-birthday/wishes',
    employeeBirthdayWish: '/api/v2/employee-birthday/wish',

};
export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(employeeApiPaths).forEach(([key, path]) => {
    // For now, all paths are prefixed with BASE_URL
    const url = `${BASE_URL}${path}`;
    apiMap[key] = { url };
  });

  return apiMap;
};
