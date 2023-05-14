// routes/contacts.js

const router = require('express').Router()
let Contact = require('../models/contact.model')

router.route('/').get((req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const newContact = new Contact(req.body)

  newContact
    .save()
    .then((contact) => res.json(contact)) // Return the saved contact
    .catch((err) => res.status(400).json('Error: ' + err))
})


router.route('/:id').get((req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.firstName = req.body.firstName
      contact.middleName = req.body.middleName
      contact.lastName = req.body.lastName
      contact.phoneNumber = req.body.phoneNumber

      contact
        .save()
        .then((updatedContact) => res.json(updatedContact)) // Return the updated contact
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
