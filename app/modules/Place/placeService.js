const getMapDataSeries = (dataset) => {

};

const getMapMarkers = (dataset) => {
  const uniqObjList = dataset.reduce((acc, { address, latlong }) => {
    const addr = address.trim();

    if (addr && !acc.hasOwnProperty(addr)) {
      acc[addr] = {
        address: addr,
        zoom: 8,
        position: latlong.split(',').map((val) => (+val))
      };
    }

    return acc;
  }, {});

  return Object.values(uniqObjList);
};

const placeService = {
  synthesizeResponse: (dataset) => {
    const infoObj = {};

    infoObj.data = getMapDataSeries();
    infoObj.markers = getMapMarkers(dataset);

    return getMapMarkers(dataset);
  }
};

export default placeService;
