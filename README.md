# Employee API Comparison - Playwright Tests

This project contains Playwright-based automated tests to compare **Employee APIs** between **PROD** and **DEV** environments. The tests verify that API responses are consistent across environments.

## Environment Setup

1. **Clone the repository:**

```bash
git clone <https://gitea.vivasoftltd.com/Vivasoft/pihr-api-automation>
cd <repository-folder>

// Install dependencies: 
npm install

Create a .env file in the project root with the following variables:

Create a .env file in the project root with the following variables:

# API EXECUTION MODE
# 'compare' => Compare PROD vs DEV
# 'single'  => Run only one environment
API_TEST_MODE=compare      

# TARGET ENVIRONMENT (used only if API_TEST_MODE=single)
# Options: PIHR_PROD | PIHR_DEV
API_TARGET_ENV=PIHR_PROD    

# BASE URLS
BASE_URL_PIHR_PROD=https://viva.pihr.xyz/
BASE_URL_PIHR_DEV=https://viva.pisales.xyz/

# API TOKENS
PIHR_PROD_API_TOKEN=<your-prod-api-token>
PIHR_DEV_API_TOKEN=<your-dev-api-token>

Run tests using Playwright Test Runner:

npx playwright test

## Employee API Notes

- Department and division update/delete resolve IDs dynamically from create responses or list endpoints, so hardcoded IDs are not required.
- Division and department list parsing supports common response shapes (`data`, `items`, `departments`, `divisions`, `company_divisions`).
- The compare helper is shared across APIs to keep PROD vs DEV behavior consistent.

## idResolver.js (Brief)

`utils/idResolver.js` helps find the correct entity ID from API list responses when the ID key name can vary.

How it works:
- You pass seed values (like `name`, `department_code`, `division_code`).
- It fetches list data using provided fetchers.
- It matches list items against seeds using normalized key names and values.
- It returns the resolved ID (and optionally the matched item).

Minimal usage example:

```js
import { resolveIdDynamic } from "./utils/idResolver.js";

const result = await resolveIdDynamic({
  seeds: [{ name: "QA Division", division_code: "QA division" }],
  fetchers: [() => api.getEmployeeDivisions(token)],
  extractList: (body) => body?.data || body || [],
  extractId: (item) => item?.company_division_id ?? item?.id,
  returnItem: true,
});

const divisionId = result.id;
```

Project Structure
.
├── tests
│   └── Employee
│       └── employee.spec.js        # Employee API comparison tests
├── pages
│   └── Employee
│       └── employee.api.js         # Employee API helper & comparison class
├── config
│   └── payloadData.js              # Payload data for API requests
├── utils
│   └── ApiComparator.js            # Logic for comparing PROD vs DEV API responses
├── api
│   └── employeeApiMap.js                   # API endpoint mapping for different environments
├── .env                            # Environment variables
└── README.md
