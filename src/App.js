import './index.css';
import react , {useState} from 'react';

const api={
  key: "c46dfdf48334608efb1e4dfdbf9a9f10",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery]= useState('');
  const [weather, setWeather] = useState({});
  const search = evt =>{
    if(evt.key == "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }
  const dateBuilder = (d) => {
  let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
let days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];            

let day=days[d.getDay()];
let date=d.getDate();
let month = months[d.getMonth()];
let year=d.getFullYear();

return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined")
    ?((weather.weather[0].main == 'Rain')
   ? 'app rain'
   :((weather.weather[0].main == 'Clouds')
   ?'app cloud'
   :((weather.weather[0].main == 'Clear')
   ?'app warm':"")))
:'app'}>
      <main>
        <div className="search_box">
          <input type="text" 
          className="search_bar" 
          placeholder="search..." 
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder (new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
        <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ):(<div className="not-found">Search a valid city🔍</div>)}
        
      </main>
    </div>
  );
}

export default App;
