import { useState, useEffect } from 'react'
import axios from 'axios'
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
  console.log(newName)

  if(newName === '' || newNumber === ''){
    alert ("all fields need to be filled")
    return
  }
  
  const checkNewName = persons.some(p => p.name === newName)
  const checkNewNumber = persons.some(p => p.number === newNumber)
  console.log('exists?', checkNewName)

  if (checkNewName){
    alert(newName + " is already added to phonebook")
    return
  }

  if (checkNewNumber){
    alert(newNumber + " is already added to phonebook")
    return
  }

  else{
    const numberObject = {
    id: persons.length + 1,
    name: newName,
    number : newNumber
    }

    setPersons(persons.concat(numberObject))
    setNewName('')
    setNewNumber('')
    }

  }

  const numbersToShow = filterName.trim() === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  useEffect(() => {
      console.log('effect=')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
    }, [])
    console.log('render', numbersToShow.length, 'contacts')
  return (
    
    <div>
      debug: {newName}
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

      <Persons show={numbersToShow} />  
      
    </div>
  )
}

export default App