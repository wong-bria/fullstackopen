import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')

  const addInfo = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const sameName = (person) => person.name === newName
    const nameExist = persons.some(sameName)

    if (nameExist) {
      alert(newName + ' is already added to phonebook')
    } else {
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
    setNewNumber('')
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

  const peopleToShow = newFilterValue === '' ? persons 
  : persons.filter(person => person.name.toLowerCase().startsWith(newFilterValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={newFilterValue} onChange={handleFilterChange}/>
      </div>
      <h2>Add a New</h2>
      <form onSubmit={addInfo}>
        <div>name: <input value={newName} onChange={handleNameChange}/> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </div>
  )
}

export default App