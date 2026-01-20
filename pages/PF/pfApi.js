import { getApiMapByEnv } from "../../api/pfApiMap.js";
import * as payloads from "../../config/pfPayloadData.js";
Object.assign(globalThis, payloads);
// import { RequestHandler } from "../../utils/request_handler.js";
import BasePage from "../BasePage.js";

export class PFApis extends BasePage {
  constructor(request, env) {
    super(request, env);
    this.apiMap = getApiMapByEnv(env);
  }

  //PF Year API
  async getPFYearSli(token) {
    return this.request.get(this.apiMap.pfYearSli.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getCurrentPFYear(token) {
    return this.request.get(this.apiMap.pfCurrentYear.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFPreviousYear(token) {
    return this.request.get(this.apiMap.pfPreviousYear.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFYearDropdowns(token) {
    return this.request.get(this.apiMap.pfYearDropdowns.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //PF Calculation Policy API
  async getPFCalculationPolicy(token) {
    return this.request.get(this.apiMap.pfCalculationPolicy.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFFinancialYear(token) {
    const endpoint = this.apiMap.pfFinancialYear;
    if (!endpoint?.url) {
      throw new Error(
        `PF Financial Year endpoint not configured for env=${this.env}`
      );
    }
    const url = endpoint.url.replace("{year}", pfPayloadData.year);
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFFinancialYearDateRange(token) {
    return this.request.get(this.apiMap.pfFinancialYearDateRange.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //PF Interest Calculation Policy  API
  async getPFInterestCalculationPolicies(token) {
    return this.request.get(this.apiMap.pfInterestCalculationPolicies.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFInterestCalcuationByID(token) {
    const endpoint = this.apiMap.pfInterestCalculationPolicyByID;
    if (!endpoint?.url) {
      throw new Error(
        `PF Interest Calculation Policy By ID endpoint not configured for env=${this.env}`
      );
    }
    const url = endpoint.url.replace(
      "{pf_interest_calculation_policy_id}",
      pfPayloadData.pf_interest_calculation_policy_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //PF Member Setup API
  async getPFStatusDropdown(token) {
    return this.request.get(this.apiMap.pfStatusDropdown.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFMemberHistoryByEmpID(token) {
    const endpoint = this.apiMap.pfMemberHistoryByEmpID;
    if (!endpoint?.url) {
      throw new Error(
        `PF Member History endpoint not configured for env=${this.env}`
      );
    }
    const url = endpoint.url.replace(
      "{employee_id}",
      pfPayloadData.employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getCurrentPFStatusByEmpID(token) {
    const endpoint = this.apiMap.pfCurrentStatusBYEmpID;
    if (!endpoint?.url) {
      throw new Error(
        `PF Current Status By Emp ID endpoint not configured for env=${this.env}`
      );
    }
    const url = endpoint.url.replace(
      "{employee_id}",
      pfPayloadData.employee_id
    );
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFMemberSetupsTemplate(token) {
    return this.request.get(this.apiMap.pfMemberSetupsTemplate.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //PF Report API
  async getPFStatementReport(token) {
    const endpoint = this.apiMap.pfStatementReport;
    if (!endpoint?.url) {
      throw new Error(
        `PF Statement Report endpoint not configured for env=${this.env}`
      );
    }
    // endpoint does not include a path placeholder; pass year as a query parameter
    const url = `${endpoint.url}?statement_year=${pfPayloadData.statement_year}`;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFAnnualBalanceReport(token) {
    const endpoint = this.apiMap.pfAnnualBalanceReport;
    if (!endpoint?.url) {
      throw new Error(
        `PF Annual Balance Report endpoint not configured for env=${this.env}`
      );
    }
    // endpoint does not include a path placeholder; pass year as a query parameter
    const url = `${endpoint.url}?statement_year=${pfPayloadData.statement_year}`;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFMonthlyCollectionReport(token) {
    const endpoint = this.apiMap.pfMonthlyCollectionReport;
    if (!endpoint?.url) {
      throw new Error(
        `PF Monthly Collection endpoint not configured for env=${this.env}`
      );
    }
    const { from_year, to_year, from_month, to_month } =
      pfMonthlyCollectionReportPayload;
    const params = new URLSearchParams({
      from_year,
      to_year,
      from_month,
      to_month,
    });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFMemberListReport(token) {
    return this.request.get(this.apiMap.pfMemberListReport.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFWithdrawalListReport(token) {
    const endpoint = this.apiMap.pfWithdrawalListReport;
    if (!endpoint?.url) {
      throw new Error(
        `PF Withdrawal List endpoint not configured for env=${this.env}`
      );
    }
    const { from_date_string, to_date_string } = pfWithdrawalListPayload;
    const params = new URLSearchParams({ from_date_string, to_date_string });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFBenefitListReport(token) {
    const endpoint = this.apiMap.pfBenefitListReport;
    if (!endpoint?.url) {
      throw new Error(
        `PF Benefit List Report endpoint not configured for env=${this.env}`
      );
    }
    // endpoint does not include a path placeholder; pass year as a query parameter
    const url = `${endpoint.url}?pf_year=${pfPayloadData.pf_year}`;
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //PF Monthly Collections API
  async getPFMonthlyCollections(token) {
    return this.request.get(this.apiMap.pfMonthlyCollections.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //PF Withdrawal Policies API
  async getPFWithdrawalPolicies(token) {
    return this.request.get(this.apiMap.pfWithdrawalPolicies.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  async getPFWithdrawalPoliciesByID(token){
      const endpoint = this.apiMap.pfWithdrawalPoliciesByID;
        if(!endpoint?.url){
            throw new Error(`PF Withdrawal Policies By Policies ID endpoint not configured for env=${this.env}`);
            }
        const url = endpoint.url.replace("{policy_id}", pfPayloadData.policy_id);
            return this.request.get(url, {
            headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
         });
      }
   
    //PF Withdrawals API
      async getPFWithdrawals(token){
     const endpoint = this.apiMap.pfWithdrawals;
    if (!endpoint?.url) {
        throw new Error(`PF withDrawals endpoint not configured for env=${this.env}`);
    }
    const { withdrawal_from_date_string, withdrawal_to_date_string } = pfWithdrawalsPayload;
    const params = new URLSearchParams({ withdrawal_from_date_string, withdrawal_to_date_string });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  } 
      async getPFWithdrawalID(token){
    const endpoint = this.apiMap.pfWithdrawalsByID;
    if(!endpoint?.url){
       throw new Error(`PF Withdrawal ID endpoint not configured for env=${this.env}`);
    }
    const url = endpoint.url.replace("{withdrawal_id}", pfWithdrawalsPayload.withdrawal_id);
      return this.request.get(url, {
      headers:{ Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }
  async getPFWithdrawalsWithdrawable(token){
     const endpoint = this.apiMap.pfWithdrawalsWithdrawable;
    if (!endpoint?.url) {
        throw new Error(`PF Withdrawals withdrawable endpoint not configured for env=${this.env}`);
    }
    const { employee_id, withdrawal_date_string } = pfWithdrawalsPayload;
    const params = new URLSearchParams({  employee_id, withdrawal_date_string });
    const url = `${endpoint.url}?${params.toString()}`;
    return this.request.get(url, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  } 

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
      PFApis,
      functionName,
      method,
      prodToken,
      devToken,
      payload
    );
  }
}
