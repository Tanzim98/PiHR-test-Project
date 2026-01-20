import { getApiMapByEnv } from "../../api/employeeApiMap.js";
import { RequestHandler } from "../../utils/request_handler.js";

export class DepartmentApis {
    constructor(request, env) {
        this.apiMap = getApiMapByEnv(env);
        this.env = env;
        this.handler = new RequestHandler(request);
    }

    // GET All department data
    async getAllDepartment(headers) {
        return this.handler.get(this.apiMap.employeeDepartment.url, {
            headers: headers
        });
    }

    // Create new department
    async createDepartment(headers, payload) {
        return this.handler.post(this.apiMap.employeeDepartment.url, {
            data: payload,
            headers: headers
        });
    }

    // Update department
    async updateDepartment(headers, id, payload) {
        // Add department_id to payload
        const updatePayload = { ...payload, department_id: id };

        return this.handler.put(this.apiMap.employeeDepartment.url, {
            data: updatePayload,
            headers: headers
        });
    }

    // Delete department
    async deleteDepartment(headers, id) {
        return this.handler.delete(this.apiMap.employeeDepartment.url + '/' + id, {
            headers: headers
        });
    }

    // Get department ID by matching department_code from the API response
    async getDepartmentIdByCode(headers, departmentCode) {
        const response = await this.getAllDepartment(headers);
        const data = await response.json();

        // Search through the data array to find matching department_code
        const department = data.data.find(dept => dept.department_code === departmentCode);

        if (!department) {
            throw new Error(`Department with code "${departmentCode}" not found`);
        }

        return department.department_id;
    }
}


