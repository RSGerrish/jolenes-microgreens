const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = new Schema ({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  weekly: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Address', addressSchema)