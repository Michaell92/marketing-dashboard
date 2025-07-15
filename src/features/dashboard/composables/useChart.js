import { computed, h, ref } from 'vue';
import { useTable } from '@/features/dashboard/composables/useTable';
import { useTheme } from '@/shared/composables/useTheme';
import { useFormatter } from '@/features/dashboard/composables/useFormatter';
import { lineChartMMROptions, barChartOptions } from '@/features/dashboard/helpers/chartConfig';

const { formattedNumberData } = useTable();
const { currentTheme } = useTheme();
const { formatBarChartTopBarData, formatBarChartSeries } = useFormatter();

const lineChartMMRData = computed(() => {
    return {
        series: [
            {
                name: 'New MRR',
                data: formattedNumberData.value[7] ? [...formattedNumberData.value[7]].slice(2) : [],
            },
            {
                name: 'Current total MRR',
                data: formattedNumberData.value[8] ? [...formattedNumberData.value[8]].slice(2) : [],
            },
            {
                name: 'Current total ARR',
                data: formattedNumberData.value[10] ? [...formattedNumberData.value[10]].slice(2) : [],
            },
        ],
        options: {
            ...lineChartMMROptions,
            theme: {
                mode: currentTheme.value, // Use theme from useTheme composable
            },
            xaxis: {
                type: 'date',
                categories: formattedNumberData.value[0] ? [...formattedNumberData.value[0]].slice(2) : [],
            },
        },
    };
});

const lineChartUsersData = computed(() => {
    return {
        series: [
            {
                name: 'Unique Visitors (Minus SA/India)	',
                data: formattedNumberData.value[1] ? [...formattedNumberData.value[1]].slice(2) : [],
            },
            {
                name: 'Trial Signups',
                data: formattedNumberData.value[2] ? [...formattedNumberData.value[2]].slice(2) : [],
            },
            {
                name: 'Trial Signup Site Conversion Rate',
                data: formattedNumberData.value[3] ? [...formattedNumberData.value[3]].slice(2) : [],
            },
            {
                name: 'Paid Subscriptions',
                data: formattedNumberData.value[5] ? [...formattedNumberData.value[5]].slice(2) : [],
            },
            {
                name: 'Paid Subscriptions Covnersion Rate',
                data: formattedNumberData.value[6] ? [...formattedNumberData.value[6]].slice(2) : [],
            },
        ],
        options: {
            ...lineChartMMROptions,
            theme: {
                mode: currentTheme.value, // Use theme from useTheme composable
            },
            xaxis: {
                type: 'date',
                categories: formattedNumberData.value[0] ? [...formattedNumberData.value[0]].slice(2) : [],
            },
            // reset formatters to pure value
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value; // No currency formatting for users chart
                    },
                },
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        // Apply specific formatting based on series index
                        if (seriesIndex === 2 || seriesIndex === 4) {
                            return value + '%';
                        }
                        return parseInt(value);
                    },
                },
            },
        },
    };
});

const columnChartAveragesData = computed(() => {
    const categories = formatBarChartTopBarData(formattedNumberData.value);
    const series = formatBarChartSeries(formattedNumberData.value);

    return {
        series: [
            {
                name: 'Average monthly statistics',
                data: series,
            },
        ],
        options: {
            ...barChartOptions,
            xaxis: { ...barChartOptions.xaxis, categories },
            theme: {
                mode: currentTheme.value, // Use theme from useTheme composable
            },
            chart: {
                ...barChartOptions.chart,
                height: '400px',
            },
            dataLabels: {
                ...barChartOptions.dataLabels,
                style: {
                    colors: currentTheme.value === 'dark' ? ['#fff'] : ['#304758'], // Adjust color based on theme
                },
                formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                    if (
                        categories[dataPointIndex].includes('Rate') ||
                        categories[dataPointIndex].includes('Conversion')
                    ) {
                        return val + '%';
                    } else if (
                        categories[dataPointIndex].includes('MRR') ||
                        categories[dataPointIndex].includes('ARR')
                    ) {
                        return '£' + parseInt(val);
                    }

                    return parseInt(val);
                },
            },
            yaxis: {
                ...barChartOptions.yaxis,
                labels: {
                    ...barChartOptions.yaxis.labels,
                    formatter: function (val) {
                        // For column chart, we need to format based on the value or index in categories
                        // Find which position in our data series matches this y-axis value
                        const index = series.findIndex((value) => {
                            return Math.round(value) === Math.round(val);
                        });

                        // Format based on category (similar to what we want to do with seriesIndex)
                        if (index >= 0) {
                            const category = categories[index];

                            // Format percentage values
                            if (category.includes('Rate') || category.includes('Conversion')) {
                                return val + '%';
                            }
                            // Format monetary values
                            else if (category.includes('MRR') || category.includes('ARR')) {
                                return '£' + parseInt(val);
                            }
                        }

                        // Default formatting
                        return parseInt(val);
                    },
                },
            },
        },
    };
});

const performanceChartData = computed(() => {
    return {
        series: [
            {
                name: 'Trial Signup Site Conv. Rate',
                type: 'column',
                data: formattedNumberData.value[3] ? [...formattedNumberData.value[3]].slice(2) : [],
            },
            {
                name: 'Paid Sub Conv. Rate',
                type: 'column',
                data: formattedNumberData.value[6] ? [...formattedNumberData.value[6]].slice(2) : [],
            },
            {
                name: 'Trial signup conversion benchmark',
                type: 'line',
                data: formattedNumberData.value[3] ? new Array(12).fill([...formattedNumberData.value[3]][1]) : [],
            },
            {
                name: 'Paid subscription conversion benchmark',
                type: 'line',
                data: formattedNumberData.value[6] ? new Array(12).fill([...formattedNumberData.value[6]][1]) : [],
            },
        ],
        options: {
            ...lineChartMMROptions,
            chart: {
                ...lineChartMMRData.chart,
                toolbar: { show: false },
                height: '400px',
            },
            theme: {
                mode: currentTheme.value, // Use theme from useTheme composable
            },
            xaxis: {
                type: 'date',
                categories: formattedNumberData.value[0] ? [...formattedNumberData.value[0]].slice(2) : [],
            },
            // reset formatters to pure value
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + '%'; // No currency formatting for users chart
                    },
                },
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        return value + '%';
                    },
                },
            },
        },
    };
});

export function useChart() {
    return {
        lineChartMMRData,
        lineChartUsersData,
        columnChartAveragesData,
        performanceChartData,
    };
}
