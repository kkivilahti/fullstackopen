import { useState } from 'react';

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? `${value} %` : value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;

  if (total === 0) {
    return (
      <p>No feedback given yet</p>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={(good * 1 + bad * -1) / total} />
        <StatisticsLine text="positive" value={good / total * 100} />
      </tbody>
    </table>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>

      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;