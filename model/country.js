const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  _id: {
    type: String,
    minLength: 1,
    maxLength: 2,
    uppercase: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    minLength: 1,
    trim: true,
    required: true,
  },
  maxSms: {
    type: Number,
    min: 1,
    default: 1000
  },
  sentSms: {
    type: Number,
    min: 0,
    default: 0
  }
});

CountrySchema.methods.toJSON = function () {
  const country = this;

  return {
    code: country._id,
    name: country.name,
    maxSms: country.maxSms,
    sentSms: country.sentSms
  };
};

const Country = mongoose.model('Country', CountrySchema);

module.exports = { Country };
