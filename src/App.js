import { useState } from 'react';
import env from "react-dotenv";

// creates an api object with the api key and api endpoint url
const api = {
  key: env.API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {


  // setstate functions to update the current state of app components
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  // function to fetch the current weather from the api endpoint 
  const search = e => {
    if (e.key === "Enter") {
      // fetch api, uses template string format with baseUrl, query and api key
      // to hit the api endpoint and get the current weather for the given query
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)

      // takes the result from the endpoint (res) extracts the json object from the result
      .then(res => res.json())

      // updates setWeather function with result
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  // creates a new date object
  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // returns date object in template string format
    return `${day} ${date} ${month} ${year}`
  }


  return (
    // (if) typeof weather is not undefined, and (if) weather temp is above 16, set className to 'app warm'
    // else set className to 'app'
    // (if) typeof weather is undefined, set className to 'app'
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>

        {/* search box for user to enter a location */}
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."

            // when search box content changes, update setQuery with value
            onChange={e => setQuery(e.target.value)}

            // set value equal to query
            value={query}

            // when user hits return, call search function
            onKeyPress={search}
          />
        </div>

        {/* (if) typeof weather is not undefined (ie. has content) display weather */}
        {(typeof weather.main != "undefined") ? (
        <div>

          <div className="location-box">

            {/* displays location details from json object */}
            <div className="location">{weather.name}, {weather.sys.country}</div>

            {/* displays a new date object */}
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">

            {/* displays rounded temperature from json object */}
            <div className="temp">{Math.round(weather.main.temp)}&deg;c</div>

            {/* displays type of weather from json object */}
            <div className="weather">{weather.weather[0].main}</div>
          </div>

        </div>

        // (else) if type of weather is undefined, display nothing
        ) : ('')}

      </main>     
    </div>
  );
}

export default App;
