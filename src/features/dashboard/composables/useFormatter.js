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

    const formatBarChartTopBarData = (data) => {
        if (!data || data.length === 0) return [];

        return data
            .slice(1)
            .map((row, index) => {
                return row[0];
            })
            .filter((value) => {
                return value !== 'Churn % p/m' && value !== 'Qualified Lead (3 sessions)';
            });
    };

    const formatBarChartSeries = (data) => {
        if (!data || data.length === 0) return [];

        // Calculate monthly averages for each row
        return data
            .slice(1)
            .map((row) => {
                const length = row.length - 2; // Exclude the first two columns (date and identifier)

                const total = row.slice(2).reduce((sum, value) => {
                    return sum + (typeof value === 'number' ? value : 0);
                }, 0);

                const average = total / length;
                return parseInt(average);
            })
            .filter((value) => {
                return !isNaN(value) && value !== null && value !== 0;
            });
    };

    return {
        formatNumber,
        formatMatrixData,
        getMatrixDataAsNumbers,
        formatBarChartTopBarData,
        formatBarChartSeries,
    };
}
