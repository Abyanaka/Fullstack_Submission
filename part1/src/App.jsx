const Header = (course) => {
  return(
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Content = (parts) => {
  return(
    <div>
      <p>In this course you will learn:</p>

      <ul>
        <li> {parts.parts[0].name}, {parts.parts[0].exercises} exercises </li>
        <li> {parts.parts[1].name}, {parts.parts[1].exercises} exercises </li>
        <li> {parts.parts[2].name}, {parts.parts[2].exercises} exercises </li>
      </ul>
    </div>
  )
}

const Total = (parts) => {
  const total = parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises
  return(
    <div>
      <p>Totalling as much as {total} exercises!</p>
    </div>
  )
}

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


