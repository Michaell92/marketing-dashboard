<script setup>
import { onMounted } from 'vue';
import DashboardTitle from '@/features/dashboard/components/DashboardTitle.vue';
import DashboardMatrix from '@/features/dashboard/components/DashboardMatrix.vue';
import LineChart from '@/features/dashboard/components/LineChart.vue';
// Direct import of the Excel file
import tableDataExcel from '@/assets/tableData.xlsx?url';
import { useTableData } from '@/features/dashboard/composables/useTableData';
import { useChart } from '@/features/dashboard/composables/useChart';

// Static data
const title = 'Marketing Dashboard';
const description = 'Welcome to the Marketing Dashboard. Here you can view and analyze your marketing data';
const chartOneTitle = 'MMR Overview';
const chartTwoTitle = 'Users Overview';

// General dashboard data
const { tableData, init } = useTableData();

// Chart options and series data
const { lineChartMMRData, lineChartUsersData } = useChart();

onMounted(() => {
    init(tableDataExcel);
});
</script>

<template>
    <div class="h-full flex flex-col gap-10 justify-start items-center m-12 mt-5 lg:*:mx-12">
        <DashboardTitle :title="title" :description="description" />
        <DashboardMatrix :tableData="tableData" />
        <div class="flex gap-8 flex-wrap w-full items-center justify-center p-6 mt-12">
            <LineChart
                :title="chartTwoTitle"
                :chartOptions="lineChartUsersData.options"
                :series="lineChartUsersData.series"
            ></LineChart>
            <LineChart
                :title="chartOneTitle"
                :chartOptions="lineChartMMRData.options"
                :series="lineChartMMRData.series"
            ></LineChart>
        </div>
    </div>
</template>

<style scoped></style>
