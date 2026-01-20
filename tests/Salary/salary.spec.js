import { test } from "@playwright/test";
import { SalaryApis } from "../../pages/Salary/salaryApi.js";
import * as payloads from '../../config/salaryPayloadData.js';
Object.assign(globalThis, payloads);
import dotenv from "dotenv";

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


test.describe("Salary CRUD - Adjustment Purpose", () => {
  test("Salary dropdown response should be same in PROD & DEV @GET_API_Test Salary-1001", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getSalaryDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Salary list response should be same in PROD & DEV @GET_API_Test Salary-1002", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getSalaryList","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Create new Salary @POST_API_Test Salary-1004", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createSalary","POST",PROD_TOKEN,DEV_TOKEN,createAdjustmentPurposePayload);
  });

  test("Update Salary @PUT_API_Test Salary-1005", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"updateSalary","PUT",PROD_TOKEN,DEV_TOKEN,updateAdjustmentPurposePayload);
  });
  test("Salary details by ID response should be same in PROD & DEV @GET_API_Test Salary-1003", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getSalaryById","GET",PROD_TOKEN,DEV_TOKEN);
  });

 test("Delete Salary @DELETE_API_Test Salary-1006", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"deleteSalary","DELETE",PROD_TOKEN,DEV_TOKEN,salaryIdPayload);
});
});
test.describe("Advance Salaries", () => {

  test("Get All Advance Salary  @GET_API_Test Salary-1007", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAllAdvanceSalaries","GET",PROD_TOKEN,DEV_TOKEN);
  });
   test("Create new Advance Salary @POST_API_Test Salary-1008", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createNewAdvanceSalary","POST",PROD_TOKEN,DEV_TOKEN,createAdvanceSalaryPayload);
  });
  test("Get Employee Advance Salary  @GET_API_Test Salary-AAAA", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getEmployeeAdvanceSalary","GET",PROD_EMPLOYEE_TOKEN,DEV_EMPLOYEE_TOKEN);
  });
  test("Get  Advance Salary By Advance Salary ID @GET_API_Test Salary-1011", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAdvanceSalaryByID","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  test("Get  Advance Salary Summary By Advance Salary ID @GET_API_Test Salary-1012", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAdvanceSalarySummaryByID","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  test("Approve Employees Advance Salary @API_Test Salary-1009", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"approveAdvanceSalaryy","PUT",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  test("Reject Employees Advance Salary @API_Test Salary-1009", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"RejectAdvanceSalaryy","PUT",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  
  test("Get  Advance Salary Overlap Data @GET_API_Test Salary-1012", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getSalaryOverlapData","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryOverlapPayload);
  });
  test("Get  All Attachment of Advance Salary By Advance Salary ID @GET_API_Test Salary-1013", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAllAttachmentOfAdvanceSalaryByID","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  test("Download  All Attachment of Advance Salary By Advance Salary ID @GET_API_Test Salary-1014", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"downloadAllAttachmentOfAdvanceSalaryByID","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  test("Get Attachment URL of Advance Salary By Advance Salary ID @GET_API_Test Salary-1015", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAttachmenURLByID","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryDataPayload);
  });
  test(" Get All Payment Methods @GET_API_Test Salary-1016", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAllPaymentMethods","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Delete Advance Salary @DELETE_API_Test Salary-1006", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"createNewAdvanceSalary","POST",PROD_TOKEN,DEV_TOKEN,createAdvanceSalaryPayload);
  await SalaryApis.compareProdVsDev(request,"deleteAdvanceSalary","DELETE",PROD_TOKEN,DEV_TOKEN, advanceSalaryOverlapPayload);
});
});
test.describe("Advance Salary Policy", () => {

  test("Get Advance Salary Policies of the company @API_Test Salary-1027", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAdvanceSalaryPolicy","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get All Attendance Allowance Policies @API_Test Salary-1028", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAttendanceAllowancePolicyList","POST",PROD_TOKEN,DEV_TOKEN);
  });
  test("Create Advance Salary Policies of the company @API_Test Salary-1028", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createAdvanceSalaryPolicy","POST",PROD_TOKEN,DEV_TOKEN, createSalaryPolicyPayload);
  });
  test("Update Advance Salary Policies of the company @API_Test Salary-1028", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"updateAttendanceAllowancePolicy","POST",PROD_TOKEN,DEV_TOKEN, updateAttendanceAllowancePolicyPayload);
  });
});
test.describe('Salary : AttendanceBasedAllowancePolicyApi', () => {

  test('Get all attendance allowance policies and compare PROD & DEV @GET_API_Test Salary-1029', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getAttendanceAllowancePolicyList", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create an attendance allowance policy @POST_API_Test Salary-1030', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "createAttendanceAllowancePolicy", 'POST', PROD_TOKEN, DEV_TOKEN,createAttendanceAllowancePolicyPayload);
  }); 

  test('Update an attendance allowance policy @PUT_API_Test Salary-1031', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "updateAttendanceAllowancePolicy", 'PUT', PROD_TOKEN, DEV_TOKEN,  updateAttendanceAllowancePolicyPayload);
  });
  test('Get an attendance allowance policy details by id @GET_API_Test Salary-1032', async ({ request }) => {
      await SalaryApis.compareProdVsDev(request, "getPolicyDetailsByID", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get attendance based allowance policy dropdown @GET_API_Test Salary-1033', async ({ request }) => {
      await SalaryApis.compareProdVsDev(request, "getAttendanceAllowancePolicyDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get allowance type dropdown @GET_API_Test Salary-1034', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "getAllowanceTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Calculate On dropdown @GET_API_Test Salary-1035', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "getCalculateOnDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Delete an attendance allowance policy @DELETE_API_Test Salary-1036', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "deleteAttendanceAllowancePolicyByID", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });
});
test.describe("AttendanceBasedAllowancePolicyMappingApi", () => {

  test("Get all attendance allowance policy mappings @API_Test Salary-1037", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAllAttendanceAllowancePolicyMappings","GET",PROD_TOKEN,DEV_TOKEN);
  });
    test("Create Attendance Based Allowance Policy Mapping @API_Test Salary-1038", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createAttendanceAllowancePolicyMapping","POST",PROD_TOKEN,DEV_TOKEN, createAttendanceAllowancePolicyMappingPayload);
  });
  test('Update Attendance Based Allowance Policy Mapping @PUT_API_Test Salary-1039', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "updateAttendanceAllowancePolicyMapping", 'PUT', PROD_TOKEN, DEV_TOKEN,  updateAttendanceAllowancePolicyMappingPayload);
  });
  test('Get Attendance Allowance Policy Mapping by ID @GET_API_Test Salary-1040', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "getAttendanceAllowancePolicyMappingById", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  test('Delete attendance allowance policy mapping @DELETE_API_Test Salary-1041', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "deleteAttendanceAllowancePolicyMapping", 'DELETE', PROD_TOKEN, DEV_TOKEN);
    });
  
});
test.describe("Salary: Bank APi", () => {

  test("Get Bank DropDown @API_Test Salary-1042", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getBankDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test('Get All Bank List @GET_API_Test Salary-1043', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "getAllBankList", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
    test("Create New Bank @API_Test Salary-1044", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createNewBank","POST",PROD_TOKEN,DEV_TOKEN, createNewBankPayload);
  });
  test('Update Bank Details @PUT_API_Test Salary-1045', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "updateBank", 'PUT', PROD_TOKEN, DEV_TOKEN,  updateBankPayload);
  });
   test("Get Bank Details By ID  @API_Test Salary-1046", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getBankDetailsById","GET",PROD_TOKEN,DEV_TOKEN, findByBankIdPayload);
  });
  test('Delete Bank @DELETE_API_Test Salary-1047', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "deleteBank", 'DELETE', PROD_TOKEN, DEV_TOKEN);
    });
  
});
test.describe("Salary: Bonus Generation Api", () => {
  
  test("Get Bonus Generation Dropdown @API_Test Salary-1048", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getBonusGenerationDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Bonus Generation Template @GET_API_Test Salary-1049", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"downloadBonusTemplate","GET",PROD_TOKEN,DEV_TOKEN, downloadAndGenerateBonusPayload);
  });
  test("Generate Bonus @API_Test Salary-1050", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"generateBonus","GET",PROD_TOKEN,DEV_TOKEN, downloadAndGenerateBonusPayload);
  });

})
test.describe("Salary: Bonus Modification Api", () => {
  
  test("Get Bonus Generation Dropdown @API_Test Salary-1052", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBonusModificationDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Bonus Mofidy By IDs  @GET_API_Test Salary-1053", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getBonusByEmployeeAndBonusId","GET",PROD_TOKEN,DEV_TOKEN, getBonusByEmployeeAndBonusIdPayload);
  });
})
test.describe("Salary: Bonus Policy Api", () => {
  
  test("Get Bonus Policy @API_Test Salary-1059", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBonusPolicy","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Create Bonus Policy @POST_API_Test Salary-1060", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createBonusPolicy","POST",PROD_TOKEN,DEV_TOKEN, createBonusPolicyPayload);
  });
})
test.describe("Salary: Bonus Setup Api", () => {
  
  test("Get All Bonus Setup @API_Test Salary-1061", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAllBonusSetups","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Create Bonus Setup @POST_API_Test Salary-1062", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createBonusSetup","POST",PROD_TOKEN,DEV_TOKEN, createBonusSetupPayload);
  });
  test('Update Bonus Setup @PUT_API_Test Salary-1063', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "updateBonusSetup", 'PUT', PROD_TOKEN, DEV_TOKEN,  updateBonusSetupPayload);
  });
  test('Get Bonus Setup by ID @GET_API_Test Salary-1064', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "getBonusSetupById", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
  test('Get Bonus Setup Dropdown @GET_API_Test Salary-1065', async ({ request }) => {
     await SalaryApis.compareProdVsDev(request, "getBonusSetupDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
});
test.describe("Salary: Bonus Transfer Api", () => {
  test("Get All Bonus Transfer @API_Test Salary-1066", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBonusTransfer","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test('Update Bonus Transfer @PATCH_API_Test Salary-1067', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "updateBonusTransfer", 'PATCH', PROD_TOKEN, DEV_TOKEN, updateBonusTransferPayload);
  });
});
test.describe("Salary: Bonus Type Api", () => {
  test("Get All Bonus Types @API_Test Salary-1068", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAllBonusTypes","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("get Bonus Type Dropdown @GET_API_Test Salary-1071", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getBonusTypeDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary: Cash Modification Api", () => {
  test("Get All Cash Salaries @API_Test Salary-1072", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAllCashSalaries","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test('Get All Cash Bonuses @GET_API_Test Salary-1076', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getAllCashBonuses", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});
test.describe("Salary: Claim Api", () => {
  test("Filter Claims @API_Test Salary-1080", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"filterClaims","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test('Get All Company Claims @GET_API_Test Salary-1081', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getAllCompanyClaims", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Self Claims @GET_API_Test Salary-1082', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getSelfClaims", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Subordinate Claims @GET_API_Test Salary-1083', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getSubordinateClaims", 'GET', PROD_EMPLOYEE_TOKEN,DEV_EMPLOYEE_TOKEN);
  });
  test("Get Claim By ID @GET_API_Test Salary-1084", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimById","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Claim Details By ID @GET_API_Test Salary-1085", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimDetailsById","GET",PROD_TOKEN,DEV_TOKEN, getClaimByIdPayload);
  });
  test('Download Claim Attachment @GET_API_Test Salary-1095', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "downloadClaimAttachment", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Claim Image Preview @GET_API_Test Salary-1096', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getClaimImagePreview", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});
test.describe("Salary: Claim Category Api", () => {
  test("Get All Claim Categories @API_Test Salary-1097", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAllClaimCategories","GET",PROD_TOKEN,DEV_TOKEN);
  }); 
  test("Get Claim Category By ID @GET_API_Test Salary-1101", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimCategoryById","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Claim Category Dropdown By Employee @GET_API_Test Salary-1102", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimCategoryDropdownByEmployee","GET",PROD_TOKEN,DEV_TOKEN, claimEmployeeIdPayload);
  });
});
test.describe("Salary: Salary Report Api", () => {
  test("Get Salary Pay Slip Report @GET_API_Test Salary-1103", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryPaySlipReport","GET",PROD_TOKEN,DEV_TOKEN, salaryPaySlipReportPayload);
  });
  test("Get Salary Certificate Report @GET_API_Test Salary-1104", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryCertificateReport","GET",PROD_TOKEN,DEV_TOKEN, salaryCertificateReportPayload);
  });
  test("Get Salary Certificate Template Dropdown @GET_API_Test Salary-1105", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryCertificateTemplateDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Analysis Report @GET_API_Test Salary-1106", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryAnalysisReport","GET",PROD_TOKEN,DEV_TOKEN, salaryAnalysisReportPayload);
  });
  test("Get Salary Analysis Top Sheet Report @GET_API_Test Salary-1107", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryAnalysisTopSheetReport","GET",PROD_TOKEN,DEV_TOKEN, salaryAnalysisTopSheetReportPayload);
  });
  test("Get Salary Report Types Dropdown @GET_API_Test Salary-1108", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryReportType","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Payment Dates Report @GET_API_Test Salary-1109", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryPaymentDates","GET",PROD_TOKEN,DEV_TOKEN, salaryPaymentDatesReportPayload);
  }); 
  test('Get Bank List Dropdown @GET_API_Test Salary-1110', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getBankListInDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Salary Transfer Report @GET_API_Test Salary-1111', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getSalaryTransferReport", 'GET', PROD_TOKEN, DEV_TOKEN, salaryTransferReportPayload);
  });
  test('Get Bank Forwarding Letter @GET_API_Test Salary-1112', async ({ request }) => {
    await SalaryApis.compareProdVsDev(request, "getBankForwardingLetter", 'GET', PROD_TOKEN, DEV_TOKEN, salaryBankForwardingReportPayload);
  });
  test("Get Bonus Statments Report @GET_API_Test Salary-1113", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBonusStatementReport","GET",PROD_TOKEN,DEV_TOKEN, bonusStatementPayload);
  });
  test("Get Bonus Dropdown @GET_API_Test Salary-1114", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBonusDropdownList","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Bonus Analysis Report @GET_API_Test Salary-1115", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBonusAnalysisReport","GET",PROD_TOKEN,DEV_TOKEN, salaryBonusAnalysisReportPayload);
  });
  test("Get Current Salary Structure Report @GET_API_Test Salary-1116", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getCurrentSalaryStructureReport","GET",PROD_TOKEN,DEV_TOKEN, currentSalaryStructurePayload);
  });
  test("Get Salary Structure History Report @GET_API_Test Salary-1117", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryStructureHistoryReport","GET",PROD_TOKEN,DEV_TOKEN, salaryStructureHistoryPayload);
  });
  test("Get Advance Type Dropdown Report @GET_API_Test Salary-1118", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAdvanceTypeDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Collection Status Dropdown Report @GET_API_Test Salary-1119", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getCollectionStatusDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  } );
  test("Get Monthly Advance Salary Report @GET_API_Test Salary-1120", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getMonthlyAdvanceSalaryReport","GET",PROD_TOKEN,DEV_TOKEN, monthlyAdvanceSalaryReportPayload);
  }); 
  test("Get Salary Increment Report @GET_API_Test Salary-1121", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryIncrementReport","GET",PROD_TOKEN,DEV_TOKEN, salaryIncrementPayload);
  });
  test("Get Payment Type DropDown Report @GET_API_Test Salary-1122", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getPaymentTypeDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Consolidate Report @GET_API_Test Salary-1123", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryConsolidatedReport","GET",PROD_TOKEN,DEV_TOKEN, salaryConsolidateReportPayload);
  });
  test("Get Salary Compare Report @GET_API_Test Salary-1124", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryCompareReport","GET",PROD_TOKEN,DEV_TOKEN, salaryCompareReportPayload);
  });
  test("Get Salary Adjustment Report @GET_API_Test Salary-1125", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryAdjustmentReport","GET",PROD_TOKEN,DEV_TOKEN, salaryAdjustmentReportPayload);
  });
  test("Get Advance Salary Statement Report @GET_API_Test Salary-1126", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAdvanceSalaryStatement","GET",PROD_TOKEN,DEV_TOKEN, advanceSalaryStatementPayload);
  });
  test(" Get Claim Status Dropdown Report @GET_API_Test Salary-1127", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimStatusDropdownReport","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test(" Get Data Filteration Type Dropdown Report @GET_API_Test Salary-1128", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getDataFilterationTypeDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test(" Get Claim Category Dropdown Report @GET_API_Test Salary-1129", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimCategoryDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("  Get Claim Report @GET_API_Test Salary-1130", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimReport","GET",PROD_TOKEN,DEV_TOKEN, claimReportPayload);
  });
  test(" Get Claim Details Double Report @GET_API_Test Salary-1131", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimDetailsDoubleReport","GET",PROD_TOKEN,DEV_TOKEN, claimDetailsDoubleReportPayload);
  });
  test(" Get Claim Details Report @GET_API_Test Salary-1132", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getClaimDetailsReport","GET",PROD_TOKEN,DEV_TOKEN, claimDetailsReportPayload);
  });
  test(" Get Category Wise Claim Summary @GET_API_Test Salary-1133", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getCategoryWiseClaimSummary","GET",PROD_TOKEN,DEV_TOKEN, categoryWiseClaimSummaryReportPayload);
  });
  test(" Get Adjustment purposes dropdown @GET_API_Test Salary-1134", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getAdjustmentPurposeDropdownReport","GET",PROD_TOKEN,DEV_TOKEN, adjustmentPurposeReportPayload);
  });
  test(" Get Gratuity Report @GET_API_Test Salary-1135", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getGratuityReport","GET",PROD_TOKEN,DEV_TOKEN, gratuityReportPayload);
  });
  test(" Get Salary Deduction Report @GET_API_Test Salary-1136", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getSalaryDeductionReport","GET",PROD_TOKEN,DEV_TOKEN, salaryDeductionPayload);
  });
  test(" Get Deduction Analysis Type Report @GET_API_Test Salary-1137", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getDeductionAnalysisTypeReport","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test(" Get All Group By Dropdown Report @GET_API_Test Salary-1138", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getGroupByDropdownReport","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test(" Get Employee Wise Cash distributed salary report @GET_API_Test Salary-1139", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getCashDistributedSalaryReport","GET",PROD_TOKEN,DEV_TOKEN, cashDistributedSalaryPayload);
  });
  test(" Get Employee Wise Bonus distributed salary report @GET_API_Test Salary-1140", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"getCashDistributedBonusReport","GET",PROD_TOKEN,DEV_TOKEN, cashDistributedBonusPayload);
  });
});
test.describe("Salary: Claim Settings Api", () => {
  test("Get Claim Settings @GET_API_Test Salary-1141", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getClaimSettings","GET",PROD_TOKEN,DEV_TOKEN);
  }); 
  test("Create Claim Settings @POST_API_Test Salary-1142", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createClaimSettings","POST",PROD_TOKEN,DEV_TOKEN, claimSettingsPayload);
  });
});
test.describe("Salary: Consolidate Salary Config Api", () => {
  test("Get Claim Consolidate Salary Config @GET_API_Test Salary-1143", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getConsolidateSalaryConfigs","GET",PROD_TOKEN,DEV_TOKEN);
  }); 
  test("Create Claim Consolidate Salary Config  @POST_API_Test Salary-1144", async ({ request }) => {
    await SalaryApis.compareProdVsDev(request,"createConsolidateSalaryConfigs","POST",PROD_TOKEN,DEV_TOKEN, consolidateSalaryConfig);
  });
});
test.describe("Salary: Delete Salary Api", () => {
  test("Get Last Generated Salary Year Month @GET_API_Test Salary-1145", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getLastGeneratedSalaryYearMonth","GET",PROD_TOKEN,DEV_TOKEN);
  }); 
  test("Get Generated Salaries @GET_API_Test Salary-1146", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getGeneratedSalaries","GET",PROD_TOKEN,DEV_TOKEN, generateSalariesPayload );
  }); 
 
});
test.describe("Salary : Dynamic Salary Adjustment Policy Api", () => {
  test("Get Dynamic Salary Adjustment Policies @GET_API_Test Salary-1151", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getDynamicSalaryAdjustmentPolicies","GET",PROD_TOKEN,DEV_TOKEN);
  }); 
  test(" Get Amount Category Type Dropdown @GET_API_Test Salary-1154", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getAmountCategoryTypeDropdown","GET",PROD_TOKEN,DEV_TOKEN );
  }); 
});
test.describe("Salary : Dynamic Salary Adjustment Policy Mapping Api", () => {
  test("Get Dynamic Salary Adjustment Policies @GET_API_Test Salary-1156", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getDynamicSalaryAdjustmentPolicyMappings","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : Employee Claim Request Api", () => {
  test("Get Claim Request Bt Employee @GET_API_Test Salary-1159", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getClaimRequestByEmployee","GET",PROD_EMPLOYEE_TOKEN,DEV_EMPLOYEE_TOKEN);
  });
  test("Get Single Claim Request Details @GET_API_Test Salary-1161", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSingleClaimRequestDetails","GET",PROD_EMPLOYEE_TOKEN,DEV_EMPLOYEE_TOKEN, getDetailsOfSingleClaim );
  });
});
test.describe("Salary: Employee Salary Adjustment Api", () => {
  test("Get Employee Salary Adjustment @GET_API_Test Salary-1165", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getEmployeeSalaryAdjustment","GET",PROD_TOKEN,DEV_TOKEN, getEmployeeSalaryAdjustmentDataPayload);
  });
  test("Get is Salary Adjustment Eligible Status @GET_API_Test Salary-1167", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getIsSalaryAdjustmentEligibleStatus","GET",PROD_TOKEN,DEV_TOKEN, getIsAdjustmentEligible );
  });
  test("Download Salary Adjustment Template @GET_API_Test Salary-1168", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"downloadSalaryAdjustmentTemplate","GET",PROD_TOKEN,DEV_TOKEN, salaryAdjustmentDownloadTemplatePayload );
  });
});
test.describe("Salary : Employee Salary Structure Api", () => {
  test("Get Employee Salary Stracture @GET_API_Test Salary-1170", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getEmployeeSalaryStracture","GET",PROD_TOKEN,DEV_TOKEN, getEmployeeSalaryStracturePayload);
  });
  test("Get Payment Frequency Slip @GET_API_Test Salary-1173", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getPaymentFrequencySlip","GET",PROD_TOKEN,DEV_TOKEN );
  });
  test("Get Group Wise Salary Stracture @GET_API_Test Salary-1174", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getGroupWiseSalaryStracture","GET",PROD_TOKEN,DEV_TOKEN, groupWiseSalaryStracture );
  });
  test("Get Employee Salary Stracture @GET_API_Test Salary-1175", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getEmployeeSalaryStracture","GET",PROD_TOKEN,DEV_TOKEN, getEmployeeWiseSalaryStracturePayload );
  });
  test("Get Consolidate Salary Configs @GET_API_Test Salary-1176", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getConsolidateSalaryConfigs","GET",PROD_TOKEN,DEV_TOKEN );
  });
  test("Get Bulk upload Template Type @GET_API_Test Salary-1177", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getBuldUploadTemplateType","GET",PROD_TOKEN,DEV_TOKEN );
  });
  test("Get Salary Stracture Template @GET_API_Test Salary-1178", async ({ request }) => {
   await SalaryApis.compareProdVsDev(request,"getSalaryStractureTemplate","GET",PROD_TOKEN,DEV_TOKEN, downloadSalaryStractureTemplate );
  });

});
test.describe("Salary : Employee Wise Cash Distribution Api", () => {
  test("Get Employee Wise Cash Distribution @GET_API_Test Salary-1180", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getEmployeeWiseCashDistribution","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Employee Wise Cash Distribution By ID @GET_API_Test Salary-1183", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getEmployeeWiseCashDistributionByID","GET",PROD_TOKEN,DEV_TOKEN, getEmployeeWiseCashDistributionPayload );
  });
});
test.describe("Salary : Final Settlement Api", () => {
  test("Get Employee Withdrawal Info @GET_API_Test Salary-1185", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getEmployeeWithdrawalInfo","GET",PROD_TOKEN,DEV_TOKEN, getEmployeeWithdrawalInfoPayload);
  });
  test("Calculate Employee Gratuity @GET_API_Test Salary-1186", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"calculateEmployeeGratuity","GET",PROD_TOKEN,DEV_TOKEN, getEmployeeGratuityPayload );
  });
  test("Get Recalculated Leave Encashment @GET_API_Test Salary-1187", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getRecalculateLeaveEncashment","GET",PROD_TOKEN,DEV_TOKEN, getRecalculateLeaveEncashmentPayload );
  });
});
test.describe("Salary : Final Settlement Component Api ", () => {
  test("Get All Final Settlement Components @GET_API_Test Salary-1190", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllFinalSattlementComponent","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get a final settlement component details by id @GET_API_Test Salary-1193", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getFinalSattlementComponentByID","GET",PROD_TOKEN,DEV_TOKEN, getFinalSettlementComponentPayload );
  });
});
test.describe("Salary : Gratuity Calculation Api ", () => {
  test(" Get Gratuity Policy @GET_API_Test Salary-1194", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getGratuityPolicy","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get All Calculated Gratuity  @GET_API_Test Salary-1195", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllCalculatedGratuity","GET",PROD_TOKEN,DEV_TOKEN, getAllCalculatedGratuityPayload );
  });
  test("Get Calculated Gratuity  by id  @GET_API_Test Salary-1196", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getCalculatedGratuityByID","GET",PROD_TOKEN,DEV_TOKEN, getACalculatedGratuityByIDPayload );
  });
  test("Get Calculated Gratuity Payment Status Sli  @GET_API_Test Salary-1200", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getGratuityPaymentStatus","GET",PROD_TOKEN,DEV_TOKEN );
  });
});
test.describe("Salary : Gratuity Policy Api ", () => {
  test(" Get All Gratuity Policies @GET_API_Test Salary-1201", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllGratuityPolicies","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Fraction Consideration  @GET_API_Test Salary-1203", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getFractionConsideration","GET",PROD_TOKEN,DEV_TOKEN );
  });
});
test.describe("Salary : Heldup Employee Api ", () => {
  test(" Get All Salary Heldup Types @GET_API_Test Salary-1205", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllHeldupTypes","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get All Heldup Employees  @GET_API_Test Salary-1206", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllHeldupEmployees","GET",PROD_TOKEN,DEV_TOKEN, getAllHeldupEmployeesPayload );
  });
  test(" Get  Heldup Employee By ID  @GET_API_Test Salary-1209", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getHeldupEmployeeByID","GET",PROD_TOKEN,DEV_TOKEN, getHeldupEmployeeByIDPayload );
  });
});
test.describe("Salary : Increment Breakup Api ", () => {
  test(" Get Increment Breakup Items @GET_API_Test Salary-1211", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getIncrementBreakupItems","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Return all increment breakup @GET_API_Test Salary-1212", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllIncrementBreakUps","GET",PROD_TOKEN,DEV_TOKEN );
  });
  test(" Return increment breakup By ID  @GET_API_Test Salary-1215", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getIncrementBreakupItemByID","GET",PROD_TOKEN,DEV_TOKEN, getIncrementBreakupByIDPayload);
  });
});
test.describe("Salary : My Pay Slip Api ", () => {
  test(" Get My Pay Slip @GET_API_Test Salary-1220", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getMyPayslip","GET",PROD_EMPLOYEE_TOKEN,DEV_EMPLOYEE_TOKEN, getMyPayslipPayload);
  });
  test("Get My Payslip Report @GET_API_Test Salary-1222", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getMyPayslipReport","GET",PROD_EMPLOYEE_TOKEN,DEV_EMPLOYEE_TOKEN, getMyPayslipReportPayload );
  });
});
test.describe("Salary : Pay Slip Api ", () => {
  test(" Get Salary Pay Slip Emails @GET_API_Test Salary-1220", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getPayslipEmails","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Payslip Email Reports @GET_API_Test Salary-1222", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getPayslipEmailReport","GET",PROD_TOKEN,DEV_TOKEN, getpayslipEmailReportPayload );
  });
});
test.describe("Salary : Process Increment Api  ", () => {
  test(" Get Process Increments @GET_API_Test Salary-1223", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"generateProcessIncrements","GET",PROD_TOKEN,DEV_TOKEN, getProcessIncrementsPayload);
  });
  test("Load Processed Increments @GET_API_Test Salary-1226", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"loadProcessedIncrements","GET",PROD_TOKEN,DEV_TOKEN, loadProcessedIncrementsPayload );
  });
  test(" Generate Increment Reports @GET_API_Test Salary-1228", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"generateIncrementReports","GET",PROD_TOKEN,DEV_TOKEN, generateIncrementReportPayload );
  });
});
test.describe("Salary : Salary Base Breakup Api  ", () => {
  test(" Get All Salary Base Breakups @GET_API_Test Salary-1233", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryBasedBreakups","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary base Breakup Details By ID @GET_API_Test Salary-1236", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getBreakupDetailsByID","GET",PROD_TOKEN,DEV_TOKEN, getAllSalaryBaseBrekupsPayload );
  });
  test(" Get Salary Base Breakups Dropdown @GET_API_Test Salary-1238", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getSalaryBasedBreakupsDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : Salary Breakup Api  ", () => {
  test(" Get All Salary Breakups @GET_API_Test Salary-1239", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryBreakups","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Breakup Details By ID @GET_API_Test Salary-1242", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getBreakupDetailsByID","GET",PROD_TOKEN,DEV_TOKEN, getSalaryBrekupPayload );
  });
  test(" Get Salary Breakups Dropdown @GET_API_Test Salary-1244", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getSalaryBreakupDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : Salary Breakup Group Api  ", () => {
  test(" Get All Salary Breakup Groups @GET_API_Test Salary-1235", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryBreakupGroups","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Breakup Group Details By ID @GET_API_Test Salary-1248", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getBreakupGroupDetailsByID","GET",PROD_TOKEN,DEV_TOKEN, getSalaryBrekupGroupPayload );
  });
});
test.describe("Salary : salary eligible employees API  ", () => {
  test(" Get all salary eligible employees @GET_API_Test Salary-1249", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryEligibleEmployees","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get salary eligible employee By ID @GET_API_Test Salary-1252", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getsalaryEligibleEmployeeByID","GET",PROD_TOKEN,DEV_TOKEN, getsalaryeligibleemployeebyid );
  });
  test("Get Only Salary Eligible Employee @GET_API_Test Salary-1254", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getOnlySalaryEligibleEmployee","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : Salary Generation API  ", () => {
  test(" Get all recently generated salary @GET_API_Test Salary-1257", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllRecentlyGeneratedSalary","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get salary generation configuration @GET_API_Test Salary-1258", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getSalaryGenerationConfiguration","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : Salary Generation Policy API  ", () => {
  test("Get all Salary Generation Policy @GET_API_Test Salary-1259", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryGenerationPolicy","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : salary Group API  ", () => {
  test(" Get all salary Groups @GET_API_Test Salary-1261", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryGroups","GET",PROD_TOKEN,DEV_TOKEN);
  });
  test("Get Salary Group Details By ID @GET_API_Test Salary-1264", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getsalaryDetailsByID","GET",PROD_TOKEN,DEV_TOKEN, getsalaryDetailsById );
  });
  test("Get Salary Group Dropdown @GET_API_Test Salary-1265", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getSalaryGroupDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : salary Modification API  ", () => {
  test(" Get Salary Modification Details By Employee ID @GET_API_Test Salary-1266", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getsalaryDetailsByEmployeeID","GET",PROD_TOKEN,DEV_TOKEN, getsalaryDetailsByEmployeeId );
  });
});
test.describe("Salary : salary Transfer API  ", () => {
  test(" Get All Salary Transfer @GET_API_Test Salary-1269", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryTransfers","GET",PROD_TOKEN,DEV_TOKEN, getAllSalaryTransfers );
  });
  test(" Get  Salary Transfer Dropdown @GET_API_Test Salary-1271", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getSalaryTransferDropdown","GET",PROD_TOKEN,DEV_TOKEN);
  });
});
test.describe("Salary : salary Verifications API  ", () => {
  test(" Get All Salary Verifications @GET_API_Test Salary-1269", async ({ request }) => {
  await SalaryApis.compareProdVsDev(request,"getAllSalaryVerifications","GET",PROD_TOKEN,DEV_TOKEN, getAllSalaryVarification );
  });
});