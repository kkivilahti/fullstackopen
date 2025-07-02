require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');

// custom morgan token to log request body
morgan.token('body', (request) => JSON.stringify(request.body));

const app = express();

app.use(express.static('dist'));
app.use(express.json());

// log http requests to console
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => response.json(result));
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(result => response.json(result))
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save()
        .then(savedPerson => response.status(201).json(savedPerson))
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end();
            }

            person.name = body.name;
            person.number = body.number;

            return person.save().then((updatedPerson) => response.json(updatedPerson));
        })
        .catch(error => next(error));
});

app.get('/info', async (request, response, next) => {
    try {
        const amount = await Person.countDocuments();

        const date = new Date();
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = new Intl.DateTimeFormat('en-BR', options).format(date);

        response.send(`
            <div style="text-align:center;font-family:helvetica;padding-top:50px;">
                <p>Phonebook has info for ${amount} people</p>
                <p>${formattedDate}</p>
            </div>
        `);
    } catch (error) {
        next(error);
    }
});

// middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// middleware to handle errors
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});