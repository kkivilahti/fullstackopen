// Display persons as a list
const Persons = ({ showPersons, handleDelete }) => {
  return (
    <ul>
      {showPersons.map((person) => (
        <li key={person.id} style={{ margin: 5 }}>
          {person.name}, {person.number}

          <button onClick={() => handleDelete(person.id, person.name)} style={{ marginLeft: 5 }}>delete</button>
        </li>
      ))}

      {showPersons.length < 1 && <p style={{ color: 'red' }}><i>No numbers found</i></p>}
    </ul>
  );
};

export default Persons;