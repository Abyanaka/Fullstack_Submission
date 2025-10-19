import { useState } from 'react'

const Anecdotes = (props) => {
  return(
    <>
     <h1>Anecdote of the day</h1>
     <p>{props.next} </p>  
    </>

  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Votes = (props) => {
  console.log('props votes', props)
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </>
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
  const maxVotes = Math.max(...votes)
  const indexOfMaxVotes = votes.indexOf(maxVotes)
  const winner = {
    anecdote: anecdotes[indexOfMaxVotes], 
    votes: maxVotes
  }
  const pnrg = () => Math.floor(Math.random() * anecdotes.length)

  const handleNextAnecdote = () => {
    const next = pnrg()
    setSelected(next)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    console.log('votes', newVotes)
  }


  return (
    <div>
      <Anecdotes next={anecdotes[selected]} />
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text ="vote"/>
      <Button onClick={handleNextAnecdote} text ="next anecdote"/>
      <Votes anecdote={winner.anecdote} votes={winner.votes} />
    </div>
  )
}

export default App