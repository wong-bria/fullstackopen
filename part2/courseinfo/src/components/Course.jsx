const Header = (props) => {
  return (
    <h2>
      {props.course.name}
    </h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.parts.map(part => (
        <Part key={part.id} part={part.name} exercise={part.exercises}/>
      ))}
    </div>
  )
}

// sum is accumulator and exercises and current value, and the 0 is initial value
const Total = (props) => {
  const total = props.parts.parts.map(part => part.exercises).reduce((sum, exercises) => sum + exercises, 0)

  return (
    <h3>
      Number of exercises {total}
    </h3>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course}/>
      <Content parts={props.course} exercise={props.course}/>
      <Total parts={props.course}/>
    </div>
  )
}

export default Course