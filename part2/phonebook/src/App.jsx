import { useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { id:1 , name: 'Arto Hellas', number: '123-456-789' },
    { id:2 , name: 'Ilham Sujarwo', number: '124-555-781' },
    { id:3 , name: 'Snow White', number: '122-333-345' },
    { id:4 , name: 'Hercules', number: '123-173-11' },
  ]) 
  // console.log(persons)
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