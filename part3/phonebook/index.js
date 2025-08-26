require('dotenv').config()

const express = require('express')
const Person = require('./models/person')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))
app.use(express.json())

const morgan = require('morgan')
//app.use(morgan('tiny'))

// Custom token for POST request body
morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let data = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


// app.get('/api/persons', (request, response) => {
//     response.json(data)
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// app.get('/info', (request, response) => {
//     const date = new Date(Date.now())
//     response.send(`<div>Phonebook has info for ${data.length} people</div><br /><div>${date}</div>`)
// })

app.get('/info', (request, res, next) => {
  Person.find({})
    .then(response => {
      const date = new Date(Date.now())
      res.send(`<div>Phonebook has info for ${response.length} people</div><br /><div>${date}</div>`)
    })
    .catch((error) => next(error))
})

// app.get('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     const person = data.find(person => person.id === id)

//     if (person) {
//         response.json(person)
//     } else {
//         response.statusMessage = "Person not found"
//         response.status(404).end()
//     }
// })

// app.get('/api/persons/:id', (request, response) => {
//     Person.findById(request.params.id).then(person => {
//         response.json(person)
//     })
// })

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

// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     data = data.filter(person => person.id !== id)

//     response.status(204).end()
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateID = () => {
//   return Math.floor(Math.random() * 999999999)
// }

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'Name and number are required' })
  }

  if (data.find(person => person.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  const person = new Person({
    name: name,
    number: number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
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



// const PORT = 3001

// const PORT = process.env.PORT || 3001

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})