// models/contact.model.js

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact