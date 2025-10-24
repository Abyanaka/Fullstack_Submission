import { useState, useEffect } from 'react'
import contactService from './service/contact'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilterName(event.target.value)
  }
  
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('all fields need to be filled')
      return
    }

    const existing = persons.find(p => p.name === newName)
    // console.log(existing)

    if (existing) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with this instead?`
      )

      if (confirmed) {
        const changedPerson = { ...existing, number: newNumber }
        // console.log('changed person:', existing.id)
        contactService
          .update(existing.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('update failed', error)
            alert(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }

      return
    }

    const numberExists = persons.some(p => p.number === newNumber)
    if (numberExists) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const numberObject = { name: newName, number: newNumber }

    contactService
      .create(numberObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)

    if (!person) return

    if (!window.confirm(`Delete ${person.name}?`)) return

    contactService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.error('delete failed', error)
        alert(`Failed to delete ${person.name}`)
      })
  }

  const numbersToShow = filterName.trim() === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  useEffect(() => {
      // console.log('effect=')
      contactService
        .getAll()
        .then(initialContacts => {
          // console.log('promise fulfilled')
          // contactService.getAll() already returns response.data
          setPersons(initialContacts)
        })
    }, [])
    // console.log('render', numbersToShow.length, 'contacts')
  return (
    
    <div>
      {/* debug: {newName} */}
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} value={filterName} />

      <h3> Add a New Contact</h3>
      
      <PersonForm
       onSubmit={addNumber}
       name={newName}
       onNameChange={handleNameChange}
       number={newNumber}
       onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        onDelete={handleDelete}
        show={numbersToShow}
      />
      
    </div>
  )
}

export default App