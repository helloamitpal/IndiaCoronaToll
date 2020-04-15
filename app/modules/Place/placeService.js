import moment from 'moment';
import config from '../../config';

const placeService = {
  synthesizeResponse: (dataset) => {
    const uniqObjList = dataset.reduce((acc, { address, latlong, _cn6ca, modeoftravel, timefrom, timeto, datasource, accuracylocation }) => {
      const addr = address.trim();

      if (addr && latlong && !acc.hasOwnProperty(addr)) {
        acc[addr] = {
          accuracylocation,
          modeoftravel: modeoftravel.trim(),
          datasource: (datasource.indexOf('http') === 0 ? datasource : ''),
          timefrom: (timefrom && moment(timefrom, config.INPUT_DATE_FORMAT).format(config.ANOTHER_DATE_FORMAT)) || null,
          timeto: (timeto && moment(timeto, config.INPUT_DATE_FORMAT).format(config.ANOTHER_DATE_FORMAT)) || null,
          value: _cn6ca,
          label: addr,
          address: addr,
          zoom: 13,
          position: latlong.split(',').map((val) => (+val))
        };
      }

      return acc;
    }, {});

    return Object.values(uniqObjList);
  }
};

export default placeService;
