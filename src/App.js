import { useEffect, useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
// import HistoryWeather from "./components/history/history";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import axios from "axios";
import CF from "./components/CF/cf.js";
import { useSnackbar } from "notistack";
import Map from "./components/map/map.js";
import Loader from "./components/Loader/Loader.js";

// //FIREBASE
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [historyWeather, setHistoryWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cf, setCF] = useState(true);
  const [loc, setLoc] = useState({ lon: null, lat: null });
  const [preLoader, setPreLoader] = useState(true);

  useEffect(() => {
    async function init() {
      const data = await localStorage.getItem("cf");
      setCF(JSON.parse(data));
    }
    init();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPreLoader(false);
    }, 3000);
  }, [preLoader]);

  useEffect(() => {
    if (loc.lat !== null && loc.lon !== null) {
      const currentWeatherFetch = `${WEATHER_API_URL}/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${WEATHER_API_KEY}&units=metric`;
      const forecastFetch = `${WEATHER_API_URL}/forecast?lat=${loc.lat}&lon=${loc.lon}&appid=${WEATHER_API_KEY}&units=metric`;
      axios
        .get(currentWeatherFetch)
        .then((response) => {
          showSuccessSnack("Successful");
          const weatherResponse = response.data;
          setCurrentWeather({ ...weatherResponse });
        })
        .catch((err) => {
          showErrorSnack("API is Unavailable");
        });
      // try {
      //   const docRef = addDoc(collection(db, "users"), {
      //     City: currentWeather.location.name,
      //     Condition: currentWeather.current.condition.text,
      //     Temperature_C: currentWeather.current.temp_c + " °C",
      //     Temperature_F: currentWeather.current.temp_f + " °F",
      //     Wind: currentWeather.current.wind_kph + " Kph",
      //     Humidity: currentWeather.current.humidity + " %",
      //     Pressure: currentWeather.current.pressure_mb + " hPa",
      //   });
      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }

      axios
        .get(forecastFetch)
        .then((response) => {
          showSuccessSnack("Successful");
          const forcastResponse = response.data;
          console.log(forcastResponse);
          setForecast({ city: "Delhi", ...forcastResponse });
        })
        .catch((err) => {
          showErrorSnack("API is Unavailable");
        });
    }
  }, [loc]);

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

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDL3v3sl5dJyII8RdkaYSFvYCARh_-9bP8",
  //   authDomain: "weatherapp-a521f.firebaseapp.com",
  //   projectId: "weatherapp-a521f",
  //   storageBucket: "weatherapp-a521f.appspot.com",
  //   messagingSenderId: "1092954998228",
  //   appId: "1:1092954998228:web:9a78a00667803481208241",
  //   measurementId: "G-1B854RXDZW",
  // };

  // const app = initializeApp(firebaseConfig);
  // // const analytics = getAnalytics(app);
  // const db = getFirestore(app);

  const handleOnLocationChange = (searchData) => {
    if (navigator.geolocation) {
      showSuccessSnack("Successful");
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      showErrorSnack("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
      setLoc(() => {
        return {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };
      });
    }
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setLoc((location) => {
      return { ...location, lat: lat, lon: lon };
    });

    const currentWeatherFetch = `${WEATHER_API_URL}/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastFetch = `${WEATHER_API_URL}/forecast?lat=${loc.lat}&lon${loc.lon}&appid=${WEATHER_API_KEY}&units=metric`;
    // const historyFetch = `${WEATHER_API_URL}/history.json?q=${lat},${lon}&key=${WEATHER_API_KEY}&dt=2010-01-01`

    axios
      .get(currentWeatherFetch)
      .then((response) => {
        showSuccessSnack("Successful");
        const weatherResponse = response.data;
        console.log(weatherResponse);
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((err) => {
        showErrorSnack("API is Unavailable");
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
        showSuccessSnack("Successful");
        const forcastResponse = response.data;
        console.log(forcastResponse);
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => {
        showErrorSnack("API is Unavailable");
      });
  };

  return (
    <>
      {preLoader ? (
        <Loader />
      ) : (
        <div className="container">
          <CF setCF={setCF} />
          <Search onSearchChange={handleOnSearchChange} />
          <Map handleOnLocationChange={handleOnLocationChange} />
          {currentWeather && <CurrentWeather data={currentWeather} cf={cf} />}
          {/* {historyWeather && <HistoryWeather data={historyWeather} cf={cf}/>*/}
          {forecast && <Forecast data={forecast} cf={cf} />}
        </div>
      )}
    </>
  );
}

export default App;
