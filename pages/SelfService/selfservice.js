import { getApiMapByEnv } from "../../api/selfserviceApiMap.js";
import * as payloads from '../../config/selfservicePayloadData.js';
Object.assign(globalThis, payloads);
import BasePage from "../BasePage.js";

export class selfServiceApis extends BasePage {
  constructor(request, env) {
    super(request, env);
    this.apiMap = getApiMapByEnv(env);
  }

  //Get employee profile data
  async giveInTime(token) {
    return this.request.get(this.apiMap.myAttendanceInTime.url, {
      params: employeeProfileGetPayload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getTodayAttendance(token) {
    return this.request.get(this.apiMap.getTodayAttendance.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getTodayBreakTime(token) {
    return this.request.get(this.apiMap.getTodayBreakTime.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getCompanyAttendanceRules(token) {
    return this.request.get(this.apiMap.getCompanyAttendanceRules.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
//My dashboard
    async getAllNotifications(token) {
    return this.request.get(this.apiMap.getNotifications.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getUpComingRoster(token) {
    return this.request.get(this.apiMap.getUpComingRosterPlan.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getMyDashboardData(token) {
    return this.request.get(this.apiMap.myDashboard.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getAttendanceCalendar(token) {
    return this.request.get(this.apiMap.attendanceCalendar.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getFlagWiseAttendance(token) {
    return this.request.get(this.apiMap.flagWiseAttendanceCount.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getNoticies(token) {
    return this.request.get(this.apiMap.notices.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getHierarchy(token) {
    return this.request.get(this.apiMap.hierarchy.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}

// My Document Request API
    async getEmployeeDocumentRequests(token) {
    return this.request.get(this.apiMap.getEmployeeDocumentRequests.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getDocumentRequestByApplicationId(token){
    const endpoint = this.apiMap.getDocumentRequestByApplicationId;
    const url = endpoint.url;
    return this.request.get(url, {
    params: documentRequestPayload,
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
// My Extra Times
    async getMyExtraTimes(token) {
    return this.request.get(this.apiMap.getMyExtraTime.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
// My Shifts
    async getMyShifts(token) {
    return this.request.get(this.apiMap.myShifts.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
//My Shift Swap API
    async getMyShiftSwapDropdown(token) {
    return this.request.get(this.apiMap.swappableShiftDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getShiftSwappableEmployee(token){
    const endpoint = this.apiMap.shiftSwappableEmployeeDropdown;
    const url = endpoint.url;
    return this.request.get(url, {
    params: {shift_id:documentRequestPayload.shift_id},
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getRequestingEmployeeDropdown(token){
    const endpoint = this.apiMap.requestingEmployeeDropdown;
    const url = endpoint.url;
    return this.request.get(url, {
    params: {date:documentRequestPayload.date},
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getShiftOffers(token) {
    return this.request.get(this.apiMap.shiftOffers.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getMyShiftRequest(token) {
    return this.request.get(this.apiMap.myShiftRequest.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
//Self Servive Report API
    async getMyAttendanceReport(token) {
     return this.request.get(this.apiMap.myAttendanceReport.url, {
      params: myAttendanceReportPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });    
}
async getMyJobCardReport(token){
     return this.request.get(this.apiMap.myJobCard.url, {
      params: myJobCardPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });  
} 
async getMonthlyAttendanceReport(token){
     return this.request.get(this.apiMap.monthlyAttendanceReport.url, {
      params: monthlyAttendanceReportPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });  
} 
async getAdvanceSalaryReport(token){
     return this.request.get(this.apiMap.advanceSalaryStatement.url, {
      params: advanceSalaryStatementPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });  
} 
async getSubordinateJobCardReport(token){ 
     return this.request.get(this.apiMap.subordinateJobCard.url, {
      params: subordinateJobCardPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }); 
} 

//Self Service Salary Claim Report
async getSalaryClaimReport(token){
         return this.request.get(this.apiMap.claimReport.url, {
      params: salaryClaimReportPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }); 
} 
static async compareProdVsDev(request, functionName, method, prodToken, devToken, payload = null) {
  return BasePage.compareProdVsDev(request, selfServiceApis, functionName, method, prodToken, devToken, payload);
}
}
