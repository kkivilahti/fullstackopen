// Form to add a new person
const PersonForm = ({ newPerson, setNewPerson, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newPerson.name} onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })} />
      </div>
      <div>
        number: <input value={newPerson.number} onChange={(event) => setNewPerson({ ...newPerson, number: event.target.value })} />
      </div>
      <br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;