const log = (message, params) => {
  if (params) {
    console.log(message, params);
  }
  else {
    console.log(message);
  }
};

// most verbose level that logs everything
const logd = (message, params) => {
  if (process.env.DEBUG_LOG_LEVEL === 'debug') {
    log(message, params);
  }
};

// logs info and errors
const logi = (message, params) => {
  if (process.env.DEBUG_LOG_LEVEL === 'debug' ||
      process.env.DEBUG_LOG_LEVEL === 'info') {
    log(message, params);
  }
};

// highest, most limited level that logs errors only
const loge = (message, params) => {
  if (process.env.DEBUG_LOG_LEVEL === 'debug' ||
      process.env.DEBUG_LOG_LEVEL === 'info' ||
      process.env.DEBUG_LOG_LEVEL === 'error') {
    log(`Error: ${message}`, params);
  }
};

module.exports = {
  logd,
  logi,
  loge
};
