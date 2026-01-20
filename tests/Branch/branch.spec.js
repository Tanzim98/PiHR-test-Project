import { test } from '@playwright/test';
import { BranchApis } from '../../pages/Branch/branchApi.js';
import { branchCreatePayload, updateBranchPayload} from '../../config/branchPayloadData.js';
import dotenv from 'dotenv';
dotenv.config();
const PROD_TOKEN = process.env.PIHR_PROD_API_TOKEN;
const DEV_TOKEN = process.env.PIHR_DEV_API_TOKEN;

test.describe('Company Branch apis', () => {

  test('Get all Branch response and compare PROD & DEV @GET_API_Test Branch-1001', async ({ request }) => {
    await BranchApis.compareProdVsDev(request, "getBranchInfo", 'GET', PROD_TOKEN, DEV_TOKEN);
  });

  test('Create new Branch @POST_API_Test Branch-1002', async ({ request }) => {
    await BranchApis.compareProdVsDev(request, "createBranch", 'POST', PROD_TOKEN, DEV_TOKEN,branchCreatePayload);
  }); 

  test('Update Branch @PUT_API_Test Branch-1003', async ({ request }) => {
    await BranchApis.compareProdVsDev(request, "updateBranch", 'PUT', PROD_TOKEN, DEV_TOKEN,  updateBranchPayload);
  });
  test('Delete Branch @DELETE_API_Test Branch-1004', async ({ request }) => {
     await BranchApis.compareProdVsDev(request, "deleteBranchByID", 'DELETE', PROD_TOKEN, DEV_TOKEN);
    });
  test('Get Timezone and Currency Dropdown @GET_API_Test Branch-1005', async ({ request }) => {
     await BranchApis.compareProdVsDev(request, "getTimezoneCurrencyDropdownByID", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
   test('Get Branch Info @GET_API_Test Branch-1006', async ({ request }) => {
     await BranchApis.compareProdVsDev(request, "getBranchInfoByID", 'GET', PROD_TOKEN, DEV_TOKEN);
    });
   test('Get Branch Dropdown @GET_API_Test Branch-1007', async ({ request }) => {
     await BranchApis.compareProdVsDev(request, "getBranchDropdown", 'GET', PROD_TOKEN, DEV_TOKEN);
    });

 
});
