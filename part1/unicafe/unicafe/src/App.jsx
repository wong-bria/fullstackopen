import { useState } from 'react'

// Handles the functionality of each feedback submission button
const Button = (props) => (
  <button onClick={props.onClick}> {props.text} </button>
)

// Displaying a single statistic
const StatisticLine = (props) => {
  if (props.text == "Positive") {
    return (
      // <p>{props.text}: {props.value} %</p>
      <tr>
        <td>
          {props.text}:
        </td>
        <td> 
          {props.value} %
        </td>
      </tr>
    )
  }

  return (
    // <p>{props.text}: {props.value}</p>
    <tr>
      <td>
        {props.text}:
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}


// Displaying Statistics
const Statistics = (props) => {
  if (props.good + props.neutral + props.bad == 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No Feedback Given
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value ={props.good} />
          <StatisticLine text="Neutral" value ={props.neutral} />
          <StatisticLine text="Bad" value ={props.bad} />
          <StatisticLine text="All" value ={props.good + props.neutral + props.bad} />
          <StatisticLine text="Average" value ={(props.good * 1 + props.neutral * 0 + props.bad * -1) / 
            (props.good + props.neutral + props.bad)} />
          <StatisticLine text="Positive" value ={(props.good / (props.good + props.neutral + props.bad)) * 100} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App