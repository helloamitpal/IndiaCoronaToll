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
  const confirmedLineColor = '#e58d30';
  const deathLineColor = '#ad1111';
  const recoveredLineColor = '#16af49';
  const chartToolbarConfig = {
    show: true,
    tools: {
      pan: false,
      selection: false,
      zoom: false,
      zoomin: false,
      zoomout: false,
      reset: false
    }
  };

  return caseSeries.reduce((acc, { dailyconfirmed, dailydeceased, dailyrecovered, date }) => {
    acc.datasets[0].data = [...acc.datasets[0].data, Number(dailyconfirmed)];
    acc.datasets[1].data = [...acc.datasets[1].data, Number(dailydeceased)];
    acc.datasets[2].data = [...acc.datasets[2].data, Number(dailyrecovered)];
    acc.options.xaxis.categories = [...acc.options.xaxis.categories, moment(date, config.ALTERNATE_INPUT_DATE_FORMAT).format()];

    return acc;
  }, {
    options: {
      chart: {
        id: 'dailycaselinechart',
        toolbar: { ...chartToolbarConfig }
      },
      stroke: {
        width: 2
      },
      colors: [confirmedLineColor, deathLineColor, recoveredLineColor],
      xaxis: {
        categories: [],
        type: 'datetime',
        min: moment(caseSeries[0].date, config.ALTERNATE_INPUT_DATE_FORMAT).format(),
        max: moment(caseSeries[caseSeries.length - 1].date, config.ALTERNATE_INPUT_DATE_FORMAT).format(),
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM yyyy',
            day: 'dd MMM'
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    },
    datasets: [{
      name: translate('dashboard.confirmed'),
      data: []
    }, {
      name: translate('dashboard.deceased'),
      data: []
    }, {
      name: translate('dashboard.recovered'),
      data: []
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

  const confirmedCount = +(totalconfirmed) - +(yesterdayTotalconfirmed);
  const deceasedCount = +(totaldeceased) - +(yesterdayTotaldeceased);
  const recoveredCount = +(totalrecovered) - +(yesterdayTotalrecovered);

  return {
    totalconfirmed: {
      count: totalconfirmed,
      growthCount: `${confirmedCount > 0 ? '+' : '-'}${confirmedCount}`,
      label: translate('dashboard.confirmed'),
      growth: getGrowthRate(+totalconfirmed, +yesterdayTotalconfirmed)
    },
    totaldeceased: {
      count: totaldeceased,
      growthCount: `${deceasedCount > 0 ? '+' : '-'}${deceasedCount}`,
      label: translate('dashboard.deceased'),
      growth: getGrowthRate(+totaldeceased, +yesterdayTotaldeceased)
    },
    totalrecovered: {
      count: totalrecovered,
      growthCount: `${recoveredCount > 0 ? '+' : '-'}${recoveredCount}`,
      label: translate('dashboard.recovered'),
      growth: getGrowthRate(+totalrecovered, +yesterdayTotalrecovered, true)
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
    lastupdatedtime: moment(lastupdatedtime, config.INPUT_DATE_FORMAT).format(config.ANOTHER_DATE_FORMAT),
    deathsPerTotal: confirmed > 0 ? ((deaths / confirmed) * 100).toFixed(0) : 0,
    activePerTotal: confirmed > 0 ? ((active / confirmed) * 100).toFixed(0) : 0,
    recoverPerTotal: confirmed > 0 ? ((recovered / confirmed) * 100).toFixed(0) : 0
  }));
};

const getStateChartData = (statewiseData) => {
  return statewiseData.map(({ confirmed, state, statecode }) => ({
    id: statecode,
    state,
    value: Number(confirmed) || 0
  }));
};

const getTestingRecords = (testData, caseSeries) => {
  const arrObj = {};

  for (let index = testData.length - 1, caseIndex = caseSeries.length - 1; index >= 0; index -= 1, caseIndex -= 1) {
    const { totalsamplestested, updatetimestamp } = testData[index];
    const { dailyconfirmed, dailydeceased, dailyrecovered } = caseSeries[caseIndex];
    const { dailyconfirmed: prevConfirmed, dailydeceased: prevDeath, dailyrecovered: prevRecovered } = caseSeries[caseIndex - 1];
    const notFound = translate('common.notFound');
    const confirmDiff = Number(dailyconfirmed) - Number(prevConfirmed);
    const deathDiff = Number(dailydeceased) - Number(prevDeath);
    const recoverDiff = Number(dailyrecovered) - Number(prevRecovered);
    const date = moment(updatetimestamp, config.INPUT_DATE_FORMAT).format(config.ALTERNATE_DATE_FORMAT);

    if (!arrObj.hasOwnProperty(date)) {
      arrObj[date] = {
        date,
        totalsamplestested: totalsamplestested || translate('common.notFound'),
        totalpositivecases: dailyconfirmed || notFound,
        totaldeceased: dailydeceased || notFound,
        totalrecovered: dailyrecovered || notFound,
        recoveryCaseChange: `${recoverDiff > 0 ? '+' : ''}${recoverDiff}`,
        deathCaseChange: `${deathDiff > 0 ? '+' : ''}${deathDiff}`,
        positiveCaseChange: `${confirmDiff > 0 ? '+' : ''}${confirmDiff}`
      };
    }
  }

  return Object.values(arrObj);
};

const dashboardService = {
  getSynthesizedInfo: ({ cases_time_series: caseSeries, statewise, tested }) => {
    const infoObj = {};
    const stateWiseData = statewise.slice(1);

    infoObj.chartSeries = getDailyChartData(caseSeries);
    infoObj.kpi = getKPIData(caseSeries);
    infoObj.stateReports = getStatewiseReport(stateWiseData);
    infoObj.stateChartSeries = getStateChartData(stateWiseData);
    infoObj.testingRecords = getTestingRecords(tested, caseSeries);

    return infoObj;
  }
};

export default dashboardService;
