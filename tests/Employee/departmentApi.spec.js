import { test, expect } from '@playwright/test';
import { DepartmentApis } from '../../pages/Employee/departmentApi.js';
import APIRequestDataHandler from "../../utils/request_data_handler.js";
import dotenv from 'dotenv';
dotenv.config();

const DEV_TOKEN = process.env.PIHR_DEV_API_TOKEN;
const UNIQUE_CODE = `QA_${Date.now()}`; // Unique code for each test run

// Use test.describe.serial to run tests in order and share state
test.describe.serial('Department API CRUD Operations', () => {
    let departmentApis;
    let headers;
    let departmentData;
    let createdDepartmentId;

    // beforeEach runs before each test - initialize shared resources
    test.beforeEach(async ({ request }) => {
        // Initialize API handler
        departmentApis = new DepartmentApis(request, 'PIHR_DEV');

        // Initialize data handler
        departmentData = await APIRequestDataHandler.create('employeeDepartmentData');

        // Setup headers with auth token
        headers = departmentData.getModifiedHeaders({
            'Authorization': `Bearer ${DEV_TOKEN}`,
        });
    });

    test('Should get all departments', async () => {
        const response = await departmentApis.getAllDepartment(headers);
        const data = await response.json();

        // Assertions
        expect(response.status()).toBe(200);
        expect(data).toHaveProperty('data');
        expect(Array.isArray(data.data)).toBeTruthy();
    });

    test('Should create a new department', async () => {
        const payload = departmentData.getModifiedPayload('payload', {
            'department_code': UNIQUE_CODE,
            'name': `Test Department ${UNIQUE_CODE}`
        });

        const response = await departmentApis.createDepartment(headers, payload);
        const data = await response.json();

        // Assertions
        expect(response.status()).toBe(201);

        // Verify creation and get ID
        const createdId = await departmentApis.getDepartmentIdByCode(headers, UNIQUE_CODE);
        expect(createdId).toBeDefined();
        createdDepartmentId = createdId;
    });

    test('Should update the created department', async () => {
        // Get the department ID by code
        const departmentId = await departmentApis.getDepartmentIdByCode(headers, UNIQUE_CODE);

        expect(departmentId).toBeDefined();

        const payload = departmentData.getModifiedPayload('putPayload', {
            'department_code': `Upd_${UNIQUE_CODE}`, // Shortened prefix to stay within 20 chars
            'name': `Updated Dept ${UNIQUE_CODE}`
        });

        const response = await departmentApis.updateDepartment(headers, departmentId, payload);

        // Assertions
        expect(response.status()).toBe(200);
    });

    test('Should delete the created department', async () => {
        // Get the updated department ID
        // Note: The code changed in the previous test
        const departmentId = await departmentApis.getDepartmentIdByCode(headers, `Upd_${UNIQUE_CODE}`);

        expect(departmentId).toBeDefined();

        const response = await departmentApis.deleteDepartment(headers, departmentId);

        // Assertions
        expect(response.status()).toBe(200);
    });
});
