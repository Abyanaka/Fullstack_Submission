const Content = (props) => <li>{props.parts.name} {props.parts.exercises}</li>

const Total = (props) => {
  const total = props.parts.reduce((sum, e) => sum + e.exercises, 0)
  
    return <p><strong> Total of {total} exercises</strong></p>
}
const Header = (props) => {
//   console.log(course.parts)

  return(
    <>
     <h2>{props.course.name}</h2>
     <ul>
       {props.course.parts.map(p=> 
       <Content key={p.id} parts={p} />)}
       <Total parts={props.course.parts}/>
     </ul>
    </>
  )
}

export default Header