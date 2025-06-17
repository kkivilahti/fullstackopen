const express = require('express');
const app = express();

app.use(express.json());

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

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

const generateId = () => {
    // convert id to string to avoid type mismatches
    return Math.floor(Math.random() * 50).toString();
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const checkPerson = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase());
    if (checkPerson) {
        return response.status(400).json({
            error: 'name is already in the phonebook'
        });
    }

    // check if id exists -> if yes, generate new
    let id;
    do {
        id = generateId();
    } while (persons.find(person => person.id === id));

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);
    response.status(201).json(person);
});

app.get('/info', (request, response) => {
    let amount = persons.length;
    let now = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    }
    const formattedDate = Intl.DateTimeFormat('en-BR', options).format(now);

    response.send(`
        <p>Phonebook has info for ${amount} people</p>
        <p>${formattedDate}</p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});