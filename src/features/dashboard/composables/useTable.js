// useTableData.js
import { ref } from 'vue';
import { useFormatter } from '@/features/dashboard/composables/useFormatter';
import { parseExcel } from '@/shared/helpers/excelParser';

const tableData = ref([]);
const formattedNumberData = ref([]);
const parsedData = ref([]);
const { formatMatrixData, getMatrixDataAsNumbers } = useFormatter();

const init = async (excelFile) => {
    try {
        const fetchedData = await parseExcel(excelFile);

        // Store the parsed data
        parsedData.value = fetchedData;
        tableData.value = formatMatrixData(fetchedData);
        formattedNumberData.value = getMatrixDataAsNumbers(fetchedData);
    } catch (err) {
        console.error('Excel parse failed:', err);
    }
};

export function useTable() {
    return {
        tableData,
        formattedNumberData,
        parsedData,
        init,
    };
}
