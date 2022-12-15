// API KEY!!
// https://api.openweathermap.org/data/2.5/weather?q=lahore&appid=ae1aff44b0dee0317624fc23a6da445a

import React, { useEffect } from "react";
import "./App.css";
import { BsCloudRain, BsClouds,BsCloudHaze, BsSun } from "react-icons/bs";
import { FaSmog } from "react-icons/fa";
import { TbMist} from "react-icons/tb";
import { WiHumidity, WiWindy } from "react-icons/wi";
import { IoPartlySunnyOutline } from "react-icons/io5";


const App = () => {
  
  const [WeatherState, setWeatherState] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("New York");
  const [fdata, setfdata] = React.useState("");
  const getWeather = async () => {
 
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ae1aff44b0dee0317624fc23a6da445a`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { country } = data.sys;
      const { speed } = data.wind;
      var myDataInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
      };
      setfdata(myDataInfo);

    } catch (err) {
      alert("Something went Wrong Or City Not Found")
      console.log(err);
    }
  };
  React.useEffect(() => {
    getWeather();
  }, []);

   // WeatherMood============
   useEffect(()=>{
   var WeathericonColor = document.body
    if(fdata.weathermood){
switch (fdata.weathermood) {
case "Clouds":
        setWeatherState( <BsClouds id="weathericon" />  );
        WeathericonColor.style.backgroundColor = "silver"
  break;
case "Smoke":
  setWeatherState( <FaSmog id="weathericon" />  );
        WeathericonColor.style.backgroundColor = " #CBDBDA "
  break;
case "Haze":
  setWeatherState( <BsCloudHaze id="weathericon" />  );
  WeathericonColor.style.backgroundColor = "#E6E6FA"
  break;
case "Rain":
        setWeatherState( <BsCloudRain id="weathericon" />  );
        WeathericonColor.style.backgroundColor = "#d4f1f9"
  break;
  case "Mist":
    setWeatherState( <TbMist id="weathericon" />  );
    WeathericonColor.style.backgroundColor = "#646D7E "
  break;
case "Clear":
  setWeatherState( <BsSun id="weathericon" />  );
  WeathericonColor.style.backgroundColor = "skyblue"
  break;
default:
  setWeatherState( <IoPartlySunnyOutline id="weathericon" />  );
  WeathericonColor.style.backgroundColor = "#f4d088 "
  break;
}
}
},[fdata.weathermood])
  // ======Time====
  let time = new Date().toLocaleString();
  const [cTime, setTime] = React.useState(time);
  React.useEffect(() => {
    setTimeout(() => {
      setTime(time);
    }, 1000);
  });

  return (
    <>
      <div className="searchcontainer">
        <input
          placeholder="Search by City/State/Country Names..."
          type="search"
          name=""
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={getWeather} className="searchbtn">
          Search
        </button>
      </div>
      {/* ============CARD CONTAINER================== */}

      <div className="container">
        <div id="weatherfontcontainer" className="weatherfontcontainer">
      {WeatherState} 
            <h2>
              {fdata.weathermood}
            </h2>
        </div>
        <div className="mainweatherforecastcontainer">
            <h1>{Math.round(fdata.temp)}&deg;C</h1>
            <h3>
              {fdata.name},{fdata.country}
            </h3>
            
            <h3>{cTime}</h3>
        </div>
        <div className="endcontainer">
            <div id="con1"  className="endcontainerchild">
              <div className="icon">
              <WiHumidity className="endcontainericon"  />
              </div>
              <div className="center">
              <h3>Humidity</h3>
              </div>
              <div className="Bottom">
              <h3>{fdata.humidity} g/m</h3>
              </div>
            </div>
            <hr />
            <div className="endcontainerchild">
              <div className="icon">
              <WiWindy className="endcontainericon"  />
              </div>
              <div className="center">
              <h3>Wind Speed</h3>
              </div>
              <div className="Bottom">
              <h3>{fdata.speed} m/s</h3>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default App;
