require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`<p>phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
  .then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response,next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
  // const validateEntry = persons.some(e => e.name == body.name)

  // if(validateEntry){
  //   console.log(validateEntry)

  //   // app.put('/api/persons/:id', (request, respond, next) => {
  //   // const body = request.body

  //   // Person.findByIdAndUpdate(
  //   //   request.params.id,              
  //   //   { name: body.name,
  //   //     number: body.number 
  //   //   })
  //   //   .then(updated => {
  //   //     if (!updated) {
  //   //       console.log('failed')
  //   //       respond.status(404).json({ error: 'person not found' })
          
  //   //     } 
  //   //     respond.json(updated)
  //   //   })
  //   //   .catch(error => next(error))
  //   // })
  // }

})

app.put('/api/persons/:id', (request, respond, next) => {
    const {name, number} = request.body
    Person.findByIdAndUpdate(request.params.id,{ name,number }, { new: true, runValidators: true, context: 'query' })
      .then(updated => {
        if (!updated) {
          console.log('failed')
          respond.status(404).json({ error: 'person not found' })
          
        } 
        respond.json(updated)
      })
      .catch(error => next(error))
    })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})