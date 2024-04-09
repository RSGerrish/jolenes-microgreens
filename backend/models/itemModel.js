const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema ({
  imageUrl: {
    type: String,
    required: false
  },
  imageName: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  qp: {
    type: Array,
    required: false
  },
  benefits: {
    type: Array,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)