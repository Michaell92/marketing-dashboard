<script setup>
import { onMounted, ref, computed } from 'vue';
import DashboardTitle from '@/features/dashboard/components/DashboardTitle.vue';
import DashboardMatrix from '@/features/dashboard/components/DashboardMatrix.vue';
import LineChart from '@/features/dashboard/components/LineChart.vue';
import ColumnChart from '@/features/dashboard/components/ColumnChart.vue';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart.vue';
// Direct import of the Excel file
import tableDataExcel from '@/assets/tableData.xlsx?url';
import { useTable } from '@/features/dashboard/composables/useTable';
import { useChart } from '@/features/dashboard/composables/useChart';

// Static data
const title = 'Marketing Dashboard';
const description = 'Welcome to the Marketing Dashboard. Here you can view and analyze your marketing data';
const chartOneTitle = 'Users Overview';
const chartTwoTitle = 'MMR Overview';
const columnChartTitle = 'Monthly Averages';
const benchmarkPerformance = 'Benchmark performance';

// Search text for filtering the table data
const searchText = ref('');
const filteredTableData = computed(() => {
    const filteredData = tableData.value.slice(1).filter((row) => {
        return Object.values(row).some((value) => String(value).toLowerCase().includes(searchText.value.toLowerCase()));
    });

    return [tableData.value[0], ...filteredData]; // Include header row
});

// General dashboard data
const { tableData, init } = useTable();

// Chart options and series data
const { lineChartMMRData, lineChartUsersData, columnChartAveragesData, performanceChartData } = useChart();

onMounted(() => {
    init(tableDataExcel);
});
</script>

<template>
    <div class="h-full flex flex-col justify-start items-center m-6 mt-5 lg:m-12 lg:*:mx-12">
        <DashboardTitle :title="title" :description="description" />
        <DashboardMatrix :tableData="filteredTableData" v-model:searchText="searchText" />
        <div class="flex gap-12 w-full flex-wrap items-center justify-center py-6 lg:px-6 mt-24 lg:flex-nowrap">
            <LineChart
                :title="chartOneTitle"
                :chartOptions="lineChartUsersData.options"
                :series="lineChartUsersData.series"
            />
            <LineChart
                :title="chartTwoTitle"
                :chartOptions="lineChartMMRData.options"
                :series="lineChartMMRData.series"
            />
        </div>
        <div class="flex flex-wrap items-center justify-center py-6 lg:px-6 lg:flex-nowrap gap-12 w-full">
            <ColumnChart
                :title="columnChartTitle"
                :chartOptions="columnChartAveragesData.options"
                :series="columnChartAveragesData.series"
            />
            <PerformanceChart
                :title="benchmarkPerformance"
                :chartOptions="performanceChartData.options"
                :series="performanceChartData.series"
            />
        </div>
    </div>
</template>

<style scoped></style>
