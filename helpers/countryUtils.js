const { Country } = require('../model/country'),
      { logd, logi } = require('./debuglog');

const initialSupportedCountries = [
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Canada', code: 'CA' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Greece', code: 'GR' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Italy', code: 'IT' },
  { name: 'Japan', code: 'JP' },
  { name: 'Luxemberg', code: 'LU' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Malta', code: 'MT' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Norway', code: 'NO' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Russia', code: 'RU' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'India', code: 'IN' },
  { name: 'Israel', code: 'IL' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Kazakhstan', code: 'KZ' },
];

const setupInitialCountryList = async () => {
  initChangeStream();

  const count = await Country.countDocuments();
  if (count !== 0) {
    logi('setupInitialCountryList> country table inited.');
    return;
  }
  logi('setupInitialCountryList> setup country table for the first time...');
  for (let n = 0; n < initialSupportedCountries.length; ++n) {
    const country = new Country();
    country._id = initialSupportedCountries[n].code;
    country.name = initialSupportedCountries[n].name;
    await country.save();
  }
};

const initChangeStream = () => {   
  logd('initChangeStream> open change stream for Country...');
  Country.watch().on('change', change => {
    logd('initChangeStream.change> change:', change);

    if (change.operationType === 'insert') {
      logd('initChangeStream.change> insert:', change.fullDocument);
    }
    else if (change.operationType === 'update') {
      logd('initChangeStream.change> update:', change.documentKey._id);
    }
    else if (change.operationType === 'delete') {
      logd('initChangeStream.change> delete:', change.documentKey._id);
    }
  });
}

module.exports = {
  setupInitialCountryList,
};