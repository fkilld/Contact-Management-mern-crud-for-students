import React, { useEffect, useState } from 'react'
import ContactForm from './ContactForm'
import axios from 'axios'
import ContactList from './ContactList'

function App() {
  const [contacts, setContacts] = useState([])
  const [contactToBeEdited, setContactToBeEdited] = useState(null)

  const addContact = (contact) => {
    axios
      .post('http://localhost:5000/contacts/add', contact)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))

    setContacts([...contacts, contact])
  }

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:5000/contacts/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))

    const updatedContacts = contacts.filter((contact) => contact._id !== id)
    setContacts(updatedContacts)
  }

  const editContact = (contact) => {
    axios
      .get(`http://localhost:5000/contacts/${contact._id}`)
      .then((res) => setContactToBeEdited(res.data))
      .catch((err) => console.error(err))
  }

  const updateContact = (updatedContact) => {
    axios
      .post(
        `http://localhost:5000/contacts/update/${updatedContact._id}`,
        updatedContact
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))

    const updatedContacts = contacts.map((contact) =>
      contact._id === updatedContact._id
        ? { ...contact, ...updatedContact }
        : contact
    )
    setContacts(updatedContacts)
    setContactToBeEdited(null)
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/contacts/')
      .then((response) => {
        setContacts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Contact Management</h1>
      <ContactForm
        addContact={addContact}
        updateContact={updateContact}
        contactToBeEdited={contactToBeEdited}
        setContactToBeEdited={setContactToBeEdited}
      />
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
        editContact={editContact}
      />
    </div>
  )
}

export default App
