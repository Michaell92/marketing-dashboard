import { computed, ref } from 'vue';
import { useTableData } from './useTableData';
import { useTheme } from '../../../shared/composables/useTheme';

const { formattedNumberData } = useTableData();
const { currentTheme } = useTheme();

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

const pieChartData = ref({ series: {}, options: {} });

export function useChart() {
    return {
        lineChartMMRData,
        lineChartUsersData,
        pieChartData,
    };
}

const lineChartMMROptions = {
    chart: {
        height: 550,
        width: 750,
        type: 'area',
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
    },
    xaxis: {
        type: 'datetime',
        categories: [],
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return '£' + value;
            },
        },
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm',
        },
        y: {
            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return '£' + parseInt(value);
            },
        },
    },
};
