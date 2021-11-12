import React, { useState, useEffect } from "react";
import "./Weather.css";
const Weather = () => {
  const [search, setsearch] = useState("London");
  const [temp, settemp] = useState({});
  const getWeather = async (event) => {
    console.log(search);
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8362d851b2c2fec17202d7f65fd5d529`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      settemp(myNewWeatherInfo);
      console.log(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const changeSearch = (event) => {
    setsearch(event.target.value);
  };
  return (
    <>
      <article id="container" className="container">
        <header>
          <h1>Weather App</h1>
        </header>
        <div id="search" className="d-flex">
          <input
            id="searchInput"
            className="form-control"
            onChange={changeSearch}
            value={search}
            type="search"
            style={{
              fontSize: "24px",
              outline: "none",
              border: "1px solid black",
              borderRadius: "5px",
            }}
            placeholder="City..."
          />
          <button
            id="searchButton"
            className="btn btn-primary"
            type="submit"
            style={{
              cursor: "pointer",
              fontSize: "24px",
              backgroundColor: "lightblue",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
            }}
            onClick={getWeather}
          >
            Search
          </button>
        </div>
        <div id="info" className="d-flex myInfo">
          <section
            id="headingSection"
            className="d-flex d-md-flex align-items-center align-items-md-center"
          >
            <h2
              style={{
                border: "1px solid black",
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
              }}
            >
              {temp.temp} Farenheit
            </h2>
            <div
              style={{
                marginRight: "100px",
                backgroundColor: "lightsteelblue",
                padding: "5px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <h4
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "lightgoldenrodyellow",
                }}
              >
                {temp.weathermood}
              </h4>
              <h4
                style={{
                  border: "1px solid black",
                  borderRadius: "2px",
                  backgroundColor: "lightgreen",
                }}
              >
                {temp.name}, {temp.country}
              </h4>
            </div>
          </section>
          <section
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              backgroundColor: "lightcoral",
            }}
            className=" dateHead d-flex d-md-flex align-items-center align-items-md-center"
          >
            <h4>Last Checked {search && new Date().toLocaleString()}</h4>
          </section>
        </div>
      </article>
    </>
  );
};

export default Weather;
