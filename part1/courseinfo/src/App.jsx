const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return(
    <div>
      <p>In this course you will learn:</p>

      <ul>
        <li> {props.parts[0].name}, {props.parts[0].exercises} exercises </li>
        <li> {props.parts[1].name}, {props.parts[1].exercises} exercises </li>
        <li> {props.parts[2].name}, {props.parts[2].exercises} exercises </li>
      </ul>
    </div>
  )
}

const Total = (props) => 
<p>Totalling as much as {props.parts[0].exercises + 
  props.parts[1].exercises + props.parts[2].exercises} exercises!</p>
  

const App = () => {
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App


