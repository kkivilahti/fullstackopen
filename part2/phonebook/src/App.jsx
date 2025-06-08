import { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filterBy, setFilterBy] = useState('');

  // Fetch initial data on first render
  useEffect(() => {
    personService.getAll().then(personData => {
      setPersons(personData);
    });
  }, []);

  // Filter persons by the current search query
  const showPersons = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  const addPerson = (event) => {
    event.preventDefault();
    const checkPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase());

    // If person exists, update; otherwise, add new
    if (checkPerson) {
      if (window.confirm(`${checkPerson.name} is already in the phonebook. Update number?`)) {
        personService
          .updatePerson(checkPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id === checkPerson.id ? returnedPerson : person));
            console.log(`Updated ${newPerson.name}`);
          })
          .catch((error) => {
            console.log('Error while updating a number: ', error);
          });
      }
    } else {
      personService
        .createPerson(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          console.log(`Added ${addedPerson.name}`);
        })
        .catch((error) => {
          console.log('Error while adding a new person: ', error);
        });
    }

    setNewPerson({ name: '', number: '' });
  };

  // Delete person after confirmation
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((deletedPerson) => {
          setPersons(persons.filter(person => person.id !== id));
          console.log(`Deleted ${deletedPerson.name}`);
        })
        .catch((error) => {
          console.log('Error while deleting a person: ', error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterBy={filterBy} setFilterBy={setFilterBy} />

      <h2>Add a new</h2>
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons showPersons={showPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;