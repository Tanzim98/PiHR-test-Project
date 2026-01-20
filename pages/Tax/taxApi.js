import { getApiMapByEnv } from "../../api/taxApiMap.js";
import * as payloads from "../../config/taxPayloadData.js";
Object.assign(globalThis, payloads);
// import { RequestHandler } from "../../utils/request_handler.js";
import BasePage from "../BasePage.js";

export class TaxApis extends BasePage {
  constructor(request, env) {
    super(request, env);
    this.apiMap = getApiMapByEnv(env);
  }
// Bonus Year API
  async getBonusYearMonth(token){
  return this.request.get(this.apiMap.bonusYearMonth.url, {
    params: bonusYearMonthPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
  async getBonusYearByMonthId(token){
    const endpoint = this.apiMap.bonusYearByMonthId;
  const url = endpoint.url.replace("{year_month_id}", bonusYearPayload.year_month_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
} 
//Employee TAX Provision API
    async getTaxConfiguration(token) {
    return this.request.get(this.apiMap.getTaxConfiguration.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getEmployeeTaxProvision(token) {
    return this.request.get(this.apiMap.getEmployeeTaxProvisions.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
  async getTaxProvisionById(token){
    const endpoint = this.apiMap.getTaxProvisionById;
  const url = endpoint.url.replace("{tax_provision_id}", taxProvisionPayload.tax_provision_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
} 
// Employee Yearly Income Tax API

  async getEmployeeYearlyImcomeTax(token){
  return this.request.get(this.apiMap.getEmployeeYearlyImcomeTax.url, {
    params: yearlyIncomeTaxesPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 

// Investment API
    async getInvestmentTypeSli(token) {
    return this.request.get(this.apiMap.getInvestmentTypeSli.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getInvestmentDetails(token) {
    return this.request.get(this.apiMap.getInvestmentDetails.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
  async getInvestmentById(token){
  const endpoint = this.apiMap.getInvestmentById;
  const url = endpoint.url.replace("{investment_id}", investmentPayload.investment_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
} 

// Investment Types API
    async getInvestmentDetails(token) {
    return this.request.get(this.apiMap.getInvestmentTypes.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
  async getInvestmentTypeById(token){
  const endpoint = this.apiMap.getInvestmentTypeById;
  const url = endpoint.url.replace("{investment_type_id}", investmentPayload.investment_type_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
} 

//Medical Information API
    async getMedicalInformation(token) {
    return this.request.get(this.apiMap.getMedicalInformation.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
  async getMedicalInfoById(token){
  const endpoint = this.apiMap.getMedicalInfoById;
  const url = endpoint.url.replace("{investment_type_id}", medicalInfoPayload.medical_info_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}

//Monthly Tax Collection API
  async getMonthlyCollectedList(token){
  return this.request.get(this.apiMap.monthlyTaxCollectedList.url, {
    params: monthlyTaxCollectionPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
  async getMonthlyEmployeeTax(token){
  return this.request.get(this.apiMap.getEmployeeTaxByCollectionId.url, {
    params: monthlyEmployeeTaxCollectionPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 

// Tax Calculation API
  async getEmployeeTaxCalculation(token){
  return this.request.get(this.apiMap.getEmployeeTaxCalculation.url, {
    params:employeeTaxCalculationPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 

// Tax Challan API
  async getTaxChallan(token){
  return this.request.get(this.apiMap.getTaxChallan.url, {
    params:taxChallanPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 

  async getTaxChallanById(token){
  const endpoint = this.apiMap.getTaxChallanById;
  const url = endpoint.url.replace("{tax_challan_id}", taxChallanIdPayload.tax_challan_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
    async downloadTaxChallanTemplate(token) {
    return this.request.get(this.apiMap.taxChallanTemplate.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getTaxEligibleEmployees(token) {
    return this.request.get(this.apiMap.getTaxEligibleEmployees.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}

// Tax Factor API
  async getFactorCodeDropdown(token){
  const endpoint = this.apiMap.getFactorCodeDropdown;
  const url = endpoint.url.replace("{tax_year}", taxChallanPayload.tax_year);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
  async getFactorsByTaxYear(token){
  const endpoint = this.apiMap.getFactorsByTaxYear;
  const url = endpoint.url.replace("{tax_year}", taxChallanPayload.tax_year);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
  async getsFactorDetailsById(token){
  const endpoint = this.apiMap.factorDetailsById;
  const url = endpoint.url.replace("{factor_id}", taxFactorPayload.factor_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}

// Tax GLobal Configuration API
    async getTaxGlobalConfiguration(token) {
    return this.request.get(this.apiMap.getTaxGlobalConfiguration.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getSalaryPercentageTypeDropdown(token) {
    return this.request.get(this.apiMap.salaryPercentageTypeDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getTexableBreakupsDropdown(token) {
    return this.request.get(this.apiMap.texableBreakupsDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}

// Tax Policy API
    async getAllTaxPolicies(token) {
    return this.request.get(this.apiMap.getAllTaxPolicies.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
async getTaxPolicyById(token){
  const endpoint = this.apiMap.taxPoliciesById;
  const url = endpoint.url.replace("{policy_id}", taxPoliciesPayload.policy_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
async getTaxPolicyDropdown(token) {
return this.request.get(this.apiMap.getTaxPolicyDropdown.url, {
headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
});
}
async getPolicyAmountRulesById(token){
  const endpoint = this.apiMap.getPolicyAmountRulesById;
  const url = endpoint.url.replace("{policy_id}", taxPoliciesPayload.policy_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}
async getRuleDetailsByRuleId(token){
  const endpoint = this.apiMap.getAmountRuleDetailsByRuleId;
  const url = endpoint.url.replace("{rule_id}", taxPoliciesPayload.rule_id);
  return this.request.get(url, {
    headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
}

// Tax Report API
  async getMonthlyTaxProvisionReport(token){
  return this.request.get(this.apiMap.monthlyTaxProvisionReport.url, {
    params:monthlyTaxProvisionPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
  async getMonthlyTaxCollectionReport(token){
  return this.request.get(this.apiMap.monthlyTaxCollectionReport.url, {
    params:monthlyTaxCollectionReportPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
  async provisionStatementPayload(token){
  return this.request.get(this.apiMap.provisionStatementReport.url, {
    params:provisionStatementPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
  async getYearlyStatementReport(token){
  return this.request.get(this.apiMap.yearlyStatementReport.url, {
    params:yearlyStatementPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
  async getChallanReport(token){
  return this.request.get(this.apiMap.taxChallanReport.url, {
    params:taxChallaPayload,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
} 
    async getTaxStatusDropdown(token) {
    return this.request.get(this.apiMap.taxStatusDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getAdjustmentTypeDropdown(token) {
    return this.request.get(this.apiMap.adjustmentTypeDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getTaxYearDropdown(token) {
    return this.request.get(this.apiMap.taxYearDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
// Teax Year API
    async getTaxYearSli(token) {
    return this.request.get(this.apiMap.taxYearSli.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getCurrentTaxYear(token) {
    return this.request.get(this.apiMap.currentTaxYear.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getAllPreviousYear(token) {
    return this.request.get(this.apiMap.previousTaxYears.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
    async getTaxYearDropdown(token) {
    return this.request.get(this.apiMap.taxYearDropdown.url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
}
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
          TaxApis,
          functionName,
          method,
          prodToken,
          devToken,
          payload
        );
      }
}
