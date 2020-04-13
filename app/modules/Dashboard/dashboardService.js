import translate from '../../locale';

const getGrowthRate = (currentVal, prevVal, reversed = false) => {
  if (prevVal === currentVal) {
    return 'same';
  }

  if (reversed) {
    return (currentVal > prevVal) ? 'down' : 'up';
  }

  return (currentVal > prevVal) ? 'up' : 'down';
};

const getDailyChartData = (caseSeries) => {
  const seriesConfig = {
    fill: true,
    data: []
  };

  return caseSeries.reduce((acc, { dailyconfirmed, dailydeceased, dailyrecovered, date }) => {
    acc.datasets[0].data = [...acc.datasets[0].data, Number(dailyconfirmed)];
    acc.datasets[1].data = [...acc.datasets[1].data, Number(dailydeceased)];
    acc.datasets[2].data = [...acc.datasets[2].data, Number(dailyrecovered)];
    acc.labels = [...acc.labels, date];

    return acc;
  }, {
    labels: [],
    datasets: [{
      label: translate('dashboard.confirmed'),
      backgroundColor: 'rgba(225, 0, 0, .2)',
      borderColor: '#ad1111',
      ...seriesConfig
    }, {
      label: translate('dashboard.deceased'),
      backgroundColor: 'rgba(242, 233, 135, .2)',
      borderColor: '#e58d30',
      ...seriesConfig
    }, {
      label: translate('dashboard.recovered'),
      backgroundColor: 'rgba(22, 175, 73, .3)',
      borderColor: '#16af49',
      ...seriesConfig
    }]
  });
};

const getKPIData = (caseSeries) => {
  const { totalconfirmed, totaldeceased, totalrecovered } = caseSeries[caseSeries.length - 1];
  const {
    totalconfirmed: yesterdayTotalconfirmed,
    totaldeceased: yesterdayTotaldeceased,
    totalrecovered: yesterdayTotalrecovered
  } = caseSeries[caseSeries.length - 2];

  const confirmedCount = totalconfirmed - yesterdayTotalconfirmed;
  const deceasedCount = totaldeceased - yesterdayTotaldeceased;
  const recoveredCount = totalrecovered - yesterdayTotalrecovered;

  return {
    totalconfirmed: {
      count: totalconfirmed,
      growthCount: `${confirmedCount > 0 ? '+' : '-'}${confirmedCount}`,
      label: translate('dashboard.confirmed'),
      growth: getGrowthRate(totalconfirmed, yesterdayTotalconfirmed)
    },
    totaldeceased: {
      count: totaldeceased,
      growthCount: `${deceasedCount > 0 ? '+' : '-'}${deceasedCount}`,
      label: translate('dashboard.deceased'),
      growth: getGrowthRate(totaldeceased, yesterdayTotaldeceased)
    },
    totalrecovered: {
      count: totalrecovered,
      growthCount: `${recoveredCount > 0 ? '+' : '-'}${recoveredCount}`,
      label: translate('dashboard.recovered'),
      growth: getGrowthRate(totalrecovered, yesterdayTotalrecovered, true)
    }
  };
};

const dashboardService = {
  getSynthesizedInfo: ({ cases_time_series: caseSeries, statewise, tested }) => {
    const infoObj = {};

    infoObj.chartSeries = getDailyChartData(caseSeries.slice(0, -1));
    infoObj.kpi = getKPIData(caseSeries);

    return infoObj;
  }
};

export default dashboardService;
