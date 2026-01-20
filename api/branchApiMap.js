import dotenv from 'dotenv';
import { employeeProfileGetPayload } from '../config/employeePayloadData';
dotenv.config();

const baseUrlMap = {
  PIHR_PROD: 'https://api.pihr.xyz',
  PIHR_DEV: 'https://api.pisales.xyz',
};

const ssoUrlMap = {
  PIHR_PROD: 'https://sso.pihr.xyz',
  PIHR_DEV: 'https://accounts.pisales.xyz',
};
const branchApiPaths = {
 //Branch API
    getAllBranch: "/api/v2/branches", //Create, Update & Get All Branch
    getTimezoneCurrencyDropdown: "/api/v2/branches/dropdowns/{branch_id}",
    getSpecificBranchInfo: "/api/v2/branches/{branch_id}",
    deleteBranch: "/api/v2/branches/{branch_id}",
    getBranchDropdown: "/api/v2/branches/dropdown",


};

export const getApiMapByEnv = (env) => {
  const BASE_URL = baseUrlMap[env];
  const SSO_URL = ssoUrlMap[env];

  if (!BASE_URL || !SSO_URL) {
    throw new Error(`BASE_URL or SSO_URL not defined for ENV=${env}`);
  }

  const apiMap = {};

  Object.entries(branchApiPaths).forEach(([key, path]) => {
    // For now, all paths are prefixed with BASE_URL
    const url = `${BASE_URL}${path}`;
    apiMap[key] = { url };
  });

  return apiMap;
};
