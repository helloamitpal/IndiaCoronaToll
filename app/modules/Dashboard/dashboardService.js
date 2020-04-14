import moment from 'moment';

import translate from '../../locale';
import config from '../../config';

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

const getStatewiseReport = (statewiseData) => {
  return statewiseData.map(({ recovered, deaths, confirmed, active, lastupdatedtime, ...rest }) => ({
    ...rest,
    recovered,
    deaths,
    confirmed,
    active,
    lastupdatedtime: moment(lastupdatedtime, config.INPUT_DATE_FORMAT).format(config.DATE_FORMAT),
    deathsPerTotal: confirmed > 0 ? ((deaths / confirmed) * 100).toFixed(1) : 0,
    activePerTotal: confirmed > 0 ? ((active / confirmed) * 100).toFixed(1) : 0,
    recoverTotal: confirmed > 0 ? ((recovered / confirmed) * 100).toFixed(1) : 0
  }));
};

const getStateChartData = (statewiseData) => {
  return statewiseData.map(({ confirmed, state, statecode }) => ({
    id: statecode,
    state,
    value: Number(confirmed) || 0
  }));
};

const dashboardService = {
  getSynthesizedInfo: ({ cases_time_series: caseSeries, statewise, tested }) => {
    const infoObj = {};
    const stateWiseData = statewise.slice(1);

    infoObj.chartSeries = getDailyChartData(caseSeries.slice(0, -1));
    infoObj.kpi = getKPIData(caseSeries);
    infoObj.stateReports = getStatewiseReport(stateWiseData);
    infoObj.stateChartSeries = getStateChartData(stateWiseData);

    return infoObj;
  }
};

export default dashboardService;
