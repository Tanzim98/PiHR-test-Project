import { getApiMapByEnv } from "../../api/branchApiMap.js";
import entityResolver from "../../utils/entityResolver.js";
import BasePage from "../BasePage.js";

export class BranchApis extends BasePage {
  constructor(request, env) {
    constructor(request, env)
    super(request, env);    
    this.apiMap = getApiMapByEnv(env);
  }

  // get branch info
  async getBranchInfo(token){
    return this.request.get(this.apiMap.getAllBranch.url,{
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
  }
  
  // find Branch ID
  async findBranchIdByName(token, name) {
    return this.findIdFromList(token, 'getBranchInfo', name, { storeKey: 'branch', idFields: ['branch_id', 'id', 'value'], nameFields: ['branch_name', 'text', 'name'] });
  }

  // create new branch
  async createBranch(token, payload){
    return this.request.post(this.apiMap.getAllBranch.url,{
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
  }
  // update branch
   async updateBranch(token,payload){
     return this.request.put(this.apiMap.getAllBranch.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
   }
   // delete Branch
    async deleteBranchByID(token, branch_id){
      const idToUse = branch_id;
      if (!idToUse) {
        throw new Error('delete Branch requires a branch_id (none provided)');
      }
      const url = this.apiMap.deleteBranch.url.replace("{branch_id}", idToUse);
      return this.request.delete(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    }
      // Get timezone and currency dropdown by branch ID
    async getTimezoneCurrencyDropdownByID(token, branch_id){
      const idToUse = branch_id;
      if (!idToUse) {
        throw new Error('Timezone and Currency dropdown requires a branch_id (none provided)');
      }
      const url = this.apiMap.getTimezoneCurrencyDropdown.url.replace("{branch_id}", idToUse);
      return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    }
     // Get specific Branch Info by branch ID
    async getBranchInfoByID(token, branch_id){
      const idToUse = branch_id;
      if (!idToUse) {
        throw new Error('Branch Info requires a branch_id (none provided)');
      }
      const url = this.apiMap.getSpecificBranchInfo.url.replace("{branch_id}", idToUse);
      return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    }
    // get branch Dropdown Data
  async getBranchDropdown(token){
    return this.request.get(this.apiMap.getBranchDropdown.url,{
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
  }

  //Comparison behavior to the generic runner on BasePage so all pages share logic.
    static async compareProdVsDev(request, functionName, method, prodToken, devToken, payload = null) {
      return BasePage.compareProdVsDev(request, BranchApis, functionName, method, prodToken, devToken, payload);
    }
  }

// Simple entity registry used by compareProdVsDev handlers to cache ids
  BranchApis.entityRegistry = {};
  BranchApis.registerEntity = function(name, def) {
  BranchApis.entityRegistry[name] = def;
};

// Register the two entities using the generic entityResolver

BranchApis.registerEntity("createBranch", {
  getState: (env, idKey) => entityResolver.getState('branch', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('branch', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.branch_name || pl?.name, branch_code: pl?.branch_code }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getBranchInfo', nameResolverFn: 'findBranchIdByName', idFields: ['branch_id','id','value'], codeFields: ['branch_code'] }),
});

