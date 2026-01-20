const formatDate = (d) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};
export const getFlagPayload = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const flagLength = Math.random() < 0.5 ? 1 : 2;
  const flag = Array.from({ length: flagLength }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join("");

  const now = new Date();
  const date = String(now.getDate()).padStart(2, "0") + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    now.getFullYear();

  return {
    flag_name: `Test_${Date.now()}`,
    flag: flag,
    effective_date: date,
  };
}


// Annual Holiday Payload
export const getAnnualHolidayPayload = ({
  action = "POST", // default
  description,
  fromDate,
  toDate,
  targetBranchIds = [0],
  targetDepartmentIds = [0],
} = {}) => {

  // --------------------
  // DATE HELPERS
  // --------------------
  const today = new Date();

  const from = fromDate
    ? new Date(fromDate)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const to = toDate
    ? new Date(toDate)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const formatDate = (d) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // --------------------
  // COMMON PAYLOADS
  // --------------------
  const basePayload = {
    from_date: formatDate(from),
    to_date: formatDate(to),
    description: description || `Test_${Date.now()}`,
    target_branch_id: targetBranchIds,
    target_department_id: targetDepartmentIds,
  };

  const holidayIdPayload = {
    holiday_id: "{{annual_holiday}}",
  };

  // --------------------
  // SWITCH CASE
  // --------------------
  switch (action) {
    case "GET":
      return holidayIdPayload;

    case "PUT":
      return {
        ...holidayIdPayload,
        ...basePayload,
      };

    case "DELETE":
      return holidayIdPayload;

    case "POST":
    default:
      return basePayload;
  }
};


export const getCurrentYear = () => new Date().getFullYear();

export const getAnnualHolidayBulkPayload = ({
  description,
  year,
  fromDate,
  toDate,
} = {}) => {

  const today = new Date();

  const from = fromDate
    ? new Date(fromDate)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const to = toDate
    ? new Date(toDate)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate());


  return [
    {
      description: description || `Test_${Date.now()}`,
      year: year || today.getFullYear(),
      from_date: formatDate(from),
      to_date: formatDate(to),
    },
  ];
};


export const attendance_policy_id = 8289;

export const getFromandToDate = (gapType = "D") => {
  const today = new Date();
  let from;

  switch (gapType) {
    case "M": // Month gap
      from = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
      break;

    case "Y": // Year gap
      from = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
      break;

    case "D":
    default: // Default 3-day gap
      from = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 3
      );
      break;
  }

  return {
    from_date: formatDate(from),
    to_date: formatDate(today),
  };
};



// Daily Attendance Payload
export const getEmployeeDailyAttendancePayload = ({
  action = "POST",
} = {}) => {
  const today = new Date();
  const todayDate = formatDate(today);
  return [
    {
      employee_id: "27027",
      daily_attendances: [
        {
          daily_attendance_id: 0,
          attendance_date: todayDate,
          flag: "H",
          in_time: "09:00 AM",
          in_time_remarks: "In Time Remarks",
          out_time: "06:00 PM",
          out_time_date: todayDate,
          out_time_remarks: "Out Time Remarks",
          working_hour: "9:0",
          policy_in_time: "09:00 AM",
          policy_out_time: "06:00 PM"
        }
      ]
    }
  ];
};

export const daily_attendance_id = 17718866;


// Attendance Policy
export const getAttendancePolicyPayload = ({
  action = "POST", // default action
  policyName,
} = {}) => {
  const today = new Date();
  const effectiveFrom = formatDate(today);

  // Days of the week mapping
  const daysOfWeek = [
    { day_id: 1, name: "SATURDAY" },
    { day_id: 2, name: "SUNDAY" },
    { day_id: 3, name: "MONDAY" },
    { day_id: 4, name: "TUESDAY" },
    { day_id: 5, name: "WEDNESDAY" },
    { day_id: 6, name: "THURSDAY" },
    { day_id: 7, name: "FRIDAY" },
  ];

  // Base POST payload
  const basePayload = {
    policy_name: policyName || `Test_${Date.now()}`,
    effective_from: effectiveFrom,
    discard_week_end_attendance: false,
    exclude_from_attendance_report: false,
    exclude_from_ot_and_deduction: false,
    attendance_policy_details: daysOfWeek.map((day) => ({
      policy_details_id: 0,
      day_id: day.day_id,
      name: day.name,
      in_time: "07:00",
      working_hours: "10:00",
      delay_buffer_time: "20",
      extream_delay_buffer_time: "50",
      early_out_time_string: "4:00 PM",
      interval_minutes: "60",
      working_type_id: "1",
      policy_name: policyName || `Test_${Date.now()}`,
      workingType: {
        label: "Full Day",
        value: "1",
      },
    })),
  };

  // Payload for GET, PUT, DELETE
  const idPayload = {
    attendance_policy_id: "{{attendance_policy}}",
  };

  // SWITCH CASE
  switch (action) {
    case "GET":
      return idPayload;

    case "PUT":
      return {
        ...idPayload,
        ...basePayload,
      };

    case "DELETE":
      return idPayload;

    case "POST":
    default:
      return basePayload;
  }
};


export const getPolicyMappingPayload = ({
  action = "POST", // default action
  branchId = 0,
  departmentId = 0,
  employeeId = 0,
  effectiveDate,
} = {}) => {
  const today = new Date();

  const date = effectiveDate || formatDate(today);

  // Base POST payload
  const basePayload = {
    attendance_policy_id: 4457,
    branch_id: branchId,
    department_id: departmentId,
    employee_id: employeeId,
    effective_date: date,
  };

  const idPayload = {
    policy_mapping_id: "{{attendance_policy_mapping}}",
  };

  switch (action) {
    case "GET":
      return idPayload;

    case "PUT":
      return {
        ...idPayload,
        ...basePayload,
      };

    case "DELETE":
      return idPayload;

    case "POST":
    default:
      return basePayload;
  }
};


// Overtime Policy
export const getOvertimePolicyPayload = ({ action = "POST" } = {}) => {
  const policyName = `Test_OT_${Date.now()}`;
  const idPlaceholder = "{{overtime_policy}}";
  // 1. Build OT Payload
  const ot_payload = {
    policy_name: policyName,
    minimum_countable_time_min: 30,
    monthly_ot_allowed_hour: 40,
    is_active: false,
    count_from_actual_in_time: true,
    should_consider_cumulative_minute: true,
    should_consider_daily_minute: true,
    is_cumulative: true,
    is_fixed_amount: false,
    calculated_on_basic: true,
    is_exclude_from_salary: false,
    count_working_day_as_ot: true,
    count_leave_as_ot: true,
    count_weekend_as_ot: true,
    count_holiday_as_ot: true,
    ot_percentace: 1,
    fixed_amount_per_hour: 100,
    holiday_ot_ratio: 1,
    weekend_ot_ratio: 1,
    leave_day_ot_ratio: 1,
  };

  // 2. Build Timeslot Payload
  const timeslot_payload = {
    applicable_attendance_flag_ids: "7,1,2",
    time_slot_list: [
      {
        time_slot_ratio: 1.5,
        time_slot_start: "08:00 PM",
        time_slot_end: "10:00 PM",
        time_slot_id: 0,
      },
    ],
  };

  // 3. Inject IDs only for UPDATE/PUT
  if (action === "PUT" || action === "UPDATE") {
    ot_payload.over_time_policy_id = idPlaceholder;
    timeslot_payload.overtime_policy_id = idPlaceholder;
  }

  // 4. Return based on Action
  switch (action) {
    case "GET":
    case "DELETE":
      return { overtime_policy_id: idPlaceholder };

    case "PUT":
    case "UPDATE":
    case "POST":
    default:
      return {
        ot_payload,
        timeslot_payload,
      };
  }
};


// Overtime Policy Mapping
export const getOvertimePolicyMappingPayload = ({ action = "POST", employee_id = 27027 } = {}) => {

  switch (action) {
    case "DELETE":
      return [employee_id]

    case "GET":
      return { employee_id: employee_id };

    case "POST":
    default:
      return {
        over_time_policy_id: 29,
        employee_ot_policy:
          [
            {
              employee_id: employee_id,
              policy_mapping_id: 0
            }
          ]
      };
  }
};


// Attendance Deletion
export const getAttendanceDeletionPayload = () => {
  // return one year duration from and to 
  const date = new Date();
  const from = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
  const to = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const in_time_from = "09:00 AM";
  const in_time_to = "10:30 AM";
  return {
    from_date: formatDate(from),
    to_date: formatDate(to),
    in_time_from: in_time_from,
    in_time_to: in_time_to
  };
}

export const selectedConditionType = {
  value: "1",
  text: "Job Status"
};

export const getEligibleEmployeeTypePayload = ({
  action = "POST",
} = {}) => {

  // Base payload (used for POST / PUT)
  const basePayload = {
    eligible_employee_condition_type_id: selectedConditionType.value,
    condition_id: 19,
  };

  // ID-only payload (used for GET / DELETE)
  const idPayload = {
    id: "{{eligible_employee_type}}",
  };

  switch (action) {
    case "GET":
      return idPayload;

    case "PUT":
      return {
        ...idPayload,
        ...basePayload,
      };

    case "DELETE":
      return idPayload;

    case "POST":
    default:
      return basePayload;
  }
};


// Attendance Configuration
export const getAttendanceConfigurationPayload = () => {
  return {
    is_company_name_mandatory: true,
    is_check_in_image_mandatory: true,
    is_multiple_check_in_allowed: true,
    is_multiple_check_out_allowed: true,
    hours_allowed_for_check_out: 0,
    sub_ordinate_monitoring_layer: 0,
    telegram_notification: true,
    channel_id: "string",
    is_roster_attendance_auto_approve: true,
    max_days_limit_for_reconciliation: 31,
    enable_month_lock: true,
    max_monthly_employee_reconciliation_limit: 1,
    over_time_pre_approval_config: 1,
    is_check_out_image_mandatory: true
  };
};


// Company Attendance DEvice
export const getCompanyAttendanceDevicePayload = ({
  action = "POST",
} = {}) => {

  // Base payload (POST / PUT)
  const basePayload = {
    device_key: `Test_${Date.now()}`,
    status: 1,
    pihr_device_type: 3,
  };

  // ID payload (GET / DELETE)
  const idPayload = {
    company_wise_device_id: "{{company_attendance_device}}",
  };

  switch (action) {
    case "GET":
      return idPayload;

    case "PUT":
      return {
        ...idPayload,
        ...basePayload,
      };

    case "DELETE":
      return idPayload;

    case "POST":
    default:
      return basePayload;
  }
};


// Employee Proximity Card
export const getEmployeeProximityCardPayload = ({
  action = "POST",
} = {}) => {

  // Base payload for POST / PUT
  const basePayload = {
    card_number: `CARD_${Date.now()}`,
    employee_id: 27027,
    device_attendance_id: `DEVICE_${Date.now()}`,
  };

  // ID payload for GET / DELETE
  const idPayload = {
    card_id: "{{employee_proximity_card}}",
  };

  switch (action) {
    case "GET":
      return idPayload;

    case "PUT":
      return {
        ...idPayload,
        ...basePayload,
      };

    case "DELETE":
      return idPayload;

    case "POST":
    default:
      return basePayload;
  }
};

export const employee_id = 27027;

export const approval_id = 2110566;

export const break_time_reconciliation_id = 2420;

export const getDayWiseCheckInPayload = () => {
  return {
    employee_id: employee_id,
    from_date: "01-01-2023",
    to_date: "13-02-2023"
  };
}

export const getUpcomingDay= () => {
  const date = new Date();
  const future = new Date(date.getFullYear(), date.getMonth()+1, date.getDate() + 2);
  return {
    future_date: formatDate(future)
  };
}