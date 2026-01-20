import { test } from '@playwright/test';
import { AttendanceApis } from '../../pages/Attendance/attendanceApi.js';
import dotenv from 'dotenv';
import { employee_id, getAnnualHolidayPayload, getAttendanceConfigurationPayload, getAttendancePolicyPayload, getCompanyAttendanceDevicePayload, getDayWiseCheckInPayload, getEligibleEmployeeTypePayload, getEmployeeDailyAttendancePayload, getEmployeeProximityCardPayload, getOvertimePolicyMappingPayload, getOvertimePolicyPayload, getPolicyMappingPayload, getUpcomingDay } from '../../config/attendancePayloadData.js';
dotenv.config();
const PROD_TOKEN = process.env.PIHR_PROD_API_TOKEN;
const DEV_TOKEN = process.env.PIHR_DEV_API_TOKEN;

test.describe('Attendance API - Flag', () => {

  test("Get Flag GET API @GET_API_Test Attendance-1001", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getFlags", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create New Flag POST API @POST_API_Test Attendance-1002', async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createNewFlag", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  // test('Update Flag PUT API', async ({ request }) => {
  //   await AttendanceApis.compareProdVsDev(request, "updateFlag", 'PUT', PROD_TOKEN, DEV_TOKEN);
  // });



});


test.describe("Attendance API - Annual Holiday", () => {
  test("Get Annual Holiday GET API @GET_API_Test Attendance-1006", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAnnualHolidays", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Annual Holiday POST API @POST_API_Test Attendance-1007", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createAnnualHoliday", 'POST', PROD_TOKEN, DEV_TOKEN);
  });


  test("Update Annual Holiday PUT API @PUT_API_Test Attendance-1008", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updateAnnualHoliday", 'PUT', PROD_TOKEN, DEV_TOKEN, getAnnualHolidayPayload({ action: "PUT" }));
  });

  test("Get Annual Holiday by ID GET API @GET_API_Test Attendance-1010", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAnnualHolidayById", 'GET', PROD_TOKEN, DEV_TOKEN, getAnnualHolidayPayload({ action: "GET" }));
  });
  test("Delete Annual Holiday DELETE API @DELETE_API_Test Attendance-1009", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteAnnualHoliday", 'DELETE', PROD_TOKEN, DEV_TOKEN, getAnnualHolidayPayload({ action: "DELETE" }));
  });

  test("Get Global Annual Holiday GET API @GET_API_Test Attendance-1011", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getGlobalAnnualHolidays", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Global Annual Holiday POST API @POST_API_Test Attendance-1012", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createGlobalAnnualHoliday", 'POST', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe("Attendance API - Attendance Approval", () => {
  test("Get Attendance Approval GET API @GET_API_Test Attendance-1013", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceApprovals", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Attendance Approval by ID GET API @GET_API_Test Attendance-1016", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceApprovalById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Attendance Approval Status Dropdown GET API @GET_API_Test Attendance-1017", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceApprovalStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe("Attendance API - Attendance Configuration", () => {
  test("Get Attendance Configuration GET API @GET_API_Test Attendance-1018", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceConfiguration", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Attendance Configuration POST API @POST_API_Test Attendance-1019", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createAttendanceConfiguration", 'POST', PROD_TOKEN, DEV_TOKEN, getAttendanceConfigurationPayload());
  });

  test("Get Attendance Configuration Telegram Template GET API @GET_API_Test Attendance-1020", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceConfigurationTelegramTemplate", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Attendance Overtime Pre Approval Configuration GET API @GET_API_Test Attendance-1021", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceOvertimePreApprovalConfiguration", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe("Attendance API - Attendance Dashboard", () => {
  test("Get Attendance Dashboard Summary GET API @GET_API_Test Attendance-1022", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceDashboardSummary", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Todays Attendance GET API @GET_API_Test Attendance-1023", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getTodaysAttendance", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Missed Attendance GET API @GET_API_Test Attendance-1024", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMissedAttendanece", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Card Wise Attendance Summary GET API @GET_API_Test Attendance-1025", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCardWiseAttendanceSummary", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe("Attendance API - Attendance Deletion", () => {
  test("Get Attendance Deletion GET API @GET_API_Test Attendance-1026", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceDeletion", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Delete List of attendance DELETE API @DELETE_API_Test Attendance-1027", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteListOfAttendance", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Employee Type dropdown GET API @GET_API_Test Attendance-1028", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Delete single attendance DELETE API @DELETE_API_Test Attendance-1029", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteSingleAttendance", 'DELETE', PROD_TOKEN, DEV_TOKEN);
  });

});

test.describe.serial("Attendance Test - Employee Eligible Type Test", () => {
  test("Get Employee Eligible GET API @GET_API_Test Attendance-1030", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeEligibleType", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Employee Eligible POST API @POST_API_Test Attendance-1031", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createEmployeeEligibleType", 'POST', PROD_TOKEN, DEV_TOKEN, getEligibleEmployeeTypePayload());
  });

  test("Update Employee Eligible PUT API @PUT_API_Test Attendance-1032", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updateEligibleEmployeeType", 'PUT', PROD_TOKEN, DEV_TOKEN, getEligibleEmployeeTypePayload({ action: "PUT" }));
  });

  test("Get Employee Eligible by ID GET API @GET_API_Test Attendance-1033", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEligibleEmployeeTypeById", 'GET', PROD_TOKEN, DEV_TOKEN, getEligibleEmployeeTypePayload({ action: "GET" }));
  });

  test("Delete Employee Eligible DELETE API @DELETE_API_Test Attendance-1034", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteEligibleEmployeeType", 'DELETE', PROD_TOKEN, DEV_TOKEN, getEligibleEmployeeTypePayload({ action: "DELETE" }));
  });
});


test.describe("Attendance API - Attendance Policy", () => {
  test("Get Attendance Policy GET API @GET_API_Test Attendance-1035", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendancePolicies", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Attendance Policy POST API @POST_API_Test Attendance-1036", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createAttendancePolicy", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  test("Update Attendance Policy PUT API @PUT_API_Test Attendance-1037", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updateAttendancePolicy", 'PUT', PROD_TOKEN, DEV_TOKEN, getAttendancePolicyPayload({ action: "PUT" }));
  });

  test("Get Attendance Policy by ID GET API @GET_API_Test Attendance-1038", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendancePolicyById", 'GET', PROD_TOKEN, DEV_TOKEN, getAttendancePolicyPayload({ action: "GET" }));
  })

  test("Get Attendance Policy History by ID GET API @GET_API_Test Attendance-1039", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendancePolicyHistoryById", 'GET', PROD_TOKEN, DEV_TOKEN, getAttendancePolicyPayload({ action: "GET" }));
  });

  test("Delete Attendance Policy DELETE API @DELETE_API_Test Attendance-1040", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteAttendancePolicy", 'DELETE', PROD_TOKEN, DEV_TOKEN, getAttendancePolicyPayload({ action: "DELETE" }));
  });

  test("Get Working Type Dropdown GET API @GET_API_Test Attendance-1041", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getWorkingTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Company policy dropdown GET API @GET_API_Test Attendance-1042", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCompanyPolicyDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
});

test.describe("Attendance API - Attendance Policy Mapping", () => {
  test("Get Attendance Policy Mapping GET API @GET_API_Test Attendance-1043", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendancePolicyMapping", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Attendance Policy Mapping POST API @POST_API_Test Attendance-1044", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createAttendancePolicyMapping", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  test("Update Policy Mapping PUT API @PUT_API_Test Attendance-1045", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updatePolicyMapping", 'PUT', PROD_TOKEN, DEV_TOKEN, getPolicyMappingPayload({ action: "PUT" }));
  });

  test("Get Policy Mapping by ID GET API @GET_API_Test Attendance-1046", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getPolicyMappingById", 'GET', PROD_TOKEN, DEV_TOKEN, getPolicyMappingPayload({ action: "GET" }));
  });

  test("Delete Policy Mapping DELETE API @DELETE_API_Test Attendance-1047", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deletePolicyMapping", 'DELETE', PROD_TOKEN, DEV_TOKEN, getPolicyMappingPayload({ action: "DELETE" }));
  });
})

test.describe("Attendance API - Reconciliation", () => {
  test("Get Subordinate Reconciliation GET API @GET_API_Test Attendance-1053", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getSubordinatesReconciliation", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
});

test.describe("Attendance API - Break Time Reconciliation API", () => {
  test("Get Work Break API @GET_API_Test Attendance-1058", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getWorkBreak", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Break Time Reconciliation By ID GET API @GET_API_Test Attendance-1060", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getBreakTimeReconciliationById", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Break Time Reconciliation GET API @GET_API_Test Attendance-1061", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getBreakTimeReconciliation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Subordinate Break Time Reconciliation GET API @GET_API_Test Attendance-1062", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getSubordinatesBreakTimeReconciliation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("General Employee Work Break GET API @GET_API_Test Attendance-1067", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getGeneralEmployeeWorkBreaks", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Roster Employee Work Break GET API @GET_API_Test Attendance-1068", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterEmployeeWorkBreaks", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe.serial("Attendance API - Company Attendance Devices", () => {
  test("Get Company Attendance Devices GET API @GET_API_Test Attendance-1072", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCompanyAttendanceDevices", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Company Attendance Devices POST API @POST_API_Test Attendance-1073", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createCompanyAttendanceDevice", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  test("Update Company Attendance Devices PUT API @PUT_API_Test Attendance-1074", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updateCompanyAttendanceDevice", 'PUT', PROD_TOKEN, DEV_TOKEN, getCompanyAttendanceDevicePayload({ action: "PUT" }));
  });

  test("Delete Company Attendance Devices DELETE API @DELETE_API_Test Attendance-1075", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteCompanyAttendanceDevice", 'DELETE', PROD_TOKEN, DEV_TOKEN, getCompanyAttendanceDevicePayload({ action: "DELETE" }));
  });

  test("Get PiHR Device Types GET API @GET_API_Test Attendance-1076", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getPiHRDeviceTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Company Attendance Devices Dropdown GET API @GET_API_Test Attendance-1077", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCompanyAttendanceDevicesDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});



test.describe("Attendance API - Daily Attendance", () => {
  test("Get Daily Attendance GET API @GET_API_Test Attendance-1079", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getDailyAttendance", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Daily Attendance POST API @POST_API_Test Attendance-1080", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createDailyAttendance", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  // test("Get Daily Attendance Template GET API @GET_API_Test Attendance", async ({ request }) => {
  //   await AttendanceApis.compareProdVsDev(request, "getDailyAttendanceTemplate", 'GET', PROD_TOKEN, DEV_TOKEN);
  // });
});

test.describe.serial("Attendance API - Employee Proximity Card", () => {
  test("Get Employee Proximity Card GET API @GET_API_Test Attendance-1084", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeProximityCard", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Employee Proximity Card POST API @POST_API_Test Attendance-1085", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createEmployeeProximityCard", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  test("Update Employee Proximity Card PUT API @PUT_API_Test Attendance-1086", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updateEmployeeProximityCard", 'PUT', PROD_TOKEN, DEV_TOKEN, getEmployeeProximityCardPayload({ action: "PUT" }));
  });

  test("Get Employee Proximity Card by ID GET API @GET_API_Test Attendance-1087", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeProximityCardById", 'GET', PROD_TOKEN, DEV_TOKEN, getEmployeeProximityCardPayload({ action: "GET" }));
  });

  test("Delete Employee Proximity Card DELETE API @DELETE_API_Test Attendance-1088", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteEmployeeProximityCard", 'DELETE', PROD_TOKEN, DEV_TOKEN, getEmployeeProximityCardPayload({ action: "DELETE" }));
  });
});


test.describe("Attendance API - Face Recognition Approval", () => {
  test("Get Face Recognition Approval GET API @GET_API_Test Attendance-1095", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getFaceRecognitionApproval", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Verify Face Recognition Approval GET API @GET_API_Test Attendance-1098", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "verifyFaceRecognitionApproval", 'GET', PROD_TOKEN, DEV_TOKEN, { face_recognition_id: 237 });
  });
})


test.describe("Attendance API - Hotspots API", () => {
  test("Get Hotspots GET API @GET_API_Test Attendance-1099", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getHotspots", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Company Hotspots GET API @GET_API_Test Attendance-1101", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCompanyHotspots", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Hotspot by ID GET API @GET_API_Test Attendance-1102", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getHotspotById", 'GET', PROD_TOKEN, DEV_TOKEN, { hotspot_id: 8820 });
  });
});

test.describe("Attendance API - Leave or Salary Deduction Policy API", () => {
  test("Get Leave or Salary Deduction Policy GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getLeaveOrSalaryDeductionPolicy", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});

test.describe("Attendance API - Multiple Checking", () => {
  test("Get Multiple Checkins GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMultipleCheckins", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Attendance Configuration Policy GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceConfigurationPolicy", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Day Wise Checkins GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getDayWiseCheckins", 'GET', PROD_TOKEN, DEV_TOKEN, getDayWiseCheckInPayload());
  });

  test("Get Check In List GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCheckInList", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
})

test.describe("Attendance API - OT Operation", () => {
  test("Get Date Wise OT Operation GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOtOperation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Employee Wise OT Operation GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeWiseOtOperation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});


test.describe("Attendance API - Overtime Policy", () => {
  test("Get Overtime Policy GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePolicies", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Overtime Policy POST API @POST_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createOvertimePolicy", 'POST', PROD_TOKEN, DEV_TOKEN);
  });

  test("Update Overtime Policy PUT API @PUT_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "updateOvertimePolicy", 'PUT', PROD_TOKEN, DEV_TOKEN, getOvertimePolicyPayload({ action: "PUT" }));
  });

  test("Get Overtime Policy by ID GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePolicyById", 'GET', PROD_TOKEN, DEV_TOKEN, getOvertimePolicyPayload({ action: "GET" }));
  });

  // test("Delete Overtime Policy DELETE API @DELETE_API_Test Attendance", async ({ request }) => {
  //   await AttendanceApis.compareProdVsDev(request, "deleteOvertimePolicy", 'DELETE', PROD_TOKEN, DEV_TOKEN, getOvertimePolicyPayload({ action: "DELETE" }));
  // });

  test("Get Applicable Day Type GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getApplicableDayTypes", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Overtime policy dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePolicyDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  })
});

test.describe("Attendance API - Overtime Policy Mapping", () => {
  test("Get Overtime Policy Mapping GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePolicyMapping", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Create Overtime Policy Mapping POST API @POST_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "createOvertimePolicyMapping", 'POST', PROD_TOKEN, DEV_TOKEN, getOvertimePolicyMappingPayload());
  });

  test("Get Overtime Policy Mapping by Employee ID GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePolicyMappingByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, getOvertimePolicyMappingPayload({ action: "GET" }));
  });

  test("Delete Overtime Policy Mapping DELETE API @DELETE_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "deleteOvertimePolicyMapping", 'DELETE', PROD_TOKEN, DEV_TOKEN, getOvertimePolicyMappingPayload({ action: "DELETE" }));
  });
});

test.describe("Attendance API - Overtime PreApproval Application API", () => {
  test("Get Overtime PreApproval Application GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePreApprovalApplication", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Overtime PreApproval Application by ID GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePreApprovalApplicationById", 'GET', PROD_TOKEN, DEV_TOKEN, { application_id: 12 });
  });

  test("Get Overtime PreApproval Status Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimePreApprovalStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
})

test.describe("Attendance API - Roster Attendance Reconciliation API", () => {
  test("Get roster attendance reconciliations filter dropdown data API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterAttendanceReconciliationFilterDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Roster Attendance Reconciliation GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterAttendanceReconciliation", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
  test("Get Roster Eligible Employee GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getReconciliationRosterEligibleEmployee", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
})

test.describe("Attendance API - Roster Eligible Employee API", () => {
  test("Get Roster Eligible Employee GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterEligibleEmployee", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Roster Eligible Employee Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterEligibleEmployeeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Roster Eligible Employee By Employee Id GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterEligibleEmployeeByEmployeeId", 'GET', PROD_TOKEN, DEV_TOKEN, { employee_id: employee_id });
  });
})

test.describe("Attendance API - Roster Plan Modification API", () => {
  test("Get Roster Plan Modification GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterPlanModification", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Roster Plan Modification Unassigned GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterPlanModificationUnassigned", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  // test("Get Roster Plan Modification By Id GET API @GET_API_Test Attendance", async ({ request }) => {
  //   await AttendanceApis.compareProdVsDev(request, "getRosterPlanModificationById", 'GET', PROD_TOKEN, DEV_TOKEN, { roster_id : 2753947});
  // }); //error
})

test.describe("Attendance API - Roster Setup API", () => {
  test("Get Roster Setup Eligible Employees GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterSetupEligibleEmployees", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Roster Setups GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterSetups", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Copy Roster Setup GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getCopyRosterSetup", 'GET', PROD_TOKEN, DEV_TOKEN, getUpcomingDay());
  });
})


test.describe("Attendance API - Shifts Setup API", () => {
  test("Get Shifts Setup GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getShiftsSetup", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Shift Setup By Id GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getShiftSetupById", 'GET', PROD_TOKEN, DEV_TOKEN, { shift_id: 2600 });
  });

  test("Get Shift Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getShiftDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
})

test.describe("Attendance API - Shift Swap API", () => {
  test("Get Admin Shift Requests GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAdminShiftRequests", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Get Admin Shift Requests By Id GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAdminShiftRequestsById", 'GET', PROD_TOKEN, DEV_TOKEN, { request_id: 49 });
  });

  test("Get Shift Swap Status Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getShiftSwapStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
})


test.describe("Attendance API - Attendance Report", () => {
  test("Daily Attendance Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getDailyAttendanceReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Monthly Attendance Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMonthlyAttendanceReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Job Card Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getJobCardReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Attendance Analysis Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceAnalysisReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Attendance History Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceHistoryReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Employee Break Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeBreakReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Multiple Check In Check Out Details Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMultipleCheckInCheckOutDetailsReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Multiple Check In Check Out Summary Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMultipleCheckInCheckOutSummaryReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Roster Schedule Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRosterScheduleReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Continuous Absent Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getContinuousAbsentReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Attendance Percentage Wise Employee Ranking Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendancePercentageWiseEmployeeRankingReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Monthly Summary Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMonthlySummaryReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Extra Work days Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getExtraWorkDaysReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Reconciliation Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getReconciliationReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Overtime Details Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getOvertimeDetailsReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Monthly Overtime Summary Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getMonthlyOvertimeSummaryReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Attendance Policy Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAttendanceReportPolicy", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Employee Attendance Policy Mapping Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeAttendancePolicyMappingReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Employee OT Policy Mapping Report GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getEmployeeOTPolicyMappingReport", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Analysis Type Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getAnalysisTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Ranking Report Analysis Type Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getRankingReportAnalysisTypeDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Terminal Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getTerminalDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test("Approval Status Dropdown GET API @GET_API_Test Attendance", async ({ request }) => {
    await AttendanceApis.compareProdVsDev(request, "getApprovalStatusDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
  });
});