import { test } from '@playwright/test';
import { EmployeeApis } from '../../pages/Employee/employeeApi.js';
import * as payloads from '../../config/employeePayloadData.js';
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

test.describe('Employee profile API ', () => {
  test('Employee profile information should be same in PROD & DEV @API_Test Employee-1001', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeProfile", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Employee profiles cards information should be same in PROD & DEV @API_Test Employee-1002', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeCards", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Employee profiles life-events information should be same in PROD & DEV @API_Test Employee-1003', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getemployeeProfilesLifeEvents", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Employee profiles tasks-overview information should be same in PROD & DEV @API_Test Employee-1004', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getemployeeProfilesTasksOverview", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

});

test.describe('Employee Department', () => {

  test('Get all Employee department response and compare PROD & DEV @GET_API_Test Employee-1005', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDepartment", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee department @POST_API_Test Employee-1006', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createNewEmployeeDepartment", 'POST', PROD_TOKEN, DEV_TOKEN, departmentCreatePayload);
  });

  test('Update Employee department @PUT_API_Test Employee-1007', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeDepartment", 'PUT', PROD_TOKEN, DEV_TOKEN, updateDepartmentPayload);
  });

  test('Delete Employee department @DELETE_API_Test Employee-1008', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeDepartment", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Division API ', () => {

  test('Employee Divisions response should be same in PROD & DEV @GET_API_Test Employee-1009', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDivisions", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee Division @POST_API_Test Employee-1010', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeDivisions", 'POST', PROD_TOKEN, DEV_TOKEN, divisionCreatePayload);
  });

  test('Update Employee Division @PUT_API_Test Employee-1011', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeDivisions", 'PUT', PROD_TOKEN, DEV_TOKEN, updateDivisionPayload);
  });

  test('Delete Employee Division @DELETE_API_Test Employee-1012', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeDivisions", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe('Employee Department unit', () => {

  test('Get all Employee department unit dropdown response and compare PROD & DEV @GET_API_Test Employee-1013', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDepartmentUnitDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee department unit response and compare PROD & DEV @GET_API_Test Employee-1014', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDepartmentUnit", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee department unit @POST_API_Test Employee-1015', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeDepartmentUnit", 'POST', PROD_TOKEN, DEV_TOKEN, departmentUnitCreatePayload);
  });

  test('Update Employee department unit @PUT_API_Test Employee-1016', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeDepartmentUnit", 'PUT', PROD_TOKEN, DEV_TOKEN, updateDepartmentUnitPayload);
  });

  test('Delete Employee department unit @DELETE_API_Test Employee-1017', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeDepartmentUnit", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Designation', () => {
   test('Get all Employee designation response and compare PROD & DEV @GET_API_Test Employee-1018', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDesignations", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee designation dropdown response and compare PROD & DEV @GET_API_Test Employee-1019', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDesignationsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee designation @POST_API_Test Employee-1020', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeDesignation", 'POST', PROD_TOKEN, DEV_TOKEN, getDesignationCreatePayload());
  });

  test('Update Employee designation @PUT_API_Test Employee-1021', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeDesignation", 'PUT', PROD_TOKEN, DEV_TOKEN, getDesignationUpdatePayload());
  });

  test('Delete Employee designation @DELETE_API_Test Employee-1022', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeDesignation", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee designation by ID @GET_API_Test Employee-1023', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDesignationsById", 'GET', PROD_TOKEN, DEV_TOKEN, { "designation_id": 35 });
  });
});

test.describe('Employee Designation groups', () => {
   test('Get all Employee designation groups response and compare PROD & DEV @GET_API_Test Employee-1024', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDesignationGoups", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee designation groups dropdown response and compare PROD & DEV @GET_API_Test Employee-1025', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDesignationGoupsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee designation @POST_API_Test Employee-1026', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeDesignationGroups", 'POST', PROD_TOKEN, DEV_TOKEN, designationGroupCreatePayload);
  });

  test('Update Employee designation @PUT_API_Test Employee-1027', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeDesignationGroups", 'PUT', PROD_TOKEN, DEV_TOKEN, updateDesignationGrouppayload);
  });

  test('Delete Employee designation @DELETE_API_Test Employee-1028', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeDesignationGroups", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

});

test.describe('Employee documnets categories', () => {
   test('Get all Employee documnets categories response and compare PROD & DEV @GET_API_Test Employee-1029', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentCategory", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee documents categories dropdown response and compare PROD & DEV @GET_API_Test Employee-1030', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentCategoryDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee documents category @POST_API_Test Employee-1031', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeDocumentsCategories", 'POST', PROD_TOKEN, DEV_TOKEN, documentCategoryCreatePayload);
  });

  test('Update Employee documents category @PUT_API_Test Employee-1032', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeDocumentsCategories", 'PUT', PROD_TOKEN, DEV_TOKEN, documentCategoryUpdatePayload);
  });

  test('Delete Employee documents category @DELETE_API_Test Employee-1033', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeDocumentCategory", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee document category by ID @GET_API_Test Employee-1034', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentCategoryById", 'GET', PROD_TOKEN, DEV_TOKEN, { "document_category_id": 168 });
  });

});

test.describe('Employee Educations apis', () => {
   test('Get all Employee Educations response and compare PROD & DEV @GET_API_Test Employee-1035', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee Education category @POST_API_Test Employee-1036', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeEducation", 'POST', PROD_TOKEN, DEV_TOKEN, educationCreatePayload);
  });

  test('Update Employee Education @PUT_API_Test Employee-1037', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeEducation", 'PUT', PROD_TOKEN, DEV_TOKEN, educationUpdatePayload);
  });

  test('Delete Employee  Education @DELETE_API_Test Employee-1038', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeEducation", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee education by ID @GET_API_Test Employee-1039', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationById", 'GET', PROD_TOKEN, DEV_TOKEN, { "education_id": 2303 });
  });

});

test.describe('Employee Educations grade division apis', () => {

  test('Get all Employee Educations grade division response and compare PROD & DEV @GET_API_Test Employee-1040', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationGradeDivisions", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee Educations grade division dropdown response and compare PROD & DEV @GET_API_Test Employee-1041', async ({ request }) => {
   await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationGradeDivisionsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee Education grade division @POST_API_Test Employee-1042', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeGradeDivisions", 'POST', PROD_TOKEN, DEV_TOKEN, educationGradeDivisionCreatePayload);
  }); 

  test('Update Employee Education grade division @PUT_API_Test Employee-1043', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeGradeDivisions", 'PUT', PROD_TOKEN, DEV_TOKEN, educationGradeDivisionUpdatePayload);
  });

  test('Delete Employee  Education grade division @DELETE_API_Test Employee-1044', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeEducationGradeDivisions", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee education by ID @GET_API_Test Employee-1045', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationById", 'GET', PROD_TOKEN, DEV_TOKEN, { "education_id": 2303 });
  });

});

test.describe('Employee Educations group apis', () => {
  test('Get all Employee Educations group response  @GET_API_Test Employee-1046', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationGroups", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee Education group @POST_API_Test Employee-1047', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeEducationGroups", 'POST', PROD_TOKEN, DEV_TOKEN, educationGroupCreatePayload);
  });

  test('Update Employee Education group @PUT_API_Test Employee-1048', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeEducationGroups", 'PUT', PROD_TOKEN, DEV_TOKEN, educationGroupUpdatePayload);
  });

  test('Delete Employee  Education group @DELETE_API_Test Employee-1049', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeEducationGroups", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee Educations group dropdown @GET_API_Test Employee-1050', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationGroupDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee Educations group by ID @GET_API_Test Employee-1051', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationGroupsById", 'GET', PROD_TOKEN, DEV_TOKEN ,{"education_group_id": 42 });
  });

});

test.describe('Employee Educations institute apis', () => {

  test('Get all Employee Educations institute response and compare PROD & DEV @GET_API_Test Employee-1052', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationInstitutes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get all Employee Educations institute dropdown response and compare PROD & DEV @GET_API_Test Employee-1053', async ({ request }) => {
   await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationInstitutesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee Education institute @POST_API_Test Employee-1054', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeEducationInstitutes", 'POST', PROD_TOKEN, DEV_TOKEN, educationInstitutesCreatePayload);
  }); 

  test('Update Employee Education institute @PUT_API_Test Employee-1055', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeEducationInstitutes", 'PUT', PROD_TOKEN, DEV_TOKEN,  educationInstitutesupdatePayload);
  });

  test('Delete Employee  Education institute @DELETE_API_Test Employee-1056', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "deleteEmployeeEducationInstitutes", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee education institute by ID @GET_API_Test Employee-1057', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationInstitutesById", 'GET', PROD_TOKEN, DEV_TOKEN, { "institute_id": 12 });
  });

});

test.describe('Employee Supervisor apis', () => {

  test('Get all Employee Supervisor info by employee id  @GET_API_Test Employee-1058', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeSupervisorByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, { "employee_id": 1256 });
  });

  test('Get all Employee Supervisor info by supervisor id @GET_API_Test Employee-1059', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeSupervisorBySupervisorId", 'GET', PROD_TOKEN, DEV_TOKEN, { "supervisor_id": 72876 });
  });

  test('Set new Employee supervisor @POST_API_Test Employee-1060', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "setEmployeeSupervisor", 'POST', PROD_TOKEN, DEV_TOKEN, employeeSupervisorSetPayload);
  }); 

  test('Update Employee Supervisor @PUT_API_Test Employee-1061', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "updateEmployeeSupervisor", 'PUT', PROD_TOKEN, DEV_TOKEN);
  });

  test('Delete Employee Supervisor @DELETE_API_Test Employee-1062', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "deleteEmployeeSupervisor", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee job status apis', () => {
  test('Get Employee job status data  @GET_API_Test Employee-1063', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee job status by dropdown data  @GET_API_Test Employee-1064', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee job status @POST_API_Test Employee-1065', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeJobStatus", 'POST', PROD_TOKEN, DEV_TOKEN, jobStatusCreatePayload);
  }); 

  test('Update Employee job status @PUT_API_Test Employee-1066', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "updateEmployeeJobStatus", 'PUT', PROD_TOKEN, DEV_TOKEN, jobStatusUpdatePayload);
  });

  test('Delete Employee job status @DELETE_API_Test Employee-1067', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "deleteEmployeeJobStatuses", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  }); 
});

test.describe('Employee job Level apis', () => {
  test('Get Employee job Levels data  @GET_API_Test Employee-1068', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobLevel", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee job Levels  by dropdown data  @GET_API_Test Employee-1069', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobLevelDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee job Levels  @POST_API_Test Employee-1070', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeJobLevel", 'POST', PROD_TOKEN, DEV_TOKEN, jobLevelCreatePayload);
  }); 

  test('Update Employee job Levels  @PUT_API_Test Employee-1071', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "updateEmployeeJobLevel", 'PUT', PROD_TOKEN, DEV_TOKEN, jobLevelUpdatePayload);
  });

  test('Delete Employee job Levels  @DELETE_API_Test Employee-1072', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "deleteEmployeeJobLevel", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  }); 
});

test.describe('Employee job Base apis', () => {
  test('Get Employee job Base data  @GET_API_Test Employee-1073', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobBase", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee job Base  by dropdown data  @GET_API_Test Employee-1074', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobBaseDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee job Base  @POST_API_Test Employee-1075', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeJobBase", 'POST', PROD_TOKEN, DEV_TOKEN, jobBaseCreatePayload);
  }); 

  test('Update Employee job Base  @PUT_API_Test Employee-1076', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "updateEmployeeJobBase", 'PUT', PROD_TOKEN, DEV_TOKEN, jobBaseUpdatePayload);
  });

  test('Delete Employee job Base  @DELETE_API_Test Employee-1077', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "deleteEmployeeJobBase", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  }); 
});

test.describe('Employee job Group apis', () => {
  test('Get Employee job Group data  @GET_API_Test Employee-1078', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobGroup", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Employee job Group  @POST_API_Test Employee-1079', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeJobGroup", 'POST', PROD_TOKEN, DEV_TOKEN,jobGroupCreatePayload);
  }); 

  test('Update Employee job Group  @PUT_API_Test Employee-1080', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "updateEmployeeJobGroup", 'PUT', PROD_TOKEN, DEV_TOKEN,jobGroupUpdatePayload);
  });

  test('Delete Employee job Group  @DELETE_API_Test Employee-1081', async ({ request }) => {
  await EmployeeApis.compareProdVsDev(request, "deleteEmployeeJobGroup", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  }); 
});

test.describe('Employee Organogram apis data', () => {
  test('Get Employee organogram data  @GET_API_Test Employee-1082', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeOrganogram", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Get Employee organogram data by employee id  @GET_API_Test Employee-1083', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeOrganogramByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN , { "employee_id": 13365 });
  });
});

test.describe.serial('Employee Status to be Effective apis data', () => {
  test('Get Employee oStatus to be Effective data  @GET_API_Test Employee-1084', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeStatusEffectiveData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Create new Employee Status to be Effective  @POST_API_Test Employee-1085', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeStatusEffective", 'POST', PROD_TOKEN, DEV_TOKEN, employeeStatusEffectiveDataSetPayload);
  });

  test('Get Employee oStatus to be Effective data by Effective ID  @GET_API_Test Employee-1086', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeStatusEffectiveById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test.skip('Update new Employee Status to be Effective  @PUT_API_Test Employee-1087', async ({ request }) => {
   await EmployeeApis.compareProdVsDev(request, "updateEmployeeStatusEffective", 'PUT', PROD_TOKEN, DEV_TOKEN, employeeStatusEffectiveDataUpdatePayload);
  });

  test('Delete Employee Status to be Effective  @DELETE_API_Test Employee-1088', async ({ request }) => {
   await EmployeeApis.compareProdVsDev(request, "deleteEmployeeStatusEffective", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });
 });


test.describe('Employee Approval Workflow apis data', () => {
  test('Get Employee Approval Workflow data  @GET_API_Test Employee-1089', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getApprovalWorkflows", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Approval Workflow dropdown data  @GET_API_Test Employee-1090', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getApprovalWorkflowsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Get Employee Approval Workflow  data by Workflow id @GET_API_Test Employee-1091', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getApprovalWorkflowsById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Get Employee Workflow Application Type Dropdown @GET_API_Test Employee-1092', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getApprovalWorkflowsByApplicationTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Workflow Approver Type Dropdown @GET_API_Test Employee-1093', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getApprovalWorkflowsByApproverTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  
  // test('Create new  Employee Workflow  @POST_API_Test Employee-1094', async ({ request }) => {
  //   await EmployeeApis.compareProdVsDev(request, "createApprovalWorkflows", 'POST', PROD_TOKEN, DEV_TOKEN, employeeApprovalWorkflowCreatePayload);
  // });

  // test('Update new Employee Workflow  @PUT_API_Test Employee-1095', async ({ request }) => {
  //  await EmployeeApis.compareProdVsDev(request, "updateApprovalWorkflows", 'PUT', PROD_TOKEN, DEV_TOKEN, employeeApprovalWorkflowUpdatePayload);
  // });

  // test('Delete Employee Workflow  @DELETE_API_Test Employee-1096', async ({ request }) => {
  //  await EmployeeApis.compareProdVsDev(request, "deleteApprovalWorkflows", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  // });
 });

 test.describe('Employee Approval Workflow mapping apis data', () => {
  test('Get Employee Approval Workflow mapping data  @GET_API_Test Employee-1097', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeApprovalWorkFlowMapping", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Approval Workflow mapping by id  @GET_API_Test Employee-1098', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeApprovalWorkFlowMappingById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  

});

 test.describe('Employee Assets apis data', () => {
  test('Get Employee Assets data  @GET_API_Test Employee-1102', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssets", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Assets dropdown data  @GET_API_Test Employee-1103', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
   test('Get Employee Asset Status dropdown data  @GET_API_Test Employee-1104', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Get employee distributed assets by asset id  @GET_API_Test Employee-1105', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetsDistributionHistoryByAssetId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAssetsGetPayload);
  });
  
  test('Get Employee Asset by asset id  @GET_API_Test Employee-1106', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test.skip('Get Employee assigned Asset info  @GET_API_Test Employee-1107', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getAssignedEmployeeAssets", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee company Asset info  @GET_API_Test Employee-1108', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getCompanyAssets", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

});

test.describe('Employee Assets category apis data', () => {
  test('Get Employee Asset category data  @GET_API_Test Employee-1114', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetCategories", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Asset category dropdown data  @GET_API_Test Employee-1115', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetCategoriesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Assets category attachment ifno by asset category id  @GET_API_Test Employee-1116', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetCategoryAttachmentByCategoryId", 'GET', PROD_TOKEN, DEV_TOKEN , employeeAssetCategoryCreatePayload);
  });

  test('Get Employee Download asset category attachment by attachment id  @GET_API_Test Employee-1117', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeAssetCategoryAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN , employeeAssetCategoryCreatePayload);
  });
  

  test('Get Employee asset category preview url by asset category id  @GET_API_Test Employee-1118', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "assetCategoryPreviewURL", 'GET', PROD_TOKEN, DEV_TOKEN , employeeAssetCategoryCreatePayload);
  });

});

test.describe('Employee Assets Distribution apis data', () => {
  test('Get Employee Asset Distribution data  @GET_API_Test Employee-1122', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetDistribution", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Asset Distribution create update data  @GET_API_Test Employee-1123', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetDistributionUpdateCreateData", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAssetDistributionGetPayload);
  });

});

test.describe('Employee Assets Requisition apis data', () => {
  test('Get Employee Asset Requisition data  @GET_API_Test Employee-1129', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetRequisition", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Asset Requisition data by id  @GET_API_Test Employee-1130', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetRequisitionById", 'GET', PROD_TOKEN, DEV_TOKEN,employeeAssetRequisitionGetPayload);
  });

    test('Get Employee Asset subordinate Requisition data by id  @GET_API_Test Employee-1131', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getSubordinateAssetRequisition", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Assets Report apis data', () => {
  test('Get Employee Asset report  @GET_API_Test Employee-1135', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAssetReport", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAssetReportPayload);
  });
});

test.describe('Employee Award type apis data', () => {
  test('Get Employee Award type data  @GET_API_Test Employee-1136', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAwardTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test('Get Employee Award type dropdown data  @GET_API_Test Employee-1137', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAwardTypesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test.skip('Create new Employee Award type @POST_API_Test Employee-1138', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "createEmployeeAwardType", 'POST', PROD_TOKEN, DEV_TOKEN, employeeAwardTypeCreatePayload);
  });

  test('Update Employee Award type @PUT_API_Test Employee-1139', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "updateEmployeeAwardType", 'PUT', PROD_TOKEN, DEV_TOKEN, employeeAwardTypeUpdatePayload);
  });

  test('Get Employee Award type by ID @GET_API_Test Employee-1140', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAwardTypeById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee birthday apis data', () => {
  test('Get Employee Birthday notification  @GET_API_Test Employee-1141', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeBirthdayNotifications", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

   test('Get Employee Birthday notification dropdown  @GET_API_Test Employee-1142', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeBirthdayNotificationsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create Employee Birthday notification  @POST_API_Test Employee-1143', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "createEmployeeBirthdayNotification", 'POST', PROD_TOKEN, DEV_TOKEN, employeeBirthdayNotificationCreatePayload);
  });

  test('Send Employee Birthday notification  @GET_API_Test Employee-1144', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeBirthdaySendNotificationInfo", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Accommodations apis data', () => {
  test('Get Employee Accommodation data  @GET_API_Test Employee-1145', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAccommodations", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Accommodation details by acommodation id  @GET_API_Test Employee-1146', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAccommodationById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAccommodationGetPayload);
 });

 test('Get Employee Accommodation attachment details by accommodation id  @GET_API_Test Employee-1147', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAccommodationAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAccommodationAttachmentPayload);
 });

});

test.describe('Employee Air ticket apis data', () => {
  test('Get Employee Air ticket data  @GET_API_Test Employee-1151', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAirTickets", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
   test('Get Employee Air ticket by ID  @GET_API_Test Employee-1152', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAirTicketById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAirTicketingGetPayload);
  });
});

test.describe('Employee apis data', () => {
  test('Get Employee cr code  data by employee id  @GET_API_Test Employee-1157', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeQRCodeById", 'GET', PROD_TOKEN, DEV_TOKEN,employeeIdPayload);
  });
  
  test('Get Employee Profile data  @GET_API_Test Employee-1158', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeProfileData", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Department data  @GET_API_Test Employee-1159', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDepartmentData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Supervisor subordinate data by supervisor id  @GET_API_Test Employee-1160', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeSubordinatesBySupervisorId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeSupervisorPayload);
  });
  
  test( 'Get all Employees data  @GET_API_Test Employee-1161', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getAllEmployeesData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test ('Get Employee data with talent info @GET_API_Test Employee-1162', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeesWithTalentInfo", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get employee all supervisor info @GET_API_Test Employee-1163', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getAllSupervisorsData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get employee admin user info @GET_API_Test Employee-1164', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAdminUserInfo", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  
  test('Get Employees By  BranchId @GET_API_Test Employee-1165', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeesByBranchId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeBranchPayload);
  });

  test('Get Roaster Employees By  BranchId @GET_API_Test Employee-1166', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getRoasterEmployeesByBranchId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeBranchPayload);
  });

  test('Get employee pending profile images approval data @GET_API_Test Employee-1167', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getEmployeePendingProfileImageApprovalData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get employee directory data @GET_API_Test Employee-1168', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDirectoryData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get employee filter option data @GET_API_Test Employee-1169', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getEmployeeFilterOptionsData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get employee paginated data by branch id @GET_API_Test Employee-1170', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getPaginatedFilteredEmployees", 'GET', PROD_TOKEN, DEV_TOKEN, employeeBranchPayload);
  });

  test('Get get search employee dropdown data @GET_API_Test Employee-1171', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getSearchEmployeeDropdownData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get getEmployee Basic Info By Id @GET_API_Test Employee-1172', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getEmployeeBasicInfoById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employment Status Dropdown Data @GET_API_Test Employee-1173', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getEmploymentStatusDropdownData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('GetEmployee Info ByEmployee Code @GET_API_Test Employee-1174', async ({ request }) => {   
    await EmployeeApis.compareProdVsDev(request, "getEmployeeInfoByEmployeeCode", 'GET', PROD_TOKEN, DEV_TOKEN, employeeCodePayload);
  });
 });

 test.describe('Employee Awards apis data', () => {
  test('Get Employee Awards data  @GET_API_Test Employee-1187', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAwardsData", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Awards by ID  @GET_API_Test Employee-1188', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeAwardById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeAwardCreatePayload);
  });
});

test.describe('Employee Bank Account apis data', () => {
  test('Get Employee Bank Account data  @GET_API_Test Employee-1192', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getAllBankAccounts", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Bank Accounts By EmployeeId @GET_API_Test Employee-1193', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getBankAccountsByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeBankAccountPayload);
  });

  test('Get Bank Account By Id @GET_API_Test Employee-1194', async ({ request }) => {  
    await EmployeeApis.compareProdVsDev(request, "getBankAccountDetailsById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeBankAccountByIdPayload);
  });
});

test.describe('Employee Car apis data', () => {
  test('Get Employee Cars data  @GET_API_Test Employee-1198', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeCars", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Car by ID  @GET_API_Test Employee-1199', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeCarById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeCarByIdPayload);
  });

  test('Download employee car attachment by attachment id  @GET_API_Test Employee-1201', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeCarAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeCarAttachmentPayload);
  });

});

test.describe('Employee Contact apis data', () => {
  test('Get Employee Contact data  @GET_API_Test Employee-1204', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeContactInfoById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });
});

test.describe('Employee Dashboard graphs', () => {
  test('Get Employee Dashboard Status Graph @GET_API_Test Employee-1206', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDasboardStatusGraph", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Dashboard Monthly Active Graph @GET_API_Test Employee-1207', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDashboardMonthlyActiveGraph", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Dashboard Religion Graph @GET_API_Test Employee-1208', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDashboardReligionGraph", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Dashboard Religion Graph @GET_API_Test Employee-1209', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDashboardBranchBloodGroupGraph", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Documents apis', () => {
  test('Get Employee Documents by Employee ID @GET_API_Test Employee-1210', async ({ request }) => {
   await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentsByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeDocumentPayload);
  });

  test('Get Employee Document by ID @GET_API_Test Employee-1211', async ({ request }) => {
   await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentById", 'GET', PROD_TOKEN, DEV_TOKEN,documentIdPayload);
  });

  test('Get Employee Document Category Dropdown @GET_API_Test Employee-1212', async ({ request }) => {
     await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentCategoryDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
   });

  test('Download Employee Document by ID @GET_API_Test Employee-1213', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeDocumentById", 'GET', PROD_TOKEN, DEV_TOKEN, documentIdPayload);
   });
});

test.describe('Employee Document Request apis', () => {
  test('Get Employee Document Requests @GET_API_Test Employee-1217', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentRequest", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Document Request Details by id @GET_API_Test Employee-1218', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentRequestDetails", 'GET', PROD_TOKEN, DEV_TOKEN, documentApplicationIdPayload);
  });

  test('Get Employee Document Application Status Dropdown @GET_API_Test Employee-1219', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDocumentApplicationStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Educations apis', () => {
  test('Get Employee Educations by Employee ID @GET_API_Test Employee-1223', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationsByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN,employeeEducationIdPayload);
  });

  test('Get Employee Education by emp_education_id @GET_API_Test Employee-1224', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationEmpById", 'GET', PROD_TOKEN, DEV_TOKEN,employeeEducationByIdPayload);
  });

  test('Get Employee Educations dropdown @GET_API_Test Employee-1225', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeEducationDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Family Details apis', () => {
  test('Get Employee Family Details by Employee ID @GET_API_Test Employee-1229', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeFamilyDetailsByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeFamilyDetailsByPayload);
  });

  test('Get Employee Family Detail by ID @GET_API_Test Employee-1230', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeFamilyDetailsById", 'GET', PROD_TOKEN, DEV_TOKEN,employeeFamilyDetailsByIdPayload);
  });
});

test.describe('Employee Health Insurance apis', () => {
  test('Get Employee Health Insurances @GET_API_Test Employee-1234', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeHealthInsurances", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Health Insurance by ID @GET_API_Test Employee-1235', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeHealthInsuranceById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeHealthInsuranceByIdPayload);
  });

  test('Download Employee Health Insurance Attachment by ID @GET_API_Test Employee-1236', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeHealthInsuranceAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeHealthInsuranceAttachmentPayload);
  });
});

test.describe('Employee Incentives apis', () => {
  test('Get Employee Incentives @GET_API_Test Employee-1240', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeIncentives", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Incentive by ID @GET_API_Test Employee-1241', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeIncentiveById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIncentiveByIdPayload);
  });
});

test.describe('Employee Languages apis', () => {
  test('Get Employee Languages dropdown @GET_API_Test Employee-1245', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeLanguagesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Languages by Employee ID @GET_API_Test Employee-1246', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeLanguagesByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeDocumentPayload);
  });

  test('Get Employee Language by ID @GET_API_Test Employee-1247', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeLanguageById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeLanguageByIdPayload);
  });
});


test.describe('Employee Mobile apis data', () => {
  test('Get Employee Mobiles data  @GET_API_Test Employee-1251', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeMobiles", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Mobile by ID  @GET_API_Test Employee-1252', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeMobileById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeMobileByIdPayload);
  });

  test('Download employee mobile attachment by attachment id  @GET_API_Test Employee-1253', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeMobileAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeMobileAttachmentPayload);
  });
});

test.describe('Employee Passport apis data', () => {
  test('Get Employee Passports by Employee ID  @GET_API_Test Employee-1257', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeePassportsByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeDocumentPayload);
  });

  test('Get Employee Passport by ID  @GET_API_Test Employee-1258', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeePassportById", 'GET', PROD_TOKEN, DEV_TOKEN, employeePassportByIdPayload);
  });

  test('Download employee passport attachment by passport id  @GET_API_Test Employee-1259', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeePassportAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeePassportByIdPayload);
  });
});

test.describe('Employee Report apis data', () => {
  test('Generate Position Report @GET_API_Test Employee-1263', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportsPosition", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportByBranchPayload);
  });

  test('Generate Profile Report @GET_API_Test Employee-1264', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportsProfile", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportByBranchPayload);
  });

  test('Generate Religion & Blood Group Report @GET_API_Test Employee-1265', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportBlood", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportByBranchPayload);
  });

  test('Generate Alert Report @GET_API_Test Employee-1266', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportAlert", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportByBranchPayload);
  });

  test('Generate Contact Report @GET_API_Test Employee-1267', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportContact", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportContactPayload);
  });

  test('Generate Month-wise Joining/Dismiss Report @GET_API_Test Employee-1268', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportMonthWiseJoiningDismissEmployee", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportMonthWiseJoiningDismissEmployeePayload);
  });

  test('Generate Age / Service Length Report @GET_API_Test Employee-1269', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportAgeOrServiceLength", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportAgeOrServiceLengthPayload);
  });

  test('Generate Supervisor & Leave Approver Report @GET_API_Test Employee-1270', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportSupervisorAndLeaveApprover", 'GET', PROD_TOKEN, DEV_TOKEN,employeeReportContactPayload);
  });

  test('Generate Transfer History Report @GET_API_Test Employee-1271', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportTransferHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportContactPayload);
  });

  test('Generate Passport & Visa Report @GET_API_Test Employee-1272', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportPassportAndVisa", 'GET', PROD_TOKEN, DEV_TOKEN, employeeDocumentPayload);
  });

  test('Generate Template Report @GET_API_Test Employee-1273', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportTemplateReport", 'GET', PROD_TOKEN, DEV_TOKEN, employeeDocumentPayload);
  });

  test('Get Report Expiration Check Dropdown @GET_API_Test Employee-1274', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportExpirationCheckDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Report Template Dropdown @GET_API_Test Employee-1275', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportTemplateDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Order By Dropdown @GET_API_Test Employee-1276', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeReportEmployeeOrderByDropdown", 'GET', PROD_TOKEN, DEV_TOKEN, employeeReportidPayload);
  });
});

test.describe('Employee Status & Change History apis', () => {
  test('Get Employee Statuses by Employee ID @GET_API_Test Employee-1277', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeStatusesByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Location Change History @GET_API_Test Employee-1278', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeLocationChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Job Status Change History @GET_API_Test Employee-1279', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobStatusChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Job Base Change History @GET_API_Test Employee-1280', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobBaseChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Category Change History @GET_API_Test Employee-1281', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeCategoryChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Designation Change History @GET_API_Test Employee-1282', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeDesignationChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Job Level Change History @GET_API_Test Employee-1283', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeJobLevelChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });

  test('Get Employee Functional Designation Change History @GET_API_Test Employee-1284', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeFunctionalDesignationChangeHistory", 'GET', PROD_TOKEN, DEV_TOKEN, employeeIdPayload);
  });
});

test.describe('Employee Talent apis data', () => {
  test('Get Employee Talents by Employee ID  @GET_API_Test Employee-1294', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTalentsByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, employeeDocumentPayload);
  });

  test('Get all Employee Talents  @GET_API_Test Employee-1295', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTalentsByEmployeeIds", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Talent by Talent ID  @GET_API_Test Employee-1296', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTalentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeTalentByIdPayload);
  });
});

test.describe('Employee Visa apis data', () => {
  test('Get Employee Visas by Employee & Passport ID @GET_API_Test Employee-1300', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeVisasByPassport", 'GET', PROD_TOKEN, DEV_TOKEN, employeeVisaByPassportPayload);
  });

  test('Get Employee Visa by ID  @GET_API_Test Employee-1301', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeVisaById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeVisaByIdPayload);
  });

  test('Get Employee Visa Type Dropdown  @GET_API_Test Employee-1302', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeVisaTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  }); 

  test('Download employee visa attachment by visa id  @GET_API_Test Employee-1303', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeVisaAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeVisaByIdPayload);
  });
});

test.describe('Employee Warning apis data', () => {
  test('Get Employee Warnings @GET_API_Test Employee-1307', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeWarnings", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Warning by ID @GET_API_Test Employee-1308', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeWarningById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeWarningByIdPayload);
  });

  test('Get Employee Warning Image Attachment @GET_API_Test Employee-1309', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeWarningImageAttachment", 'GET', PROD_TOKEN, DEV_TOKEN, employeeWarningByIdPayload);
  });

  test('Download Employee Warning Attachment @GET_API_Test Employee-1310', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "downloadEmployeeWarningAttachmentById", 'GET', PROD_TOKEN, DEV_TOKEN, employeeWarningDownloadAttachmentPayload);
  });

  test('Get Employee warning report @GET_API_Test Employee-1311', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeWarningShowReport", 'GET', PROD_TOKEN, DEV_TOKEN, employeeWarningReportPayload);
  });
});

test.describe('Employee Work Experience apis data', () => {
  test('Get Employee Work Experience by Employee ID @GET_API_Test Employee-1316', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeWorkExperienceByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN,employeeDocumentPayload);
  });
});

test.describe('Employee Employment Categories apis data', () => {
  test('Get Employment Categories Dropdown @GET_API_Test Employee-1313', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmploymentCategoriesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employment Categories @GET_API_Test Employee-1314', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmploymentCategories", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Functional Designations apis data', () => {
  test('Get Functional Designations @GET_API_Test Employee-1324', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getFunctionalDesignations", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

   test('Get Functional Designation by ID @GET_API_Test Employee-1325', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getFunctionalDesignationById", 'GET', PROD_TOKEN, DEV_TOKEN, functionalDesignationByIdPayload);
  });

  test('Get Functional Designations dropdown @GET_API_Test Employee-1326', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getFunctionalDesignationsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Talent Types apis data', () => {
  test('Get Talent Types dropdown @GET_API_Test Employee-1330', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTalentTypesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Talent Types @GET_API_Test Employee-1331', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTalentTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe('Employee Task apis data', () => {
  test('Get Task Status @GET_API_Test Employee-1335', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task Create Update Data @GET_API_Test Employee-1336', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskCreateUpdateData", 'GET', PROD_TOKEN, DEV_TOKEN,employeeTaskIdPayload);
  });

  test('Get Task Customer Info Dropdown @GET_API_Test Employee-1337', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskInfoDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Check if Task Check-in is enabled @GET_API_Test Employee-1338', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskIsCheckInEnabled", 'GET', PROD_TOKEN, DEV_TOKEN, employeeTaskIsCheckInEnabledPayload);
  });

  test('Get Task Customer Branch Dropdown @GET_API_Test Employee-1339', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskCustomerBranchDropdown", 'GET', PROD_TOKEN, DEV_TOKEN, employeeTaskCustomerBranchDropdownPayload);
  });

  test('Get Admin Tasks @GET_API_Test Employee-1340', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskAdminTasks", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Tasks @GET_API_Test Employee-1341', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskEmployeeTasks", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task by ID @GET_API_Test Employee-1342', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeTaskById", 'GET', PROD_TOKEN, DEV_TOKEN,employeeTaskIdPayload);
  });
});

test.describe('Employee Task Categories apis data', () => {
  test('Get Task Categories @GET_API_Test Employee-1352', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskCategories", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task Categories dropdown @GET_API_Test Employee-1353', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskCategoriesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN)
  });

  test('Get Task Category by ID @GET_API_Test Employee-1354', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskCategoryById", 'GET', PROD_TOKEN, DEV_TOKEN, taskCategoriesByIdPayload);
  });
});

test.describe('Employee Task Priorities apis data', () => {
  test('Get Task Priorities @GET_API_Test Employee-1355', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskPriorities", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task Priorities dropdown @GET_API_Test Employee-1356', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskPrioritiesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task Priority by ID @GET_API_Test Employee-1357', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskPriorityById", 'GET', PROD_TOKEN, DEV_TOKEN, taskPrioritiesByIdPayload);
  });
});

test.describe('Employee Task Report apis data', () => {
  test('Generate Task Report PDF/Excel @GET_API_Test Employee-1364', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskReportPdfExcel", 'GET', PROD_TOKEN, DEV_TOKEN, taskReportPayload);
  });

  test('Get Task Report Customer Branch Dropdown @GET_API_Test Employee-1365', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskReportCustomerBranchDropdown", 'GET', PROD_TOKEN, DEV_TOKEN, taskReportPayload);
  });
});

test.describe('Employee Task Status apis data', () => {
  test('Get Task Status list @GET_API_Test Employee-1366', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskStatus", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task Status dropdown @GET_API_Test Employee-1367', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Task Status by ID @GET_API_Test Employee-1368', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTaskStatusById", 'GET', PROD_TOKEN, DEV_TOKEN, taskStatusByIdPayload);
  });
});

test.describe('Employee Tracking and Monitoring apis data', () => {
  test('Filter Tracked Users @GET_API_Test Employee-1373', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingMonitoringFilterTrackedUsers", 'GET', PROD_TOKEN, DEV_TOKEN, trackingMonitoringBranchIdPayload);
  });

  test('Employee Live Tracking by ID @GET_API_Test Employee-1374', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingMonitoringEmployeeLiveTracking", 'GET', PROD_TOKEN, DEV_TOKEN, trackingMonitoringEmployeeIdPayload);
  });

  test('Employee Track History @GET_API_Test Employee-1375', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingMonitoringEmployeeTrackHistory", 'GET', PROD_TOKEN, DEV_TOKEN, trackingMonitoringEmployeeIdPayload);
  });
});

test.describe('Employee Tracking Enables apis data', () => {
  test('Get Tracking Enables @GET_API_Test Employee-1376', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingEnables", 'GET', PROD_TOKEN, DEV_TOKEN, trackingMonitoringBranchIdPayload);
  });

  test('Get Already Active Tracked Users @GET_API_Test Employee-1377', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingEnablesAlreadyActiveTrackedUsers", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Tracking History Reports @GET_API_Test Employee-1381', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingHistoryReports", 'GET', PROD_TOKEN, DEV_TOKEN, trackingHistoryReportsPayload);
  });
});

test.describe('Employee Tracking Schedules apis data', () => {
  test('Get Tracking Schedules list @GET_API_Test Employee-1382', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingSchedules", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Tracking Schedule by ID @GET_API_Test Employee-1383', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingSchedulesById", 'GET', PROD_TOKEN, DEV_TOKEN, trackingSchedulesMappingsByIdPayload);
  });

  test('Get Tracking Schedule Mappings by ID @GET_API_Test Employee-1384', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTrackingSchedulesMappingsById", 'GET', PROD_TOKEN, DEV_TOKEN, trackingSchedulesMappingsByIdPayload);
  });
});

test.describe('Employee Travel Allowances apis data', () => {
  test('Get Travel Allowances list @GET_API_Test Employee-1391', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTravelAllowances", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Travel Allowance by ID @GET_API_Test Employee-1392', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getTravelAllowancesById", 'GET', PROD_TOKEN, DEV_TOKEN, travelAllowancesByIdPayload);
  });
});

test.describe('Employee Warning Types apis data', () => {
  test('Get Warning Types list @GET_API_Test Employee-1396', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getWarningTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Warning Types dropdown @GET_API_Test Employee-1397', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getWarningTypesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Warning Type by ID @GET_API_Test Employee-1398', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getWarningTypesById", 'GET', PROD_TOKEN, DEV_TOKEN, warningTypesByIdPayload);
  });
});

test.describe('Employee Wings apis data', () => {
  test('Get Wings list @GET_API_Test Employee-1400', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getWings", 'GET', PROD_TOKEN, DEV_TOKEN, wingsPayload);
  });

  test('Get Wings dropdown @GET_API_Test Employee-1401', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getWingsDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Wing by ID @GET_API_Test Employee-1402', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getWingsById", 'GET', PROD_TOKEN, DEV_TOKEN, wingsByIdPayload);
  });

});

test.describe('Employee Birthdays apis data', () => {
  test('Get Employee Birthdays list @GET_API_Test Employee-1405', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeBirthdays", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Get Employee Birthday Wishes @GET_API_Test Employee-1406', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "getEmployeeBirthdayWishes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Employee Birthday Wish By ID @GET_API_Test Employee-1407', async ({ request }) => {
    await EmployeeApis.compareProdVsDev(request, "employeeBirthdayWishById", 'GET', PROD_TOKEN, DEV_TOKEN,employeeBirthdayWishIdPayload);
  });

});


