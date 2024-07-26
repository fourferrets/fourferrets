const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/add-user', (req, res) => {
    const userData = req.body;

    // Check if the Excel file exists
    const filePath = './users.xlsx';
    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
    }

    // Get the worksheet or create a new one
    const sheetName = 'Users';
    let worksheet;
    if (workbook.Sheets[sheetName]) {
        worksheet = workbook.Sheets[sheetName];
    } else {
        worksheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // Append the new user data
    const worksheetData = xlsx.utils.sheet_to_json(worksheet);
    worksheetData.push(userData);
    const newWorksheet = xlsx.utils.json_to_sheet(worksheetData);

    // Replace the worksheet
    workbook.Sheets[sheetName] = newWorksheet;

    // Save the workbook
    xlsx.writeFile(workbook, filePath);

    res.status(200).send('User added successfully');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
