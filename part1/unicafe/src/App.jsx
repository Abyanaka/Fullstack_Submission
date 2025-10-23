import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1> statistics </h1>
        <p> No feedback given </p>
      </div>
    )
  }

  return (
    <div>
      <h1> statistics </h1>
      <table>
        <tbody>
          <StatisicLine text = "good" value = {props.good} />
          <StatisicLine text = "neutral" value = {props.neutral} />
          <StatisicLine text = "bad" value = {props.bad} />
          <StatisicLine text = "all" value = {props.all} />
          <StatisicLine text = "average" value = {props.average / props.all} />
          <StatisicLine text = "positive" value = {props.positive} />
        </tbody>
      </table>

    </div>

  )
}

const StatisicLine = ({ text, value }) => {
  if (text === "positive") {
    return(
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )

  }
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAvg] = useState(0)
  const [all, setAll] = useState(0)

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