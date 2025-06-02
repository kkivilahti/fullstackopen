const Persons = ({ showPersons }) => {
  return (
    <ul>
      {showPersons.map((person) => (
        <li key={person.name}>{person.name}, {person.number}</li>
      ))}
    </ul>
  );
};

export default Persons;