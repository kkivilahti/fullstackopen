const Filter = ({ filterBy, setFilterBy }) => {
  return (
    <form>
      <div>
        filter by <input value={filterBy} onChange={(event) => setFilterBy(event.target.value)} />
      </div>
    </form>
  );
};

export default Filter;