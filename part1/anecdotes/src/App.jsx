import { useState } from 'react';

const Text = ({ value }) => {
  return (
    <p style={{ margin: '10px 0', fontSize: 18, maxWidth: 400 }}>{value}</p>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={{ marginRight: 5 }}>{text}</button>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const selectRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h2>Anecdote of the day</h2>

      <Text value={anecdotes[selected]} />
      <Text value={`has ${votes[selected]} votes`} />

      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={selectRandomAnecdote} text="next anecdote" />

      <h2>Anecdote with most votes</h2>

      {votes[mostVotedIndex] > 0 ? (
        <div>
          <Text value={`${anecdotes[mostVotedIndex]}`} />
          <Text value={`has ${votes[mostVotedIndex]} votes`} />
        </div>
      ) : (
        <Text value="No votes yet" />
      )}
    </div>
  );
};

export default App;