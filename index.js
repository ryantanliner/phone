const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

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


app.get('/info', (request, response) => {
    const size = persons.length
    const today = new Date()
    response.send(`
        <p>Phonebook has ${size} people</p>
        <p>${today}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const per = persons.find(per => per.id == id)
    if (per){
        response.json(per)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(per => per.id != id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
}
  

app.post('/api/persons', (request, response) => {
    const per = request.body

    if(!per.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!per.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const alreadyIn = persons.find(person => person.name === per.name)

    if(alreadyIn){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const personObj = {
        id: generateId(),
        name: per.name,
        number: per.number
    }


    persons = persons.concat(personObj)
    response.json(personObj)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})