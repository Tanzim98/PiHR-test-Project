import { expect } from "@playwright/test";
// CommonJS
import { PDFParse } from "pdf-parse";
import fs from "fs";
import path from "path";

// Remove previous PDF files in the downloads directory
function removePreviousPdfs(dir) {
  try {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file && file.toLowerCase().endsWith('.pdf')) {
        const fp = path.join(dir, file);
        try {
          fs.unlinkSync(fp);
          console.log(`Removed previous PDF: ${fp}`);
        } catch (err) {
          console.warn(`Failed to remove ${fp}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    console.warn(`Error while cleaning previous PDFs in ${dir}: ${err.message}`);
  }
}

export async function getApisResponseAndCompare(prodFn, devFn, options = {}) {
  const mode = process.env.API_TEST_MODE || "compare";
  const targetEnv = process.env.API_TARGET_ENV || "PIHR_PROD";
  const method = (options.method || "GET").toUpperCase();
  const payload = options.payload;

  const fnToRun = targetEnv === "PIHR_PROD" ? prodFn : devFn;


  // GET
if (method === "GET") {
  if (mode === "compare") {
    const [prodResponse, devResponse] = await Promise.all([
      prodFn(payload),
      devFn(payload),
    ]);

    console.log(`PROD Status: ${prodResponse.status()}`);
    console.log(`DEV  Status: ${devResponse.status()}`);

    expect(prodResponse.status()).toBe(200);
    expect(devResponse.status()).toBe(200);

    const prodContentType = prodResponse.headers()["content-type"] || "";
    const devContentType = devResponse.headers()["content-type"] || "";

    // ===== PDF / BINARY HANDLING =====
    if (
      prodContentType.includes("application/pdf") ||
      prodContentType.includes("application/octet-stream")
    ) {
      const prodBuffer = await prodResponse.body();
      const devBuffer = await devResponse.body();

      // SAVE PDFs (ONLY ADDITION)
      const downloadDir = path.join(process.cwd(), "test-results", "downloads");
      fs.mkdirSync(downloadDir, { recursive: true });

  // remove any previous PDFs before saving new ones
  removePreviousPdfs(downloadDir);

      fs.writeFileSync(
        path.join(downloadDir, `PROD_${Date.now()}.pdf`),
        prodBuffer
      );
      fs.writeFileSync(
        path.join(downloadDir, `DEV_${Date.now()}.pdf`),
        devBuffer
      );

      const prodParser = new PDFParse({ data: prodBuffer });
      const devParser = new PDFParse({ data: devBuffer });

      const prodPdf = await prodParser.getText();
      const devPdf = await devParser.getText();

      await prodParser.destroy();
      await devParser.destroy();

      const prodJson = {
        environment: "PROD",
        pages: prodPdf.total,
        text: prodPdf.text
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean),
      };

      const devJson = {
        environment: "DEV",
        pages: devPdf.total,
        text: devPdf.text
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean),
      };

      console.log("****** PROD PDF RESPONSE ******");
      console.log(JSON.stringify(prodJson, null, 2));
      console.log("****** DEV PDF RESPONSE ******");
      console.log(JSON.stringify(devJson, null, 2));

      const prodComparable = { pages: prodJson.pages, text: prodJson.text };
      const devComparable = { pages: devJson.pages, text: devJson.text };

      expect(devComparable).toEqual(prodComparable);
      return { prodJson, devJson };
    }

    // ===== DEFAULT JSON HANDLING =====
    const prodJson = await prodResponse.json();
    const devJson = await devResponse.json();

    console.log("****** PROD RESPONSE ******");
    console.log(JSON.stringify(prodJson, null, 2));
    console.log("****** DEV RESPONSE ******");
    console.log(JSON.stringify(devJson, null, 2));

    expect(devJson).toEqual(prodJson);
    return { prodJson, devJson };
  }

  if (mode === "single") {
    const EXPECTED_STATUS = 200;
    const response = await fnToRun(payload);
    const actualStatus = response.status();

    console.log("====== STATUS CHECK ======");
    console.log(`ENVIRONMENT     : ${targetEnv}`);
    console.log(`EXPECTED STATUS : ${EXPECTED_STATUS}`);
    console.log(`ACTUAL STATUS   : ${actualStatus}`);

    expect(actualStatus).toBe(EXPECTED_STATUS);

    const contentType = response.headers()["content-type"] || "";
    console.log(`CONTENT-TYPE    : ${contentType}`);
    console.log(`****** ${targetEnv} RESPONSE ******`);

    if (contentType.includes("application/json")) {
      const json = await response.json();
      console.log(JSON.stringify(json, null, 2));
      return json;
    }

    if (
      contentType.includes("application/pdf") ||
      contentType.includes("application/octet-stream")
    ) {
      const buffer = await response.body();

      //  SAVE PDF (ONLY ADDITION)
      const downloadDir = path.join(process.cwd(), "test-results", "downloads");
      fs.mkdirSync(downloadDir, { recursive: true });

  // remove any previous PDFs before saving the new one
  removePreviousPdfs(downloadDir);

      const filePath = path.join(
        downloadDir,
        `${targetEnv}_${Date.now()}.pdf`
      );
      fs.writeFileSync(filePath, buffer);
      console.log(` PDF saved: ${filePath}`);

      const parser = new PDFParse({ data: buffer });
      const pdfData = await parser.getText();
      await parser.destroy();

      const jsonResult = {
        environment: targetEnv,
        pages: pdfData.total,
        text: pdfData.text
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean),
      };

      console.log("PDF AS JSON:");
      console.log(JSON.stringify(jsonResult, null, 2));

      return jsonResult;
    }

    throw new Error(`Invalid API_TEST_MODE: ${mode}`);
  }
}

// POST
if (method === "POST") {
  const response = await fnToRun(payload);
  const status = response.status();
  const expectedStatuses = [200, 201]; // dynamic expected statuses
  const expectedStatusStr = expectedStatuses.join(" or ");
  console.log(`Expected Status: ${expectedStatusStr}`);
  console.log(`Actual Status  : ${status}`);
  let responseMessage = "";
  let data = null;
  let responseText = "";
  try {
    data = await response.json();
    console.log("****** New Data Created ******");
    console.log(JSON.stringify(data, null, 2));
    responseMessage = data?.message || "";
  } catch (err) {
    try {
      responseText = await response.text();
      console.log("****** Response Text ******");
      console.log(responseText);
    } catch (err2) {
      console.log("****** No Response Body Returned ******");
    }
  }
  if (!expectedStatuses.includes(status)) {
    expect(expectedStatuses).toContain(status);
  }
  if (typeof onSuccess === "function") {
    await onSuccess({ data, status, targetEnv, response });
  }
  const expectedMessage = "Data saved successfully.";
  if (responseMessage === expectedMessage) {
    console.log("Create Message Verified: Passed");
  } else {
    console.log(`Create Message Mismatch: Expected "${expectedMessage}", got "${responseMessage}"`);
    throw new Error("Create message verification failed");
  }
  return data;
}

// PUT
if (method === "PUT") {
  const updateResponse = await fnToRun(payload);
  const status = updateResponse.status();
  const expectedStatuses = [200, 201];
  console.log(`Expected Status: ${expectedStatuses.join(" or ")}`);
  console.log(`Actual Status  : ${status}`);
  let responseMessage = "";
  let updatedData = {};
  try {
    updatedData = await updateResponse.json();
    console.log(`****** ${targetEnv} PUT RESPONSE ******`);
    console.log(JSON.stringify(updatedData, null, 2));
    responseMessage = updatedData.message || "";
  } catch (err) {
    try {
      const text = await updateResponse.text();
      console.log(`****** ${targetEnv} PUT RESPONSE TEXT ******`);
      console.log(text);
    } catch (err2) {
      console.log("****** No Response Body Returned ******");
    }
  }
  expect(expectedStatuses).toContain(status);
  const validUpdateMessages = [
    "Data updated successfully.",
    "Application approved successfully.",
    "Application rejected successfully."
  ];

  if (validUpdateMessages.includes(responseMessage)) {
    console.log(`Update Message Verified: Passed (message: "${responseMessage}")`);
  } else {
    console.log(
      `Update Message Mismatch: Expected one of "${validUpdateMessages.join('" | "')}", got "${responseMessage}"`
    );
    throw new Error("Update message verification failed");
  }

  return updatedData;
}

 // DELETE
if (method === "DELETE") {
  const deleteResponse = await fnToRun(payload);
  const status = deleteResponse.status();
  const expectedStatuses = [200, 204];
  const expectedStatusStr = expectedStatuses.join(" or ");
  console.log(`Expected Status: ${expectedStatusStr}`);
  console.log(`Actual Status  : ${status}`);
  expect(expectedStatuses).toContain(status);
  let responseMessage = "";
  try {
    const data = await deleteResponse.json();
    console.log("****** Delete Response Data ******");
    console.log(JSON.stringify(data, null, 2));
    responseMessage = data.message || "";
  } catch (err) {
    console.log("****** No Response Body Returned ******");
  }
  const expectedMessage = "Data deleted successfully.";
  if (responseMessage === expectedMessage) {
    console.log("Delete Message Verified: Passed");
  } else {
    console.log(`Delete Message Mismatch: Expected "${expectedMessage}", got "${responseMessage}"`);
    throw new Error("Delete message verification failed");
  }
  return status;
}

throw new Error(`Unsupported HTTP method: ${method}`);
}

