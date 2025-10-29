import { useState, useEffect } from 'react'
import countryCall from './services/countryCall'


const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }, [capital])

  if (!weatherData) {
    return <p>Loading weather data...</p>
  }

  return (
    <div>
      <p>Temperature: {weatherData.current.temp_c} °C</p>
      <img 
        src={weatherData.current.condition.icon} 
        alt={weatherData.current.condition.text} 
      />
      <p>Wind: {weatherData.current.wind_kph} m/s</p>
    </div>
  )
}



const App = () => {
  const [countries,setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')  

  const onFindChange = (event) => {
    setFilterCountry(event.target.value)
  }

  useEffect(() => {
      countryCall
      .getAll()
      .then(returnedCountry => {
        console.log('done retreiving countries')
        setCountries(returnedCountry)

      }
      )
      .catch(error => {
        console.error(error)
      })
    
  }, [])

  const handleViewButton = (event) => {
    const countryName = event.target.parentNode.firstChild.textContent.trim()
    //that long ass thing was to extract text from a list
    //1.event.target => this is the button
    //2. parentNode => this is where they go up to the parent element, or the list
    //3. firstChild => in that list, select the first child (in this case, the first child is the map() of countries, 
    // the 2nd child is the button)
    //4. textContent.trim() => extract the text inside and remove the blanks if any
    setFilterCountry(countryName)
  }


  const countryList = filterCountry
    ? countries.filter(ctr =>
        ctr.name.common.toLowerCase().includes(filterCountry.toLowerCase())
      )
    : []

  // console.log('filtering',countryList)
  console.log('countries', countryList)
 
  return (   
    <div>
      <div>
        find countries <input
          value={filterCountry}
          onChange={onFindChange}
        />
      </div>
      
        {countryList.length > 0 
        ? countryList.length > 10 
          ? "Too many Matches, specify another filter"
          : countryList.length === 1
            ? (
            <div>
              <h1>{countryList[0].name.common}</h1>
              <p>Capital: {countryList[0].capital}</p>
              <p>Area: {countryList[0].area}</p>

              <h2> Languages </h2>
              <ul>
                  {Object.values(countryList[0].languages)
                  .map(lang => <li key={lang}> {lang} </li>)}
              </ul>
              <img src={countryList[0].flags.png} 
              alt={`flag of ${countryList[0].name.common}`} style={{ width: 200 }} />

              <h2> Weather in {countryList[0].capital} </h2>
              <Weather capital={countryList[0].capital} />
              
            </div>
            )
            : countryList.map(ctr => 
            <li> 
              {ctr.name.common} <button type='button' onClick={handleViewButton}>view</button> 
              </li>) 

        : filterCountry.trim() === '' 
          ? "Type a country name"
          : "No results found"
        }
      
    </div>
  )
}

export default App