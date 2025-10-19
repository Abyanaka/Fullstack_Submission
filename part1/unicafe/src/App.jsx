import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  return (
    <div>

      <h1> statistics </h1>
      <p> good {props.good} </p>
      <p> neutral {props.neutral} </p>
      <p> bad {props.bad} </p>
      <p> all {props.bad} </p>
      <p> average {props.average / props.all}</p>
      <p> positive {props.positive} % </p>

    </div>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAvg] = useState(0)
  const [all, setAll] = useState(0)

  // const all = good + neutral + bad
  const positive = (good / all) * 100
  
  const handlerGoodClick = () => {
    const updatedGood = good + 1
    const updatedAvg= average + 1
    const updatedAll= updatedGood + neutral + bad

    setGood(updatedGood)
    console.log('Good', updatedGood)

    setAll(updatedAll)  
    console.log('All', updatedAll)

    setAvg(updatedAvg)
    console.log('Avg', updatedAvg)
  }

  
  const handlerNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAvg= average + 0
    const updatedAll= updatedNeutral + good + bad

    setNeutral(updatedNeutral)
    console.log('Neutral', updatedNeutral)

    setAll(updatedAll)  
    console.log('All', updatedAll)

    setAvg(updatedAvg)
    console.log('Avg', updatedAvg)
  }

  const handlerBadClick = () => {
    const updatedBad = good + 1
    const updatedAvg= average - 1
    const updatedAll= updatedBad + neutral + bad

    setBad(updatedBad)
    console.log('Bad', updatedBad)

    setAll(updatedAll)  
    console.log('All', updatedAll)

    setAvg(updatedAvg)
    console.log('Avg', updatedAvg)
  }


  return (
    <div>
      <Header />

      <Button onClick={handlerGoodClick} text="good" />
      <Button onClick={handlerNeutralClick} text="neutral" />
      <Button onClick={handlerBadClick} text="bad" />
      
      <Statistics 
      good={good} 
      bad={bad} 
      neutral={neutral}
      all={all}
      average={average}
      positive={positive}
      />
    </div>
  )
}

export default App