import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Pelle Peloton', number: '040-123456' },
    { name: 'Aku Ankka', number: '050-555666' },
    { name: 'Mikki Hiiri', number: '040-333555' },
    { name: 'Iines Ankka', number: '050-222333' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const nameFound = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (nameFound) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }

    setNewName('');
    setNewNumber('');
  };

  const showPersons = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterBy={filterBy} setFilterBy={setFilterBy} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons showPersons={showPersons} />
    </div>
  );
};

export default App;