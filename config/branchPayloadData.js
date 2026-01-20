export const branchCreatePayload = {
  branch_name: "QA Branch Automation",
  time_zone_id: 6,
  currency_id: 1,
  is_head_office: false,
  remote_attendance_allowed: true,
  attendance_approval_allowed: true,
  approval_radius: 100,
  branch_address: "Banani, Dhaka",
  latitude: 23.8103,
  longitude: 90.4125,
  is_supervisor_notify: true,
  is_notify_all: true
}
export const updateBranchPayload ={
  "branch_id": "{{branch}}",
  "branch_name": "QA Branch Updated",
  "time_zone_id": 6,
  "currency_id": 1,
  "is_head_office": false,
  "remote_attendance_allowed": true,
  "attendance_approval_allowed": true,
  "approval_radius": 100,
  "latitude": 23.8103,
  "longitude": 90.4125,
  "branch_address": "Banani, Dhaka, Bangladesh",
  "is_supervisor_notify": true,
  "is_notify_all": true
}
export const branchID ={
  "branch_id": "{{branch}}",
}