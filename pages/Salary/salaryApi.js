import { getSalaryApiMapByEnv } from "../../api/salaryApiMap.js";
import { salaryIdPayload, createAdvanceSalaryPayload, downloadAndGenerateBonusPayload, getClaimByIdPayload, claimCategoryIdPayload } from "../../config/salaryPayloadData.js";
import BasePage from "../BasePage.js";
import  entityResolver  from "../../utils/entityResolver.js";

export class SalaryApis extends BasePage {
  constructor(request, env) {
    super(request, env);
    this.apiMap = getSalaryApiMapByEnv(env);
  }

  // Get salary dropdown data
  async getSalaryDropdown(token) {
    return this.request.get(this.apiMap.adjustmentPurposeDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // Get salary list data
  async getSalaryList(token) {
    return this.request.get(this.apiMap.adjustmentPurposeList.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // Find Salary by name
  async findSalaryByName(token, name) {
    return this.findIdFromList(token, 'getSalaryList', name, { storeKey: 'adjustment_purpose', idFields: ['adjustment_purpose_id', 'id', 'value'], nameFields: ['adjustment_purpose_name', 'text', 'name'] });
  }

  // Create new salary (Adjustment Purpose)
  async createSalary(token, payload) {
    return this.request.post(this.apiMap.adjustmentPurposeList.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }

    // Update salary (Adjustment Purpose)
  async updateSalary(token, payload) {
    console.log("Adjustment Purpose ID (raw):", payload.adjustment_purpose_id);
    return this.request.put(this.apiMap.adjustmentPurposeList.url, {
      data: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

 // Get salary by  Adjustment Purpose ID
   async getSalaryById(token, payload){
    const adjustment_purpose_id = typeof payload === 'object' ? payload.adjustment_purpose_id : payload;
    const url = this.apiMap.getAdjustmentPurposeById.url.replace("{adjustment_purpose_id}", adjustment_purpose_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

// Delete salary (Adjustment Purpose)
async deleteSalary(token, payload = salaryIdPayload) {
  const url = this.apiMap.deleteAdjustmentPurpose.url.replace("{adjustment_purpose_id}",payload.adjustment_purpose_id);

  return this.request.delete(url, {
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
  });
}

 // Get All Advance Salaries 
  async getAllAdvanceSalaries(token) {
    return this.request.get(this.apiMap.getAdvanceSalaries.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // Find advance_salary_id by employee_code from the list
  async findAdvanceSalaryIdByEmployeeId(token, employee_id, options = {}) {
    return this.findIdFromList(token, 'getAllAdvanceSalaries', employee_id, { idCandidates: options.idCandidates || ['advance_salary_id ','id','value'], storeKey: `advance_salary${employee_id}` });
  }
   
  // Create new Advance Salary
  async createNewAdvanceSalary(token, payload) {
    return this.request.post(this.apiMap.createAdvanceSalary.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Get Employee Advance Salary
  async getEmployeeAdvanceSalary(token) {
    return this.request.get(this.apiMap.getEmployeeAdvanceSalaries.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //Get  Advance Salary By ID (replace {advance_salary_id} in path)
   async getAdvanceSalaryByID(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.getAdvanceSalaryById.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.get(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  } 
  //Get  Advance Salary Summary By ID (replace {advance_salary_id} in path)
  async getAdvanceSalarySummaryByID(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.getAdvanceSalarySummary.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.get(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  } 
  //Approve Advance salary
  async approveAdvanceSalaryy(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.approveAdvanceSalary.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.put(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  //Reject Advance salary
  async RejectAdvanceSalaryy(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.rejectAdvanceSalary.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.put(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  
  // Get schedule Overlap checked Data
     async getSalaryOverlapData(token, payload) {
    return this.request.get(this.apiMap.checkOverlappedSchedule.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Get all attachment of advance salary by ID.
  async getAllAttachmentOfAdvanceSalaryByID(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.getAllAttachments.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.get(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  } 
  // Download all attachment of advance salary by ID.
  async downloadAllAttachmentOfAdvanceSalaryByID(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.downloadAttachments.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.get(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  } 

  // Get  attachment URL of advance salary by ID.
  async getAttachmenURLByID(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.getAttachmentUrl.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.get(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  } 
    //Return Payment Methods 
   async getAllPaymentMethods(token) {return this.request.get(this.apiMap.getPaymentMethodDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Delete Advance Salary 
  async deleteAdvanceSalary(token, payload) {
    const advance_salary_id = typeof payload === "object" ? payload.advance_salary_id : payload;
    const url = this.apiMap.deleteAdvanceSalary.url.replace("{advance_salary_id}",advance_salary_id);
    return this.request.delete(url, {
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
 //******************************************************   Salary : Advance Salary Policy   ************************************************ */

    // Get Advance Salary Policy of the company
   async getAdvanceSalaryPolicy(token) {return this.request.get(this.apiMap.getAdvanceSalaryPolicies.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // Create Advance Salary Policy of the company
   async createAdvanceSalaryPolicy(token, payload) {return this.request.post(this.apiMap.createPolicy.url, {
      data: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

//******************************   Salary : AttendanceBasedAllowancePolicyApi   ************************ */

// Get Attendance Based Allowance Policy List
  async getAttendanceAllowancePolicyList(token) {
    return this.request.get(this.apiMap.attendanceAllowancePolicyList.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // find allowance policy id by name/text from the allowance policy listing
  async findAllowancePolicyByName(token, name) {
    return this.findIdFromList(token, 'getAttendanceAllowancePolicyList', name, { storeKey: 'allowance_policy', idFields: ['attendance_allowance_policy_id', 'id', 'value'], nameFields: ['policy_name', 'text', 'name'] });
  }
  
  // Create New Attendance Based Allowance Policy
  async createAttendanceAllowancePolicy(token, payload) {
    return this.request.post(this.apiMap.createAttendanceAllowancePolicy.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Update Attendance Based Allowance Policy
   async updateAttendanceAllowancePolicy(token,payload){
     return this.request.put(this.apiMap.updateAttendanceAllowancePolicy.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
   }
   //Delete Attendance Based Allowance Policy
    async deleteAttendanceAllowancePolicyByID(token, attendance_allowance_policy_id){
      return this.deleteByPath(this.apiMap.deleteAttendanceAllowancePolicy.url, token, attendance_allowance_policy_id, ['attendance_allowance_policy_id']);
    }
    
    // Get policy Details By ID
    async getPolicyDetailsByID(token, attendance_allowance_policy_id){
      const idToUse = attendance_allowance_policy_id;
      if (!idToUse) {
        throw new Error('Attendance Allowance Policy Details requires a attendance_allowance_policy_id (none provided)');
      }
      const url = this.apiMap.getAttendanceAllowancePolicyById.url.replace("{attendance_allowance_policy_id}", idToUse);
      return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    }
    // Get attendance based allowance policy dropdown
    async getAttendanceAllowancePolicyDropdown(token) {
    return this.request.get(this.apiMap.attendanceAllowancePolicyDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get allowance type dropdown
  async getAllowanceTypeDropdown(token) {
    return this.request.get(this.apiMap.attendanceAllowanceTypeDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get calculate on dropdown
  async getCalculateOnDropdown(token) {
    return this.request.get(this.apiMap.attendanceAllowanceCalculateOnDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //*****************************  Salary : AttendanceBasedAllowancePolicyMappingApi  ******************* */
 
  // Get all attendance allowance policy mappings
  async getAllAttendanceAllowancePolicyMappings(token) {
    return this.request.get(this.apiMap.attendanceAllowancePolicyMappingList.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // Find first attendance allowance policy mapping id for an employee (no name matching)
  async findAttendanceAllowancePolicyMappingIdByEmployeeId(token, employee_id, options = {}) {
    return this.findIdFromList(token, 'getAllAttendanceAllowancePolicyMappings', employee_id, { idCandidates: options.idCandidates || ['attendance_allowance_policy_mapping_id','id','value'], storeKey: `attendance_allowance_policy_mapping${employee_id}` });
  }
 
  // Create Attendance Based Allowance Policy Mapping
  async createAttendanceAllowancePolicyMapping(token, payload) {
    return this.request.post(this.apiMap.createAttendanceAllowancePolicyMapping.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Update Attendance Based Allowance Policy Mapping
   async updateAttendanceAllowancePolicyMapping(token,payload){
     return this.request.put(this.apiMap.updateAttendanceAllowancePolicyMapping.url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
   }
   // Delete Attendance Allowance Policy Mapping
async deleteAttendanceAllowancePolicyMapping(token, payload) {
  const policy_mapping_id =typeof payload === "object"? payload.policy_mapping_id: payload;
  const url =this.apiMap.deleteAttendanceAllowancePolicyMapping.url.replace("{policy_mapping_id}",policy_mapping_id);
  return this.request.delete(url, {
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
  });
}

  // Get Attendance Allowance Policy Mapping by ID
 async getAttendanceAllowancePolicyMappingById(token, payload){
    const attendance_allowance_policy_mapping_id = typeof payload === 'object' ? payload.attendance_allowance_policy_mapping_id : payload;
    const url = this.apiMap.getAttendanceAllowancePolicyMappingById.url.replace("{attendance_allowance_policy_mapping_id}", attendance_allowance_policy_mapping_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
//*******************************  Salary : BankApi  ******************************* */
  // Get Bank DropDown
   async getBankDropdown(token) {
    return this.request.get(this.apiMap.bankDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bank List
  async getAllBankList(token) {
    return this.request.get(this.apiMap.bankList.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  //Find Bank by name
  async findBankIDByName(token, name) {
    return this.findIdFromList(token, 'getAllBankList', name, { storeKey: 'bankApi', idFields: ['bank_id', 'id', 'value'], nameFields: ['bank_name', 'text', 'name'] });
  }

  // Create New Bank
  async createNewBank(token, payload) {
    return this.request.post(this.apiMap.createBank.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Update Bank
    async updateBank(token, payload) {
    return this.request.put(this.apiMap.updateBank.url, {
      data: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

// Delete Bank
    async deleteBank(token, bank_id){
      return this.deleteByPath(this.apiMap.deleteBank.url, token, bank_id, ['bank_id']);
    }
 // Get Bank Details By ID
    async getBankDetailsById(token, payload){
    const bank_id = typeof payload === 'object' ? payload.bank_id : payload;
    const url = this.apiMap.getBankById.url.replace("{bank_id}", bank_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }


  //********************************************** Salary : BonusGenerationApi **************************************************************************//
    // Get Bonus Generation Dropdown
    async getBonusGenerationDropdown(token) {
    return this.request.get(this.apiMap.bonusGenerationDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  // Download Bonus Template
   async downloadBonusTemplate(token) {
    return this.request.get(this.apiMap.downloadBonusTemplate.url, {
      params: downloadAndGenerateBonusPayload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Generate Bonus
  async generateBonus(token, payload) {
    return this.request.get(this.apiMap.generateBonus.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }

  //******************************************* Salary : BonusModificationApi******************************* */
    // Get Bonus Modification Dropdown
    async getBonusModificationDropdown(token) {
    return this.request.get(this.apiMap.bonusModificationDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bonus by Employee and Bonus ID
async getBonusByEmployeeAndBonusId(token, payload) {
  const url = this.apiMap.getBonusByEmployeeAndBonusId.url.replace("{employee_id}", payload.employee_id).replace("{bonus_id}", payload.bonus_id);
  return this.request.get(url, {headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},});
}

  //******************************************* Salary : Bonus Policy Api******************************* */
    // Get All Bonus Policies
async getBonusPolicy(token) {
    return this.request.get(this.apiMap.getAllBonusPolicies.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Create Bonus Policy
  async createBonusPolicy(token, payload) {
    return this.request.post(this.apiMap.createBonusPolicy.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }

  //******************************************* Salary : BonusSetupApi   ******************************* */
    // Get All Bonus Setups
  async getAllBonusSetups(token) {
    return this.request.get(this.apiMap.getAllBonusSetups.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bonus Setup by ID
  async findBonusSetupByID(token, bonus_type_id, options = {}) {
    return this.findIdFromList(token, 'getAllBonusSetups', bonus_type_id, { idCandidates: options.idCandidates || ['bonus_setup_id','id','value'], storeKey: `bonus_setup${bonus_type_id}` });
  }
  // Create Bonus Setup
  async createBonusSetup(token, payload) {
    return this.request.post(this.apiMap.createBonusSetup.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  // Update Bonus Setup
    async updateBonusSetup(token, payload) {
    return this.request.put(this.apiMap.updateBonusSetup.url, {
      data:payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }
  //Get Bonus Setup by ID
  async getBonusSetupById(token, bonus_setup_id) {
       const url = this.apiMap.getBonusSetupById.url.replace("{bonus_setup_id}", bonus_setup_id);
       return this.request.get(url, {headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
       });
     }

  //  async getBonusSetupById(token, payload){
  //   const bonus_setup_id = typeof payload === 'object' ? payload.bonus_setup_id : payload;    
  //   const url = this.apiMap.getBonusSetupById.url.replace("{bonus_setup_id}", bonus_setup_id);
  //   return this.request.get(url, {headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},});
  // }
  // Get Bonus Setup Dropdown
   async getBonusSetupDropdown(token) {
    return this.request.get(this.apiMap.getBonusSetupDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  } 

  //******************************************* Salary : BonusTransferApi  ******************************* */
   // Get Bonus Transfer List
   async getBonusTransfer(token) {
    return this.request.get(this.apiMap.getAllBonusTransfers.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  } 
  // Update Bonus Transfer
    async updateBonusTransfer(token, payload) {
    return this.request.patch(this.apiMap.updateBonusTransfer.url, {
      data: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
    });
  }

  //******************************************* Salary: Bonus Type API  ******************************* */
    // Get All Bonus Types
  async getAllBonusTypes(token) {
    return this.request.get(this.apiMap.getAllBonusTypes.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //Get Bonus Type Dropdown
   async getBonusTypeDropdown(token) {
    return this.request.get(this.apiMap.getBonusTypeDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }

  //******************************************* Salary : Cash Modification Api  ******************************* */

  // Get All Cash Salaries
  async getAllCashSalaries(token) {
    return this.request.get(this.apiMap.getAllCashSalaries.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get All Cash Bonuses
  async getAllCashBonuses(token) {
    return this.request.get(this.apiMap.getAllCashBonuses.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
   //******************************************* Salary : Claim Api  ******************************* */
   //Get Filter Claims
  async filterClaims(token) {
    return this.request.get(this.apiMap.filterClaims.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
   //Get All Claims of a company
  async getAllCompanyClaims(token) {
    return this.request.get(this.apiMap.getAllCompanyClaims.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }  
   // Get Self Claims for Employee
  async getSelfClaims(token) {
    return this.request.get(this.apiMap.getSelfClaims.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Subordinate Claims
  async getSubordinateClaims(token) {
    return this.request.get(this.apiMap.getSubordinateClaims.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get a single Claims
  async getClaimById(token, claim_id ) {
       const url = this.apiMap.getClaimById.url.replace("{claim_id}", claim_id );
       return this.request.get(url, {headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
       });
     }
  // Get details of a single claim
    async getClaimDetailsById(token, payload){
    const claim_id = typeof payload === 'object' ? payload.claim_id: payload;
    const url = this.apiMap.getClaimDetailsWithHistory.url.replace("{claim_id}", claim_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Download Claim Attachment
  async downloadClaimAttachment(token){
     const endpoint = this.apiMap.downloadClaimAttachment;
    if (!endpoint?.url) {
        throw new Error(`Claim Image Preview endpoint not configured for env=${this.env}`);
    }
    const { claim_id, attachment_id} = getClaimByIdPayload;
    if (!claim_id || !attachment_id) {
        throw new Error("Claim Image Preview requires both claim_id and attachment_id");
    }
    const params = new URLSearchParams({ claim_id, attachment_id });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 

  // Get Claim Image Preview
   async getClaimImagePreview(token){
     const endpoint = this.apiMap.getClaimImagePreview;
    if (!endpoint?.url) {
        throw new Error(`Claim Image Preview endpoint not configured for env=${this.env}`);
    }
    const { claim_id, attachment_id} = getClaimByIdPayload;
    if (!claim_id || !attachment_id) {
        throw new Error("Claim Image Preview requires both claim_id and attachment_id");
    }
    const params = new URLSearchParams({ claim_id, attachment_id });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    } 

  //*******************************************              Salary : Claim Category Api           ******************************* */ 

  //Get All claim Category
   async getAllClaimCategories(token) {
    return this.request.get(this.apiMap.getAllClaimCategories.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get claim category by ID
   async getClaimCategoryById(token,claim_category_id) {
       const url = this.apiMap.getClaimCategoryById.url.replace("{claim_category_id}",claim_category_id);
       return this.request.get(url, {headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
       });
     }
  // Returns eligible claim categories for an employee in dropdown format
    async getClaimCategoryDropdownByEmployee(token, payload){
    return this.request.get(this.apiMap.getClaimCategoryDropdownByEmployee.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
//*******************************************              Salary : Report API          ******************************* */ 
// Get Salary Pay Slip
 async getSalaryPaySlipReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryPaySlipReport.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
// Get Salary Certificate Report
   async getSalaryCertificateReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryCertificateReport.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //Salary Certificate Template for dropdown
   async getSalaryCertificateTemplateDropdown(token) {
    return this.request.get(this.apiMap.getSalaryTemplatesDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Analysis Report
  async getSalaryAnalysisReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryAnalysis.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Analysis Top Sheet Report
  async getSalaryAnalysisTopSheetReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryAnalysisTopSheet.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get salary Report Types for Dropdown report
  async getSalaryReportType(token) {
    return this.request.get(this.apiMap.getSalaryReportTypesDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //Get Salary Payment Dates Dropdown
  async getSalaryPaymentDates(token, payload) {
    return this.request.get(this.apiMap.getSalaryPaymentDatesDropdown.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bank List in Dropdown
   async getBankListInDropdown(token) {
    return this.request.get(this.apiMap.getBankDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Transfer Report
  async getSalaryTransferReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryTransferReport.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bank Forwarding Letter Report
  async getBankForwardingLetter(token, payload) {
    return this.request.get(this.apiMap.getBankForwardingLetter.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bonus Statement Report
  async getBonusStatementReport(token, payload) {
    return this.request.get(this.apiMap.getBonusStatement.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bonus Dropdown
  async getBonusDropdownList(token) {
    return this.request.get(this.apiMap.getBonusDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Bonus Analysis Report
  async getBonusAnalysisReport(token, payload) {
    return this.request.get(this.apiMap.getBonusAnalysis.url, { 
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //Get Current Salary Structure Report
  async getCurrentSalaryStructureReport(token, payload) {
    return this.request.get(this.apiMap.getCurrentSalaryStructure.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Structure History Report
  async getSalaryStructureHistoryReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryStructureHistory.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  //Get Advance Type Dropdown
   async getAdvanceTypeDropdown(token) {
    return this.request.get(this.apiMap.getAdvanceTypeDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Collection status Dropdown
    async getCollectionStatusDropdown(token) {
    return this.request.get(this.apiMap.getCollectionStatusDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Monthly Advance Salary Report
  async getMonthlyAdvanceSalaryReport(token, payload) {
    return this.request.get(this.apiMap.getMonthlyAdvanceSalary.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Increment Report
  async getSalaryIncrementReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryIncrementReport.url, {
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get payment Type Dropdown
    async getPaymentTypeDropdown(token) {
    return this.request.get(this.apiMap.getPaymentTypeDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Consolidated Report
  async getSalaryConsolidatedReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryConsolidateReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Compare Report
  async getSalaryCompareReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryCompareReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // get Salary Adjustment Report
  async getSalaryAdjustmentReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryAdjustmentReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
// Get Advance Salary Statment 
  async getAdvanceSalaryStatement(token, payload) {
    return this.request.get(this.apiMap.getAdvanceSalaryStatement.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Claim Status Dropdown Report
  async getClaimStatusDropdownReport(token) {
    return this.request.get(this.apiMap.getClaimStatusDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Data Filteration Type Dropdown
  async getDataFilterationTypeDropdown(token) {
    return this.request.get(this.apiMap.getDataFilterationTypeDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Claim Category Dropdown Report
  async getClaimCategoryDropdown(token) {
    return this.request.get(this.apiMap.getClaimCategoryDropdown.url, {
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Claim Report
    async getClaimReport(token, payload) {
    return this.request.get(this.apiMap.getClaimReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Claim Details Double Report
    async getClaimDetailsDoubleReport(token, payload) {
    return this.request.get(this.apiMap.getClaimDetailsDoubleReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
//  Get Claim Details Report
async getClaimDetailsReport(token, payload) {
    return this.request.get(this.apiMap.getClaimDetailsReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Category Wise Claim Summary
  async getCategoryWiseClaimSummary(token, payload) {
    return this.request.get(this.apiMap.getCategoryWiseClaimSummary.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Adjustment purposes dropdown
  async getAdjustmentPurposeDropdownReport(token, payload) {
    return this.request.get(this.apiMap.getAdjustmentPurposesDropdown.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  } 
  // Get Gratuity Report
  async getGratuityReport(token, payload) {
    return this.request.get(this.apiMap.getGratuityReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Salary Deduction Report
  async getSalaryDeductionReport(token, payload) {
    return this.request.get(this.apiMap.getSalaryDeductionReport.url, {  
      params: payload,
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Deduction Analysis Type
  async getDeductionAnalysisTypeReport(token) {
    return this.request.get(this.apiMap.getDeductionAnalysisType.url, {  
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get All Group By Dropdown
  async getGroupByDropdownReport(token) {
    return this.request.get(this.apiMap.getGroupByDropdown.url, {  
      headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
    });
  }
  // Get Employee Wise Cash distributed salary report
  async getCashDistributedSalaryReport(token, payload) {
   return this.request.get(this.apiMap.getEmployeeWiseCashSalaryDistributedReport.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Employee Wise Bonus distributed salary report
  async getCashDistributedBonusReport(token, payload) {
   return this.request.get(this.apiMap.getEmployeeWiseCashBonusesDistributedReport.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
 //****************************************************      Salary : Claim SettingApi                ********************************************************************//
// Get Claim Settings
  async getClaimSettings(token) {
   return this.request.get(this.apiMap.getClaimSettings.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Create Claim Settings
  async createClaimSettings(token, payload) {
   return this.request.post(this.apiMap.createClaimSettings.url, {  
     data: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
//****************************************************      Salary : Consolidate Salary Config Api                ********************************************************************//
// Get Consolidate Salary Configs
   async getConsolidateSalaryConfigs(token) {
   return this.request.get(this.apiMap.getConsolidateSalaryConfigs.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Create Consolidate Salary Configs
  async createConsolidateSalaryConfigs(token, payload) {
   return this.request.post(this.apiMap.createConsolidateSalaryConfig.url, {  
     data: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
//***********************************************       Salary : Delete Salary Api             *************************************************************************//
// Get Last Generated Salary Year Month
 async getLastGeneratedSalaryYearMonth(token) {
   return this.request.get(this.apiMap.getLastGeneratedSalaryYearMonth.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Generated Salaries
  async getGeneratedSalaries(token, payload) {
   return this.request.get(this.apiMap.getGeneratedSalaries.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
//***********************************************      Salary : Dynamic Salary Adjustment Policy Api             *************************************************************************//
// Get Dynamic Salary Adjustment Policies
async getDynamicSalaryAdjustmentPolicies(token) {
   return this.request.get(this.apiMap.getDynamicSalaryAdjustmentPolicies.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Amount Category Type Dropdown
  async getAmountCategoryTypeDropdown(token) {
   return this.request.get(this.apiMap.getAmountCategoryTypeDropdown.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //***********************************************      Salary : Dynamic Salary Adjustment Policy Mapping Api             *************************************************************************//
  // Get Dynamic Salary Adjustment Policy Mappings
async getDynamicSalaryAdjustmentPolicyMappings(token, payload) {
   return this.request.get(this.apiMap.getDynamicSalaryAdjustmentPolicyMappings.url, {  
    data: payload, 
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

    //***********************************************      Salary : Employee Claim Request Api         **************************************************************
    // Get Claim Request Bt Employee
  async getClaimRequestByEmployee(token) {
   return this.request.get(this.apiMap.getEmployeeClaimRequests.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Single Claim Request Details
  async getSingleClaimRequestDetails(token, payload){
    const claim_id = typeof payload === 'object' ? payload.claim_id : payload;
    const url = this.apiMap.getEmployeeClaimRequestById.url.replace("{claim_id}", claim_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  //***********************************************      Salary : Employee Salary Adjustment Api         **************************************************************
  // Get Employee Salary Adjustment
  async getEmployeeSalaryAdjustment(token, payload){
    const employee_id = typeof payload === 'object' ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeSalaryAdjustmentsByEmployeeId.url.replace("{employee_id}", employee_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get is Salary Adjustment Eligible Status
  async getIsSalaryAdjustmentEligibleStatus(token, payload) {
   return this.request.get(this.apiMap.checkEmployeeSalaryAdjustmentEligibility.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Download Salary Adjustment Template
  async downloadSalaryAdjustmentTemplate(token, payload) {
   return this.request.get(this.apiMap.downloadEmployeeSalaryAdjustmentTemplate.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

  //***********************************************      Salary : Employee Salary Stracture Api         **************************************************************
  // Get Employee Salary Stracture
  async getEmployeeSalaryStracture(token, payload) {
   return this.request.get(this.apiMap.getSalaryStructures.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Payment Frequency Slip
  async getPaymentFrequencySlip(token) {
   return this.request.get(this.apiMap.getPaymentFrequencySlip.url, {  
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Group Wise Salary Stracture
  async getGroupWiseSalaryStracture(token, payload) {
   return this.request.get(this.apiMap.getGroupWiseSalaryStructures.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Employee Salary Stracture
  async getEmployeeSalaryStracture(token, payload){
    const employee_id = typeof payload === 'object' ? payload.employee_id : payload;
    const url = this.apiMap.getEmployeeSalaryStructureByEmployeeId.url.replace("{employee_id}", employee_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get Consolidate Salary Configs
  async getConsolidateSalaryConfigs(token) {
   return this.request.get(this.apiMap.getConsolidatedSalaryConfigs.url, {  
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //  Get Bulk upload Template Type
  async getBuldUploadTemplateType(token) {
   return this.request.get(this.apiMap.getBulkUploadTemplateType.url, {  
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Salary Stracture Template
  async getSalaryStractureTemplate(token, payload) {
   return this.request.get(this.apiMap.downloadSalaryStructureTemplate.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //***********************************************      Salary : Employee Wise Cash Distribution Api        **************************************************************
  // Get Employee Wise Cash Distribution
  async getEmployeeWiseCashDistribution(token) {
   return this.request.get(this.apiMap.getEmployeeWiseCashDistributions.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Employee Wise Cash Distribution By ID
  async getEmployeeWiseCashDistributionByID(token, payload){
    const cash_distribution_id  = typeof payload === 'object' ? payload.cash_distribution_id  : payload;
    const url = this.apiMap.getEmployeeWiseCashDistributionById.url.replace("{cash_distribution_id}", cash_distribution_id );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  //***********************************************      Salary : Final Settlement Api        **************************************************************
  // Get Employee Withdrawal Info
  async getEmployeeWithdrawalInfo(token, payload) {
   return this.request.get(this.apiMap.getFinalSettlementWithdrawalInfo.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
   //  Calculate Employee Gratuity
   async calculateEmployeeGratuity(token, payload) {
   return this.request.get(this.apiMap.recalculateFinalSettlementGratuity.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Recalculated Leave Encashment
  async getRecalculateLeaveEncashment(token, payload) {
   return this.request.get(this.apiMap.recalculateFinalSettlementLeaveEncashment.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
   //***********************************************      Salary : Final Settlement Component Api        **************************************************************
  // Get All Final Settlement Components
   async getAllFinalSattlementComponent(token) {
   return this.request.get(this.apiMap.getFinalSettlementComponents.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //Get a final settlement component details by id
   async getFinalSattlementComponentByID(token, payload){
    const component_id  = typeof payload === 'object' ? payload.component_id  : payload;
    const url = this.apiMap.getFinalSettlementComponentById.url.replace("{component_id}", component_id );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  //***********************************************      Salary : GratuityC alculation Api        **************************************************************
  // Get Gratuity Policy
   async getGratuityPolicy(token) {
   return this.request.get(this.apiMap.checkGratuityPolicy.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
   // Get All Calculated Gratuity 
  async getAllCalculatedGratuity(token, payload) {
   return this.request.get(this.apiMap.getCalculatedGratuities.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //Get Calculated Gratuity  by id
   async getCalculatedGratuityByID(token, payload){
    const gratuity_id   = typeof payload === 'object' ? payload.gratuity_id   : payload;
    const url = this.apiMap.getGratuityCalculationById .url.replace("{gratuity_id}", gratuity_id  );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get Calculated Gratuity Payment Status Sli
  async getGratuityPaymentStatus(token, payload) {
   return this.request.get(this.apiMap.getGratuityPaymentStatus.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //***********************************************      Salary : Gratuity Policy Api        **************************************************************
  // Get All Gratuity Policies
   async getAllGratuityPolicies(token) {
   return this.request.get(this.apiMap.getGratuityPolicies.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Fraction Consideration
   async getFractionConsideration(token) {
   return this.request.get(this.apiMap.getFractionConsideration.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
//***********************************************      Salary : Heldup Employee Api        **************************************************************
// Get All Salary Heldup Types
   async getAllHeldupTypes(token) {
   return this.request.get(this.apiMap.getSalaryHeldupTypes.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
// Get All Heldup Employees
   async getAllHeldupEmployees(token, payload) {
   return this.request.get(this.apiMap.getHeldupEmployees.url, {  
    params: payload,
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
// Get  Heldup Employee By ID
async getHeldupEmployeeByID(token, payload){
    const heldup_id    = typeof payload === 'object' ? payload.heldup_id : payload;
    const url = this.apiMap.getHeldupEmployeeById .url.replace("{heldup_id}", heldup_id   );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
 //***********************************************  Salary : Increment Breakup Api     **************************************************************
 // Get Increment Breakup Items
 async getIncrementBreakupItems(token) {
   return this.request.get(this.apiMap.getIncrementBreakupDetails.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Return all increment breakup
  async getAllIncrementBreakUps(token) {
   return this.request.get(this.apiMap.getIncrementBreakups.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Return all increment breakup By ID
  async getIncrementBreakupItemByID(token, payload) {
   const increment_breakup_id = typeof payload === 'object' ? payload.increment_breakup_id : payload;
    const url = this.apiMap.getIncrementBreakupById .url.replace("{increment_breakup_id}", increment_breakup_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
 //***********************************************  Salary : My Payslip Api     **************************************************************
  // Get My Payslip
  async getMyPayslip(token, payload) {
   return this.request.get(this.apiMap.getMyPaySlips.url, {  
    params: payload,
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get My Payslip Report
  async getMyPayslipReport(token, payload) {
   return this.request.get(this.apiMap.getMyPaySlipReport.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //***********************************************  Salary : Payslip Email Report Api     **************************************************************
  // Get Payslip Emails
  async getPayslipEmails(token) {
   return this.request.get(this.apiMap.getPaySlipEmails.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Payslip Email Report
  async getPayslipEmailReport(token, payload) {
   return this.request.get(this.apiMap.getIncrementBreakups.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

  //***********************************************  Salary : Process Increment Api     **************************************************************
// Get Process Increments
  async generateProcessIncrements(token, payload) {
   return this.request.get(this.apiMap.generateProcessIncrements.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Load Processed Increments
  async loadProcessedIncrements(token, payload) {
   return this.request.get(this.apiMap.getProcessedIncrements.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

  // Generate Increment Reports
  async generateIncrementReports(token, payload) {
   return this.request.get(this.apiMap.getProcessIncrementReports.url, {  
     params: payload,
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

   //***********************************************  Salary : Process Increment Api     **************************************************************
   // Get All Salary Base Breakups
   async getAllSalaryBasedBreakups(token) {
   return this.request.get(this.apiMap.getSalaryBaseBreakups.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Salary base Breakup Details By ID
  async getBreakupDetailsByID(token, payload) {
   const base_breakup_id = typeof payload === 'object' ? payload. base_breakup_id : payload;
    const url = this.apiMap.getSalaryBaseBreakupById .url.replace("{base_breakup_id}", base_breakup_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get Salary Base Breakups Dropdown
   async getSalaryBasedBreakupsDropdown(token) {
   return this.request.get(this.apiMap.getSalaryBaseBreakupsDropdown.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

  //***********************************************      Salary : Breakup Api      **************************************************************
   // Get All Salary Breakups
   async getAllSalaryBreakups(token) {
   return this.request.get(this.apiMap.getSalaryBreakups.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Salary Breakup Details By ID
  async getBreakupDetailsByID(token, payload) {
   const breakup_id = typeof payload === 'object' ? payload. breakup_id : payload;
    const url = this.apiMap.getSalaryBreakupById .url.replace("{breakup_id}", breakup_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get Salary Breakups Dropdown
   async getSalaryBreakupDropdown(token) {
   return this.request.get(this.apiMap.getSalaryBreakupDropdown.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //***********************************************      Salary : Salary Breakup Group  Api      **************************************************************
   // Get All Salary Breakup Groups
   async getAllSalaryBreakupGroups(token) {
   return this.request.get(this.apiMap.getSalaryBreakupGroups.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Salary Breakup Group Details By ID
  async getBreakupGroupDetailsByID(token, payload) {
   const salary_breakup_group_id = typeof payload === 'object' ? payload. salary_breakup_group_id : payload;
    const url = this.apiMap.getSalaryBreakupGroupById .url.replace("{salary_breakup_group_id}", salary_breakup_group_id);
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  //***********************************************      Salary : Salary Eligible Employee Api       **************************************************************
   // Get all salary eligible employees.
   async getAllSalaryEligibleEmployees(token) {
   return this.request.get(this.apiMap.getSalaryEligibleEmployees.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get salary eligible employee By ID
  async getsalaryEligibleEmployeeByID(token, payload) {
   const id  = typeof payload === 'object' ? payload. id  : payload;
    const url = this.apiMap.getSalaryEligibleEmployeeById .url.replace("{id}", id );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get Only Salary Eligible Employee
   async getOnlySalaryEligibleEmployee(token) {
   return this.request.get(this.apiMap.getSalaryEligibleEmployeesDropdown.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

   //***********************************************      Salary : Salary Generation Api       **************************************************************
   // Get all recently generated salary.
   async getAllRecentlyGeneratedSalary(token) {
   return this.request.get(this.apiMap.getSalaryGenerations.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get salary generation configuration.
   async getSalaryGenerationConfiguration(token) {
   return this.request.get(this.apiMap.getSalaryGenerationConfiguration.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

    //***********************************************      Salary : Salary Generation Policy Api       **************************************************************
   // Get all Salary Generation Policy
   async getAllSalaryGenerationPolicy(token) {
   return this.request.get(this.apiMap.getSalaryGenerationPolicies.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  //***********************************************      Salary : Salary Group Api       **************************************************************
   // Get all salary Groups
   async getAllSalaryGroups(token) {
   return this.request.get(this.apiMap.getSalaryGroups.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get salary Details By ID
  async getsalaryDetailsByID(token, payload) {
   const salary_group_id  = typeof payload === 'object' ? payload. salary_group_id  : payload;
    const url = this.apiMap.getSalaryGroupById.url.replace("{salary_group_id}", salary_group_id );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  // Get Salary Group Dropdown
   async getSalaryGroupDropdown(token) {
   return this.request.get(this.apiMap.getSalaryGroupDropdown.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

  //***********************************************      Salary : Salary Modification Api       **************************************************************
  // Get salary Details By Employee ID
  async getsalaryDetailsByEmployeeID(token, payload) {
   const employee_id  = typeof payload === 'object' ? payload. employee_id  : payload;
    const url = this.apiMap.getSalaryModificationDetails.url.replace("{employee_id}", employee_id );
    return this.request.get(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  //***********************************************      Salary : Salary Transfer Api       **************************************************************
   // Get all salary Transfers
   async getAllSalaryTransfers(token, payload) {
   return this.request.get(this.apiMap.getSalaryTransfers.url, {  
    params: payload,
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }
  // Get Salary Transfer Dropdown
   async getSalaryTransferDropdown(token) {
   return this.request.get(this.apiMap.getSalaryTransferDropdown.url, {  
     headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

   //***********************************************      Salary : Salary Verification Api       **************************************************************
   // Get all salary Varifications
   async getAllSalaryVerifications(token, payload) {
   return this.request.get(this.apiMap.getSalaryVerifications.url, {  
    params: payload,
    headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
   });
  }

 //************************************************************************************************************************//
   //Comparison behavior to the generic runner on BasePage so all pages share logic.
   static async compareProdVsDev(request, functionName, method, prodToken, devToken, payload = null) {
     return BasePage.compareProdVsDev(request, SalaryApis, functionName, method, prodToken, devToken, payload);
   }
 }
 // Simple entity registry used by compareProdVsDev handlers to cache ids
   SalaryApis.entityRegistry = {};
   SalaryApis.registerEntity = function(name, def) {
   SalaryApis.entityRegistry[name] = def;
 };
 //*************************************************************************************************************************//

// Register the two entities using the generic entityResolver
SalaryApis.registerEntity("createSalary", {
  getState: (env, idKey) => entityResolver.getState('adjustment_purpose', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('adjustment_purpose', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.adjustment_purpose_name, code: pl?.adjustment_purpose_name }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getSalaryList', nameResolverFn: 'findSalaryByName', idFields: ['adjustment_purpose_id','id','value'], codeFields: ['adjustment_purpose_name'],nameFields: ['adjustment_purpose_name'] }),
});

SalaryApis.registerEntity("createNewAdvanceSalary", {
  getState: (env, idKey) => entityResolver.getState('advance_salary', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('advance_salary', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.employee_id || pl?.name, employee_id: pl?.advance_salary_id  }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAllAdvanceSalaries', nameResolverFn: 'findAdvanceSalaryIdByEmployeeId', idFields: ['advance_salary_id ','id','value'], extraParams: { employee_id: seeds.employee_id } }),
});

// SalaryApis.registerEntity("createAttendanceAllowancePolicy", {
//   getState: (env, idKey) => entityResolver.getState('allowance_policy', env, idKey),
//   setId: (env, id, idKey) => entityResolver.setState('allowance_policy', env, id, idKey),
//   seedMapper: (pl) => ({ name: pl?.policy_name, code: pl?.policy_name }),
//   resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAttendanceAllowancePolicyList', nameResolverFn: 'findAllowancePolicyByName', idFields: ['attendance_allowance_policy_id','id','value'], codeFields: ['policy_name'],nameFields: ['policy_name'] }),
// });
// SalaryApis.registerEntity("createAttendanceAllowancePolicy", {
//   getState: (env, idKey) => entityResolver.getState('allowance_policy', env, idKey),
//   setId: (env, id, idKey) => entityResolver.setState('allowance_policy', env, id, idKey),
//   seedMapper: (pl) => ({ name: pl?.policy_name, code: pl?.attendance_allowance_policy_id }),
//   resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAttendanceAllowancePolicyList', nameResolverFn: 'findAllowancePolicyByName', idFields: ['attendance_allowance_policy_id','id','value'], codeFields: ['attendance_allowance_policy_id'],nameFields: ['policy_name'] }),
// });
// SalaryApis.registerEntity("createAttendanceAllowancePolicy", {
// getState: (env, idKey) =>entityResolver.getState('allowance_policy', env, idKey),
// setId: (env, id, idKey) =>entityResolver.setState('allowance_policy', env, id, idKey),
// seedMapper: (pl) => ({name: pl?.policy_name}),
// resolveId: (token, seeds, api) =>entityResolver.resolveEntityId(token, seeds, api, {listFn: 'getAttendanceAllowancePolicyList',nameResolverFn: 'findAllowancePolicyByName',
// idFields: ['attendance_allowance_policy_id', 'id', 'value'],nameFields: ['policy_name']}),
// });
// SalaryApis.registerEntity("createAttendanceAllowancePolicy", {
//   getState: (env, idKey) =>entityResolver.getState('allowance_policy', env, idKey),
//   setId: (env, id, idKey) =>entityResolver.setState('allowance_policy', env, id, idKey),
//   seedMapper: (pl) => ({name: pl?.policy_name}),
//   resolveId: (token, seeds, api) =>entityResolver.resolveEntityId(token, seeds, api, {listFn: 'getAttendanceAllowancePolicyList',nameResolverFn: 'findAllowancePolicyByName',
//   idFields: ['attendance_allowance_policy_id', 'id', 'value']}),
// });
SalaryApis.registerEntity("createAttendanceAllowancePolicy", {
  getState: (env, idKey) => entityResolver.getState('allowance_policy', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('allowance_policy', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.policy_name || pl?.name, policy_name: pl?.attendance_allowance_policy_id }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAttendanceAllowancePolicyList', nameResolverFn: 'findAllowancePolicyByName', idFields: ['attendance_allowance_policy_id','id','value'], extraParams: { policy_name: seeds.policy_name } }),
});
SalaryApis.registerEntity("createAttendanceAllowancePolicyMapping", {
  getState: (env, idKey) => entityResolver.getState('attendance_allowance_policy_mapping', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('attendance_allowance_policy_mapping', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.employee_id || pl?.name, employee_id: pl?.attendance_allowance_policy_mapping_id }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAllAttendanceAllowancePolicyMappings', nameResolverFn: 'findAttendanceAllowancePolicyMappingIdByEmployeeId', idFields: ['attendance_allowance_policy_mapping_id','id','value'], extraParams: { employee_id: seeds.employee_id } }),
});
SalaryApis.registerEntity("createNewBank", {
  getState: (env, idKey) => entityResolver.getState('bankApi', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('bankApi', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.bank_name, code: pl?.bank_id }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAllBankList', nameResolverFn: 'findBankIDByName', idFields: ['bank_id','id','value'], codeFields: ['bank_id'],nameFields: ['bank_name'] }),
});
SalaryApis.registerEntity("createBonusSetup", {
  getState: (env, idKey) => entityResolver.getState('bonus_setup', env, idKey),
  setId: (env, id, idKey) => entityResolver.setState('bonus_setup', env, id, idKey),
  seedMapper: (pl) => ({ name: pl?.bonus_type_id || pl?.name, bonus_type_id: pl?.bonus_setup_id }),
  resolveId: (token, seeds, api) => entityResolver.resolveEntityId(token, seeds, api, { listFn: 'getAllBonusSetups', nameResolverFn: 'findBonusSetupByID', idFields: ['bonus_setup_id','id','value'], extraParams: { bonus_type_id: seeds.bonus_type_id } }),
});
