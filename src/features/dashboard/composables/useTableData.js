// useTableData.js
import { ref } from 'vue';
import { useFormatter } from './useFormatter';
import { parseExcel } from '@/shared/helpers/excelParser';

const tableData = ref([]);
const formattedNumberData = ref([]);
const parsedData = ref([]);
const { formatMatrixData, getMatrixDataAsNumbers } = useFormatter();

const init = async (excelFile) => {
    try {
        const fetchedData = await parseExcel(excelFile);
        parsedData.value = fetchedData;
        tableData.value = formatMatrixData(fetchedData);
        formattedNumberData.value = getMatrixDataAsNumbers(fetchedData);
    } catch (err) {
        console.error('Excel parse failed:', err);
    }
};

export function useTableData() {
    return {
        tableData,
        formattedNumberData,
        parsedData,
        init,
    };
}
