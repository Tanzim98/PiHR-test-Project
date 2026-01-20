import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";

async function handlePdfResponse(response, fileName) {
  const contentType = response.headers()["content-type"] || "";

  if (
    !contentType.includes("application/pdf") &&
    !contentType.includes("application/octet-stream")
  ) {
    throw new Error("Not a PDF response");
  }

  const buffer = await response.body();

  // Save PDF
  const dir = path.join(process.cwd(), "test-results", "downloads");
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, buffer);
  console.log(`PDF saved: ${filePath}`);

  // Parse PDF
  const pdfData = await pdfParse(buffer);

  return {
    pages: pdfData.numpages,
    text: pdfData.text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean),
  };
}
