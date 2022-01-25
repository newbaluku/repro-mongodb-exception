const mongoose = require('mongoose'),
      { setupInitialCountryList } = require('./countryUtils'),
      { logd, logi } = require('./debuglog');

// TODO: add MongoDB URI
const DATABASEURL = '<-- mongodb uri -->';

let conn = null;

mongoose.Promise = global.Promise;

const setupInitialStates = async () => {
  await setupInitialCountryList();
};

const connectToDatabase = async () => {
  if (conn !== null) {
    const startT = new Date().getTime();
    await conn;
    const duration = new Date().getTime() - startT;
    // Connection readyState (0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)
    logd(`connectToDatabase> done wait conn. in ${duration}ms. conn.readyState: ${conn.readyState}`);
    return Promise.resolve();
  }

  const options = {
    // http://mongoosejs.com/docs/lambda.html
    // Buffering means mongoose will queue up operations if it gets
    // disconnected from MongoDB and send them when it reconnects.
    // With serverless, better to fail fast if not connected.
    bufferCommands: false, // Disable mongoose buffering

    // tell the MongoDB driver to not wait more than 5 seconds before erroring out if it isn't connected
    serverSelectionTimeoutMS: 5000,
  };

  logi('connectToDatabase> CREATING a new database connection.');
  conn = mongoose.connection;
  const startT = new Date().getTime();
  return mongoose.connect(DATABASEURL, options).then((db) => {
    const duration = new Date().getTime() - startT;
    logd(`connectToDatabase> MongoDB - isConnected: ${db.connections[0].readyState} in ${duration}ms`);
    return setupInitialStates();
  });
};

module.exports = { connectToDatabase };
