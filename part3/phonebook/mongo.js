// for using mongodb from the command line

const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('remember to add password');
    process.exit(1);
}

// access command line arguments
const password = process.argv[2];
const nameInput = process.argv[3];
const numberInput = process.argv[4];

const url = `mongodb+srv://main:${password}@phonebook.ebuv5xr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .catch(error => {
        console.error('Connection error:', error.message);
        process.exit(1);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 4) {
    // add new person to the phonebook
    const person = new Person({ name: nameInput, number: numberInput });

    person.save().then(result => {
        console.log(`added ${result.name} / ${result.number} to phonebook`);
        
        mongoose.connection.close();
    });
} else {
    // display all people in the phonebook
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach((person) => {
            console.log(person.name, person.number);
        });

        mongoose.connection.close();
    });
}