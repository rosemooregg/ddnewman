const newman = require('newman');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('./utils/Untitled spreadsheet.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const testData = XLSX.utils.sheet_to_json(sheet);

testData.forEach(test => {
    newman.run({
        collection: require('./dw_modifyContract.postman_collection.json'),
        globals: {
            "values": [
                {"key": "url", "value": test.RequestURL},
                {"key": "method", "value": test.RequestMethod},
                {"key": "body", "value": test.RequestBody},
                {"key": "statusCode", "value": test.ExpectedStatusCode}
            ]
sut        }
    }, function (err) {
        if (err) {
            console.error('Test failed:', test.TestName, err);
            process.exit(1); // Exit with error status
        }
        console.log('Test passed:', test.TestName);
    });
});


