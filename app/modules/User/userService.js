const getSynthesizedUserDetails = (payload, addOnServiceListLength, packageListLength) => {
  const obj = {};

  payload.forEach((currentVal, index) => {
    let attr;

    if (index >= 0 && index <= addOnServiceListLength - 1) {
      attr = 'addOnServices';
    } else if (index >= addOnServiceListLength && index <= (packageListLength + addOnServiceListLength - 1)) {
      attr = 'packages';
    } else {
      attr = 'regions';
    }

    if (!obj[attr]) {
      obj[attr] = [...currentVal];
    } else {
      obj[attr] = [...obj[attr], ...currentVal];
    }
  });

  return obj;
};

const getSynthesizedRegions = (list) => {
  return list.map(({ regionCode, region, area, Country }) => ({
    regionCode,
    region: `${region}, ${area} (${Country})`
  }));
};

export default {
  getSynthesizedUserDetails,
  getSynthesizedRegions
};
