import { useState } from 'react'

const getRandomInt = (max) => {
  return (
    Math.floor(Math.random() * max)
  )
}

const Button = (props) => {
  return (
  <button onClick={props.onClick}>{props.text}</button>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = (newValue) => {
    setSelected(newValue)
  }

  const increaseVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  // max index of votes
  var maxIndex = 0;

  const findMaxIndex = () => {
    for (let index = 0; index < anecdotes.length; index++) {
      if (votes[index] > votes[maxIndex]) {
        maxIndex = index;
      }
    }
    return (
      maxIndex
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>Has {votes[selected]} votes</p>
      <div>
        <Button onClick={() => increaseVote()} text="vote" />
        <Button onClick={() => setToSelected(getRandomInt(8))} text="Next Anecdote" />
      </div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[findMaxIndex()]}</p>
    </div>
  )
}

export default App