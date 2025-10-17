const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const Header = () => {
  return(
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = (part) => {
  return(
    <>
      <p> This is part "{part.number}", with {part.amount} exercises.</p>
    </>
  )
}

const Content = () => {
  return(
    <>
      <Part number={part1} amount={exercises1} />
      <Part number={part2} amount={exercises2} />
      <Part number={part3} amount={exercises3} />
    </>
  )
}

const Total = () => {
  return(
    <>
      <p>With total of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

const App = () => {
  
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App