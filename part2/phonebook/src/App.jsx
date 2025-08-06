import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  const hook = () => {
    console.log('effect')

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addInfo = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const sameName = (person) => person.name === newName
    const nameExist = persons.some(sameName)

    if (nameExist) {
      const confirmChange = window.confirm(`${newName} is already added to phonebook,`
        + ` replace the old number with a new one?`)

      if (!confirmChange) {
        return
      }
      personService
        .update(persons.find(p => p.name === newName).id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => (p.id !== returnedPerson.id ? p : returnedPerson)))
          setNewMessage(`Number is changed`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNewMessage(`Information on '${newName}' has already been removed from server`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
        })
      return
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNewMessage(`Information on '${newName}' has already been removed from server`)
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.name !== newName))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilterValue(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`the person '${person.name}' was already removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter value={newFilterValue} onChange={handleFilterChange} />
      <h2>Add a New</h2>
      <PersonForm
        onSubmit={addInfo}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilterValue} handleDelete={handleDelete} />
    </div>
  )
}

export default App