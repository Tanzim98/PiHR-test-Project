import { create } from 'domain';
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

const salaryApiPaths = {

  // Salary : AdjustmentPurposeApi
  adjustmentPurposeDropdown: "/api/v2/adjustment-purposes/dropdown",
  adjustmentPurposeList: "/api/v2/adjustment-purposes",
  // createAdjustmentPurpose: "/api/v2/adjustment-purposes",
  // updateAdjustmentPurpose: "/api/v2/adjustment-purposes",
  getAdjustmentPurposeById: "/api/v2/adjustment-purposes/{adjustment_purpose_id}",
  deleteAdjustmentPurpose: "/api/v2/adjustment-purposes/{adjustment_purpose_id}",

  // Salary : Advance salary Api
  getAdvanceSalaries: "/api/v2/advance-salary", //Done
  createAdvanceSalary: "/api/v2/advance-salary",
  getEmployeeAdvanceSalaries: "/api/v2/advance-salary/employee-advance-salaries", //Only For employee user. 
  getAdvanceSalaryById: "/api/v2/advance-salary/{advance_salary_id}", //Done
  deleteAdvanceSalary : "/api/v2/advance-salary/{advance_salary_id}",
  // updateAdvanceSalary: "/api/v2/advance-salary/{advance_salary_id}",
  getAdvanceSalarySummary: "/api/v2/advance-salary/summary/{advance_salary_id}",  //Done
  saveOrDeleteAttachment: "/api/v2/advance-salary/attachment",
  approveAdvanceSalary: "/api/v2/advance-salary/approve/{advance_salary_id}",
  rejectAdvanceSalary: "/api/v2/advance-salary/reject/{advance_salary_id}",
  saveOrUpdateSchedules: "/api/v2/advance-salary/schedules",
  saveOrUpdateWebSchedules: "/api/v2/advance-salary/advance-salary-schedules",
  deleteSchedule: "/api/v2/advance-salary/schedule/{advance_salary_schedule_id}",
  checkOverlappedSchedule: "/api/v2/advance-salary/check-overlapped-schedule",  //Done
  confirmCashPayment: "/api/v2/advance-salary/confirm-cash-payment/{advance_salary_schedule_id}",
  makeCashPayment: "/api/v2/advance-salary/make-cash-payment/{advance_salary_schedule_id}",
  getAllAttachments: "/api/v2/advance-salary/all-attachments/{advance_salary_id}", //Done
  downloadAttachments: "/api/v2/advance-salary/download-attachments/{advance_salary_id}", //Done (Failed)
  getAttachmentUrl : "/api/v2/advance-salary/attachments-url/{advance_salary_id}",  //Done
  getPaymentMethodDropdown: "/api/v2/advance-salary/payment-methods-dropdown",   //Done

  //Salary : AdvanceSalaryPolicyApi
  getAdvanceSalaryPolicies: "/api/v2/advance-salary-policies",
  createPolicy: "/api/v2/advance-salary-policies",

  //Salary : AttendanceBasedAllowancePolicyApi
attendanceAllowancePolicyList: "/api/v2/attendance-based-allowance-policies",
createAttendanceAllowancePolicy: "/api/v2/attendance-based-allowance-policies",
updateAttendanceAllowancePolicy: "/api/v2/attendance-based-allowance-policies",
getAttendanceAllowancePolicyById:"/api/v2/attendance-based-allowance-policies/{attendance_allowance_policy_id}",
deleteAttendanceAllowancePolicy: "/api/v2/attendance-based-allowance-policies/{attendance_allowance_policy_id}",
attendanceAllowancePolicyDropdown:"/api/v2/attendance-based-allowance-policies/attendance-based-allowance-policy-dropdown",
attendanceAllowanceTypeDropdown:"/api/v2/attendance-based-allowance-policies/allowance-types-dropdown",
attendanceAllowanceCalculateOnDropdown: "/api/v2/attendance-based-allowance-policies/calculate-on-dropdown",

// Salary : AttendanceBasedAllowancePolicyMappingApi
attendanceAllowancePolicyMappingList:"/api/v2/attendance-based-allowance-policy-mappings",
createAttendanceAllowancePolicyMapping:"/api/v2/attendance-based-allowance-policy-mappings",
updateAttendanceAllowancePolicyMapping:"/api/v2/attendance-based-allowance-policy-mappings",
getAttendanceAllowancePolicyMappingById:"/api/v2/attendance-based-allowance-policy-mappings/{attendance_allowance_policy_mapping_id}",
deleteAttendanceAllowancePolicyMapping:"/api/v2/attendance-based-allowance-policy-mappings/{policy_mapping_id}",


// Salary : BankApi
bankDropdown: "/api/v2/banks/dropdown",
bankList: "/api/v2/banks",
createBank: "/api/v2/banks",
updateBank: "/api/v2/banks",
getBankById: "/api/v2/banks/{bank_id}",
deleteBank: "/api/v2/banks/{bank_id}",

// Salary : Bonus Generation Api
bonusGenerationDropdown: "/api/v2/bonus-generations/dropdown-sli",
downloadBonusTemplate: "/api/v2/bonus-generations/download-bonus-template",
generateBonus: "/api/v2/bonus-generations/generate-bonus",
generateBonusFromTemplate: "/api/v2/bonus-generations/generate-bonus-from-template",

// Salary : Bonus Modification Api
bonusModificationDropdown: "/api/v2/bonus-modifications/dropdown-sli",
getBonusByEmployeeAndBonusId: "/api/v2/bonus-modifications/bonus-details/{employee_id}/{bonus_id}",
bonusModificationList: "/api/v2/bonus-modifications/load-generated-bonus",
updateBonusModification: "/api/v2/bonus-modifications",
verifyBonusModification: "/api/v2/bonus-modifications/bonus-verify",
deleteBonusModification: "/api/v2/bonus-modifications/{employee_bonus_id}",
deleteSelectedBonusModification: "/api/v2/bonus-modifications/delete-selected",

// Salary: Bonus Policy API
getAllBonusPolicies: "/api/v2/bonus-policies",
createBonusPolicy: "/api/v2/bonus-policies",

// Salary: Bonus Setup API
getAllBonusSetups: "/api/v2/bonus-setups",
createBonusSetup: "/api/v2/bonus-setups",
updateBonusSetup: "/api/v2/bonus-setups",
getBonusSetupById: "/api/v2/bonus-setups/{bonus_setup_id}",
getBonusSetupDropdown: "/api/v2/bonus-setups/dropdown",

// Salary: Bonus Transfer API
getAllBonusTransfers: "/api/v2/bonus-transfers",
updateBonusTransfer: "/api/v2/bonus-transfers",

// Salary: Bonus Type API
getAllBonusTypes: "/api/v2/bonus-types",
createBonusType: "/api/v2/bonus-types",
updateBonusType: "/api/v2/bonus-types/{bonus_type_id}",
getBonusTypeDropdown: "/api/v2/bonus-types/dropdown",

// Salary: Cash Modification API
getAllCashSalaries: "/api/v2/cash-salaries",
updateCashSalary: "/api/v2/cash-salaries",
deleteCashSalary: "/api/v2/cash-salaries",
deleteCashSalaryById: "/api/v2/cash-salaries/{cash_salary_id}",
getAllCashBonuses: "/api/v2/cash-bonuses",
updateCashBonus: "/api/v2/cash-bonuses",
deleteCashBonus: "/api/v2/cash-bonuses/{cash_bonus_id}",
deleteCashBonusById: "/api/v2/cash-bonuses/{cash_bonus_id}",

// Salary: Claim API
filterClaims: "/api/v2/claim/filter",
getAllCompanyClaims: "/api/v2/claim/claims",
getSelfClaims: "/api/v2/claim/self-claims",
getSubordinateClaims: "/api/v2/claim/subordinate-claims",
getClaimById: "/api/v2/claim/{claim_id}",
getClaimDetailsWithHistory: "/api/v2/claim/details/{claim_id}",
createOrUpdateClaim: "/api/v2/claim",
saveClaimAsJson: "/api/v2/claim/save-claim",
approveClaim: "/api/v2/claim/approve",
rejectClaim: "/api/v2/claim/reject",
removeClaimDocument: "/api/v2/claim/remove-document",
deleteClaimDetail: "/api/v2/claim/delete-detail",
deleteClaim: "/api/v2/claim/delete-claim",
bulkDisburseClaims: "/api/v2/claim/bulk-disburse",
bulkApproveClaims: "/api/v2/claim/bulk-approve",
downloadClaimAttachment: "/api/v2/claim/download-attachment",
getClaimImagePreview: "/api/v2/claim/image-preview",

// Salary: Claim Category API
getAllClaimCategories: "/api/v2/claim-categories",
createClaimCategory: "/api/v2/claim-categories",
updateClaimCategory: "/api/v2/claim-categories",
deleteClaimCategory: "/api/v2/claim-categories/{claim_category_id}",
getClaimCategoryById: "/api/v2/claim-categories/{claim_category_id}",
getClaimCategoryDropdownByEmployee:"/api/v2/claim-categories/claim-categories-dropdown-by-employee",

//Salary Report API
getSalaryPaySlipReport: "/api/v2/salary-reports/pay-slip", // Not tested, Showing 500 error
getSalaryCertificateReport: "/api/v2/salary-reports/salary-certificate",
getSalaryTemplatesDropdown: "/api/v2/salary-reports/salary-templates-dropdown",
getSalaryAnalysis: "/api/v2/salary-reports/salary-analysis",
getSalaryAnalysisTopSheet: "/api/v2/salary-reports/salary-analysis-top-sheet",
getSalaryReportTypesDropdown: "/api/v2/salary-reports/report-types-dropdown",
getSalaryPaymentDatesDropdown:"/api/v2/salary-reports/salary-payment-dates-dropdown",
getBankDropdown: "/api/v2/salary-reports/bank-dropdown",
getSalaryTransferReport: "/api/v2/salary-reports/salary-transfer",
getBankForwardingLetter:"/api/v2/salary-reports/bank-forwarding-letter",   // Not tested, Showing 500 error
getBonusStatement: "/api/v2/salary-reports/bonus-statement",
getBonusDropdown: "/api/v2/salary-reports/bonus-dropdown",   //---- Done until This
getBonusAnalysis: "/api/v2/salary-reports/bonus-analysis", //--- Showing 500 error
getCurrentSalaryStructure:"/api/v2/salary-reports/current-salary-structure",
getSalaryStructureHistory:"/api/v2/salary-reports/salary-structure-history",
getAdvanceTypeDropdown:"/api/v2/salary-reports/advance-type-dropdown",
getCollectionStatusDropdown:"/api/v2/salary-reports/collection-status-dropdown",
getMonthlyAdvanceSalary:"/api/v2/salary-reports/monthly-advance-salary",
getSalaryIncrementReport: "/api/v2/salary-reports/salary-increament",
getPaymentTypeDropdown: "/api/v2/salary-reports/payment-type-dropdown",
getSalaryConsolidateReport: "/api/v2/salary-reports/salary-consolidate",
getSalaryCompareReport: "/api/v2/salary-reports/salary-compare",
getSalaryAdjustmentReport: "/api/v2/salary-reports/salary-adjustment",
getAdvanceSalaryStatement:"/api/v2/salary-reports/advance-salary-statement",
getClaimStatusDropdown:"/api/v2/salary-reports/claim-status-dropdown",
getDataFilterationTypeDropdown:"/api/v2/salary-reports/data-filteration-type-dropdown",
getClaimCategoryDropdown:"/api/v2/salary-reports/claim-category-dropdown",
getClaimReport: "/api/v2/salary-reports/claim-report", // Showing 500 error
getClaimDetailsDoubleReport:"/api/v2/salary-reports/claim-details-double-report",
getClaimDetailsReport:"/api/v2/salary-reports/claim-details-report",
getCategoryWiseClaimSummary:"/api/v2/salary-reports/category-wise-claim-summary", //forbidden
getAdjustmentPurposesDropdown:"/api/v2/salary-reports/adjustment-purposes",
getGratuityReport:"/api/v2/salary-reports/gratuity-report",
getSalaryDeductionReport:"/api/v2/salary-reports/salary-deduction",
getDeductionAnalysisType:"/api/v2/salary-reports/deduction-ananlysis-type",
getGroupByDropdown:"/api/v2/salary-reports/group-by-dropdown",
getEmployeeWiseCashSalaryDistributedReport:"/api/v2/salary-reports/employee-wise-cash-salaries",
getEmployeeWiseCashBonusesDistributedReport:"/api/v2/salary-reports/employee-wise-cash-bonuses",   // internal_server_error (500)

// Salary : ClaimSettingApi
getClaimSettings: "/api/v2/claim-settings",
createClaimSettings: "/api/v2/claim-settings",   // Toast message error showing

// Salary : ConsolidateSalaryConfigApi
getConsolidateSalaryConfigs: "/api/v2/consolidate-salary-configs",
createConsolidateSalaryConfig: "/api/v2/consolidate-salary-configs",

// Salary : DeleteSalaryApi
getLastGeneratedSalaryYearMonth: "/api/v2/delete-salaries/last-generated-salary-year-month",
getGeneratedSalaries: "/api/v2/delete-salaries/generated-salaries",
deleteSelectedGeneratedSalaries: "/api/v2/delete-salaries/remove-selected",
deleteAllGeneratedSalaries: "/api/v2/delete-salaries/remove-all",
unverifySelectedGeneratedSalaries: "/api/v2/delete-salaries/unverify-selected",
unverifyAllGeneratedSalaries: "/api/v2/delete-salaries/unverify-all",

// Salary : Dynamic Salary Adjustment Policy Api
getDynamicSalaryAdjustmentPolicies: "/api/v2/dynamic-salary-adjustment-policies",
createDynamicSalaryAdjustmentPolicy: "/api/v2/dynamic-salary-adjustment-policies",
updateDynamicSalaryAdjustmentPolicy: "/api/v2/dynamic-salary-adjustment-policies",
getAmountCategoryTypeDropdown: "/api/v2/dynamic-salary-adjustment-policies/amount-category-type-dropdown",
deleteDynamicSalaryAdjustmentPolicy: "/api/v2/dynamic-salary-adjustment-policies/{policy_id}",

// Salary : DynamicSalaryAdjustmentPolicyMappingApi
getDynamicSalaryAdjustmentPolicyMappings: "/api/v2/dynamic-salary-adjustment-policy-mappings",
createDynamicSalaryAdjustmentPolicyMapping: "/api/v2/dynamic-salary-adjustment-policy-mappings",
deleteDynamicSalaryAdjustmentPolicyMapping: "/api/v2/dynamic-salary-adjustment-policy-mappings/{policy_mapping_id}",

// Salary : Employee Claim Request Api
getEmployeeClaimRequests: "/api/v2/employee-claim-requests",
createOrUpdateEmployeeClaimRequest: "/api/v2/employee-claim-requests",
getEmployeeClaimRequestById: "/api/v2/employee-claim-requests/{claim_id}",
approveEmployeeClaimRequest: "/api/v2/employee-claim-requests/approve",
bulkApproveEmployeeClaimRequests: "/api/v2/employee-claim-requests/bulk-approve",
rejectEmployeeClaimRequest: "/api/v2/employee-claim-requests/reject",

// Salary : EmployeeSalaryAdjustmentApi
getEmployeeSalaryAdjustmentsByEmployeeId: "/api/v2/employee-salary-adjustments/{employee_id}",
addEmployeeSalaryAdjustments: "/api/v2/employee-salary-adjustments",
checkEmployeeSalaryAdjustmentEligibility: "/api/v2/employee-salary-adjustments/is-adjustment-eligible",
downloadEmployeeSalaryAdjustmentTemplate: "/api/v2/employee-salary-adjustments/download-template",
bulkUploadEmployeeSalaryAdjustments: "/api/v2/employee-salary-adjustments/bulk-upload",

// Salary : Employee Salary Structure Api
getSalaryStructures: "/api/v2/salary-structures",
createSalaryStructure: "/api/v2/salary-structures",
deleteSalaryStructure: "/api/v2/salary-structures",
getPaymentFrequencySlip: "/api/v2/salary-structures/payment-frequency-sli",
getGroupWiseSalaryStructures: "/api/v2/salary-structures/group-wise-salary-structure",
getEmployeeSalaryStructureByEmployeeId: "/api/v2/salary-structures/employee-structure/{employee_id}",
getConsolidatedSalaryConfigs: "/api/v2/salary-structures/consolidate-salary-configs",
getBulkUploadTemplateType: "/api/v2/salary-structures/bulk-upload-template-type",
downloadSalaryStructureTemplate: "/api/v2/salary-structures/template",
bulkUploadSalaryStructures: "/api/v2/salary-structures/bulk",

// Salary : Employee Wise Cash Distribution Api
getEmployeeWiseCashDistributions: "/api/v2/employee-wise-cash-distributions",
createEmployeeWiseCashDistribution: "/api/v2/employee-wise-cash-distributions",
updateEmployeeWiseCashDistribution: "/api/v2/employee-wise-cash-distributions",
getEmployeeWiseCashDistributionById: "/api/v2/employee-wise-cash-distributions/{cash_distribution_id}",
deleteEmployeeWiseCashDistribution: "/api/v2/employee-wise-cash-distributions/{cash_distribution_id}",

// Salary : Final Settlement Api
getFinalSettlementWithdrawalInfo: "/api/v2/final-settlements/withdrawal-info",
recalculateFinalSettlementGratuity: "/api/v2/final-settlements/recalculate-gratuity",
recalculateFinalSettlementLeaveEncashment: "/api/v2/final-settlements/recalculate-leave-encashment",
createFinalSettlement: "/api/v2/final-settlements",
updateFinalSettlement: "/api/v2/final-settlements",

// Salary : Final Settlement Component Api
getFinalSettlementComponents: "/api/v2/final-settlement-components",
createFinalSettlementComponent: "/api/v2/final-settlement-components",
updateFinalSettlementComponent: "/api/v2/final-settlement-components",
getFinalSettlementComponentById: "/api/v2/final-settlement-components/{component_id}",

// Salary : GratuityCalculationApi
checkGratuityPolicy: "/api/v2/gratuity-calculations/check-gratuity-policy",
getCalculatedGratuities: "/api/v2/gratuity-calculations/calculated-gratuities",
getGratuityCalculationById: "/api/v2/gratuity-calculations/{gratuity_id}",
createGratuityCalculation: "/api/v2/gratuity-calculations",
recalculateGratuityCalculation: "/api/v2/gratuity-calculations/recalculate",
payGratuity: "/api/v2/gratuity-calculations/pay-gratuity",
getGratuityPaymentStatus: "/api/v2/gratuity-calculations/gratuity-payment-status-sli",

// Salary : GratuityPolicyApi
getGratuityPolicies: "/api/v2/gratuity-policies",
createGratuityPolicy: "/api/v2/gratuity-policies",
getFractionConsideration: "/api/v2/gratuity-policies/fraction-consideration-sli",
deleteGratuityPolicy: "/api/v2/gratuity-policies/{gratuity_policy_id}",

// Salary : Heldup Employee Api
getSalaryHeldupTypes: "/api/v2/heldup-employees/salary-heldup-types",
getHeldupEmployees: "/api/v2/heldup-employees",
createHeldupEmployee: "/api/v2/heldup-employees",
updateHeldupEmployee: "/api/v2/heldup-employees",
getHeldupEmployeeById: "/api/v2/heldup-employees/{heldup_id}",
deleteHeldupEmployee: "/api/v2/heldup-employees/{heldup_id}",

// Salary :Increment Breakup Api
getIncrementBreakupDetails: "/api/v2/increment-breakups/increment-breakup-details",
getIncrementBreakups: "/api/v2/increment-breakups",
createIncrementBreakup: "/api/v2/increment-breakups",
updateIncrementBreakup: "/api/v2/increment-breakups",
getIncrementBreakupById: "/api/v2/increment-breakups/{increment_breakup_id}",
deleteIncrementBreakup: "/api/v2/increment-breakups/{increment_breakup_id}",

// Salary : My PaySlip Api   (Used in Mobile App. Currently skipping)
getMyPaySlips: "/api/v2/my-pay-slips/my-pay-slips",
createMyPaySlip: "/api/v2/my-pay-slips",
getMyPaySlipReport: "/api/v2/my-pay-slips/report",

// Salary : PaySlip Email Api
getPaySlipEmails: "/api/v2/pay-slip-emails",
createPaySlipEmail: "/api/v2/pay-slip-emails",
getPaySlipEmailReport: "/api/v2/pay-slip-emails/report",

// Salary : ProcessIncrement Api
generateProcessIncrements: "/api/v2/process-increments/generate",
createProcessIncrement: "/api/v2/process-increments",
deleteProcessIncrement: "/api/v2/process-increments",
getProcessedIncrements: "/api/v2/process-increments/load-processed-increments",
addIncrementAsSalaryStructure: "/api/v2/process-increments/increment-as-salary-structure",
getProcessIncrementReports: "/api/v2/process-increments/reports",

// Salary : Salary Api
getPayslipDetails: "/api/v2/salary/payslip-details",
getLastYearPayslipSummary: "/api/v2/salary/last-year-payslip-summary",
getSalaryPayslipReport: "/api/v2/salary/salary-payslip-rpt",
sendPayslipEmail: "/api/v2/salary/send-payslip-email",

// Salary : SalaryBaseBreakup Api
getSalaryBaseBreakups: "/api/v2/salary-base-breakups",
createSalaryBaseBreakup: "/api/v2/salary-base-breakups",
updateSalaryBaseBreakup: "/api/v2/salary-base-breakups",
getSalaryBaseBreakupById: "/api/v2/salary-base-breakups/{base_breakup_id}",
deleteSalaryBaseBreakup: "/api/v2/salary-base-breakups/{base_breakup_id}",
getSalaryBaseBreakupsDropdown: "/api/v2/salary-base-breakups/salary-base-breakups-dropdown",

// Salary : SalaryBreakup Api
getSalaryBreakups: "/api/v2/salary-breakups",
createSalaryBreakup: "/api/v2/salary-breakups",
updateSalaryBreakup: "/api/v2/salary-breakups",
getSalaryBreakupById: "/api/v2/salary-breakups/{breakup_id}",
deleteSalaryBreakup: "/api/v2/salary-breakups/{breakup_id}",
getSalaryBreakupDropdown: "/api/v2/salary-breakups/salary-breakup-dropdown",

// Salary : Salary Breakup Api
getSalaryBreakups: "/api/v2/salary-breakups",
createSalaryBreakup: "/api/v2/salary-breakups",
updateSalaryBreakup: "/api/v2/salary-breakups",
getSalaryBreakupById: "/api/v2/salary-breakups/{breakup_id}",
deleteSalaryBreakup: "/api/v2/salary-breakups/{breakup_id}",
getSalaryBreakupDropdown: "/api/v2/salary-breakups/salary-breakup-dropdown",

// Salary : Salary Breakup Group Api
getSalaryBreakupGroups: "/api/v2/salary-breakup-groups",
createSalaryBreakupGroup: "/api/v2/salary-breakup-groups",
updateSalaryBreakupGroup: "/api/v2/salary-breakup-groups",
getSalaryBreakupGroupById: "/api/v2/salary-breakup-groups/{salary_breakup_group_id}",

// Salary : Salary Eligible Employee Api
getSalaryEligibleEmployees: "/api/v2/salary-eligible-employees",
createSalaryEligibleEmployee: "/api/v2/salary-eligible-employees",
updateSalaryEligibleEmployee: "/api/v2/salary-eligible-employees",
getSalaryEligibleEmployeeById: "/api/v2/salary-eligible-employees/{id}",
deleteSalaryEligibleEmployee: "/api/v2/salary-eligible-employees/{id}",
getSalaryEligibleEmployeesDropdown: "/api/v2/salary-eligible-employees/dropdown",

// Salary : Salary Generation Api
startSalaryGenerationProcess: "/api/v2/salary-generations/start-process",
processSalaryGeneration: "/api/v2/salary-generations",
getSalaryGenerations: "/api/v2/salary-generations",
getSalaryGenerationConfiguration: "/api/v2/salary-generations/configuration",

// Salary : Salary Generation Policy Api
getSalaryGenerationPolicies: "/api/v2/salary-generation-policies",
createSalaryGenerationPolicy: "/api/v2/salary-generation-policies",

// Salary : Salary Group Api
getSalaryGroups: "/api/v2/salary-groups",
createSalaryGroup: "/api/v2/salary-groups",
updateSalaryGroup: "/api/v2/salary-groups",
getSalaryGroupById: "/api/v2/salary-groups/{salary_group_id}",
getSalaryGroupDropdown: "/api/v2/salary-groups/salary-group-dropdown",

// Salary : Salary Modification Api
getSalaryModificationDetails: "/api/v2/salary-modifications/{employee_id}/salary-details",
createSalaryModification: "/api/v2/salary-modifications",
deleteSalaryModification: "/api/v2/salary-modifications",

// Salary : Salary Transfer Api
getSalaryTransfers: "/api/v2/salary-transfers",
createSalaryTransfer: "/api/v2/salary-transfers",
getSalaryTransferDropdown: "/api/v2/salary-transfers/dropdown",

// Salary : Salary Verification Api
getSalaryVerifications: "/api/v2/salary-verifications",
createSalaryVerification: "/api/v2/salary-verifications",

























};

export const getSalaryApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(salaryApiPaths).forEach(([key, path]) => {
    const url = key === 'userLogin'
      ? `${SSO_URL}${path}`
      : `${BASE_URL}${path}`;

    apiMap[key] = { url };
  });

  return apiMap;
};
