import { getApiMapByEnv } from "../../api/employeeApiMap.js";
import * as payloads from "../../config/employeePayloadData.js";
Object.assign(globalThis, payloads);

import BasePage from "../BasePage.js";
import entityResolver from "../../utils/entityResolver.js";

export class EmployeeApis extends BasePage {
  constructor(request, env) {
    super(request, env);
    this.apiMap = getApiMapByEnv(env);
  }

  //Get employee profile data
  async getEmployeeProfile(token) {
    return this.request.get(this.apiMap.employeeProfileInfo.url, {
      params: employeeProfileGetPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee-cards data
  async getEmployeeCards(token) {
    return this.request.get(this.apiMap.employeeCard.url, {
      params: employeeProfileGetPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee-profiles life-events data
  async getemployeeProfilesLifeEvents(token) {
    return this.request.get(this.apiMap.emplyeeLifeEvent.url, {
      params: employeeProfileGetPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee-profile-tasks-overview data
  async getemployeeProfilesTasksOverview(token) {
    return this.request.get(this.apiMap.employeeTaskOverview.url, {
      params: employeeProfileGetPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //Get employee department data
  async getEmployeeDepartment(token) {
    return this.request.get(this.apiMap.getEmployeeDepartmentData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Find department id by name/text from the department listing
  async findDepartmentIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeDepartment", name, {
      storeKey: "department",
      idFields: ["value", "department_id", "id"],
      nameFields: ["text", "Department", "name"],
    });
  }
  // add new department
  async createNewEmployeeDepartment(token, payload) {
    return this.request.post(this.apiMap.employeeDepartment.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update emplyee department
  async updateEmployeeDepartment(token, payload) {
    return this.request.put(this.apiMap.employeeDepartment.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Delete employee department
  async deleteEmployeeDepartment(token, department_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeDepartment.url,
      token,
      department_id,
      ["department_id"]
    );
  }
  // Get employee division data
  async getEmployeeDivisions(token) {
    return this.request.get(this.apiMap.employeeCompanyDivisions.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Find division id by name/text from the division listing
  async findDivisionIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeDivisions", name, {
      storeKey: "division",
      idFields: ["value", "company_division_id", "id"],
      nameFields: ["text", "division_name", "name"],
    });
  }
  // create new Employee Divisions
  async createEmployeeDivisions(token, payload) {
    return this.request.post(this.apiMap.createCompanyDivision.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }
  // update Employee Divisions
  async updateEmployeeDivisions(token, payload) {
    return this.request.put(this.apiMap.updateCompanyDivision.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }
  // delete Employee Divisions (accepts company_division_id)
  async deleteEmployeeDivisions(token, company_division_id) {
    return this.deleteByPath(
      this.apiMap.deleteCompanyDivision.url,
      token,
      company_division_id,
      ["company_division_id"]
    );
  }
  //Get employee department unit dropdown data
  async getEmployeeDepartmentUnitDropdown(token) {
    return this.request.get(
      this.apiMap.employeeDepartmentUnitDropdownData.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  //Get employee department unit data
  async getEmployeeDepartmentUnit(token) {
    return this.request.get(this.apiMap.employeeDepartmentUnit.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Find department unit id by name/text from the department unit listing
  async findDepartmentUnitIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeDepartmentUnit", name, {
      storeKey: "department_unit",
      idFields: ["unit_id", "department_unit_id", "id", "value"],
      nameFields: ["unit_name", "text", "name"],
    });
  }
  // create new department unit
  async createEmployeeDepartmentUnit(token, payload) {
    return this.request.post(this.apiMap.employeeDepartmentUnit.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update department unit
  async updateEmployeeDepartmentUnit(token, payload) {
    return this.request.put(this.apiMap.employeeDepartmentUnit.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete department unit
  async deleteEmployeeDepartmentUnit(token, unit_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeDepartmentUnit.url,
      token,
      unit_id,
      ["department_unit_id"]
    );
  }
  // get employee designation dropdown
  async getEmployeeDesignationsDropdown(token) {
    return this.request.get(this.apiMap.employeedesignationsDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee designation
  async getEmployeeDesignations(token) {
    return this.request.get(this.apiMap.employeedesignations.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Find designation id by name/text from the designation listing
  async findDesignationIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeDesignations", name, {
      storeKey: "designation",
      idFields: ["designation_id", "id", "value"],
      nameFields: ["designation_name", "text", "name"],
    });
  }
  // create new designation
  async createEmployeeDesignation(token, payload) {
    return this.request.post(this.apiMap.employeedesignations.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update designation
  async updateEmployeeDesignation(token, payload) {
    return this.request.put(this.apiMap.employeedesignations.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete designation
  async deleteEmployeeDesignation(token, designation_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeedesignations.url,
      token,
      designation_id,
      ["designation_id"]
    );
  }
  // get emplyee designation by ID
  async getEmployeeDesignationsById(token, payload) {
    const designation_id =
      typeof payload === "object" ? payload.designation_id : payload;
    const url = this.apiMap.getEmployeedesignationsById.url.replace(
      "{designation_id}",
      designation_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee designation groups
  async getEmployeeDesignationGoups(token) {
    return this.request.get(this.apiMap.employeedesignationsGroups.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee designation groups dropdown
  async getEmployeeDesignationGoupsDropdown(token) {
    return this.request.get(
      this.apiMap.employeedesignationsGroupsDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Find designation group id by name/text from the designation group listing
  async findDesignationGroupIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeDesignationGoups", name, {
      storeKey: "designation_group",
      idFields: ["designation_group_id", "id", "value"],
      nameFields: ["designation_group_name", "text", "name"],
    });
  }
  // create new designation group
  async createEmployeeDesignationGroups(token, payload) {
    return this.request.post(this.apiMap.employeedesignationsGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update designation
  async updateEmployeeDesignationGroups(token, payload) {
    return this.request.put(this.apiMap.employeedesignationsGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete designation groups
  async deleteEmployeeDesignationGroups(token, designation_group_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeedesignationsGroups.url,
      token,
      designation_group_id,
      ["designation_group_id"]
    );
  }
  // get employee document category
  async getEmployeeDocumentCategory(token) {
    return this.request.get(this.apiMap.employeeDocumentCategory.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee document category dropdown
  async getEmployeeDocumentCategoryDropdown(token) {
    return this.request.get(this.apiMap.employeeDocumentCategoryDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Find document category id by name/text from the document category listing
  async findDocumentCategoryIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeDocumentCategory", name, {
      storeKey: "document_category",
      idFields: ["document_category_id", "id", "value"],
      nameFields: ["document_category_name", "text", "name"],
    });
  }
  // create new document category
  async createEmployeeDocumentsCategories(token, payload) {
    return this.request.post(this.apiMap.employeeDocumentCategory.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update document category
  async updateEmployeeDocumentsCategories(token, payload) {
    return this.request.put(this.apiMap.employeeDocumentCategory.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete document category
  async deleteEmployeeDocumentCategory(token, document_category_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeDocumentCategory.url,
      token,
      document_category_id,
      ["document_category_id"]
    );
  }
  // get employee Document Category By ID
  async getEmployeeDocumentCategoryById(token, payload) {
    const document_category_id =
      typeof payload === "object" ? payload.document_category_id : payload;
    const url = this.apiMap.employeeDocumentCategoryById.url.replace(
      "{document_category_id}",
      document_category_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee Education data
  async getEmployeeEducation(token) {
    return this.request.get(this.apiMap.emoloyeeEducation.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Find document category id by name/text from the document category listing
  async findEducationIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeEducation", name, {
      storeKey: "education",
      idFields: ["education_id", "id", "value"],
      nameFields: ["education_name", "text", "name"],
    });
  }
  // create new Education
  async createEmployeeEducation(token, payload) {
    return this.request.post(this.apiMap.emoloyeeEducation.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update Education
  async updateEmployeeEducation(token, payload) {
    return this.request.put(this.apiMap.emoloyeeEducation.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete Education
  async deleteEmployeeEducation(token, education_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeEducation.url,
      token,
      education_id,
      ["education_id"]
    );
  }
  // get employee Education By ID
  async getEmployeeEducationById(token, payload) {
    const education_id =
      typeof payload === "object" ? payload.education_id : payload;
    const url = this.apiMap.emoloyeeEducationById.url.replace(
      "{education_id}",
      education_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee education Grade division data
  async getEmployeeEducationGradeDivisions(token) {
    return this.request.get(this.apiMap.employeeEducationGradeDivisions.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee education Grade division dropdown data
  async getEmployeeEducationGradeDivisionsDropdown(token) {
    return this.request.get(
      this.apiMap.employeeEducationGradeDivisionsDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Find document category id by name/text from the document category listing
  async findEducationGradeDivisionIdByName(token, name) {
    return this.findIdFromList(
      token,
      "getEmployeeEducationGradeDivisions",
      name,
      {
        storeKey: "grade_division",
        idFields: ["grade_id", "grade_division_id", "id", "value"],
        nameFields: ["grade_name", "text", "name"],
      }
    );
  }
  // create new employee grade division
  async createEmployeeGradeDivisions(token, payload) {
    return this.request.post(this.apiMap.employeeEducationGradeDivisions.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee grade division
  async updateEmployeeGradeDivisions(token, payload) {
    return this.request.put(this.apiMap.employeeEducationGradeDivisions.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee grade division
  async deleteEmployeeEducationGradeDivisions(token, grade_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeEducationGradeDivisions.url,
      token,
      grade_id,
      ["grade_id"]
    );
  }
  // get employee Education Grade division By ID
  async getEmployeeEducationGradeDivisionsById(token, payload) {
    const grade_id = typeof payload === "object" ? payload.grade_id : payload;
    const url = this.apiMap.employeeEducationGradeDivisionsById.url.replace(
      "{grade_id}",
      grade_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // gey employee education group data
  async getEmployeeEducationGroups(token) {
    return this.request.get(this.apiMap.employeeEducationGroups.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // gey employee education group dropdown data
  async getEmployeeEducationGroupDropdown(token) {
    return this.request.get(this.apiMap.employeeEducationGroupsDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find education group id by name/text from the education group listing
  async findEducationGroupIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeEducationGroups", name, {
      storeKey: "education_group",
      idFields: ["education_group_id", "id", "value"],
      nameFields: ["education_group_name", "text", "name"],
    });
  }
  // create new employee education group
  async createEmployeeEducationGroups(token, payload) {
    return this.request.post(this.apiMap.employeeEducationGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get education group by Id
  async getEmployeeEducationGroupsById(token, payload) {
    const education_group_id =
      typeof payload === "object" ? payload.education_group_id : payload;
    const url = this.apiMap.employeeEducationGroupsById.url.replace(
      "{education_group_id}",
      education_group_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update emplyoyee education group
  async updateEmployeeEducationGroups(token, payload) {
    return this.request.put(this.apiMap.employeeEducationGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee education group
  async deleteEmployeeEducationGroups(token, education_group_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeEducationGroups.url,
      token,
      education_group_id,
      ["education_group_id"]
    );
  }
  // get employee education institute data
  async getEmployeeEducationInstitutes(token) {
    return this.request.get(this.apiMap.employeeEducationInstitutes.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee education institute dropdown data
  async getEmployeeEducationInstitutesDropdown(token) {
    return this.request.get(
      this.apiMap.employeeEducationInstitutesDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // find education institute id by name/text from the education institute listing
  async findEducationInstituteIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeEducationInstitutes", name, {
      storeKey: "institute",
      idFields: ["institute_id", "id", "value"],
      nameFields: ["institute_name", "text", "name"],
    });
  }
  // create new employee education institute
  async createEmployeeEducationInstitutes(token, payload) {
    return this.request.post(this.apiMap.employeeEducationInstitutes.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get education institute by Id
  async getEmployeeEducationInstitutesById(token, payload) {
    const institute_id =
      typeof payload === "object" ? payload.institute_id : payload;
    const url = this.apiMap.employeeEducationInstitutesById.url.replace(
      "{institute_id}",
      institute_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update emplyoyee education institute
  async updateEmployeeEducationInstitutes(token, payload) {
    return this.request.put(this.apiMap.employeeEducationInstitutes.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee education institute
  async deleteEmployeeEducationInstitutes(token, institute_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeEducationInstitutes.url,
      token,
      institute_id,
      ["institute_id"]
    );
  }
  // get employye supervisor data by employee id
  async getEmployeeSupervisorByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeSupervisorsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee supervisor info by supervisor id
  async getEmployeeSupervisorBySupervisorId(token, payload) {
    const supervisor_id =
      typeof payload === "object" ? payload.supervisor_id : payload;
    const url = this.apiMap.getEmployeeSupervisorsBySupervisorId.url.replace(
      "{supervisor_id}",
      supervisor_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get supervisor id for update/delete operations
  async getEmployeeSupervisorIdForUpdateDelete(token, payload) {
    const params =
      payload == null
        ? getSupervisorIdPayload
        : typeof payload === "object"
        ? payload
        : { employee_id: payload };
    return this.request.get(
      this.apiMap.getEmployeeSupervisorsByEmployeeId.url,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Find supervisor id by matching supervisor name within the supervisors list for a given employee
  async findEmployeeSupervisorIdByName(token, employee_id, name) {
    const listFnName = "getEmployeeSupervisorIdForUpdateDelete";
    const storeKey = `employee_supervisor_${employee_id}`;
    return this.findIdFromList(token, listFnName, name, {
      storeKey: storeKey,
      idFields: ["supervisor_id", "id", "value"],
      nameFields: ["supervisor_name", "text", "name"],
      params: { employee_id },
    });
  }
  // Find first supervisor id for an employee (no name matching) — returns supervisor_id or null
  async findEmployeeSupervisorIdByEmployeeId(token, employee_id, options = {}) {
    return this.findIdFromList(
      token,
      "getEmployeeSupervisorByEmployeeId",
      employee_id,
      {
        idCandidates: options.idCandidates || ["supervisor_id", "id", "value"],
        storeKey: `employee_supervisor_${employee_id}`,
      }
    );
  }
  // Set employee suspervisor
  async setEmployeeSupervisor(token, payload) {
    return this.request.post(this.apiMap.employeeSupervisors.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Update employee supervisor
  async updateEmployeeSupervisor(token, payload) {
    return this.apiPut(this.apiMap.employeeSupervisors.url, token, payload);
  }
  static prepareUpdateEmployeeSupervisorPayloads(
    prodApi,
    devApi,
    prodToken,
    devToken
  ) {
    return this.prepareUpdatePayloadsUsingList(
      prodApi,
      devApi,
      prodToken,
      devToken,
      employeeSupervisorUpdatePayload,
      getSupervisorIdPayload,
      "getEmployeeSupervisorByEmployeeId",
      {
        storeKey: "supervisor",
        idFieldName: "supervisor_id",
        idCandidates: ["supervisor_id", "id", "value"],
        entityFieldName: "employee_id",
      }
    );
  }
  // Delete employee supervisor by supervisor id
  async deleteEmployeeSupervisor(token, payload) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeSupervisors.url,
      token,
      payload,
      ["employee_id", "supervisor_id"]
    );
  }
  static prepareDeleteEmployeeSupervisorPayloads(
    prodApi,
    devApi,
    prodToken,
    devToken
  ) {
    return this.prepareDeletePayloadsUsingList(
      prodApi,
      devApi,
      prodToken,
      devToken,
      getSupervisorIdPayload,
      "getEmployeeSupervisorByEmployeeId",
      {
        storeKey: "supervisor",
        idCandidates: ["supervisor_id", "id", "value"],
        entityFieldName: "employee_id",
      }
    );
  }
  // get employee job status data
  async getEmployeeJobStatus(token) {
    return this.request.get(this.apiMap.employeeJobStatuses.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee job status data from job status dropdown
  async getEmployeeJobStatusDropdown(token) {
    return this.request.get(this.apiMap.employeeJobStatusesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find job status id by name/text from the job status listing
  async findJobStatusIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeJobStatusDropdown", name, {
      storeKey: "job_status",
      idFields: ["job_status_id", "id", "value"],
      nameFields: ["job_status_name", "text", "name"],
    });
  }
  //create new employee job status
  async createEmployeeJobStatus(token, payload) {
    return this.request.post(this.apiMap.employeeJobStatuses.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee job status
  async updateEmployeeJobStatus(token, payload) {
    return this.request.put(this.apiMap.employeeJobStatuses.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee job status (plural method name to match tests)
  async deleteEmployeeJobStatuses(token, job_status_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeJobStatuses.url,
      token,
      job_status_id,
      ["job_status_id"]
    );
  }
  // get employee job level data
  async getEmployeeJobLevel(token) {
    return this.request.get(this.apiMap.employeeJobLevels.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee job level dropdown data
  async getEmployeeJobLevelDropdown(token) {
    return this.request.get(this.apiMap.employeeJobLevelDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find job level id by name/text from the job level listing
  async findJobLevelIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeJobLevelDropdown", name, {
      storeKey: "job_level",
      idFields: ["job_level_id", "id", "value"],
      nameFields: ["job_level_name", "text", "name"],
    });
  }
  // create new employee job level
  async createEmployeeJobLevel(token, payload) {
    return this.request.post(this.apiMap.employeeJobLevels.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee job level
  async updateEmployeeJobLevel(token, payload) {
    return this.request.put(this.apiMap.employeeJobLevels.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee job level
  async deleteEmployeeJobLevel(token, job_level_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeJobLevels.url,
      token,
      job_level_id,
      ["job_level_id"]
    );
  }
  // employee job base data
  async getEmployeeJobBase(token) {
    return this.request.get(this.apiMap.employeeJobBases.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee job base dropdown data
  async getEmployeeJobBaseDropdown(token) {
    return this.request.get(this.apiMap.employeeJobBaseDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find job base id by name/text from the job base listing
  async findJobBaseIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeJobBaseDropdown", name, {
      storeKey: "job_base",
      idFields: ["job_base_id", "id", "value"],
      nameFields: ["job_base_name", "text", "name"],
    });
  }
  // create new employee job base
  async createEmployeeJobBase(token, payload) {
    return this.request.post(this.apiMap.employeeJobBases.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee job base
  async updateEmployeeJobBase(token, payload) {
    return this.request.put(this.apiMap.employeeJobBases.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee job base
  async deleteEmployeeJobBase(token, job_base_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeJobBases.url,
      token,
      job_base_id,
      ["job_base_id"]
    );
  }
  // employee job group data
  async getEmployeeJobGroup(token) {
    return this.request.get(this.apiMap.employeeJobGroups.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find job group id by name/text from the job group listing
  async findJobGroupIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeJobGroup", name, {
      storeKey: "job_group",
      idFields: ["job_group_id", "id", "value"],
      nameFields: ["job_group_name", "text", "name"],
    });
  }
  // create new employee job group
  async createEmployeeJobGroup(token, payload) {
    return this.request.post(this.apiMap.employeeJobGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee job group
  async updateEmployeeJobGroup(token, payload) {
    return this.request.put(this.apiMap.employeeJobGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee job group
  async deleteEmployeeJobGroup(token, job_group_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeJobGroups.url,
      token,
      job_group_id,
      ["job_group_id"]
    );
  }
  // get employee job group
  async getEmployeeJobGroup(token) {
    return this.request.get(this.apiMap.employeeJobGroups.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find job group id by name/text from the job group listing
  async findJobGroupIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeJobGroup", name, {
      storeKey: "job_group",
      idFields: ["job_group_id", "id", "value"],
      nameFields: ["job_group_name", "text", "name"],
    });
  }
  // create new employee job group
  async createEmployeeJobGroup(token, payload) {
    return this.request.post(this.apiMap.employeeJobGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee job group
  async updateEmployeeJobGroup(token, payload) {
    return this.request.put(this.apiMap.employeeJobGroups.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee job group
  async deleteEmployeeJobGroup(token, job_group_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeJobGroups.url,
      token,
      job_group_id,
      ["job_group_id"]
    );
  }
  // get employee organogram data
  async getEmployeeOrganogram(token) {
    return this.request.get(this.apiMap.employeeOrganograms.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee organogaram data by employee id
  async getEmployeeOrganogramByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeOrganogramsById.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee status to be effective data
  async getEmployeeStatusEffectiveData(token) {
    return this.request.get(this.apiMap.employeeStatusEffective.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find employee status to be effective id by name/text from the listing
  async findEmployeeStatusEffectiveIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeStatusEffectiveData", name, {
      storeKey: "status_effective_id",
      idFields: ["status_effective_id", "id", "value"],
      nameFields: ["status_effective_name", "text", "name"],
    });
  }
  // create new employee status to be effective
  async createEmployeeStatusEffective(token, payload) {
    return this.request.post(this.apiMap.employeeStatusEffective.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee status to be effective by Id
  async getEmployeeStatusEffectiveById(token, payload) {
    const status_effective_id =
      typeof payload === "object" ? payload.status_effective_id : payload;
    const url = this.apiMap.getEmployeeStatusEffectiveById.url.replace(
      "{status_effective_id}",
      status_effective_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee status to be effective
  async updateEmployeeStatusEffective(token, payload) {
    return this.request.put(this.apiMap.employeeStatusEffective.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete employee status to be effective
  async deleteEmployeeStatusEffective(token, status_effective_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeStatusEffective.url,
      token,
      status_effective_id,
      ["status_effective_id"]
    );
  }
  // get Approval Workflow Api data
  async getApprovalWorkflows(token) {
    return this.request.get(this.apiMap.employeeApprovalWorkflows.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get Approval Workflow Api dropdown data
  async getApprovalWorkflowsDropdown(token) {
    return this.request.get(
      this.apiMap.getEmployeeApprovalWorkflowsDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // find Approval Workflow id by name/text from the listing
  async findApprovalWorkflowIdByName(token, name) {
    return this.findIdFromList(token, "getApprovalWorkflowsDropdown", name, {
      storeKey: "approval_workflow",
      idFields: ["approval_workflow_id", "id", "value"],
      nameFields: ["approval_workflow_name", "text", "name"],
    });
  }
  // get Approval Workflow by Id
  async getApprovalWorkflowsById(token, payload) {
    const work_flow_id =
      typeof payload === "object" ? payload.approval_workflow_id : payload;
    const url = this.apiMap.getEmployeeApprovalWorkflowsById.url.replace(
      "{work_flow_id}",
      work_flow_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get approval workflow data by application type dropdown data
  async getApprovalWorkflowsByApplicationTypeDropdown(token) {
    return this.request.get(
      this.apiMap.getEmployeeApprovalWorkflowApplicationTypeDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // get approval workflow data by approver type dropdown data
  async getApprovalWorkflowsByApproverTypeDropdown(token) {
    return this.request.get(
      this.apiMap.getEmployeeApprovalWorkflowApproverTypeDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // create new Approval Workflow
  async createApprovalWorkflows(token, payload) {
    return this.request.post(this.apiMap.employeeApprovalWorkflows.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update Approval Workflow
  async updateApprovalWorkflows(token, payload) {
    return this.request.put(this.apiMap.updateEmployeeApprovalWorkflows.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // delete Approval Workflow
  async deleteApprovalWorkflows(token, approval_workflow_id) {
    return this.deleteByPath(
      this.apiMap.deleteEmployeeApprovalWorkflows.url,
      token,
      approval_workflow_id,
      ["approval_workflow_id"]
    );
  }
  // get employee Approval Work Flow Mapping data
  async getEmployeeApprovalWorkFlowMapping(token) {
    return this.request.get(this.apiMap.employeeApprovalWorkFlowMapping.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find employee Approval Work Flow Mapping id by name/text from the listing
  async findEmployeeApprovalWorkFlowMappingIdByName(token, name) {
    return this.findIdFromList(
      token,
      "getEmployeeApprovalWorkFlowMapping",
      name,
      {
        storeKey: "work_flow_mapping_id",
        idFields: ["work_flow_mapping_id", "id", "value"],
        nameFields: ["work_flow_mapping_name", "text", "name"],
      }
    );
  }
  // get employee Approval Work Flow Mapping by Id
  async getEmployeeApprovalWorkFlowMappingById(token, payload) {
    const work_flow_mapping_id =
      typeof payload === "object" ? payload.work_flow_mapping_id : payload;
    const url = this.apiMap.getEmployeeApprovalWorkFlowMappingByID.url.replace(
      "{work_flow_mapping_id}",
      work_flow_mapping_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset data
  async getEmployeeAssets(token) {
    return this.request.get(this.apiMap.employeeAssets.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset dropdown data
  async getEmployeeAssetsDropdown(token) {
    return this.request.get(this.apiMap.employeeAssetsDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset status dropdown data
  async getEmployeeAssetStatusDropdown(token) {
    return this.request.get(this.apiMap.employeeAssetsStatusDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find employee asset id by name/text from the listing
  async findEmployeeAssetIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeAssetsDropdown", name, {
      storeKey: "employee_asset",
      idFields: ["asset_id", "id", "value"],
      nameFields: ["asset_name", "text", "name"],
    });
  }
  //employee Assets Distribution History by asset id
  async getEmployeeAssetsDistributionHistoryByAssetId(token, payload) {
    const asset_id =
      payload != null && typeof payload === "object"
        ? payload.asset_id
        : payload;
    const url = asset_id
      ? `${
          this.apiMap.employeeAssetsDistributionHistory.url
        }?asset_id=${encodeURIComponent(asset_id)}`
      : this.apiMap.employeeAssetsDistributionHistory.url;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get asset info by asset id
  async getEmployeeAssetById(token, payload) {
    const asset_id =
      payload != null && typeof payload === "object"
        ? payload.asset_id
        : payload;
    const url = this.apiMap.getAssetDetailsById.url.replace(
      "{asset_id}",
      asset_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get assigned asset info
  async getAssignedEmployeeAssets(token) {
    return this.request.get(this.apiMap.getAssignedAssetsData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get company assets info
  async getCompanyAssets(token) {
    return this.request.get(this.apiMap.getCompanyAssetsData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset category data
  async getEmployeeAssetCategories(token) {
    return this.request.get(this.apiMap.employeeAssetsCategory.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset category dropdown data
  async getEmployeeAssetCategoriesDropdown(token) {
    return this.request.get(this.apiMap.employeeAssetsCategoryDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find employee asset category id by name/text from the listing
  async findEmployeeAssetCategoryIdByName(token, name) {
    return this.findIdFromList(
      token,
      "getEmployeeAssetCategoriesDropdown",
      name,
      {
        storeKey: "asset_category",
        idFields: ["category_id", "id", "value"],
        nameFields: ["category_name", "text", "name"],
      }
    );
  }
  // Assets category attachment ifno by asset category id
  async getEmployeeAssetCategoryAttachmentByCategoryId(token, payload) {
    const asset_category_id =
      payload != null && typeof payload === "object"
        ? payload.asset_category_id
        : payload;
    const url = this.apiMap.getEmployeeAssetsCategoryAttachmentById.url.replace(
      "{asset_category_id}",
      asset_category_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Download asset category attachment by attachment id
  async downloadEmployeeAssetCategoryAttachmentById(
    token,
    payload,
    downloadPath
  ) {
    const asset_category_id =
      payload != null && typeof payload === "object"
        ? payload.asset_category_id
        : payload;
    const url =
      this.apiMap.downloadEmployeeAssetsCategoryAttachmentById.url.replace(
        "{asset_category_id}",
        asset_category_id
      );
    return this.downloadFile(url, downloadPath, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //get asset category preview url by asset category id
  async assetCategoryPreviewURL(token, payload) {
    const asset_category_id =
      payload != null && typeof payload === "object"
        ? payload.asset_category_id
        : payload;
    const url = this.apiMap.assetCategoryPreviewURL.url.replace(
      "{asset_category_id}",
      asset_category_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset distribution data
  async getEmployeeAssetDistribution(token) {
    return this.request.get(this.apiMap.getAssetDistributionsData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get assets distribution Update CreateData data by distribution id
  async getEmployeeAssetDistributionUpdateCreateData(token, payload) {
    const distribution_id =
      payload != null && typeof payload === "object"
        ? payload.distribution_id
        : payload;
    const url = distribution_id
      ? `${
          this.apiMap.getAssetDistributionsCreateUpdateData.url
        }?distribution_id=${encodeURIComponent(distribution_id)}`
      : this.apiMap.employeeAssetsDistributionHistory.url;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee asset requisition data
  async getEmployeeAssetRequisition(token) {
    return this.request.get(this.apiMap.employeeAssetRequisitions.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get details by assets requisition id
  async getEmployeeAssetRequisitionById(token, payload) {
    const asset_requisition_id =
      payload != null && typeof payload === "object"
        ? payload.asset_requisition_id
        : payload;
    const url = this.apiMap.getEmployeeAssetRequisitionsById.url.replace(
      "{asset_requisition_id}",
      asset_requisition_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get subordinate assets requisition data
  async getSubordinateAssetRequisition(token) {
    return this.request.get(this.apiMap.getSubordinateAssetRequisitions.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get asset report data (simple: caller may pass payload with from_date,to_date,asset_id)
  async getEmployeeAssetReport(token, payload) {
    return this.request.get(this.apiMap.employeeAssetReports.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //get employee award type data
  async getEmployeeAwardTypes(token) {
    return this.request.get(this.apiMap.employeeAwardType.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee award type dropdown data
  async getEmployeeAwardTypesDropdown(token) {
    return this.request.get(this.apiMap.employeeAwardTypeDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // find employee award type id by name/text from the listing
  async findEmployeeAwardTypeIdByName(token, name) {
    return this.findIdFromList(token, "getEmployeeAwardTypesDropdown", name, {
      storeKey: "award_type_ide",
      idFields: ["award_type_id", "id", "value"],
      nameFields: ["award_type_name", "text", "name"],
    });
  }
  // create new employee award type
  async createEmployeeAwardType(token, payload) {
    return this.request.post(this.apiMap.employeeAwardType.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // update employee award type
  async updateEmployeeAwardType(token, payload) {
    return this.request.put(this.apiMap.employeeAwardType.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee award type by Id
  async getEmployeeAwardTypeById(token, payload) {
    const award_type_id =
      typeof payload === "object" ? payload.award_type_id : payload;
    const url = this.apiMap.getEmployeeAwardTypeById.url.replace(
      "{award_type_id}",
      award_type_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee Birthday notification data
  async getEmployeeBirthdayNotifications(token) {
    return this.request.get(this.apiMap.employeeBirthdayNotification.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee Birthday notification dropdown data
  async getEmployeeBirthdayNotificationsDropdown(token) {
    return this.request.get(
      this.apiMap.employeeBirthdayNotificationReminderTypeDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // create new employee Birthday notification
  async createEmployeeBirthdayNotification(token, payload) {
    return this.request.post(this.apiMap.createBirthdayNotification.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee Birthday send notification info
  async getEmployeeBirthdaySendNotificationInfo(token, payload) {
    const url = this.apiMap.sendBirthdayNotification.url;
    return this.request.get(url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee accommodation data
  async getEmployeeAccommodations(token) {
    return this.request.get(this.apiMap.employeeAccommodation.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee accommodation by Id
  async getEmployeeAccommodationById(token, payload) {
    const accommodation_id =
      typeof payload === "object" ? payload.accommodation_id : payload;
    const url = this.apiMap.getEmployeeAccommodationById.url.replace(
      "{accommodation_id}",
      accommodation_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get attachment info by attachmnet id
  async getEmployeeAccommodationAttachmentById(token, payload) {
    const attachment_id =
      typeof payload === "object" ? payload.attachment_id : payload;
    const url = this.apiMap.downloadAccommodationAttachmentById.url.replace(
      "{attachment_id}",
      attachment_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee air ticket data
  async getEmployeeAirTickets(token) {
    return this.request.get(this.apiMap.employeeAirTicketing.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee air ticket by Id
  async getEmployeeAirTicketById(token, payload) {
    const air_ticket_id =
      typeof payload === "object" ? payload.air_ticket_id : payload;
    const url = this.apiMap.getEmployeeAirTicketingById.url.replace(
      "{air_ticket_id}",
      air_ticket_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get Employees QR Code data by employee id
  async getEmployeeQRCodeById(token, payload) {
    return this.request.get(this.apiMap.getEmployeesQRCode.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get Employee Profile Data
  async getEmployeeProfileData(token, payload) {
    return this.request.get(this.apiMap.getEmployeeProfileData.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //get Employee Department Data
  async getEmployeeDepartmentData(token) {
    return this.request.get(this.apiMap.getEmployeeDepartmentData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee subordinate data by supervisor id
  async getEmployeeSubordinatesBySupervisorId(token, payload) {
    return this.request.get(this.apiMap.getEmployeeSubordinatesData.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get all employees data
  async getAllEmployeesData(token) {
    return this.request.get(this.apiMap.getEmployeesData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee with talent info
  async getEmployeesWithTalentInfo(token) {
    return this.request.get(this.apiMap.getEmployeesWithTalentData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get all supervisors data
  async getAllSupervisorsData(token) {
    return this.request.get(this.apiMap.getEmployeeSupervisorsData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee admin user info
  async getEmployeeAdminUserInfo(token) {
    return this.request.get(this.apiMap.getEmployeeAdminUsersData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee info by branch id
  async getEmployeesByBranchId(token, payload) {
    return this.request.get(this.apiMap.getEmployeesByBranchData.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get roaster employee data by branch id
  async getRoasterEmployeesByBranchId(token, payload) {
    return this.request.get(this.apiMap.getRosterEligibleEmployeesData.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get pending employee profile image approval data\
  async getEmployeePendingProfileImageApprovalData(token) {
    return this.request.get(this.apiMap.getPendingProfileImagesData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee directory data
  async getEmployeeDirectoryData(token) {
    return this.request.get(this.apiMap.getDirectoryEmployeesData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee filter option data
  async getEmployeeFilterOptionsData(token) {
    return this.request.get(this.apiMap.getEmployeeFiltersData.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get paginated and filtered employees
  async getPaginatedFilteredEmployees(token, payload) {
    return this.request.get(this.apiMap.getPaginatedEmployeesData.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get search employee dropdown data
  async getSearchEmployeeDropdownData(token) {
    return this.request.get(this.apiMap.getEmployeeDataDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee basic information by employee id
  async getEmployeeBasicInfoById(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeById.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employment-status-dropdown data
  async getEmploymentStatusDropdownData(token) {
    return this.request.get(this.apiMap.getEmploymentStatusDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get emplyoyee info by employee code
  async getEmployeeInfoByEmployeeCode(token, payload) {
    return this.request.get(this.apiMap.getEmployeeCode.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee awards data
  async getEmployeeAwardsData(token) {
    return this.request.get(this.apiMap.employeeAwards.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee award info by award id
  async getEmployeeAwardById(token, payload) {
    const award_id = typeof payload === "object" ? payload.award_id : payload;
    const url = this.apiMap.getAwardDetailsById.url.replace(
      "{award_id}",
      award_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //get employees all-bank-accounts
  async getAllBankAccounts(token) {
    return this.request.get(this.apiMap.getAllBankAccounts.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employees/{employee_id}/bank-accounts
  async getBankAccountsByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getBankAccountsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employees/bank-accounts/{employee_bank_account_id}
  async getBankAccountById(token, payload) {
    const employee_bank_account_id =
      typeof payload === "object" ? payload.employee_bank_account_id : payload;
    const url = this.apiMap.getBankAccountById.url.replace(
      "{employee_bank_account_id}",
      employee_bank_account_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get  bank accounts details by {employee_bank_account_id}
  async getBankAccountDetailsById(token, payload) {
    const employee_bank_account_id =
      typeof payload === "object" ? payload.employee_bank_account_id : payload;
    const url = this.apiMap.getBankAccountById.url.replace(
      "{employee_bank_account_id}",
      employee_bank_account_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee car data
  async getEmployeeCars(token) {
    return this.request.get(this.apiMap.employeeCar.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee car details by car id
  async getEmployeeCarById(token, payload) {
    const car_id = typeof payload === "object" ? payload.car_id : payload;
    const url = this.apiMap.getEmployeeCarById.url.replace("{car_id}", car_id);
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // download Employee Car Attachment ById
  async downloadEmployeeCarAttachmentById(token, payload) {
    const attachment_id =
      typeof payload === "object" ? payload.attachment_id : payload;
    const url = this.apiMap.downloadEmployeeCarAttachmentById.url.replace(
      "{attachment_id}",
      attachment_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //Get employee contact information by employee id
  async getEmployeeContactInfoById(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeContactInfoById.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee dashboard graphs
  async getEmployeeDasboardStatusGraph(token) {
    return this.request.get(this.apiMap.employeeDasboardStatusGraph.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Monthly active graph
  async getEmployeeDashboardMonthlyActiveGraph(token) {
    return this.request.get(
      this.apiMap.employeeDashboardMonthlyActiveGraph.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Religion graph
  async getEmployeeDashboardReligionGraph(token) {
    return this.request.get(this.apiMap.employeeDashboardReligionGraph.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Branch blood group graph
  async getEmployeeDashboardBranchBloodGroupGraph(token) {
    return this.request.get(
      this.apiMap.employeeDashboardBranchBloodGroupGraph.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Employee document APIs
  async getEmployeeDocumentsByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeDocumentsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get Employee Document ById
  async getEmployeeDocumentById(token, payload) {
    const document_id =
      typeof payload === "object" ? payload.document_id : payload;
    const url = this.apiMap.getEmployeeDocumentById.url.replace(
      "{document_id}",
      document_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get Employee Document Category dropdown data
  async getEmployeeDocumentCategoryDropdown(token) {
    return this.request.get(
      this.apiMap.getEmployeeDocumentCategoryDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // download Employee Document ById
  async downloadEmployeeDocumentById(token, payload, downloadPath) {
    const document_id =
      typeof payload === "object" ? payload.document_id : payload;
    const url = this.apiMap.downloadEmployeeDocumentById.url.replace(
      "{document_id}",
      document_id
    );
    return this.downloadFile(url, downloadPath, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee document request APIs
  async getEmployeeDocumentRequest(token) {
    return this.request.get(this.apiMap.getEmployeeDocumentRequest.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getEmployeeDocumentRequestDetails(token, payload) {
    return this.request.get(this.apiMap.getEmployeeDocumentRequestDetails.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get Employee Document Application Status dropdown data
  async getEmployeeDocumentApplicationStatusDropdown(token) {
    return this.request.get(
      this.apiMap.getEmployeeDocumentApplicationStatusDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Get employee educations for a given employee id (employees/{employee_id}/educations)
  async getEmployeeEducationsByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeEducationsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a specific employee-education record by emp_education_id
  async getEmployeeEducationEmpById(token, payload) {
    const emp_education_id =
      typeof payload === "object" ? payload.emp_education_id : payload;
    const url = this.apiMap.getEmployeeEducationById.url.replace(
      "{emp_education_id}",
      emp_education_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee education dropdown for employees (employees/educations/dropdown)
  async getEmployeeEducationDropdown(token) {
    return this.request.get(this.apiMap.getEmployeeEducationDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee family details (employees/{employee_id}/family-details)
  async getEmployeeFamilyDetailsByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeFamilyDetailsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee family detail by family_details_id (employees/family-details/{family_details_id})
  async getEmployeeFamilyDetailsById(token, payload) {
    const family_details_id =
      typeof payload === "object" ? payload.family_details_id : payload;
    const url = this.apiMap.getEmployeeFamilyDetailsById.url.replace(
      "{family_details_id}",
      family_details_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee health insurance APIs
  async getEmployeeHealthInsurances(token) {
    return this.request.get(this.apiMap.getEmployeeHealthInsurances.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee health insurance by health_insurance_id
  async getEmployeeHealthInsuranceById(token, payload) {
    const health_insurance_id =
      typeof payload === "object" ? payload.health_insurance_id : payload;
    const url = this.apiMap.getEmployeeHealthInsuranceById.url.replace(
      "{health_insurance_id}",
      health_insurance_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // download Employee Health Insurance Attachment ById
  async downloadEmployeeHealthInsuranceAttachmentById(
    token,
    payload,
    downloadPath
  ) {
    const attachment_id =
      typeof payload === "object" ? payload.attachment_id : payload;
    const url =
      this.apiMap.downloadEmployeeHealthInsuranceAttachmentById.url.replace(
        "{attachment_id}",
        attachment_id
      );
    return this.downloadFile(url, downloadPath, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee incentives APIs
  async getEmployeeIncentives(token) {
    return this.request.get(this.apiMap.employeeIncentives.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee incentive by incentive_id
  async getEmployeeIncentiveById(token, payload) {
    const incentive_id =
      typeof payload === "object" ? payload.incentive_id : payload;
    const url = this.apiMap.getEmployeeIncentiveById.url.replace(
      "{incentive_id}",
      incentive_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee language APIs
  async getEmployeeLanguagesDropdown(token) {
    return this.request.get(this.apiMap.getEmployeeLanguagesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee languages for a given employee id (employees/{employee_id}/languages)
  async getEmployeeLanguagesByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeLanguagesByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a specific employee-language record by employee_language_id
  async getEmployeeLanguageById(token, payload) {
    const employee_language_id =
      typeof payload === "object" ? payload.employee_language_id : payload;
    const url = this.apiMap.getEmployeeLanguageById.url.replace(
      "{employee_language_id}",
      employee_language_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee mobiles list
  async getEmployeeMobiles(token) {
    return this.request.get(this.apiMap.getEmployeeMobiles.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee mobile details by mobile id
  async getEmployeeMobileById(token, payload) {
    const mobile_id = typeof payload === "object" ? payload.mobile_id : payload;
    const url = this.apiMap.getEmployeeMobileById.url.replace(
      "{mobile_id}",
      mobile_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // download Employee Mobile Attachment ById
  async downloadEmployeeMobileAttachmentById(token, payload) {
    const attachment_id =
      typeof payload === "object" ? payload.attachment_id : payload;
    const url = this.apiMap.downloadEmployeeMobileAttachmentById.url.replace(
      "{attachment_id}",
      attachment_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee passports by employee id
  async getEmployeePassportsByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeePassportsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get employee passport details by passport id
  async getEmployeePassportById(token, payload) {
    const passport_id =
      typeof payload === "object" ? payload.passport_id : payload;
    const url = this.apiMap.getEmployeePassportById.url.replace(
      "{passport_id}",
      passport_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // download Employee Passport Attachment ById
  async downloadEmployeePassportAttachmentById(token, payload) {
    const passport_id =
      typeof payload === "object" ? payload.passport_id : payload;
    const url = this.apiMap.downloadEmployeePassportAttachmentById.url.replace(
      "{passport_id}",
      passport_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //Employee position Reports
  async getEmployeeReportsPosition(token, payload) {
    return this.request.get(this.apiMap.employeeReportsPosition.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee profile Reports
  async getEmployeeReportsProfile(token, payload) {
    return this.request.get(this.apiMap.employeeReportsProfile.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee blood Reports
  async getEmployeeReportBlood(token, payload) {
    return this.request.get(this.apiMap.employeeReportBlood.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee alert Reports
  async getEmployeeReportAlert(token, payload) {
    return this.request.get(this.apiMap.employeeReportAlert.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee contact Reports
  async getEmployeeReportContact(token, payload) {
    return this.request.get(this.apiMap.employeeReportContact.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  //  Employee emergency contact Reports
  async getEmployeeReportMonthWiseJoiningDismissEmployee(token, payload) {
    return this.request.get(
      this.apiMap.employeeReportMonthWiseJoiningDismissEmployee.url,
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Employee age or service length Reports
  async getEmployeeReportAgeOrServiceLength(token, payload) {
    return this.request.get(this.apiMap.employeeReportAgeOrServiceLength.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee report supervisor and leave approver Reports
  async getEmployeeReportSupervisorAndLeaveApprover(token, payload) {
    return this.request.get(
      this.apiMap.employeeReportSupervisorAndLeaveApprover.url,
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Employee report transfer history Reports
  async getEmployeeReportTransferHistory(token, payload) {
    return this.request.get(this.apiMap.employeeReportTransferHistory.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee report passport and visa Reports
  async getEmployeeReportPassportAndVisa(token, payload) {
    return this.request.get(this.apiMap.employeeReportPassportAndVisa.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee report template Reports
  async getEmployeeReportTemplateReport(token, payload) {
    return this.request.get(this.apiMap.employeeReportTemplateReport.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Dropdown / lookup style report endpoints (no payload expected)
  async getEmployeeReportExpirationCheckDropdown(token) {
    return this.request.get(
      this.apiMap.employeeReportExpirationCheckDropdown.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Employee report template dropdown
  async getEmployeeReportTemplateDropdown(token) {
    return this.request.get(this.apiMap.employeeReportTemplateDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee report employee order by dropdown
  async getEmployeeReportEmployeeOrderByDropdown(token, payload) {
    return this.request.get(
      this.apiMap.employeeReportEmployeeOrderByDropdown.url,
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Employee status & change history
  async getEmployeeStatusesByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeStatuses.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee location change history
  async getEmployeeLocationChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeLocationChangeHistory.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee status change history
  async getEmployeeJobStatusChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeJobStatusChangeHistory.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee job base change history
  async getEmployeeJobBaseChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeJobBaseChangeHistory.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee category change history
  async getEmployeeCategoryChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeCategoryChangeHistory.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee designation change history
  async getEmployeeDesignationChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeDesignationChangeHistory.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee job level change history
  async getEmployeeJobLevelChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeJobLevelChangeHistory.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee functional designation change history
  async getEmployeeFunctionalDesignationChangeHistory(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url =
      this.apiMap.employeeFunctionalDesignationChangeHistory.url.replace(
        "{employee_id}",
        employee_id
      );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get talents by employee id (single employee)
  async getEmployeeTalentsByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeTalentsByEmployeeId.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get all talents
  async getEmployeeTalentsByEmployeeIds(token) {
    return this.request.get(this.apiMap.getEmployeeTalentsByEmployeeIds.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a single talent by talent id
  async getEmployeeTalentById(token, payload) {
    const talent_id = typeof payload === "object" ? payload.talent_id : payload;
    const url = this.apiMap.getEmployeeTalentById.url.replace(
      "{talent_id}",
      talent_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get visas for an employee's passport (employees/{employee_id}/visas/{passport_id}/visas)
  async getEmployeeVisasByPassport(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const passport_id =
      payload != null && typeof payload === "object"
        ? payload.passport_id
        : null;
    const url = this.apiMap.employeeVisa.url
      .replace("{employee_id}", employee_id)
      .replace("{passport_id}", passport_id);
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a single visa by visa id
  async getEmployeeVisaById(token, payload) {
    const visa_id = typeof payload === "object" ? payload.visa_id : payload;
    const url = this.apiMap.getEmployeeVisaById.url.replace(
      "{visa_id}",
      visa_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get visa type dropdown
  async getEmployeeVisaTypeDropdown(token) {
    return this.request.get(this.apiMap.getEmployeeVisaTypeDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Download visa attachment by visa id
  async downloadEmployeeVisaAttachmentById(token, payload) {
    const visa_id = typeof payload === "object" ? payload.visa_id : payload;
    const url = this.apiMap.downloadEmployeeVisaAttachmentById.url.replace(
      "{visa_id}",
      visa_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee Warning APIs
  async getEmployeeWarnings(token, payload) {
    return this.request.get(this.apiMap.employeeWarning.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a single warning by warning id
  async getEmployeeWarningById(token, payload) {
    const warning_id =
      typeof payload === "object" ? payload.warning_id : payload;
    const url = this.apiMap.employeeWarningById.url.replace(
      "{warning_id}",
      warning_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get image attachment(s) related to a warning (if supported via query)
  async getEmployeeWarningImageAttachment(token, payload) {
    return this.request.get(this.apiMap.employeeWarningGetImageAttachment.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Download attachment for a warning (if endpoint expects a query or body)
  async downloadEmployeeWarningAttachmentById(token, payload) {
    return this.request.get(this.apiMap.employeeWarningDownloadAttachment.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // employee Warning Show Report
  async getEmployeeWarningShowReport(token, payload) {
    return this.request.get(this.apiMap.employeeWarningShowReport.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get employee work experiences by employee id
  async getEmployeeWorkExperienceByEmployeeId(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.employeeWorkExperience.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employment Categories APIs
  async getEmploymentCategoriesDropdown(token) {
    return this.request.get(this.apiMap.employmentCategoriesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get all employment categories
  async getEmploymentCategories(token) {
    return this.request.get(this.apiMap.employmentCategories.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get all functional designations
  async getFunctionalDesignations(token) {
    return this.request.get(this.apiMap.functionalDesignations.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get functional designation by ID
  async getFunctionalDesignationById(token, payload) {
    const functional_designation_id =
      typeof payload === "object" ? payload.functional_designation_id : payload;
    const url = this.apiMap.functionalDesignationById.url.replace(
      "{functional_designation_id}",
      functional_designation_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get functional designations dropdown
  async getFunctionalDesignationsDropdown(token) {
    return this.request.get(this.apiMap.functionalDesignationsDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Talent types - list
  async getTalentTypes(token) {
    return this.request.get(this.apiMap.talentTypes.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Talent types dropdown
  async getTalentTypesDropdown(token) {
    return this.request.get(this.apiMap.talentTypesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee Task APIs
  async getEmployeeTaskStatus(token) {
    return this.request.get(this.apiMap.employeeTasktStatus.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // create or update task
  async getTaskCreateUpdateData(token, payload) {
    return this.request.get(this.apiMap.employeeTaskCreateUpdate.url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // customer info dropdown
  async getEmployeeTaskInfoDropdown(token) {
    return this.request.get(this.apiMap.employeeTaskInfoDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // check-in enabled
  async getEmployeeTaskIsCheckInEnabled(token, payload) {
    return this.request.get(this.apiMap.employeeTaskIsCheckInEnabled.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // customer branch dropdown
  async getEmployeeTaskCustomerBranchDropdown(token, payload) {
    return this.request.get(
      this.apiMap.employeeTaskCustomerBranchDropdown.url,
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // admin tasks listing
  async getEmployeeTaskAdminTasks(token) {
    return this.request.get(this.apiMap.employeeTaskAdminTasks.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // employee tasks listing
  async getEmployeeTaskEmployeeTasks(token, payload) {
    return this.request.get(this.apiMap.employeeTaskEmployeeTasks.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // get task by id
  async getEmployeeTaskById(token, payload) {
    const task_id = typeof payload === "object" ? payload.task_id : payload;
    const url = this.apiMap.employeeTaskById.url.replace("{task_id}", task_id);
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Task Categories APIs
  async getTaskCategories(token) {
    return this.request.get(this.apiMap.taskCategories.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Task Categories dropdown
  async getTaskCategoriesDropdown(token) {
    return this.request.get(this.apiMap.taskCategoriesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get task category by ID
  async getTaskCategoryById(token, payload) {
    const category_id =
      typeof payload === "object" ? payload.category_id : payload;
    const url = this.apiMap.taskCategoriesById.url.replace(
      "{category_id}",
      category_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Task Priorities APIs
  async getTaskPriorities(token) {
    return this.request.get(this.apiMap.taskPriorities.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Task Priorities dropdown
  async getTaskPrioritiesDropdown(token) {
    return this.request.get(this.apiMap.taskPrioritiesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get task priority by ID
  async getTaskPriorityById(token, payload) {
    const task_priority_id =
      typeof payload === "object" ? payload.task_priority_id : payload;
    const url = this.apiMap.taskPrioritiesById.url.replace(
      "{task_priority_id}",
      task_priority_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee Task Report APIs
  async getTaskReportPdfExcel(token, payload) {
    return this.request.get(this.apiMap.taskReportPdfExcel.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Customer branch dropdown specific to task reports
  async getTaskReportCustomerBranchDropdown(token, payload) {
    return this.request.get(this.apiMap.taskReportCustomerBranchDropdown.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Task Status APIs
  async getTaskStatus(token) {
    return this.request.get(this.apiMap.taskStatus.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Task Status dropdown
  async getTaskStatusDropdown(token) {
    return this.request.get(this.apiMap.taskStatusDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get task status by ID
  async getTaskStatusById(token, payload) {
    const task_status_id =
      typeof payload === "object" ? payload.task_status_id : payload;
    const url = this.apiMap.taskStatusById.url.replace(
      "{task_status_id}",
      task_status_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Tracking & Monitoring APIs
  async getTrackingMonitoringFilterTrackedUsers(token, payload) {
    return this.request.get(
      this.apiMap.trackingMonitoringFilterTrackedUsers.url,
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Live tracking for a specific employee (path param)
  async getTrackingMonitoringEmployeeLiveTracking(token, payload) {
    const employee_id =
      typeof payload === "object" ? payload.employee_id : payload;
    const url = this.apiMap.trackingMonitoringEmployeeLiveTracking.url.replace(
      "{employee_id}",
      employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Employee track history (use query params)
  async getTrackingMonitoringEmployeeTrackHistory(token, payload) {
    return this.request.get(
      this.apiMap.trackingMonitoringEmployeeTrackHistory.url,
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Tracking Enables APIs
  async getTrackingEnables(token, payload) {
    return this.request.get(this.apiMap.trackingEnables.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Already active tracked users listing
  async getTrackingEnablesAlreadyActiveTrackedUsers(token) {
    return this.request.get(
      this.apiMap.trackingEnablesAlreadyActiveTrackedUsers.url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Tracking History Reports API
  async getTrackingHistoryReports(token, payload) {
    return this.request.get(this.apiMap.trackingHistoryReports.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Tracking Schedules APIs
  async getTrackingSchedules(token) {
    return this.request.get(this.apiMap.trackingSchedules.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a tracking schedule by id (accept either an id or a payload object)
  async getTrackingSchedulesById(token, payload) {
    const tracking_schedule_id =
      typeof payload === "object"
        ? payload.tracking_schedule_id || payload.id
        : payload;
    const url = this.apiMap.trackingSchedulesById.url.replace(
      "{tracking_schedule_id}",
      tracking_schedule_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get mappings for a given schedule id
  async getTrackingSchedulesMappingsById(token, payload) {
    const tracking_schedule_id =
      typeof payload === "object"
        ? payload.tracking_schedule_id || payload.id
        : payload;
    const url = this.apiMap.trackingSchedulesMappingsById.url.replace(
      "{tracking_schedule_id}",
      tracking_schedule_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Travel Allowance APIs
  async getTravelAllowances(token) {
    return this.request.get(this.apiMap.travelAllowances.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get a travel allowance by id (accept either an id or a payload object)
  async getTravelAllowancesById(token, payload) {
    const travel_allowance_id =
      typeof payload === "object"
        ? payload.travel_allowance_id || payload.id
        : payload;
    const url = this.apiMap.travelAllowancesById.url.replace(
      "{travel_allowance_id}",
      travel_allowance_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Warning Types APIs
  async getWarningTypes(token) {
    return this.request.get(this.apiMap.warningTypes.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Warning types dropdown
  async getWarningTypesDropdown(token) {
    return this.request.get(this.apiMap.warningTypesDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get warning type by id
  async getWarningTypesById(token, payload) {
    const warning_type_id =
      typeof payload === "object"
        ? payload.warning_type_id || payload.id
        : payload;
    const url = this.apiMap.warningTypesById.url.replace(
      "{warning_type_id}",
      warning_type_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Company Wings APIs
  // List / filter wings (use query params)
  async getWings(token, payload) {
    return this.request.get(this.apiMap.wings.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Wings dropdown
  async getWingsDropdown(token) {
    return this.request.get(this.apiMap.wingsDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Get wing by id
  async getWingsById(token, payload) {
    const wing_id =
      typeof payload === "object" ? payload.wing_id || payload.id : payload;
    const url = this.apiMap.wingsById.url.replace("{wing_id}", wing_id);
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Employee Birthdays APIs
  async getEmployeeBirthdays(token) {
    return this.request.get(this.apiMap.employeeBirthdays.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Get birthday wishes listing
  async getEmployeeBirthdayWishes(token, payload) {
    return this.request.get(this.apiMap.employeeBirthdayWishes.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Create (send) a birthday wish
  async employeeBirthdayWishById(token, payload) {
    return this.request.get(this.apiMap.employeeBirthdayWish.url, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //************************************************************************************************************************//
  //Comparison behavior to the generic runner on BasePage so all pages share logic.
  static async compareProdVsDev(
    request,
    functionName,
    method,
    prodToken,
    devToken,
    payload = null
  ) {
    return BasePage.compareProdVsDev(
      request,
      EmployeeApis,
      functionName,
      method,
      prodToken,
      devToken,
      payload
    );
  }
}
// Simple entity registry used by compareProdVsDev handlers to cache ids
EmployeeApis.entityRegistry = {};
EmployeeApis.registerEntity = function (name, def) {
  EmployeeApis.entityRegistry[name] = def;
};
//*************************************************************************************************************************//

// Register the two entities using the generic entityResolver
EmployeeApis.registerEntity("createNewEmployeeDepartment", {
  getState: (env, idKey) => entityResolver.getState("department", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("department", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.name,
    department_code: pl?.department_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeDepartment",
      nameResolverFn: "findDepartmentIdByName",
      idFields: ["department_id", "id", "value"],
      codeFields: ["department_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeDivisions", {
  getState: (env, idKey) => entityResolver.getState("division", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("division", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.division_name || pl?.name,
    division_code: pl?.division_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeDivisions",
      nameResolverFn: "findDivisionIdByName",
      idFields: ["company_division_id", "id", "value"],
      codeFields: ["division_code", "company_division_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeDepartmentUnit", {
  getState: (env, idKey) =>
    entityResolver.getState("department_unit", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("department_unit", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.unit_name || pl?.name,
    unit_code: pl?.unit_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeDepartmentUnit",
      nameResolverFn: "findDepartmentUnitIdByName",
      idFields: ["department_unit_id", "id", "value"],
      codeFields: ["unit_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeDesignation", {
  getState: (env, idKey) => entityResolver.getState("designation", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("designation", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.designation_name || pl?.name,
    designation_code: pl?.designation_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeDesignationsDropdown",
      nameResolverFn: "findDesignationIdByName",
      idFields: ["designation_id", "id", "value"],
      codeFields: ["designation_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeDesignationGroups", {
  getState: (env, idKey) =>
    entityResolver.getState("designation_group", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("designation_group", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.designation_group_name || pl?.name,
    designation_group_code: pl?.designation_group_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeDesignationGroups",
      nameResolverFn: "findDesignationGroupIdByName",
      idFields: ["designation_group_id", "id", "value"],
      codeFields: ["designation_group_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeDocumentsCategories", {
  getState: (env, idKey) =>
    entityResolver.getState("document_category", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("document_category", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.document_category_name || pl?.name,
    document_category_code: pl?.document_category_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeDocumentCategory",
      nameResolverFn: "findDocumentCategoryIdByName",
      idFields: ["document_category_id", "id", "value"],
      codeFields: ["document_category_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeEducation", {
  getState: (env, idKey) => entityResolver.getState("education", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("education", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.education_name || pl?.name,
    education_code: pl?.education_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeEducation",
      nameResolverFn: "findEducationIdByName",
      idFields: ["education_id", "id", "value"],
      codeFields: ["education_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeGradeDivisions", {
  getState: (env, idKey) =>
    entityResolver.getState("grade_division", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("grade_division", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.education_name || pl?.name,
    education_code: pl?.education_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeEducationGradeDivisions",
      nameResolverFn: "findEducationGradeDivisionIdByName",
      idFields: ["grade_id", "id", "value"],
      codeFields: ["grade_division_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeEducationGroups", {
  getState: (env, idKey) =>
    entityResolver.getState("education_group", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("education_group", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.education_group_name || pl?.name,
    education_group_code: pl?.education_group_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeEducationGroups",
      nameResolverFn: "findEducationGroupIdByName",
      idFields: ["education_group_id", "id", "value"],
      codeFields: ["education_group_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeEducationInstitutes", {
  getState: (env, idKey) => entityResolver.getState("institute", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("institute", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.institute_name || pl?.name,
    institute_code: pl?.institute_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeEducationInstitutes",
      nameResolverFn: "findEducationInstituteIdByName",
      idFields: ["institute_id", "id", "value"],
      codeFields: ["institute_code"],
    }),
});

EmployeeApis.registerEntity("setEmployeeSupervisor", {
  getState: (env, idKey) => entityResolver.getState("supervisor", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("supervisor", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.supervisor_name || pl?.name,
    employee_id: pl?.employee_id,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeSupervisorByEmployeeId",
      nameResolverFn: "findEmployeeSupervisorIdByName",
      idFields: ["supervisor_id", "id", "value"],
      extraParams: { employee_id: seeds.employee_id },
    }),
});

EmployeeApis.registerEntity("createEmployeeJobStatus", {
  getState: (env, idKey) => entityResolver.getState("job_status", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("job_status", env, id, idKey),
  seedMapper: (pl) => ({
    name: `${pl?.status_code}: ${pl?.status_description}`,
    job_status_code: pl?.status_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeJobStatusDropdown",
      nameResolverFn: "findJobStatusIdByName",
      idFields: ["job_status_id", "id", "value"],
      codeFields: ["job_status_code"],
    }),
});
EmployeeApis.registerEntity("createEmployeeJobLevel", {
  getState: (env, idKey) => entityResolver.getState("job_level", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("job_level", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.level_name || pl?.name,
    job_level_code: pl?.level_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeJobLevelDropdown",
      nameResolverFn: "findJobLevelIdByName",
      idFields: ["job_level_id", "id", "value"],
      codeFields: ["job_level_code"],
    }),
});
EmployeeApis.registerEntity("createEmployeeJobBase", {
  getState: (env, idKey) => entityResolver.getState("job_base", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("job_base", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.base_name || pl?.name,
    job_base_code: pl?.base_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeJobBaseDropdown",
      nameResolverFn: "findJobBaseIdByName",
      idFields: ["job_base_id", "id", "value"],
      codeFields: ["job_base_code"],
    }),
});
EmployeeApis.registerEntity("createEmployeeJobGroup", {
  getState: (env, idKey) => entityResolver.getState("job_group", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("job_group", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.group_name || pl?.name,
    job_group_code: pl?.group_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeJobGroup",
      nameResolverFn: "findJobGroupIdByName",
      idFields: ["job_group_id", "id", "value"],
      codeFields: ["job_group_code"],
    }),
});
EmployeeApis.registerEntity("createEmployeeStatusEffective", {
  getState: (env, idKey) =>
    entityResolver.getState("status_effective_id", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("status_effective_id", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.status_effective_name || pl?.name,
    status_effective_code: pl?.status_effective_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeStatusEffectiveData",
      nameResolverFn: "findEmployeeStatusEffectiveIdByName",
      idFields: ["status_effective_id", "id", "value"],
      codeFields: ["status_effective_code"],
    }),
});
EmployeeApis.registerEntity("createApprovalWorkflows", {
  getState: (env, idKey) =>
    entityResolver.getState("approval_workflow", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("approval_workflow", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.approval_workflow_name || pl?.name,
    approval_workflow_code: pl?.approval_workflow_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getApprovalWorkflowsDropdown",
      nameResolverFn: "findApprovalWorkflowIdByName",
      idFields: ["approval_workflow_id", "id", "value"],
      codeFields: ["approval_workflow_code"],
    }),
});

EmployeeApis.registerEntity("createEmployeeAwardType", {
  getState: (env, idKey) =>
    entityResolver.getState("award_type_id", env, idKey),
  setId: (env, id, idKey) =>
    entityResolver.setState("award_type_id", env, id, idKey),
  seedMapper: (pl) => ({
    name: pl?.award_type_name || pl?.name,
    award_type_code: pl?.award_type_code,
  }),
  resolveId: (token, seeds, api) =>
    entityResolver.resolveEntityId(token, seeds, api, {
      listFn: "getEmployeeAwardTypesDropdown",
      nameResolverFn: "findEmployeeAwardTypeIdByName",
      idFields: ["award_type_id", "id", "value"],
      codeFields: ["award_type_code"],
    }),
});
