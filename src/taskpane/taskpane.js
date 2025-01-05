/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, fetch */

Office.onReady(() => {
  document.getElementById("analyzeButton").onclick = runAIAnalysis;
});

async function runAIAnalysis() {
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const range = sheet.getUsedRange(); // Get all used cells in the worksheet
      range.load("values");
      await context.sync();

      const data = range.values;
      displayMessage("Sending data to AI for analysis...");

      const insights = await analyzeDataWithAI(data);
      displayMessage(insights);
    });
  } catch (error) {
    console.error("Error during analysis:", error);
    displayMessage(`Error: ${error.message}`);
  }
}

async function analyzeDataWithAI(data) {
  try {
    const response = await fetch("https://your-secure-api-endpoint.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result.insights || "No insights returned from AI.";
  } catch (error) {
    console.error("Error communicating with AI API:", error);
    return "Error analyzing data with AI.";
  }
}

function displayMessage(message) {
  const outputElement = document.getElementById("output");
  outputElement.textContent = message;
}