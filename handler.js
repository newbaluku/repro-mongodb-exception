const warmer = require('lambda-warmer');

const Responses = require('./helpers/responses'),
      { connectToDatabase } = require('./helpers/db'),
      { Country } = require('./model/country'),
      { logd, loge, logi } = require('./helpers/debuglog');

module.exports.queryCountries = async (event, context) => {
  // add this so that we can re-use any static/global variables between function calls if Lambda
  // happens to re-use existing containers for the invocation.
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (await warmer(event)) {
      logd('queryCountries> do nothing just warm up...');
      return;
    }

    console.time('connectToDatabase');
    await connectToDatabase();
    console.timeEnd('connectToDatabase');

    console.time('Country.findById');
    const found = await Country.findById('AU');
    console.timeEnd('Country.findById');

    logd('queryCountries> return...');
    return { country: found };
  }
  catch (e) {
    loge('queryCountries> Catch', e);
    return Responses.internalServerError(e);
  }
};