import { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filterBy, setFilterBy] = useState('');
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Fetch initial data on first render
  useEffect(() => {
    personService.getAll().then(personData => {
      setPersons(personData);
      setNotification(null);
    });
  }, []);

  // Filter persons by the current search query
  const showPersons = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

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
            setNotification({ type: 'success', message: `${newPerson.name} updated` });
            console.log(`Updated ${newPerson.name}`);
          })
          .catch((error) => {
            setNotification({ type: 'error', message: `Information of ${checkPerson.name} has already been removed from server` });
            console.log('Error while updating: ', error);
          });
      }
    } else {
      personService
        .createPerson(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setNotification({ type: 'success', message: `${newPerson.name} added` });
          console.log(`Added ${addedPerson.name}`);
        })
        .catch((error) => {
          setNotification({ type: 'error', message: `Error while adding ${newPerson.name}` });
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
          setNotification({ type: 'success', message: `${deletedPerson.name} deleted` });
          console.log(`Deleted ${deletedPerson.name}`);
        })
        .catch((error) => {
          setNotification({ type: 'error', message: `Information of ${name} was already removed from server` });
          console.log('Error while deleting: ', error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification data={notification} setData={setNotification} />}
      <Filter filterBy={filterBy} setFilterBy={setFilterBy} />

      <h2>Add a new</h2>
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons showPersons={showPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;