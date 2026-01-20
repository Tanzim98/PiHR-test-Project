export const leavePayload = {
  employee_id: 27027,
  approver_id: 96969,
  leave_group_id:2,
  company_id:1,
  // leave_application_id:499506,
  leave_application_id:499507,
};

export const leaveGroupPayload ={
  employee_id: 27027,
  leave_group_id:2,
}

export const getApproverDetailsPayload={
  id:204557,
}
export const earnLeavePayload={
    company_id:1,
}

export const setApproverPayload={
  employee_id: 27027,
  approver_employee_id: 96969,
  hierarchy: 1
}
export const extraDaySliPayload={
  leave_application_id:499506,
}

export const createCurrentLeaveStatusPayload={
  "employee_id": 27027,
  "leave_group_id": 2,
  "effective_date": "01-01-2026"
}

export const leavePolicyPayload={
  leave_type_id:2,
  employeeId:26604,
}
export const employeeLeaveBalancePayload={
  employee_id:26604,
}
export const createLeaveAdjustment={
  "employee_id": 27027,
  "leave_type_id": 2,
  "adjusted_balance": 15,
  "remarks": "Approved"

}
export const employeeApplyLeavePayload=
  {
  "leave_application_id": 0,
  "notes": "test",
  "leave_type_id": 2,
  "from_date": "12-01-2026",
  "leave_start_day_type": "12-01-2026",
  "to_date": "13-01-2026",
  "leave_end_day_type": "13-01-2026",
  "reliever_id": 0,
  "approver_id": 0,
  "has_attachment": true,
  "extra_work_dates": [
    "string"
  ],
  "hour_count": 8,
  "is_hourly": true,
  "is_foreign": true,
  "country_id": 2,
  "passport_no": "string"
}


export const createLeaveStatusForMultipleEmployeesPayload={
  leave_group_id:2,
  effective_date:"01-09-2022",
  job_base_id:0,
  branch_id:0,
  wing_id:943,
  sex_id:0,
}
export const createLeaveStatusForSingleEmployeePayload={
  employee_id:96969,
  leave_group_id:2,
  effective_date:"01-09-2025",
  job_base_id:0,
  branch_id:0,
  wing_id:943,
  sex_id:0,
}

export const createLeaveEligibleEmployeesPayload={
  eligible_employee_condition_type_id:2,
  condition_id: 8
}
export const updateLeaveEligibleEmployeesPayload={
  eligible_employee_condition_type_id:1,
  condition_id: 15,
  id:`{id}`,
}
export const deleteLeaveEligiblePayload={
  id:`{id}`
}

export const createLeaveEncashmentPolicies={
  
  is_calculated_from_gross: true,
  fixed_amount: 0,
  maximum_allowed_leave_balance: 2,
  per_day_ratio: 2
}
export const createLeaveProcessPoliciesPayload={
  "is_exist_approver_hierarchy": true,
  "is_modify_approver": true,
  "is_reliever_exist": true,
  "is_foreign_leave_allow": true,
  "is_half_day": true,
  "is_allow_multiple_application": true,
  "start_month": 1,
  "end_month": 12,
  "is_allow_multiple_visit_same_day": true,
  "enable_extra_time_compensation": true,
  "should_compensate_with_salary": true,
  "parallel_leave_approval_notification": true,
  "attendance_flags": "string",
  "is_attendance_required": true,
  "show_excess_leave_balance": true
}

export const leaveReportPayload={
  "from_date":"08-01-2026",
  "to_date":"09-01-2026",
}
export const employeeLeaveReportPayload={
   "leave_application_id":499506,
}
export const getLeaveApproverHistoryPayload={
  leave_application_id:499506,
  employee_id:26604
}
export const leaveCalendarPayload={
  employee_id:26604,
  month_id:1,
  year:2025,
}
export const leaveDaysCountPayload={
  "from_date":"08-01-2026",
  "to_date":"09-01-2026",
  "leave_type_id":2,
  "employee_id":26604
}
export const createLeaveTypePayload={
  
  "leave_name": "Annual Leave",
  "flag": "AL",
  "half_flag": "A",
  "is_maternity": true,
  "is_unpaid": true,
  "is_partial_leave_applied": true,
  "is_hourly": true
}

export const visitApplicationPayload={
  visit_application_id:97303,
  "date":"08-01-2026",
  "from_date":"08-01-2026",
  "to_date":"09-01-2026"
}

export const createVisitApplicationPayload={
  "visit_from": "08-01-2026",
  "visit_to": "09-01-2026",
  "notes": "test"
}
export const adminCreateVisitApplicationForEmployeePayload={
    "visit_from": "08-01-2026",
  "visit_to": "09-01-2026",
  "notes": "test",
  "employee_id": 26604,
  "is_application_approved": true
}

export const leaveBalanceReportPayload={
  year:2861,
}
