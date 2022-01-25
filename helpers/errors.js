function InvalidArgumentError(message) {
  this.name = 'InvalidArgumentError';
  this.message = message;
};
InvalidArgumentError.prototype = new Error();

module.exports = {
  InvalidArgumentError
};
