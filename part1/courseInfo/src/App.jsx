/*
Header takes care of rendering the name of the course,
Content renders the parts and their number of exercises and
Total renders the total number of exercises.
*/

const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
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
      <Part part={props.parts.parts[0].name} exercise={props.parts.parts[0].exercises} />
      <Part part={props.parts.parts[1].name} exercise={props.parts.parts[1].exercises} />
      <Part part={props.parts.parts[2].name} exercise={props.parts.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises 
      + props.parts.parts[2].exercises}
    </p>
  )
}

const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App