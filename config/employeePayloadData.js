export const employeeProfileGetPayload = {
  employee_id: 27027,
};
// employee department payloads
export const departmentCreatePayload = {
  department_code: "QA test",
  name: "Test QA",
  description: "test",
  status_id: 1,
};

export const updateDepartmentPayload = {
  department_code: "QA update",
  name: "Test QA",
  description: "QA test",
  status_id: 1,
  department_id: "{{department}}",
};

// employee division payloads
export const divisionCreatePayload = {
  division_name: "QA Division",
};

export const updateDivisionPayload = {
  division_name: "QA Division update",
  company_division_id: "{{division}}",
};

// employee deparment unit payloads
export const departmentUnitCreatePayload = {
  unit_name: "New QA Unit",
  status_id: 1,
};
export const updateDepartmentUnitPayload = {
  unit_name: "New QA Unit update",
  status_id: 1,
  unit_id: "{{department_unit}}",
};

// employee designation payloads
let currentDesignationPosition = null;
let currentDesignationCode = null;

export function getDesignationCreatePayload() {
  currentDesignationPosition = 3001 + Math.floor(Math.random() * 3000);
  currentDesignationCode = `QA${Date.now().toString().slice(-6)}`;
  return {
    designation_name: `QA Engineer ${currentDesignationCode}`,
    short_name: "SQA",
    designation_code: currentDesignationCode,
    description: "QA testing designation",
    position: currentDesignationPosition,
    designation_formed_date: "01-01-2026",
    status_id: 1,
    designation_group_id: 1091,
  };
}

export function getDesignationUpdatePayload() {
  return {
    designation_name: `QA Engineer ${currentDesignationCode}`,
    short_name: "SQA",
    designation_code: currentDesignationCode,
    description: "QA testing",
    position: currentDesignationPosition,
    designation_formed_date: "01-02-2026",
    status_id: 1,
    designation_group_id: 1091,
    designation_id: "{{designation}}",
  };
}

// employee designation group payloads
export const designationGroupCreatePayload = {
  name: "QA test group",
  status_id: true,
};
export const updateDesignationGrouppayload = {
  name: "QA test group update",
  status_id: true,
  designation_group_id: "{{designation_group}}",
};

// Emplyee Documnet category Payloads
export const documentCategoryCreatePayload = {
  name: "visa",
  description: "visa documnets",
};
export const documentCategoryUpdatePayload = {
  document_category_id: "{{document_category}}",
  name: "visa updated",
  description: "visa documnets updated",
};

// Employee Education payloads
export const educationCreatePayload = {
  education_group_id: 42,
  name: "SQA Bachelors",
  description: "Bachelors degree in SQA",
  status_id: 1,
};
export const educationUpdatePayload = {
  education_group_id: 42,
  name: "SQA Bachelors updated",
  description: "Bachelors degree in SQA updated",
  status_id: 1,
  education_id: "{{education}}",
};

// Employee Education Grade Division Payloads
export const educationGradeDivisionCreatePayload = {
  name: "QA Grade",
  description: "Marks obtained 70% to 79.99%",
  grade_point: 4,
  grade_hierarchy: 10,
};
export const educationGradeDivisionUpdatePayload = {
  grade_id: "{{grade_division}}",
  name: "QA Grade Updated",
  description: "Marks obtained 80% to 89.99%",
  grade_point: 5,
  grade_hierarchy: 9,
};

// employee education group payloads
export const educationGroupCreatePayload = {
  name: "SQA",
  status_id: 1,
};
export const educationGroupUpdatePayload = {
  education_group_id: "{{education_group}}",
  name: "SQA Updated",
  status_id: 1,
};

// employee educational institute payloads
export const educationInstitutesCreatePayload = {
  name: "SQA College",
  address: "banani dhaka",
};
export const educationInstitutesupdatePayload = {
  institute_id: "{{institute}}",
  name: "SQA university",
  address: "Ahmed tower dhaka",
};

// employee supervisor payloads
export const getSupervisorIdPayload = {
  employee_id: 13365,
};
export const employeeSupervisorSetPayload = {
  employee_id: 13365,
  supervisor_employee_id: 1256,
  is_direct_supervisor: true,
  effective_date: "01-01-2026",
};
export const employeeSupervisorUpdatePayload = {
  employee_id: 13365,
  supervisor_employee_id: 1256,
  is_direct_supervisor: false,
  effective_date: "02-01-2026",
  supervisor_id: "{{supervisor}}",
};

// employee job status payloads
export const jobStatusCreatePayload = {
  status_code: "Q",
  status_description: "Software Quality Assurance",
  employment_status_id: true,
};
export const jobStatusUpdatePayload = {
  status_code: "Q",
  status_description: "Software Quality Assurance updated",
  employment_status_id: false,
  job_status_id: "{{job_status}}",
};

// employee job level paylaods
export const jobLevelCreatePayload = {
  job_level_code: "QA-l-2",
  name: "QA Engineer",
  description: "Software QA Engineer",
  position: 10,
  status_id: 1,
};
export const jobLevelUpdatePayload = {
  job_level_code: "QA-l-II",
  name: "SQA Engineer",
  description: "Software QA Engineer updated",
  position: 10,
  status_id: 1,
  job_level_id: "{{job_level}}",
};

// employee job base payloads
export const jobBaseCreatePayload = {
  job_base_id: 1,
  job_base_code: "SQA",
  name: "Software Quality Assurance",
  is_system_required: true,
};
export const jobBaseUpdatePayload = {
  job_base_code: "QA",
  name: "Quality Assurance",
  is_system_required: false,
  job_base_id: "{{job_base}}",
};

// employee job group payloads
export const jobGroupCreatePayload = {
  job_group_code: "SQA",
  name: "Software QA Group",
  description: "Group for Software QA Engineers",
  status_id: 1,
};
export const jobGroupUpdatePayload = {
  job_group_code: "QA",
  name: "Software QA Group",
  description: "Group for Software QA updated",
  status_id: 0,
  job_group_id: "{{job_group}}",
};

// employee status tobe effective payload
export const employeeStatusEffectiveDataSetPayload = {
  employee_id: 13365,
  status_type: 2,
  status_id: 15,
  effective_date: "01-01-2026",
  notification_days: 30,
  remarks: "Testing",
};
export const employeeStatusEffectiveDataUpdatePayload = {
  status_effective_id: "{{status_effective_id}}",
  employee_id: 13365,
  status_type: 1,
  status_id: 15,
  effective_date: "02-01-2026",
  notification_days: 40,
  remarks: "Update test",
};

// Employee Approval Workflow payloads
export const employeeApprovalWorkflowCreatePayload = {
  approval_work_flow: {
    work_flow_id: "0",
    work_flow_name: "QA Approval Workflow",
    remarks: "Workflow for QA processes",
    steps: 0,
    is_system_reserved: true,
  },
  approval_work_flow_details: [
    {
      work_flow_detail_id: 0,
      step_no: 1,
      approver_type: 2,
      approvers_list: "string",
      can_approve: true,
      auto_approve: true,
    },
  ],
  deleted_details_ids: [0],
};

export const employeeApprovalWorkflowUpdatePayload = {
  approval_work_flow: {
    work_flow_id: "{{work_flow_id}}",
    work_flow_name: "SQA Approval Workflow",
    remarks: "Workflow for SQA processes",
    steps: 0,
    is_system_reserved: true,
  },
  approval_work_flow_details: [
    {
      work_flow_detail_id: "{{work_flow_detail_id}}",
      step_no: 1,
      approver_type: 0,
      approvers_list: "string",
      can_approve: true,
      auto_approve: true,
    },
  ],
  deleted_details_ids: [0],
};

// Employee Assets payloads
export const employeeAssetsGetPayload = {
  asset_id: 40,
};

// Employee Asset Category payloads
export const employeeAssetCategoryCreatePayload = {
  asset_category_id: 9,
};
//  asset distribution payloads can be added here when needed
export const employeeAssetDistributionGetPayload = {
  distribution_id: 8630,
};

// asset requisition payloads
export const employeeAssetRequisitionGetPayload = {
  asset_requisition_id: 2064,
};

// asset report payloads
export const employeeAssetReportPayload = {
  from_date: "01-01-2020",
  to_date: "01-03-2025",
  asset_id: 73,
};

// employee award type payloads
export const employeeAwardTypeCreatePayload = {
  award_type_name: "Best QA",
  description: "Delivered bug free software",
};
export const employeeAwardTypeUpdatePayload = {
  award_type_id: "{{award_type_id}}",
  award_type_name: "Best SQA",
  description: "Delivered bug free software",
};

// Employee Birthday Notification payloads
export const employeeBirthdayNotificationCreatePayload = {
  selected_employees: "13365",
  send_reminder: true,
  reminder_receiver: "string",
  reminder_days: 1,
  reminder_type: 2,
  send_birthday_mail: true,
  birthday_notifiers: 1,
};

// accomodation payloads can be added here when needed
export const employeeAccommodationGetPayload = {
  accommodation_id: 7,
};
export const employeeAccommodationAttachmentPayload = {
  attachment_id: 1024,
};
// air ticketing payloads can be added here when needed
export const employeeAirTicketingGetPayload = {
  air_ticket_id: 8,
};
export const employeeAirTicketingAttachmentPayload = {
  attachment_id: 1027,
};

// Employee Api payload
export const employeeIdPayload = {
  employee_id: 13365,
};
export const employeeSupervisorPayload = {
  supervisor_id: 13365,
};
export const employeeBranchPayload = {
  branch_id: 2258,
};
export const employeeCodePayload = {
  employee_code: "00000136",
};
// employee award payloads
export const employeeAwardCreatePayload = {
  award_id: 181,
};

// employee bank account payloads
export const employeeBankAccountPayload = {
  employee_id: 1056,
};
export const employeeBankAccountByIdPayload = {
  employee_bank_account_id: 13181,
};
// employee car payloads
export const employeeCarByIdPayload = {
  car_id: 5,
};
export const employeeCarAttachmentPayload = {
  attachment_id: 1024,
};
// employee documnet payloads
export const employeeDocumentPayload = {
  employee_id: 1056,
};
export const documentIdPayload = {
  document_id: 12186,
};
export const documentApplicationIdPayload = {
  application_id: 1,
};

// employee education payloads
export const employeeEducationIdPayload = {
  employee_id: 1056,
};
export const employeeEducationByIdPayload = {
  emp_education_id: 10001,
};

// employee family details payloads
export const employeeFamilyDetailsByPayload = {
  employee_id: 1056,
};
export const employeeFamilyDetailsByIdPayload = {
  family_details_id: 14899,
};

// employee health insurance payloads
export const employeeHealthInsuranceByIdPayload = {
  health_insurance_id: 11,
};
export const employeeHealthInsuranceAttachmentPayload = {
  attachment_id: 1024,
};
// employee incentive payloads
export const employeeIncentiveByIdPayload = {
  incentive_id: 27,
};

//employee language payloads
export const employeeLanguageByIdPayload = {
  employee_language_id: 3838,
};

// employee mobile payloads
export const employeeMobileByIdPayload = {
  mobile_id: 24,
};
export const employeeMobileAttachmentPayload = {
  attachment_id: 1030,
};

// employee passport payloads
export const employeePassportByIdPayload = {
  passport_id: 440,
};
export const employeePassportAttachmentPayload = {
  passport_id: 1045,
};

// employee report payload placeholders (fill with real report criteria later)
export const employeeReportByBranchPayload = {
  branch_id: 7512,
};
export const employeeReportContactPayload = {
  branch_id: 7512,
  department_id: 19,
};
export const employeeReportMonthWiseJoiningDismissEmployeePayload = {
  branch_id: 7512,
  department_id: 19,
  from_date: "01-01-2023",
  to_date: "01-03-2025",
};
export const employeeReportAgeOrServiceLengthPayload = {
  age_from: 20,
  age_to: 40,
  branch_id: 7512,
  department_id: 19,
  from_date: "01-01-2022",
  to_date: "01-03-2025",
};
export const employeeReportidPayload = {
  report_id: 2,
};
// employee talent payloads
export const employeeTalentByIdPayload = {
  talent_id: 435,
};

// employee visa payloads
export const employeeVisaByPassportPayload = {
  employee_id: 1056,
  passport_id: 440,
};
export const employeeVisaByIdPayload = {
  visa_id: 900,
};

// employee warning payloads
export const employeeWarningByIdPayload = {
  warning_id: 376,
};
export const employeeWarningDownloadAttachmentPayload = {
  attachment_id: 456,
};

// employee functional designation payloads
export const functionalDesignationByIdPayload = {
  functional_designation_id: 14,
};

// employee task API payloads

export const employeeTaskIdPayload = {
  task_id: 2,
};

export const employeeTaskIsCheckInEnabledPayload = {
  task_category_id: 1442,
};

export const employeeTaskCustomerBranchDropdownPayload = {
  customer_id: 10102,
};

export const taskCategoriesByIdPayload = {
  category_id: 1442,
};

export const taskPrioritiesByIdPayload = {
  task_priority_id: 4,
};

// employee task status payloads
export const taskStatusByIdPayload = {
  task_status_id: 2,
};

// employee task report payloads

export const taskReportPayload = {
  customer_id: 10102,
};

// tracking & monitoring payloads

export const trackingMonitoringEmployeeIdPayload = {
  employee_id: 22853,
};
export const trackingMonitoringBranchIdPayload = {
  branch_id: 2258,
};

// employee tracking history reports payloads
export const trackingHistoryReportsPayload = {
  employee_id: 1056,
  start_date_time: "01-01-2025",
  end_date_time: "01-06-2025",
};

// tracking schedules payloads
export const trackingSchedulesMappingsByIdPayload = {
  tracking_schedule_id: 366,
};

// travel allowances payloads
export const travelAllowancesByIdPayload = {
  travel_allowance_id: 11,
};

// warning types payloads
export const warningTypesByIdPayload = {
  warning_type_id: 267,
};

// company wings payloads
export const wingsPayload = {
  company_id: 2,
};

export const wingsByIdPayload = {
  wing_id: 1067,
};

// employee birthdays payloads

export const employeeBirthdayWishIdPayload = {
  birthday_wish_id: 0,
};