import { getApiMapByEnv } from "../../api/attendanceApiMap.js";
import {
  getFlagPayload,
  getAnnualHolidayPayload,
  getCurrentYear,
  getAnnualHolidayBulkPayload,
  getFromandToDate,
  getEmployeeDailyAttendancePayload,
  daily_attendance_id,
  getAttendancePolicyPayload,
  getPolicyMappingPayload,
  getOvertimePolicyPayload,
  getAttendanceDeletionPayload,
  getEligibleEmployeeTypePayload,
  getCompanyAttendanceDevicePayload,
  getEmployeeProximityCardPayload,
  employee_id,
  approval_id,
  break_time_reconciliation_id,
} from "../../config/attendancePayloadData.js";
import {
  compareApisByEnvWithHandlers,
  cacheCreatedEntityId,
  resolveDeletePayload,
} from "../../utils/apiCompare.js";
import entityResolver from "../../utils/entityResolver.js";
import { findIdInApiList } from "../../utils/listMatcher.js";
import BasePage from "../BasePage.js";

export class AttendanceApis extends BasePage {
  constructor(request, env) {
    super(request, env);
    this.request = request;
    this.apiMap = getApiMapByEnv(env);
    this.env = env;
  }

  async findIdFromList(token, listFnName, name, options = {}) {
    try {
      return await findIdInApiList(this, token, listFnName, name, options);
    } catch (e) {
      console.log(`findIdFromList: error calling ${listFnName}`, e && e.message ? e.message : e);
      return null;
    }
  } 

  // ==================== FLAG CRUD ====================
  async createNewFlag(token, payload) {
    return this.request.post(this.apiMap.attendanceFlag.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload || getFlagPayload(),
    });
  }

  async updateFlag(token, payload) {
    return this.request.put(this.apiMap.attendanceFlag.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getFlags(token) {
    return this.request.get(this.apiMap.attendanceFlag.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteFlag(token, flag_id) {
    if (!flag_id) throw new Error("deleteFlag requires flag_id");
    const url = this.apiMap.deleteFlag.url.replace("{flag_id}", flag_id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // ==================== ANNUAL HOLIDAY CRUD ====================
  async getAnnualHolidays(token) {
    return this.request.get(this.apiMap.annualHoliday.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  async findAnnualHolidayIdByDescription(token, name) {
    return this.findIdFromList(token, "getAnnualHolidays", name, { storeKey: "annual_holiday", idFields: ["holiday_id", "id",], nameFields: ["description"] });
  }
  async createAnnualHoliday(token, payload) {
    return this.request.post(this.apiMap.annualHoliday.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async updateAnnualHoliday(token, payload) {
    // Note: This endpoint likely expects holiday_id in payload or URL
    // We'll rely on payload having {{annual_holiday}} replaced via resolver
    return this.request.put(this.apiMap.annualHoliday.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }


  async getGlobalAnnualHolidays(token) {
    const url = this.apiMap.globalAnnualHoliday.url.replace("{year}", getCurrentYear());
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  async getAnnualHolidayById(token, payload) {
    const holiday_id = typeof payload === 'object' ? payload.holiday_id : payload;
    const url = this.apiMap.annualHolidayById.url.replace("{holiday_id}", holiday_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteAnnualHoliday(token, payload) {
    const holiday_id = typeof payload === 'object' ? payload.holiday_id : payload;
    const url = this.apiMap.annualHolidayById.url.replace(
      "{holiday_id}",
      holiday_id
    );
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  async createGlobalAnnualHoliday(token) {
    return this.request.post(this.apiMap.createGlobalAnnualHoliday.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: getAnnualHolidayBulkPayload(),
    })
  }



  // Attendance Policies
  async getAttendancePolicies(token) {
    return this.request.get(this.apiMap.attendancePolicy.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  async createAttendancePolicy(token, payload) {
    return this.request.post(this.apiMap.attendancePolicy.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async updateAttendancePolicy(token, payload) {
    return this.request.put(this.apiMap.attendancePolicy.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getAttendancePolicyById(token, payload) {
    const policy_id = typeof payload === 'object' ? payload.attendance_policy_id : payload;
    const url = this.apiMap.attendancePolicyById.url.replace("{attendance_policy_id}", policy_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getAttendancePolicyHistoryById(token, payload) {
    const policy_id = typeof payload === 'object' ? payload.attendance_policy_id : payload;
    const url = this.apiMap.attendancePolicyHistoryById.url.replace("{attendance_policy_id}", policy_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getWorkingTypeDropdown(token) {
    return this.request.get(this.apiMap.workingTypeDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getCompanyPolicyDropdown(token) {
    return this.request.get(this.apiMap.companyPolicyDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async deleteAttendancePolicy(token, payload) {
    const policy_id = typeof payload === 'object' ? payload.attendance_policy_id : payload;
    const url = this.apiMap.attendancePolicyById.url.replace("{attendance_policy_id}", policy_id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async findPolicyIdByName(token, name) {
    return this.findIdFromList(token, "getAttendancePolicies", name, { storeKey: "attendance_policy", idFields: ["attendance_policy_id"], nameFields: ["policy_name"] });
  }

  // Attendance Dashboard
  getAttendanceDashboardSummary(token) {
    return this.request.get(this.apiMap.attendanceDashboardSummary.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getTodaysAttendance(token) {
    return this.request.get(this.apiMap.todaysAttendance.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getMissedAttendanece(token) {
    return this.request.get(this.apiMap.missedAttendance.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getCardWiseAttendanceSummary(token) {
    return this.request.get(this.apiMap.cardWiseAttendanceSummary.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };



  // Daily Attendance 
  async getDailyAttendance(token) {
    const { from_date, to_date } = getFromandToDate();
    return this.request.get(this.apiMap.dailyAttendance.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    });
  };

  async createDailyAttendance(token, payload) {
    return this.request.post(this.apiMap.dailyAttendance.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async deleteDailyAttendance(token) {
    const url = this.apiMap.dailyAttendanceById.url.replace("{daily_attendance_id}", daily_attendance_id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getDailyAttendanceTemplate(token) {
    return this.request.get(this.apiMap.dailyAttendanceTemplate.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }


  // Attendance Policy Mapping
  async getAttendancePolicyMapping(token) {
    return this.request.get(this.apiMap.attendancePolicyMapping.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createAttendancePolicyMapping(token, payload) {
    return this.request.post(this.apiMap.attendancePolicyMapping.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async updatePolicyMapping(token, payload) {
    return this.request.put(this.apiMap.attendancePolicyMapping.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getPolicyMappingById(token, payload) {
    const policy_mapping_id = typeof payload === 'object' ? payload.policy_mapping_id : payload;
    const url = this.apiMap.attendancePolicyMappingById.url.replace("{policy_mapping_id}", policy_mapping_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deletePolicyMapping(token, payload) {
    const policy_mapping_id = typeof payload === 'object' ? payload.policy_mapping_id : payload;
    const url = this.apiMap.attendancePolicyMappingById.url.replace("{policy_mapping_id}", policy_mapping_id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async findPolicyMappingIdByName(token, name) {
    return this.findIdFromList(token, "getAttendancePolicyMapping", name, { storeKey: "attendance_policy", idFields: ["policy_mapping_id"], nameFields: ["attendance_policy"] });
  }

  // Overtime Policy
  async getOvertimePolicies(token) {
    return this.request.get(this.apiMap.overtimePolicy.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async createOvertimePolicy(token, payload) {
    return this.request.post(this.apiMap.overtimePolicy.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async updateOvertimePolicy(token, payload) {
    return this.request.put(this.apiMap.overtimePolicy.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getOvertimePolicyById(token, payload) {
    const policy_id = typeof payload === 'object' ? payload.overtime_policy_id : payload;
    const url = this.apiMap.overtimePolicyById.url.replace("{over_time_policy_id}", policy_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteOvertimePolicy(token, payload) {
    const policy_id = typeof payload === 'object' ? payload.overtime_policy_id : payload;
    const url = this.apiMap.overtimePolicyById.url.replace("{over_time_policy_id}", policy_id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getApplicableDayTypes(token) {
    return this.request.get(this.apiMap.applicableDayType.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getOvertimePolicyDropdown(token) {
    return this.request.get(this.apiMap.overtimePolicyDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Overtime Policy
  async getOvertimePolicyMapping(token) {
    return this.request.get(this.apiMap.overtimePolicyMapping.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async createOvertimePolicyMapping(token, payload) {
    return this.request.post(this.apiMap.overtimePolicyMapping.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getOvertimePolicyMappingByEmployeeId(token, payload) {
    const employee_id = typeof payload === 'object' ? payload.employee_id : payload;
    const url = this.apiMap.overtimePolicyMappingEmployee.url.replace("{employee_id}", employee_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteOvertimePolicyMapping(token, payload) {
    return this.request.delete(this.apiMap.overtimePolicyMapping.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    })
  }

  // Attendance Deletion API
  async getAttendanceDeletion(token) {
    return this.request.get(this.apiMap.attendanceDeletion.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: getAttendanceDeletionPayload()
    });
  }

  async getAttendanceIds(
    token,
    limit
  ) {
    const response = await this.getAttendanceDeletion(token);
    const responseData = await response.json();
    const data = responseData?.data ?? [];

    if (data.length === 0) return null;

    if (limit) {
      // if more than 2, return only 2
      if (data.length > 2) {
        return data.slice(0, 2).map(item => item.daily_attendance_id);
      }

      // length is 1 or 2 → return all
      return data.map(item => item.daily_attendance_id);
    }

    // limitResult === false → return only one
    return [data[0].daily_attendance_id];
  }

  async deleteListOfAttendance(token, payload) {
    const arraryId = await this.getAttendanceIds(token, true);
    if (arraryId === null) {
      throw new Error("No data to delete");
    }
    return this.request.delete(this.apiMap.attendanceDeletion.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: arraryId,
    });
  }


  async getEmployeeTypeDropdown(token) {
    return this.request.get(this.apiMap.attendanceDeletionDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async deleteSingleAttendance(token, payload) {
    const id = await this.getAttendanceIds(token, false);
    if (id === null) {
      throw new Error("No data to delete");
    }
    const url = this.apiMap.attendanceDeletionById.url.replace("{attendance_deletion_id}", id[0]);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Employee Eligible Type
  async findEligibleEmployeeTypeIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeEligibleType", name, { storeKey: "eligible_employee_type", idFields: ["id"], nameFields: ["eligible_employee"] });
  }
  async getEmployeeEligibleType(token) {
    return this.request.get(this.apiMap.eligibleType.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  async createEmployeeEligibleType(token, payload) {
    return this.request.post(this.apiMap.eligibleType.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getEligibleEmployeeTypeById(token, payload) {
    const id = typeof payload === 'object' ? payload.id : payload;
    const url = this.apiMap.eligibleTypeById.url.replace("{id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateEligibleEmployeeType(token, payload) {
    return this.request.put(this.apiMap.eligibleType.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    })
  }

  async deleteEligibleEmployeeType(token, payload) {
    const id = typeof payload === 'object' ? payload.id : payload;
    const url = this.apiMap.eligibleTypeById.url.replace("{id}", id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Attendance Reconciliation 
  async getSubordinatesReconciliation(token) {
    return this.request.get(this.apiMap.subordinatesReconciliation.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Break Time Reconciliation
  async getWorkBreak(token) {
    return this.request.get(this.apiMap.workBreakApi.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  
  async getBreakTimeReconciliationById(token) {
    return this.request.get(this.apiMap.workBreakReconciliationGet.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        break_time_reconciliation_id
      }
    })
  }

  async getBreakTimeReconciliation(token) {
    return this.request.get(this.apiMap.workBreakReconciliationBreak.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getSubordinatesBreakTimeReconciliation(token) {
    return this.request.get(this.apiMap.subordinateWorkBreaks.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getGeneralEmployeeWorkBreaks(token) {
    const {from_date, to_date} = getFromandToDate("M");
    return this.request.get(this.apiMap.generalEmployeeWorkBreaks.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date,
        to_date
      }
    })
  }

  async getRosterEmployeeWorkBreaks(token) {
    const {from_date, to_date} = getFromandToDate("M");
    return this.request.get(this.apiMap.rosterEmployeeWorkBreaks.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date,
        to_date
      }
    })
  }

  // Attendance Configuration
  async getAttendanceConfiguration(token) {
    return this.request.get(this.apiMap.attendanceConfiguration.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async createAttendanceConfiguration(token, payload) {
    return this.request.post(this.apiMap.attendanceConfiguration.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async getAttendanceConfigurationTelegramTemplate(token) {
    return this.request.get(this.apiMap.attendanceConfigurationTelegramTemplate.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getAttendanceOvertimePreApprovalConfiguration(token) {
    return this.request.get(this.apiMap.attendanceOvertimePreapprovalConfiguration.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Company Attendance Device
  async getCompanyAttendanceDevices(token) {
    return this.request.get(this.apiMap.companyAttendanceDevice.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  };

  async createCompanyAttendanceDevice(token, payload) {
    return this.request.post(this.apiMap.companyAttendanceDevice.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async findCompanyAttendanceDeviceIdByName(token, name) {
    return this.findIdFromList(token, "getCompanyAttendanceDevices", name, { storeKey: "company_attendance_device", idFields: ["company_wise_device_id"], nameFields: ["device_key"] });
  }

  async updateCompanyAttendanceDevice(token, payload) {
    return this.request.put(this.apiMap.companyAttendanceDevice.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    })
  }

  async deleteCompanyAttendanceDevice(token, payload) {
    const id = typeof payload === 'object' ? payload.company_wise_device_id : payload;
    const url = this.apiMap.companyAttendanceDeviceById.url.replace("{id}", id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getPiHRDeviceTypes(token) {
    return this.request.get(this.apiMap.pihrDeviceTypes.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getCompanyAttendanceDevicesDropdown(token) {
    return this.request.get(this.apiMap.companyAttendanceDeviceDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Employee Proximity Cards
  async getEmployeeProximityCard(token) {
    return this.request.get(this.apiMap.employeeProximityCards.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async createEmployeeProximityCard(token, payload) {
    return this.request.post(this.apiMap.employeeProximityCards.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async findEmployeeProximityCardIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeProximityCard", name, { storeKey: "employee_proximity_card", idFields: ["card_id"], nameFields: ["card_number"] });
  }

  async updateEmployeeProximityCard(token, payload) {
    return this.request.put(this.apiMap.employeeProximityCards.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    })
  }

  async getEmployeeProximityCardById(token, payload) {
    const id = typeof payload === 'object' ? payload.card_id : payload;
    const url = this.apiMap.employeeProximityCardsById.url.replace("{card_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async deleteEmployeeProximityCard(token, payload) {
    const id = typeof payload === 'object' ? payload.card_id : payload;
    const url = this.apiMap.employeeProximityCardsById.url.replace("{card_id}", id);
    return this.request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Face Recognition Approval
  async getFaceRecognitionApproval(token) {
    return this.request.get(this.apiMap.faceRecognitionApprovals.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getPendingFaceRecognitionIds(token) {
    const response = await this.getFaceRecognitionApproval(token); // API call
    const responseData = await response.json(); // JSON response
    const data = responseData?.data ?? [];
    const pendingItems = data.filter(
      item => item.is_approved === 'Pending'
    );

    if (pendingItems.length === 0) {
      return null;
    }

    return pendingItems
      .slice(0, 2)
      .map(item => item.face_recognition_id);
  }

  async createFaceRecognitionApproval(token, payload) {
    const data = await this.getPendingFaceRecognitionIds(token);
    if (data === null) {
      throw new Error("No data to create");
    }
    return this.request.post(this.apiMap.faceRecognitionApprovals.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
  }

  async verifyFaceRecognitionApproval(token, payload) {
    const face_recognition_id = typeof payload === 'object' ? payload.face_recognition_id : payload;
    const url = this.apiMap.verifyFaceRecognition.url.replace("{face_recognition_id}", face_recognition_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Hotspot API
  async getHotspots(token) {
    return this.request.get(this.apiMap.hotspots.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getCompanyHotspots(token) {
    return this.request.get(this.apiMap.companyHotspots.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getHotspotById(token, payload) {
    const id = typeof payload === 'object' ? payload.hotspot_id : payload;
    const url = this.apiMap.hotspotById.url.replace("{hotspot_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Leave Or Salary Deduction Policy API
  async getLeaveOrSalaryDeductionPolicy(token) {
    return this.request.get(this.apiMap.leaveOrSalaryDeductionPolicy.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Multiple Checking
  async getMultipleCheckins(token) {
    return this.request.get(this.apiMap.multipleCheckins.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getAttendanceConfigurationPolicy(token) {
    return this.request.get(this.apiMap.multiCheckingAttendanceConfigurationPolicy.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getDayWiseCheckins(token, payload) {
    return this.request.get(this.apiMap.dayWiseCheckIn.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: payload
    })
  };

  async getCheckInList(token) {
    return this.request.get(this.apiMap.checkInList.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // OT Operation
  async getOtOperation(token) {
    const {from_date, to_date} = getFromandToDate("Y");
    return this.request.get(this.apiMap.getDateWiseOT.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }

  async getEmployeeWiseOtOperation(token) {
    const {from_date, to_date} = getFromandToDate("Y");
    return this.request.get(this.apiMap.getEmployeeWiseOT.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }

  // Overtime Pre Approval Application API
  async getOvertimePreApprovalApplication(token) {
    return this.request.get(this.apiMap.overtimePreApprovalApplication.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getOvertimePreApprovalApplicationById(token, payload) {
    const id = typeof payload === 'object' ? payload.application_id : payload;
    const url = this.apiMap.overtimePreApprovalApplicationById.url.replace("{application_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getOvertimePreApprovalStatusDropdown(token) {
    return this.request.get(this.apiMap.overtimePreApprovalStatusDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Roster Attendance Reconciliation API
  async getRosterAttendanceReconciliationFilterDropdown(token) {
    return this.request.get(this.apiMap.filterDropdownData.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getRosterAttendanceReconciliation(token) {
    const {from_date, to_date} = getFromandToDate("M");
    return this.request.get(this.apiMap.rosterAttendanceReconciliation.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }

  async getReconciliationRosterEligibleEmployee(token) {
    return this.request.get(this.apiMap.reconciliationRosterEligibleEmployee.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Roster Eligible Employees
  async getRosterEligibleEmployee(token) {
    return this.request.get(this.apiMap.rosterEligibleEmployee.url, {
      headers: { Authorization: `Bearer ${token}` },
      params:{
        is_eligible: true
      }
    })
  }

  async getRosterEligibleEmployeeDropdown(token) {
    return this.request.get(this.apiMap.rosterEligibleEmployeeDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getRosterEligibleEmployeeByEmployeeId(token, payload) {
    const id = typeof payload === 'object' ? payload.employee_id : payload;
    const url = this.apiMap.rosterEligibleEmployeeByEmployeeId.url.replace("{employee_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Roster Plan Modification API
  async getRosterPlanModification(token) {
    const from_date = '01-01-2025';
    const to_date = '01-01-2026';
    return this.request.get(this.apiMap.rosterPlanModification.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }

  async getRosterPlanModificationUnassigned(token) {
    const {from_date, to_date} = getFromandToDate("Y");
    return this.request.get(this.apiMap.rosterPlanModificationUnassigned.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }

  async getRosterPlanModificationById(token, payload) {
    const id = typeof payload === 'object' ? payload.roster_id : payload;
    const url = this.apiMap.rosterPlanModificationById.url.replace("{roster_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Roster Setup 
  async getRosterSetupEligibleEmployees(token) {
    return this.request.get(this.apiMap.rosterSetupEligibleEmployee.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getRosterSetups(token) {
    return this.request.get(this.apiMap.rosterSetups.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getCopyRosterSetup(token, payload) {
    return this.request.get(this.apiMap.copyRosterSetup.url, {
      headers: { Authorization: `Bearer ${token}` },
      params:
      {
        editable_start_date: payload.future_date,
        editable_end_date: payload.future_date,
        start_date: payload.future_date,
        end_date: payload.future_date
      }
    })
  }

  // Shift Setups
  async getShiftsSetup(token) {
    return this.request.get(this.apiMap.shiftSetup.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getShiftSetupById(token, payload) {
    const id = typeof payload === 'object' ? payload.shift_id : payload;
    const url = this.apiMap.shiftSetupById.url.replace("{shift_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getShiftDropdown(token) {
    return this.request.get(this.apiMap.shiftDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Shift Swap API
  async getAdminShiftRequests(token) {
    return this.request.get(this.apiMap.adminShiftRequests.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getAdminShiftRequestsById(token, payload) {
    const id = typeof payload === 'object' ? payload.request_id : payload;
    const url = this.apiMap.adminShiftRequestsById.url.replace("{request_id}", id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getShiftSwapStatusDropdown(token) {
    return this.request.get(this.apiMap.shiftSwapStatusDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  // Attendance Report APIs
  async getDailyAttendanceReport(token) {
    const { from_date, to_date } = getFromandToDate();
    return this.request.get(this.apiMap.dailyAttendanceReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }

  async getMonthlyAttendanceReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.monthlyAttendanceReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date
      }
    })
  }
  async getAnalysisTypeDropdown(token) {
    return this.request.get(this.apiMap.analysisTypeDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getAnalysisTypeId(token) {
    const response = await this.getAnalysisTypeDropdown(token);
    const data = await response.json();
    return data[0].value || 1;
  }

  async getJobCardReport(token) {
    const { from_date, to_date } = getFromandToDate();
    return this.request.get(this.apiMap.jobCardReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
        employee_id: employee_id
      }
    })
  }

  async getAttendanceAnalysisReport(token) {
    const analysis_type = await this.getAnalysisTypeId(token);
    const { from_date, to_date } = getFromandToDate();
    return this.request.get(this.apiMap.attendanceAnalysisReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
        analysis_type: analysis_type
      }
    })
  }

  async getAttendanceHistoryReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.attendanceHistoryReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
        employee_id: employee_id
      }
    })
  }

  async getEmployeeBreakReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.employeeBreakReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getMultipleCheckInCheckOutDetailsReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.multiCheckinCheckoutDetailReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
        employee_id: employee_id
      }
    })
  }

  async getMultipleCheckInCheckOutSummaryReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.multiCheckinCheckoutSummaryReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getRosterScheduleReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.rosterScheduleReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getContinuousAbsentReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.continuousAbsentReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getAttendancePercentageWiseEmployeeRankingReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    const analysis_type = await this.getAnalysisTypeId(token);
    return this.request.get(this.apiMap.attendancePercentageWiseEmployeeRanking.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
        analysis_type: analysis_type
      }
    })
  }

  async getMonthlySummaryReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.monthlySummaryReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getExtraWorkDaysReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.extraWorkDaysReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getReconciliationReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.reconciliationReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getOvertimeDetailsReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.overtimeDetailsReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getMonthlyOvertimeSummaryReport(token) {
    const { from_date, to_date } = getFromandToDate("M");
    return this.request.get(this.apiMap.monthlyOvertimeSummaryReport.url, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        from_date: from_date,
        to_date: to_date,
      }
    })
  }

  async getAttendanceReportPolicy(token) {
    return this.request.get(this.apiMap.policyReport.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getEmployeeAttendancePolicyMappingReport(token) {
    return this.request.get(this.apiMap.employeeAttendancePolicyMappingReport.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getEmployeeOTPolicyMappingReport(token) {
    return this.request.get(this.apiMap.employeeOtPolicyMappingReport.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getRankingReportAnalysisTypeDropdown(token) {
    return this.request.get(this.apiMap.rankingReportAnalysisTypeDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getTerminalDropdown(token) {
    return this.request.get(this.apiMap.terminalDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getApprovalStatusDropdown(token) {
    return this.request.get(this.apiMap.approvalStatusDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Attendance Approval API
  async getAttendanceApprovals(token) {
    return this.request.get(this.apiMap.attendanceApproval.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getAttendanceApprovalById(token) {
    const url = this.apiMap.attendanceApprovalById.url.replace("{approval_id}", approval_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getAttendanceApprovalStatusDropdown(token) {
    return this.request.get(this.apiMap.attendanceApprovalStatusDropdown.url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } 





  // ==================== GENERIC COMPARE (Same as EmployeeApis) ====================
  static async compareProdVsDev(
    request,
    functionName,
    method,
    prodToken,
    devToken,
    payload = null
  ) {
    const registryEntry = AttendanceApis.entityRegistry[functionName];
    const handlers = registryEntry
      ? { [functionName]: (ctx) => cacheCreatedEntityId(ctx, registryEntry) }
      : {};

    if (!payload && registryEntry?.getPayload) {
      payload = registryEntry.getPayload();
    }
    // Only resolve ID for DELETE when no payload is provided
    if (method && method.toUpperCase() === "DELETE" && payload == null) {
      const resolved = await resolveDeletePayload(
        request,
        AttendanceApis,
        functionName,
        prodToken,
        devToken,
        {}
      );
      if (resolved) payload = async () => resolved;
    }

    await compareApisByEnvWithHandlers(
      request,
      AttendanceApis,
      functionName,
      method,
      prodToken,
      devToken,
      payload,
      handlers
    );
  }
}

// ==================== ENTITY REGISTRY ====================
AttendanceApis.entityRegistry = {};
AttendanceApis.registerEntity = function (name, def) {
  AttendanceApis.entityRegistry[name] = def;
};

// ==================== FLAG ENTITY ====================
AttendanceApis.registerEntity("createNewFlag", {
  getState: (env) => entityResolver.getState("flag", env),
  setId: (env, id) => entityResolver.setState("flag", env, id),
  seedMapper: (pl) => ({
    name: pl?.flag_name || "Auto Test Flag",
    code: pl?.flag || "ATF",
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getFlags",
      idFields: ["flag_id", "id", "value"],
      nameFields: ["flag_name", "name", "text"],
      codeFields: ["flag"],
    }),
});

// ==================== ANNUAL HOLIDAY ENTITY ====================
AttendanceApis.registerEntity("createAnnualHoliday", {
  getPayload: () => getAnnualHolidayPayload(),
  getState: (env, idKey) => entityResolver.getState("annual_holiday", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("annual_holiday", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: pl?.description,
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getAnnualHolidays",
      nameResolverFn: "findAnnualHolidayIdByDescription",
      storeKey: "annual_holiday",
      idFields: ["holiday_id", "id",],
      codeFields: ["description"],
      nameFields: ["description"]
    }),
});


// =============== Daily Attendance Entity ===============
AttendanceApis.registerEntity("createDailyAttendance", {
  getPayload: () => getEmployeeDailyAttendancePayload(),
  getState: (env, idKey) => entityResolver.getState("daily_attendance", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("daily_attendance", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: pl?.in_time,
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getDailyAttendance",
      nameResolverFn: "findAttendanceIdByDate",
      storeKey: "daily_attendance",
      idFields: ["daily_attendance_id", "id",],
      codeFields: ["in_time"],
      nameFields: ["in_time"]
    }),
});

// ================== Attendance Policy ============
AttendanceApis.registerEntity("createAttendancePolicy", {
  getPayload: () => getAttendancePolicyPayload(),
  getState: (env, idKey) => entityResolver.getState("attendance_policy", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("attendance_policy", env, id, idKey),
  seedMapper: (pl) => {

    return {
      name: pl?.policy_name,
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getAttendancePolicies",
      nameResolverFn: "findPolicyIdByName",
      storeKey: "attendance_policy",
      idFields: ["attendance_policy_id", "id",],
      codeFields: ["policy_name"],
      nameFields: ["policy_name"]
    }),
})

// ================ Attendance Policy Mapping ================
AttendanceApis.registerEntity("createAttendancePolicyMapping", {
  getPayload: () => getPolicyMappingPayload(),
  getState: (env, idKey) => entityResolver.getState("attendance_policy_mapping", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("attendance_policy_mapping", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: "pihr sales  ( head)",
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getAttendancePolicyMapping",
      nameResolverFn: "findPolicyMappingIdByName",
      storeKey: "attendance_policy_mapping",
      idFields: ["policy_mapping_id", "id",],
      codeFields: ["attendance_policy"],
      nameFields: ["attendance_policy"]
    }),
})

// ================ Overtime Policy Mapping ================
AttendanceApis.registerEntity("createOvertimePolicy", {
  getPayload: () => getOvertimePolicyPayload(),
  getState: (env, idKey) => entityResolver.getState("overtime_policy", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("overtime_policy", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: pl?.ot_payload?.policy_name,
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getOvertimePolicies",
      nameResolverFn: "findPolicyMappingIdByName",
      storeKey: "overtime_policy",
      idFields: ["over_time_policy_id", "id",],
      codeFields: ["policy_name"],
      nameFields: ["policy_name"]
    }),
})

// ================ Eligible Employee Type ================
AttendanceApis.registerEntity("createEmployeeEligibleType", {
  getPayload: () => getEligibleEmployeeTypePayload(),
  getState: (env, idKey) => entityResolver.getState("eligible_employee_type", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("eligible_employee_type", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: "Termination of Contract",
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeEligibleType",
      nameResolverFn: "findEligibleEmployeeTypeIdByName",
      storeKey: "eligible_employee_type",
      idFields: ["id"],
      codeFields: ["eligible_employee"],
      nameFields: ["eligible_employee"]
    }),
})

// ================ Company Attendance Device ================
AttendanceApis.registerEntity("createCompanyAttendanceDevice", {
  getPayload: () => getCompanyAttendanceDevicePayload(),
  getState: (env, idKey) => entityResolver.getState("company_attendance_device", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("company_attendance_device", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: pl?.device_key,
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getCompanyAttendanceDevices",
      nameResolverFn: "findCompanyAttendanceDeviceIdByName",
      storeKey: "company_attendance_device",
      idFields: ["company_wise_device_id"],
      codeFields: ["device_key"],
      nameFields: ["device_key"]
    }),
})

// ================ Employee Proximity Card =================
AttendanceApis.registerEntity("createEmployeeProximityCard", {
  getPayload: () => getEmployeeProximityCardPayload(),
  getState: (env, idKey) => entityResolver.getState("employee_proximity_card", env, idKey),
  setId: (env, id, idKey) => entityResolver.setState("employee_proximity_card", env, id, idKey),
  seedMapper: (pl) => {
    return {
      name: pl?.card_number,
    };
  },
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeProximityCard",
      nameResolverFn: "findEmployeeProximityCardIdByName",
      storeKey: "employee_proximity_card",
      idFields: ["card_id"],
      codeFields: ["card_number"],
      nameFields: ["card_number"]
    }),
})