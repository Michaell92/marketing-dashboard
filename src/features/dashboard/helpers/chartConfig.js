export const lineChartMMROptions = {
    chart: {
        height: '100%',
        width: '100%',
        type: 'area',
        toolbar: { show: false },
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

export const barChartOptions = {
    chart: {
        height: '100%',
        width: '100%',
        type: 'bar',
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        },
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + '%';
        },
        offsetY: -20,
    },

    xaxis: {
        categories: [],
        position: 'bottom',
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            offsetY: 0,
            style: {
                colors: '#8E8DA4',
                fontSize: '12px',
                fontWeight: 400,
                whitespace: 'normal',
                wordbreak: 'break-word',
            },
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                },
            },
        },
        tooltip: {
            enabled: false,
        },
    },
    yaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};
