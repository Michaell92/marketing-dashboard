import * as XLSX from 'xlsx';

export function parseExcel(file) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Processing file:', file);

            let data;

            // Handle both File/Blob objects and asset paths in case we we will use uploading option
            if (typeof file === 'string') {
                // If file is a string path, fetch it as an array buffer
                const response = await fetch(file);
                if (!response.ok) {
                    throw new Error(`Failed to fetch Excel file: ${response.statusText}`);
                }
                data = new Uint8Array(await response.arrayBuffer());
            } else {
                // Handle File/Blob objects with FileReader
                const reader = new FileReader();
                data = await new Promise((fileResolve, fileReject) => {
                    reader.onload = (e) => fileResolve(new Uint8Array(e.target.result));
                    reader.onerror = fileReject;
                    reader.readAsArrayBuffer(file);
                });
            }

            // Parse the Excel data
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const formattedJson = XLSX.utils.sheet_to_json(worksheet, {
                raw: false,
                defval: '',
            });

            const rawJson = XLSX.utils.sheet_to_json(worksheet, {
                raw: true,
                defval: '',
            });

            // Process each cell to properly handle percentages and other formats
            const json = formattedJson.map((formattedRow, index) => {
                const rawRow = rawJson[index];
                const resultRow = {};

                // Process each field
                Object.keys(formattedRow).forEach((key) => {
                    const formattedValue = formattedRow[key];
                    const rawValue = rawRow[key];

                    // Special handling for percentages
                    if (typeof formattedValue === 'string' && formattedValue.endsWith('%')) {
                        const percentValue = parseFloat(formattedValue.replace(/%$/, ''));

                        resultRow[key] = {
                            formatted: formattedValue,
                            value: percentValue,
                        };
                    } else {
                        resultRow[key] = {
                            formatted: formattedValue,
                            value: rawValue,
                        };
                    }
                    // // For regular values, just use them directly
                    // else {
                    //     resultRow[key] = formattedValue;
                    // }
                });

                return resultRow;
            });

            resolve(json);
        } catch (error) {
            console.error('Error parsing Excel file:', error);
            reject(error);
        }
    });
}
