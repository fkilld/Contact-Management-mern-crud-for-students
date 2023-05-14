import React from 'react'

const ContactList = ({ contacts, deleteContact, editContact }) => (
  <div>
    {contacts.map((contact) => (
      <div key={contact._id}>
        <h2>
          {contact.firstName} {contact.middleName} {contact.lastName}
        </h2>
        <p>{contact.phoneNumber}</p>
        <button onClick={() => editContact(contact)}>Edit</button>
        <button onClick={() => deleteContact(contact._id)}>Delete</button>
      </div>
    ))}
  </div>
)

export default ContactList
