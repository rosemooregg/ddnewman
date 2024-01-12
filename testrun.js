// Import necessary libraries
const fs = require('fs');
const { Collection, Runner } = require('postman-runtime');
const xlsx = require('xlsx');
const newman = require('newman');

// Function to run Postman collection
async function runPostmanCollection(collectionPath) {
    const collection = new Collection(collectionPath);
    const runner = new Runner();

    // Execute the collection and get the run summary
    const runSummary = await runner.run(collection);

    return runSummary;
}

// Function to read data from Excel file
function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Parse data from Excel sheet
    const data = xlsx.utils.sheet_to_json(sheet);

    return data;
}

// Function to generate HTML report
function generateHTMLReport(runSummary, outputFilePath) {
    const htmlReport = newman.exports['html'](runSummary.run, null, { sanitizeNames: true });

    // Write HTML report to a file
    fs.writeFileSync(outputFilePath, htmlReport);
}

// Main function to orchestrate the process
async function main() {
    // Specify paths
    const excelFilePath = 'path/to/your/excel/file.xlsx';
    const postmanCollectionPath = 'path/to/your/postman/collection.json';
    const htmlReportOutputPath = 'path/to/output/report.html';

    // Read data from Excel file
    const excelData = readExcelFile(excelFilePath);

    // Iterate over data and run Postman collection for each row
    for (const row of excelData) {
        // Modify collection variables or request data based on the current row

        // Run Postman collection
        const runSummary = await runPostmanCollection(postmanCollectionPath);

        // Generate HTML report
        generateHTMLReport(runSummary, htmlReportOutputPath);
    }
}

// Execute the main function
main();
