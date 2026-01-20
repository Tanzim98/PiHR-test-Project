import { getApiMapByEnv } from "../../api/leaveApiMap.js";
import * as payloads from '../../config/leavePayloadData.js';
Object.assign(globalThis, payloads);
import { compareApisByEnvWithHandlers, cacheCreatedEntityId, resolveDeletePayload } from "../../utils/apiCompare.js";
import entityResolver from "../../utils/entityResolver.js";
import BasePage from "../BasePage.js";

export class LeaveApis extends BasePage{
  constructor(request, env) {
    super(request,env);
    this.apiMap = getApiMapByEnv(env);
  }
  async getProcessingApplications(token){
      const endpoint = this.apiMap.checkProcessingApplications;
      const url = endpoint.url.replace("{employee_id}", leavePayload.employee_id);
        return this.request.get(url, {
        headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
async getApproverSetupDetailsById(token) {
    const endpoint = this.apiMap.getApprover;
    const approverId = getApproverDetailsPayload?.id;
    const url = endpoint.url.replace("{id}", approverId);
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async setApprover(token, payload) {
    return this.request.post(this.apiMap.setApprover.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  async deleteApprover(token, payload = {}) {
    const endpoint = this.apiMap.deleteApprover;
    const employeeId = payload?.employee_id || payload?.employeeId || leavePayload.employee_id;    
    const url = endpoint.url.replace("{employee_id}", employeeId);
    return this.request.delete(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  
  async getapproverSetupApproverInfo(token){
    const endpoint = this.apiMap.approverSetupApproverInfo;
    const url = endpoint.url.replace("{employee_id}", leavePayload.employee_id);
    return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  async getapproverSetupEmployeeInfo(token){
    const endpoint = this.apiMap.approverSetupEmployeeInfo;
    const url = endpoint.url.replace("{approver_id}", leavePayload.approver_id);
    return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  async createLeaveStatusForMultipleEmployees(token, payload) {
    return this.request.post(this.apiMap.createLeaveStatusForEmployees.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  async createLeaveStatusForSingleEmployee(token, payload) {
    return this.request.post(this.apiMap.createLeaveStatusForSingleEmployee.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  async getCurrentLeaveBalance(token){
    const endpoint = this.apiMap.currentLeaveBalance;
      const url = endpoint.url.replace("{employee_id}", leavePayload.employee_id);
      return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async getLeaveGroupDetails(token){
      return this.request.get(this.apiMap.leaveGroupDetails.url, {
      params: leaveGroupPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Earn Leave
  async getEarnLeave(token){
    return this.request.get(this.apiMap.earnLeave.url, {
    params: earnLeavePayload,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  }

      async getEarnLeaveRules(token) {
    return this.request.get(this.apiMap.earnLeaveRules.url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
      async getEarnLeavePolicyCategories(token) {
    return this.request.get(this.apiMap.earnLeavePolicyCategories.url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getLeaveAdjustmentHistory(token){
      const endpoint = this.apiMap.leaveAdjustmentHistory;
      const url = endpoint.url.replace("{employee_id}", leavePayload.employee_id);
      return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async createLeaveAdjustment(token, payload) {
    return this.request.post(this.apiMap.createLeaveAdjustment.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getEmployeeLeaveTypeSli(token){
      const endpoint = this.apiMap.employeeLeaveType;
      const url = endpoint.url.replace("{employee_id}", leavePayload.employee_id);
      return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }

    async employeeApplyLeave(token,payload){
      return this.request.post(this.apiMap.employeeApplyLeave.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }

    async getLeaveApplication(token){
       const endpoint = this.apiMap.leaveApplicationId;
      const url = endpoint.url.replace("{leave_application_id}", leavePayload.leave_application_id);
      return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async getApproverHistoryUsingLeaveApplicationId(token){
      const endpoint = this.apiMap.approverHistory;
      const url = endpoint.url.replace("{leave_application_id}", leavePayload.leave_application_id);
      return this.request.get(url, {
        headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async getLeaveTypeDropdown(token) {
    return this.request.get(this.apiMap.leaveTypeDropdown.url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async adminGetLeaveHistory(token) {
    return this.request.get(this.apiMap.adminLeaves.url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }


async getLeavePolicy(token) {
  const endpoint = this.apiMap.leavePolicy;
  const { employeeId, leave_type_id } = leavePolicyPayload;
  const url = endpoint.url.replace("{leave_type_id}", leave_type_id)+`?employeeId=${employeeId}`;
  return this.request.get(url, {
    headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    },
  });
}
    async getApproverHistoryByApplicationIdAndEmployeeId(token, payload){
    return this.request.get(this.apiMap.getLeaveApproverHistory.url, {
      params: getLeaveApproverHistoryPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
    async checkLeaveConfiguration(token) {
    return this.request.get(this.apiMap.checkLeaveConfiguration.url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getLeaveCalendar(token){
    return this.request.get(this.apiMap.leaveCalendar.url, {
      params: leaveCalendarPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
    async getLeaveDaysCount(token){  
      return this.request.get(this.apiMap.leaveDaysCount.url, {
      params: leaveDaysCountPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }
    async getEmployeeLeaveBalance(token){ 
    return this.request.get(this.apiMap.employeeLeaveBalance.url, {
      params: employeeLeaveBalancePayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    }
    async getExtraDaysSli(token){
    return this.request.get(this.apiMap.extraDaysSli.url, {
      params: extraDaySliPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    }

    async currentLeaveBalanceAllEmployees(token) {
    return this.request.get(this.apiMap.currentLeaveBalanceAllEmployees.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async leaveFilters(token) {
    return this.request.get(this.apiMap.leaveFilters.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

    async checkEmployeeRoastEligibility(token){
    const endpoint = this.apiMap.employeeRoasterEligible;
    const url = endpoint.url.replace("{employee_id}", employeeLeaveBalancePayload.employee_id);
    return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }

    async leaveStatusDropdown(token) {
    return this.request.get(this.apiMap.leaveStatusDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

    async getYearlyLeaveApprovalStatus(token) {
    return this.request.get(this.apiMap.yearlyLeaveApprovalStatus.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getMonthlyLeaveApplicationStatus(token) {
    return this.request.get(this.apiMap.monthlyLeaveApplicationStatus.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getMonthWiseLeaveApplicationStatus(token) {
    return this.request.get(this.apiMap.monthWiseLeaveApplicationStatus.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getEmployeeCurrentLeaveStatus(token) {
    return this.request.get(this.apiMap.employeeCurrentLeaveStatus.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getLeaveCalendar(token) {
    return this.request.get(this.apiMap.leaveCalendar.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  //Leave eligibility
    async getLeaveEligibleEmployees(token) {
      return this.request.get(this.apiMap.leaveEligibleEmployees.url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async findLeaveEligibilityId(token,eligible_employee_condition_type_id,options={} ) {
    return this.findIdFromList(token, 'getLeaveEligibleEmployees', eligible_employee_condition_type_id, { idCandidates: options.idCandidates || ['id','id','value'], storeKey: `LeaveEligibilityId${eligible_employee_condition_type_id}`});
  }
    async createLeaveEligibleEmployees(token, payload) {
    return this.request.post(this.apiMap.leaveEligibleEmployees.url, {
    data: payload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

    async getLeaveEligibleEmployeeById(token) {
    const endpoint = this.apiMap.employeeRoasterEligible;
    const url = endpoint.url.replace("{employee_id}", employeeLeaveBalancePayload.employee_id);
    return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async getEligibleEmployeesAllConditionTypes(token) {
    return this.request.get(this.apiMap.leaveEligibleEmployeeAllCondition.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  //Leave encashment Policy
    async getLeaveEncashment(token) {
    return this.request.get(this.apiMap.getLeaveEncashmentPolices.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async createLeaveEncashmentPolicies(token, payload) {
    return this.request.post(this.apiMap.createLeaveEncashmentPolices.url, {
    data: payload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  //Leave Encashment Process
    async getLeaveEncashmentProcessFlag(token) {
    return this.request.get(this.apiMap.leaveEncashmentProcessExists.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async checkLeaveEncashmentAlreadyProcessed(token) {
    return this.request.get(this.apiMap.leaveEncashmentAlreadyProcessed.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  //Leave Group
    async getLeaveGroups(token) {
    return this.request.get(this.apiMap.getLeaveGroups.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
    async getLeaveGroupById(token){
    const endpoint = this.apiMap.getLeaveGroupById;
    const url = endpoint.url.replace("{leave_group_id}", leaveGroupPayload.leave_group_id);
    return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async getLeaveGroupsFlagDropdown(token) {
    return this.request.get(this.apiMap.leaveGroupsFlagDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    
    async getEarnLeavePolicyCategories(token) {
    return this.request.get(this.apiMap.earnLeavePolicyCategories.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    
    async getLeaveGroupDropdown(token) {
    return this.request.get(this.apiMap.leaveGroupDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    
    async getLeaveProcessPolicies(token) {
    return this.request.get(this.apiMap.leaveProcessPolicies.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    
    async getExtraWorkAttendanceFlag(token) {
    return this.request.get(this.apiMap.extraWorkAttendanceFlags.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    

  async createLeaveProcessPolicies(token,payload){
    return this.request.post(this.apiMap.createLeaveProcessPolicies.url, {
    data: payload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

    async getLeaveYearDropdown(token) {
    return this.request.get(this.apiMap.leaveYearDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    
    async getRunningLeaveYear(token) {
    return this.request.get(this.apiMap.runningLeaveYear.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    
    async getClosedLeaveYear(token) {
    return this.request.get(this.apiMap.closedLeaveYear.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }    

  //Leave Report API
    async getLeaveReportByLeaveApplicationId(token){
    const endpoint = this.apiMap.leaveReportByLeaveApplicationId;
    const url = endpoint.url.replace("{leave_application_id}", employeeLeaveReportPayload.leave_application_id);
    return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveBalanceReport(token){
    return this.request.get(this.apiMap.leaveBalanceReport.url, {
    params: leaveBalanceReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveSummaryReport(token){
    return this.request.get(this.apiMap.leaveSummaryReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveAnalysisReport(token){ 
    return this.request.get(this.apiMap.leaveAnalysisReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveCompensatedExtraTimeReport(token){
    return this.request.get(this.apiMap.compensatedExtraTimeReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getVisitReport(token){
       return this.request.get(this.apiMap.visitReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveAdjustmentReport(token){
  return this.request.get(this.apiMap.leaveAdjustmentReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveAdjustmentTypeDropdown(token) {
    return this.request.get(this.apiMap.leaveAdjustmentTypeDropdownReport.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }   
    async getLeaveApproverHistory(token){
  return this.request.get(this.apiMap.leaveApproverHistoryReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getEmployeeEarnReport(token){
  return this.request.get(this.apiMap.employeeEarnReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
    async getLeaveEncashmentReport(token){
  return this.request.get(this.apiMap.leaveEncashmentReport.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
// Leave Types API
    
    async getLeaveTypes(token){
    return this.request.get(this.apiMap.leaveTypes.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    }
    async findLeaveTypeByName(token, name) {
    return this.findIdFromList(token, 'getLeaveTypes', name, { storeKey: 'leave_type', idFields: ['value', 'leave_type_id', 'id'], nameFields: ['text', 'Leave_Type', 'name'] });
  }
    async createLeaveType(token,payload){
    return this.request.post(this.apiMap.createLeaveType.url, {
    data: payload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
    }

// Visit API
    async getVisitApplications(token) {
    return this.request.get(this.apiMap.allVisitApplications.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }  
  
  async getVisitApplicationById(token){
    const endpoint = this.apiMap.visitApplicationById;
    const url = endpoint.url.replace("{visit_application_id}", visitApplicationPayload.visit_application_id);
    return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  } 
  async getApproverHistoryVisitApplicationById(token){
    const endpoint = this.apiMap.approverHistoryByVisitApplicationId;
  const url = endpoint.url.replace("{visit_application_id}", visitApplicationPayload.visit_application_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
} 

async emplpoyeeCreateVisitApplication(token, payload) {
  return this.request.post(this.apiMap.createVisitApplication.url, {
    data: payload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
async getVisitDaysCount(token){
  return this.request.get(this.apiMap.visitDaysCount.url, {
    params: leaveReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 
async adminCreateVisitApplication(token, payload) {
  return this.request.post(this.apiMap.adminCreateVisitApplicationForEmployee.url, {
    data: payload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
async getVisitApplicationFilter(token) {
return this.request.get(this.apiMap.visitApplicationsFilter.url, {
headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
});
}  
    async getVisitApplicationByDate(token){
     const endpoint = this.apiMap.visitApplicationByDate;
    if (!endpoint?.url) {
        throw new Error(`Employee Leave Balance endpoint not configured for env=${this.env}`);
    }
    const { date, from_date } = visitApplicationPayload;
    const queryDate = date || from_date;
    if (!queryDate) {
        throw new Error("Visit Application by Date requires a date");
    }
    const params = new URLSearchParams({ date: queryDate });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 

static async compareProdVsDev(request, functionName, method, prodToken, devToken, payload = null) {
  const registryEntry = LeaveApis.entityRegistry[functionName];
  const handlers = registryEntry ? { [functionName]: (ctx) => cacheCreatedEntityId(ctx, registryEntry) } : {};
  
     // If this is DELETE with no explicit payload, delegate to the shared resolver.
     if (method && method.toUpperCase() === 'DELETE' && (payload == null)) {
       const resolved = await resolveDeletePayload(request, LeaveApis, functionName, prodToken, devToken, {
         updateDepartmentPayload,
         departmentCreatePayload,
         updateDivisionPayload,
         divisionCreatePayload,
         departmentUnitCreatePayload,
         updateDepartmentUnitPayload,
         setApproverPayload,
         createLeaveStatusForMultipleEmployeesPayload,
         createLeaveStatusForSingleEmployeePayload,
       });
       if (resolved) payload = async () => resolved;
     }
 
     await compareApisByEnvWithHandlers(
       request,
       LeaveApis,
       functionName,
       method,
       prodToken,
       devToken,
       payload,
       handlers,
     );
   }
  }
   
   // Simple entity registry used by compareProdVsDev handlers to cache ids
   LeaveApis.entityRegistry = {};
   LeaveApis.registerEntity = function(name, def) {
     LeaveApis.entityRegistry[name] = def;
    };
    
    // Register the two entities using the generic entityResolver
  LeaveApis.registerEntity("createLeaveType", {
    getState: (env, idKey) => entityResolver.getState('leave_type', env, idKey),
    setId: (env, id, idKey) => entityResolver.setState('leave_type', env, id, idKey),
    seedMapper: (pl) => ({ name: pl?.name, leave_type_id: pl?.leave_type_id }),
    resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getLeaveTypes', nameResolverFn: 'findLeaveTypeByName', idFields: ['leave_type_id','id','value'], codeFields: ['leave_name'] }),
  });  
//   LeaveApis.registerEntity("createLeaveEligibleEmployees", {
//   getState: (env, idKey) =>entityResolver.getState('leaveEligibilityId', env, idKey),
//   setId: (env, id, idKey) =>entityResolver.setState('leaveEligibilityId', env, id, idKey),
//   seedMapper: (pl) => ({name: pl?.eligible_employee_condition_type_id || pl?.name,id: pl?.eligible_employee_condition_type_id,}),
//   resolveId: async (token, seeds, api) => entityResolver.resolveEntityId(token,seeds,api,{listFn: 'getLeaveEligibleEmployees',nameResolverFn: 'findLeaveEligibilityId',idFields: ['id','id','value'],extraParams: {eligible_employee_condition_type_id: seeds.eligible_employee_condition_type_id}}),
// });

LeaveApis.registerEntity("createLeaveEligibleEmployees", {
  getState: (env, idKey) => entityResolver.getState('leaveEligibilityId', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('leaveEligibilityId', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.id || pl?.name, eligible_employee_condition_type_id: pl?.id }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getLeaveEligibleEmployees', nameResolverFn: 'findLeaveEligibilityId', idFields: ['id','id','value'], extraParams: { eligible_employee_condition_type_id: seeds.id } }),
});
