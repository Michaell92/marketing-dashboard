<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Line Chart',
    },
    chartOptions: {
        type: Object,
        default: () => {},
    },
    series: {
        type: Array,
        default: () => [],
    },
});
</script>
<template>
    <div id="chart" class="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ title }}</h3>
        <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<style scoped></style>
