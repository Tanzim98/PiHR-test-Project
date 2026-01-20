//***************************  Salary : AdjustmentPurposeApi    ************************* */
// Create payload
export const createAdjustmentPurposePayload = {
  "adjustment_purpose_name": "QA Salary New 2",
};

// Update payload
export const updateAdjustmentPurposePayload = {
  "adjustment_purpose_id": "{{adjustment_purpose}}",
  "adjustment_purpose_name": "QA Test Updated 2",
};
export const deleteAdjustmentPurposePayload = {
  "adjustment_purpose_id": "{{adjustment_purpose}}",
};
// Get / Delete by ID payload
export const salaryIdPayload = {
 "adjustment_purpose_id": "{{adjustment_purpose}}",
};

// Payload for creating a new advance salary
export const createAdvanceSalaryPayload = {
  employee_id: 27027,         
  advance_salary_amount: 5000, 
  duration_month: 3,            
  payment_start_month: 12,      
  payment_start_year: 2026,     
  payment_method: 1,           
  application_status: 1,        
  due_amount: 5000,            
  remarks: "Urgent request"    
};

export const advanceSalaryById = {
  employee_id: 276,
};
// Payload for existing advance salary / Summary for advance Salary / All Attachment
export const advanceSalaryDataPayload = {
  advance_salary_id:"{{advance_salary}}",
};
// Payload for advance salary Overlap
export const advanceSalaryOverlapPayload = {
  advance_salary_id:"{{advance_salary}}",
  month: 11,
  year: 2025,
};

// Payload for updating an existing advance salary
export const updateAdvanceSalaryPayload = {
  advance_salary_id: 101,       
  employee_id: 276,           
  advance_salary_amount: 6000,  
  duration_month: 4,
  payment_start_month: 1,
  payment_start_year: 2026,
  payment_method: 1,
  application_status: 2,    
  due_amount: 6000,
  remarks: "Updated request"
};


// Query params for GET all adjustment purposes
export const getAllAdjustmentPurposesQuery = {
  page_size: 50, 
  page_number: 1, 
  q: "",
};

//Create Advance Salary Policy
export const createSalaryPolicyPayload = {
  "maximum_advance_salary_month": 80000,
  "is_supervisor_notify": true
};

//***************************  Salary : AttendanceBasedAllowancePolicyApi    ************************* */

//Create Attendance Based Allowance Policy
export const createAttendanceAllowancePolicyPayload = {
  "policy_name": "QA Policy1",
  "attendance_flags": "3",
  "salary_ratio_or_amount": 50000,
  "allowance_type": 1,
  "calculate_on": 1
}
//Update Attendance Based Allowance Policy
export const updateAttendanceAllowancePolicyPayload = {
  "policy_name": "QA Policy Updated",
  "attendance_flags": "2",
  "salary_ratio_or_amount": 50000,
  "allowance_type": 1,
  "calculate_on": 1,
  "attendance_allowance_policy_id": "{{allowance_policy}}",
}

//***************************  Salary : AttendanceBasedAllowancePolicyMappingApi   ************************* */
export const createAttendanceAllowancePolicyMappingPayload = {
  "attendance_allowance_policy_id": "{{allowance_policy}}",
  "branch_id": "{{branch}}",
  "department_id": "{{department}}",
  "employee_id": 27027
}
export const updateAttendanceAllowancePolicyMappingPayload = {
  "attendance_allowance_policy_id": "{{allowance_policy}}",
  "branch_id": "{{branch}}",
  "department_id": "{{department}}",
  "employee_id": 1256,
  "attendance_allowance_policy_mapping_id": "{{attendance_allowance_policy_mapping}}"
}

// Delete Attendance Based Allowance Policy Mapping Payload
export const deleteAttendanceAllowancePolicyMappingPayload = {
  "policy_mapping_id": "{{attendance_allowance_policy_mapping}}"
}

//***************************  Salary : BankApi   ************************* */
//Create Bank Payload
export const createNewBankPayload ={
  "bank_name": "City Bank",
  "bank_account_name": "PiHR Ltd",
  "bank_account_no": "1071070290982",
  "bank_account_routing_no": "00002",
  "bank_address": "Ahmed Tower, 11th Floor",
}
//Update Bank Payload
export const updateBankPayload ={
  "bank_name": "City Bank",
  "bank_account_name": "Vivasoft Ltd",
  "bank_account_no": "1071070290982",
  "bank_account_routing_no": "00002",
  "bank_address": "Ahmed Tower, 11th Floor",
  "bank_id": "{{bankApi}}",
}

//Find By Bank ID Payload
export const findByBankIdPayload ={
  "bank_id": "{{bankApi}}"
}

//***************************  Salary : Bonus Generation Api   ************************* */

//Download Bonus Template Payload
export const downloadAndGenerateBonusPayload = {
  bonus_id: 3,
  bonus_date_string: "26-09-2026",
  calculation_policy_id: 3,
  remarks: "Bonus generated for employee",
  employee_id: 27027,
  branch_id: 2,
  religion_id: 2,
  unit_id: 2,
  wing_id: 2,
};

//***************************  Salary : Bonus Modification Api   ************************* */
//Get Get bonus for employee by bonus id
export const getBonusByEmployeeAndBonusIdPayload = {
  employee_id: 32,
  bonus_id: 645,
};

//***************************  Salary : Bonus Policy Api   ************************* */
//Create Bonus Policy Payload
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const createBonusPolicyPayload = {
  is_partial_bonus_exist: true,
  minimum_service_length: getRandomNumber(1, 5),
  service_length_for_full_bonus: getRandomNumber(6, 9),
  is_consider_month: true
};

//***************************  Salary : Bonus Setup API   ************************* */
//Create Bonus Setup Payload
export const createBonusSetupPayload = {
  "bonus_setup_id": 0,
  "bonus_year": 2026,
  "bonus_type_id": 494,
  "salary_year": 2026,
  "salary_month": 2,
  "is_consider_gross_salary": true,
  "percentage": 50
};
//Update Bonus Setup Payload
export const updateBonusSetupPayload = {
  "bonus_setup_id": "{{bonus_setup}}",
  "bonus_year": 2026,
  "bonus_type_id": 495,
  "salary_year": 2026,
  "salary_month": 6,
  "is_consider_gross_salary": false,
  "percentage": 40
};
//Get by ID payload
export const getBonusSetupByIdPayload = {
 "bonus_setup_id": 41, 
};

//***************************  Salary : Bonus Transfer API   ************************* */
//Get All Bonus Transfers Payload
export const updateBonusTransferPayload = {
  "transfer_date_string": "string",
  "bonus_ids": [
    0
  ]
};

//***************************  Salary : Claim API   ************************* */
export const getClaimByIdPayload = {
"claim_id": 435818,
attachment_id:45017,
}

//***************************  Salary : Claim Category Api   ************************* */
//CLaim Category APi Payload
export const claimCategoryIdPayload = {
 "claim_category_id":61,
 "employee_id":27027,
};
export const claimEmployeeIdPayload = {
 "employee_id":27027,
};

//***************************  Salary : Salary Report   ************************* */
//Salary Pay Slip Report Payload
export const salaryPaySlipReportPayload = {
  "employee_id": 27027,
  "branch_id": 2,
  "wing_id": 2026,
  "department_id": 2,
  "company_division_id": 2,
  "export_as_excel": "true",
  "show_double": "false",
  "is_self_service": "true",
  "salary_year": 2025,
  "salary_month": 3,
}
// Salary Certificate Report Payload
export const salaryCertificateReportPayload = {
  "employee_id": 27027,
  "wing_id": 2026,
  "branch_id": 2,
  "department_id": 2,
  "company_division_id": 2,
  "is_signatory_include": "false",
  "enable_sign_seal": "true",
  "report_template_id": 25,
  "export_as_excel": "false",
  "salary_year": 2025,
  "salary_month": 3,
}
// Salary Analysis Report Payload
export const salaryAnalysisReportPayload = {
  payment_type: 1,
  is_signatory_include: false,
  enable_sign_seal: true,
  is_verified_only: false,
  branch_id: 2,
  department_id: 2,
  export_as_excel: "false",
  wing_id: 2026,
  order_by: "employee_name",
  group_by_branch: "true",
  group_by_department: "false",
  unit_id: 2,
  designation_id: 2,
  show_details: "true",
  salary_year: 2025,
  salary_month: 3,
}
// Salary analysis top sheet report Payload
export const salaryAnalysisTopSheetReportPayload = {
  payment_type: 1,
  is_signatory_include: false,
  enable_sign_seal: true,
  group_by_department: "true",
  is_verified_only: false,
  branch_id: 2,
  wing_id: 2026,
  salary_year: 2025,
  salary_month: 3,
}
// Salary Payment Dates Report Payload
export const salaryPaymentDatesReportPayload = {
 department: 2,
 salary_year: 2025,
 salary_month: 3,
}
// Salary Transfer Report Payload
export const salaryTransferReportPayload = {
  report_type_id: 1,
  is_signatory_include: "false",
  enable_sign_seal: "true",
  header_view_option: "false",
  selected_dates: "23-03-2025",
  source_bank_id:2,
  branch_id: 2,
  bank_id: 2,
  unit_id: 2,
  wing_id: 2026,
  export_as_excel: "false",
  salary_year: 2025,
  salary_month: 3,
}
//  Salary Bank Forwarding Report Payload
export const salaryBankForwardingReportPayload = {
  report_type_id: 1,
  header_view_option: "false",
  selected_dates: "23-03-2025",
  branch_id: 2,
  bank_id: 2,
  unit_id: 2,
  wing_id: 2026,
  report_template_id: 2,
  salary_year: 2025,
  salary_month: 3,
}
//  Bonus Statment Payload
export const bonusStatementPayload ={
  employee_id: 27027,
  branch_id: 2,
  department_id: 2,
  company_division_id: 2,
  wing_id: 2026,
  export_as_excel: "false",
  salary_year: 2025,
  salary_month: 3,
}
// Salary Bonus Analysis Report Payload
export const salaryBonusAnalysisReportPayload = {
  bonus_id: 3,
  employee_id: 27027,
  branch_id: 2,
  department_id: 2,
  unit_id: 2,
  wing_id: 2026,
  order_by: "employee_name",
  export_as_excel: "false",
}
//current salary structure payload
export const currentSalaryStructurePayload={
  division_id:2,
  branch_id: 2,
  department_id: 2,
  show_unassigned_employee: "true",
  employee_id: 27027,
  wing_id: 2026,
  export_as_excel: "false",
}
// Salary Stracture History Payload
export const salaryStructureHistoryPayload={
  employee_id: 27027,
  export_as_excel: "false",
}
// Monthly Advance Salary Report Payload
export const monthlyAdvanceSalaryReportPayload={
  year: 2026,
  month: 3,
  employee_id: 27027,
  branch_id: 2,
  department_id: 2,
  wing_id: 2026,
  designation_id: 2,
  export_as_excel: "false",
}
// Salary Increment Payload 
export const salaryIncrementPayload={
  wing_id: 2026,
  employee_id: 27027,
  branch_id: 2,
  department_id: 2,
  designation_id: 2,
  from_date: "01-02-2025",
  to_date: "28-02-2025",
  include_initial_salary: "true",
  export_as_excel: "false",
}
// Salary Consolidate Report Payload
export const salaryConsolidateReportPayload={
  employee_id: 27027,
  branch_id: 2,
  payment_type: 1,
  department_id: 2,
  is_verified_only: "false",
  salary_from_year: 2025,
  salary_to_year: 2025,
  salary_from_month: 1,
  salary_to_month: 3,
  wing_id: 2026,
  export_as_excel: "false",
}
// Salary Compare Report Payload
export const salaryCompareReportPayload={
  wing_id: 2026,
  employee_id: 27027,
  salary_from_year: 2025,
  salary_to_year: 2025,
  salary_from_month: 1,
  salary_to_month: 3,
  export_as_excel: "false",
}
// Salary Adjustment Report Payload
export const salaryAdjustmentReportPayload={
  wing_id: 2026,
  employee_id: 27027,
  salary_year: 2025,
  salary_month: 3,
  division_id:2,
  branch_id: 2,
  department_id: 2,
  adjustment_purpose_ids: [1,2],
  export_as_excel: "false",
}
// Advance Salary Statment Payload
export const advanceSalaryStatementPayload={
  advance_salary_id: 16917,
}
// Claim Report Payload
export const claimReportPayload={
  wing_id: 2026,
  branch_id: 2,
  employee_id: 27027,
  from_date: "01-02-2025",
  to_date: "28-02-2025",
  claim_category_ids: [1,2],
  claim_status_ids: [1,2],
  is_summary: "false",
  signature_available: "true",
  date_filtration_type: 1,
  export_as_excel: "false"
}
// Claim Details Double Report Payload
export const claimDetailsDoubleReportPayload={
  claim_id: 435818,
}
// Claim Details Report Payload
export const claimDetailsReportPayload={
  claim_id: 435818,
}
// Category Wise Claim Summary Report
export const categoryWiseClaimSummaryReportPayload={
  from_date: "01-02-2025",
  to_date: "28-02-2025",
  wing_id: 2026,
  employee_id: 27027,
  category_ids: [1,2],
  status_ids: [1,2]
}
// Adjustment Purpose Report Payload  
export const adjustmentPurposeReportPayload = {
salary_year: 2025,
salary_month: 3,
} 
// Gratuity Report Payload
export const gratuityReportPayload = {
export_as_excel: "false",
payment_status: 1,
employee_id: 27027,
branch_id: 2,
wing_id: 2026,
department_id: 2,
}
// Salary Deduction Report
export const salaryDeductionPayload = {
wing_id:2026,
employee_id:27027,
company_division_id:2,
branch_id:2,
department_id:2,
export_as_excel:"false",
analysis_type:"Employee",
salary_year:2025,
salary_month:3,
}
//Employee Wise Cash distributed salary report Payload
export const cashDistributedSalaryPayload = {
employee_id: 27027,
wing_id: 2026,
branch_id: 2,
department_id: 2,
company_division_id: 2,
export_as_excel: "false",
is_verified_only: "false",
salary_yesr: 2025,
salary_month: 3,
}
// Employee Wise Cash distributed bonus report Payload
export const cashDistributedBonusPayload = {
bonus_id: 3,
employee_id: 27027,
branch_id: 2,
department_id: 2,
unit_id: 2,
wing_id: 2026,
order_by: "employee_name",
export_as_excel: "false",
}

 //***********************************************       Salary : Claim Setting Api             *************************************************************************//
 // Create Claim Settings
export const claimSettingsPayload = {
  "do_supervisor_approve": true,
  "disburse_supervisor_approval": true,
  "time_limit": 455,
}

//***********************************************       Salary : Consolidate Salary Config Api             *************************************************************************//
// Create COnsolidate Salary Config APi Payload
export const consolidateSalaryConfig = {
      "breakup_id": 99,
      "percentage": 0,
      "breakup_name": "QA Test"
    }

  //***********************************************       Salary : Delete Salary Api             *************************************************************************//
  export const generateSalariesPayload = {
      year:2025,
      month: 3,
      branch_id: 2,
      department_id: 2,
      employee_id: 27027,
      wing_id: 2026,
      unit_id: 2,
    }

    //***********************************************      Salary : Dynamic Salary Adjustment Policy Api             *************************************************************************//
    export const createDynamicSalaryAdjustmentPolicies = {
  "policy_name": "Test QA Policy",
  "adjustment_purpose_id": 2181,
  "applicable_for": 3,
  "add_or_deduct": true,
  "adjustment_amount": 2000,
  "is_percentage": true,
  "is_active": true,
  "is_continuous": true,
  "start_month": 3,
  "start_year": 2025,
  "end_month": 3,
  "end_year": 2026
  }

   //***********************************************      Salary : Dynamic Salary Adjustment PolicyMapping Api            *************************************************************************//
    export const getDynamicSalaryAdjustmentPolicyMappings = {
    dynamic_policy_id : 1682, 
  }

  //***********************************************      Salary : Employee Claim Request Api         **************************************************************
  // Get Details or of a single Claim APi
   export const getDetailsOfSingleClaim = {
    claim_id:437562, 
  }

  // //***********************************************      Salary : Employee Salary Adjustment Api       **************************************************************
  // Get Employee Salary Adjustment API Data
  export const getEmployeeSalaryAdjustmentDataPayload = {
    employee_id :13365, 
  }

  // Is Adjustment Eligible
  export const getIsAdjustmentEligible = {
    salary_year :2025,
    salary_month:12, 
  }
  // Download Employee Salary Adjustment Template

export const salaryAdjustmentDownloadTemplatePayload = {
    salary_year :2025,
    salary_month:12, 
    adjustment_purpose_id: 36,
  }
  //***********************************************      Salary : Employee Salary Stracture Api       **************************************************************
  //Get Employee Salary Stracture 
  export const getEmployeeSalaryStracturePayload = {
    employee_id :13365, 
  }
  // Group Wise Salary Stracture
   export const groupWiseSalaryStracture = {
    employee_id :13365, 
    salary_group_id: 9,
  }
  // Employee Wise Salary Stracture
  export const getEmployeeWiseSalaryStracturePayload = {
    employee_id :13365, 
  }
  // Download Salary Stracture Template
  export const downloadSalaryStractureTemplate = {
    template_type_id :1, 
    join_after: "17-01-2023",
    salary_group_id: 9,
    payment_type: 1,
    structure_date: "15-01-2026",
    payment_frequency: 1,
  }
  //***********************************************      Salary : Employee Wise Cash Distribution Api      **************************************************************
// Get Employee Wise Cash Distribution
export const getEmployeeWiseCashDistributionPayload = {
    cash_distribution_id  :19, 
  }
  //***********************************************      Salary : Final Settlement Api      **************************************************************
  // Get Employee Withdrawal Info
  export const getEmployeeWithdrawalInfoPayload = {
    employee_id  :13365, 
    final_settlement_date_string :"02-02-2026",
  }
  //  Calculate Employee Gratuity
  export const getEmployeeGratuityPayload = {
    employee_id  :13365, 
    release_date : "02-02-2026",
  }
  // Get Recalculated Leave Encashment
  export const getRecalculateLeaveEncashmentPayload = {
    employee_id :13365, 
  }
  //***********************************************      Salary : Final Settlement Component Api        **************************************************************
  // Get a final settlement component details by id
  export const getFinalSettlementComponentPayload = {
    component_id:"1", 
  }
  //***********************************************      Salary : GratuityC alculation Api        **************************************************************
  // Get All Calculated Gratuity
  export const getAllCalculatedGratuityPayload = {
    employee_id: 27027, 
  }
  // Get  Calculated Gratuity By ID
  export const getACalculatedGratuityByIDPayload = {
    "gratuity_id": 257, 
  }
  //***********************************************      Salary : Heldup Employee Api        **************************************************************
  // Get All Heldup Employees
  export const getAllHeldupEmployeesPayload = {
    wingId: 2, 
  }
  // Get Heldup Employee By ID
  export const getHeldupEmployeeByIDPayload = {
   heldup_id : 267
  }
 //***********************************************      Salary : Increment Breakup Api       **************************************************************
 // Return Increment Breakup by ID
  export const getIncrementBreakupByIDPayload = {
   increment_breakup_id : 219,
  }

  //***********************************************      Salary : My PaySlip Api      **************************************************************
//My Payslip  Payload
export const getMyPayslipPayload = {
   year: 2025
  }
  // My Payslip Report
  export const getMyPayslipReportPayload = {
   salary_year: 2025,
   salary_month: 12,
  }

//***********************************************      Salary : PaySlip Email Api      **************************************************************
//Payslip Email Report Payload
export const getpayslipEmailReportPayload = {
   employee_id : 13365,
   salary_year: 2025,
   salary_month: 12,
  }

  //***********************************************      Salary : Process Increment Api      **************************************************************
  // Get Process Increments
  export const getProcessIncrementsPayload = {
   increment_date : "01-01-2026",
   salary_structure_date_on_or_before: "01-01-2025",
   increment_amount_or_percentage: 10000,
   is_fixed: "true"
  }

  // Load Processed Increments
  export const loadProcessedIncrementsPayload = {
   increment_date : "01-01-2026",
   salary_structure_date_on_or_before: "01-01-2025",
   increment_amount_or_percentage: 10000,
   is_fixed: "true"
  }
  // Generate Increment Reports
  export const generateIncrementReportPayload = {
   increment_date : "01-01-2026",
   salary_structure_date_on_or_before: "01-01-2025",
  }
  
 //***********************************************      Salary : Base Breakup Api      **************************************************************
  // Get Salary Base Breakup
  export const getAllSalaryBaseBrekupsPayload = {
   "base_breakup_id": 606,
  }
 //***********************************************      Salary : Breakup Api      **************************************************************
  // Get  Salary  Breakup By ID
  export const getSalaryBrekupPayload = {
   "breakup_id": 567,
  }
 //***********************************************      Salary : Salary Breakup Group Api      **************************************************************
  // Get  Salary  Breakup By ID
  export const getSalaryBrekupGroupPayload = {
   "salary_breakup_group_id": 307,
  }
 //***********************************************      Salary : Salary Eligible Employee Api      **************************************************************
  // Get  Salary  Breakup By ID
  export const getsalaryeligibleemployeebyid = {
   "id": 1374,
  }
 //***********************************************      Salary : Salary Group Api      **************************************************************
  // Get  Salary  Breakup By ID
  export const getsalaryDetailsById = {
   "salary_group_id": 1405,
  }
 //***********************************************      Salary : Salary Modification Api      **************************************************************
  // Get  Salary  Breakup By ID
  export const getsalaryDetailsByEmployeeId = {
   "employee_id": 13365,
  }
  
 //***********************************************      Salary : Salary Transfer Api      **************************************************************
  // Get  All Salary Transfers
  export const getAllSalaryTransfers = {
   salary_year: 2025,
   salary_month: 12,
  }
 //***********************************************      Salary : Salary Verification Api      **************************************************************
  // Get  All Salary Verification
  export const getAllSalaryVarification = {
  salary_month: 12,
  salary_year: 2025, 
  }
  