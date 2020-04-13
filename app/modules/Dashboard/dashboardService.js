const dashboardService = {
  getChartData: (regionList, addonsList, packageList, customerList) => {
    const usersPerPackage = { labels: [], values: [] };
    const usersPerAddons = { labels: [], values: [] };
    const usersPerRegion = { labels: [], values: [] };

    packageList.forEach(({ packageId, name }) => {
      const userLen = customerList.filter(({ package: userPackage }) => (userPackage.includes(packageId))).length;
      usersPerPackage.labels = [...usersPerPackage.labels, name];
      usersPerPackage.values = [...usersPerPackage.values, userLen];
    });

    addonsList.forEach(({ id, name }) => {
      const userLen = customerList.filter(({ addOnService }) => (addOnService.includes(id))).length;
      usersPerAddons.labels = [...usersPerAddons.labels, name];
      usersPerAddons.values = [...usersPerAddons.values, userLen];
    });

    regionList.forEach(({ regionCode, region }) => {
      const userLen = customerList.filter(({ regionCode: userRegionCode }) => (userRegionCode === regionCode)).length;
      usersPerRegion.labels = [...usersPerRegion.labels, region];
      usersPerRegion.values = [...usersPerRegion.values, userLen];
    });

    return {
      usersPerPackage: {
        plotarea: {
          margin: '100px 130px 70px 100px'
        },
        scaleX: {
          labels: [...usersPerPackage.labels]
        },
        scaleY: {
          label: {
            text: 'No of users'
          }
        },
        series: [{
          values: [...usersPerPackage.values]
        }]
      },
      usersPerAddons: {
        scaleX: {
          labels: [...usersPerAddons.labels]
        },
        series: [{
          values: [...usersPerAddons.values]
        }]
      },
      usersPerRegion: {
        plotarea: {
          margin: '100px 130px 70px 100px'
        },
        scaleX: {
          labels: [...usersPerRegion.labels]
        },
        scaleY: {
          label: {
            text: 'No of users'
          }
        },
        series: [{
          values: [...usersPerRegion.values]
        }]
      }
    };
  }
};

export default dashboardService;
