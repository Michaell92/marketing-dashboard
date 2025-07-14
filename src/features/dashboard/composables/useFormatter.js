export function useFormatter() {
    const formatNumber = (value) => {
        if (typeof value === 'number') {
            return new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        }
        return value;
    };

    const formatMatrixData = (data) => {
        return data.map((row) => {
            const formattedRow = {};
            Object.keys(row).forEach((key) => {
                const cell = row[key];
                // If the cell has a formatted value, use it
                formattedRow[key] = cell.formatted || formatNumber(cell.value);
            });
            return formattedRow;
        });
    };

    const getMatrixDataAsNumbers = (data) => {
        return data.map((row) => {
            const parsedRow = [];
            Object.keys(row).forEach((key) => {
                const cell = row[key];
                // If the cell has a raw value, use it
                parsedRow.push(cell.value); // Fallback to formatted if no raw value
            });
            return parsedRow;
        });
    };

    return {
        formatNumber,
        formatMatrixData,
        getMatrixDataAsNumbers,
    };
}
