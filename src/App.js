import { useEffect, useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import HistoryWeather from "./components/history/history";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import axios from "axios";
import CF from "./components/CF/cf.js"
import { useSnackbar } from "notistack";
import Map from "./components/map/map.js"
import Loader from "./components/Loader/Loader.js";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [historyWeather, setHistoryWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cf,setCF] = useState(true);
  const [loc,setLoc] = useState({lon:null,lat:null});
  const [preLoader, setPreLoader] = useState(false);


  useEffect(() => {
    async function init() {
      const data = await localStorage.getItem('cf'); 
      setCF(JSON.parse(data));
    }
    init();
}, [])

  useEffect(() => {
    setTimeout(() => {
      setPreLoader(false);
    }, 3000);
  }, [preLoader]);

  useEffect(()=>{
    if(loc.lat !== null && loc.lon !== null){
      const currentWeatherFetch = `${WEATHER_API_URL}/current.json?q=${loc.lat},${loc.lon}&key=${WEATHER_API_KEY}`
      const forecastFetch = `${WEATHER_API_URL}/forecast.json?q=${loc.lat},${loc.lon}&key=${WEATHER_API_KEY}&days=7`
      axios
      .get(currentWeatherFetch)
      .then((response) => {
        showSuccessSnack("Succesfull")
        const weatherResponse = response.data;
        setCurrentWeather({ city: "Delhi", ...weatherResponse });
      })
      .catch((err) => {
        showErrorSnack("API is Unavailable")
      });
      axios
      .get(forecastFetch)
      .then((response) => {
        showSuccessSnack("Succesfull")
        const forcastResponse = response.data.forecast.forecastday;
        setForecast({ city: "Delhi", ...forcastResponse });
      })
      .catch((err) => {
        showErrorSnack("API is Unavailable")
      });
    }
 
  },[loc])


  const showErrorSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const showSuccessSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const handleOnLocationChange = (searchData) => {
    if (navigator.geolocation) {
      showSuccessSnack("Succesfull")
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      showErrorSnack("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
      setLoc(()=>{
        return {
          lon:position.coords.longitude,
          lat:position.coords.latitude
        }
      })
    }
  }


  const handleOnSearchChange = (searchData) => {

    const [lat, lon] = searchData.value.split(" ");


    const currentWeatherFetch = `${WEATHER_API_URL}/current.json?q=${lat},${lon}&key=${WEATHER_API_KEY}`
    const forecastFetch = `${WEATHER_API_URL}/forecast.json?q=${lat},${lon}&key=${WEATHER_API_KEY}&days=7`
    // const historyFetch = `${WEATHER_API_URL}/history.json?q=${lat},${lon}&key=${WEATHER_API_KEY}&dt=2010-01-01`

    axios
    .get(currentWeatherFetch)
    .then((response) => {
      showSuccessSnack("Succesfull")
      const weatherResponse = response.data;
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
    })
    .catch((err) => {
      showErrorSnack("API is Unavailable")
    });

    // axios
    // .get(historyFetch)
    // .then((response) => {
    //   showSuccessSnack("Succesfull")
    //   const historyresponse = response.data;
    //   console.log(historyresponse)
    //   setCurrentWeather({ city: searchData.label, ...historyresponse });
    // })
    // .catch((err) => {
    //   showErrorSnack("The History Feature of API is a Premium Feature")
    //   console.log(err)
    // });

    axios
    .get(forecastFetch)
    .then((response) => {
      showSuccessSnack("Succesfull")
      const forcastResponse = response.data.forecast.forecastday;
      setForecast({ city: searchData.label, ...forcastResponse });
    })
    .catch((err) => {
      showErrorSnack("API is Unavailable")
    });
  };

  return (
    <>
      {preLoader ? <Loader /> : 
      <div className="container">
        <CF setCF = {setCF}/>
        <Search onSearchChange={handleOnSearchChange} />
        <Map handleOnLocationChange={handleOnLocationChange} />
        {currentWeather && <CurrentWeather data={currentWeather} cf={cf}/>}
        {/* {historyWeather && <HistoryWeather data={historyWeather} cf={cf}/>} */}
        {forecast && <Forecast data={forecast} cf={cf}/>}
      </div>
      }
    </>
  );
}

export default App;
