import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./Components/HeroSection";
import axios from "axios";

function App() {
  const [inputVisible, setInputVisible] = useState(false);
  const [city, setCity] = useState("Raipur");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleInputVisible = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setInputVisible(false);
    };
    document.addEventListener("mousedown", handleInputVisible);
    return () => {
      document.removeEventListener("mousedown", handleInputVisible);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: import.meta.env.VITE_API_KEY,
            units: "metric",
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(`Error fetching the data: ${error}`);
    }
  };

  return (
    <div className="w-full px-40 bg-[#11103A]">
      {/* Navbar */}
      <div className="w-full h-14 flex items-center justify-between bg-transparent text-lg">
        <p>Weather ForeCast </p>
        <div className="flex gap-20 items-center ">
          <div className="flex gap-2" ref={wrapperRef}>
            <p>
              <i className="ri-map-pin-line text-xl"></i>
            </p>
            {inputVisible ? (
              <input
                className="outline-none bg-transparent  text-white border-b-2  w-[180px] text-lg"
                value={city}
                type="text"
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <p
                className="flex gap-2 cursor-pointer w-[180px]"
                onClick={() => setInputVisible(true)}
              >
                <p>{city}</p>
              </p>
            )}
          </div>
          <button>
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </div>
      <HeroSection />
      <h1>Weather Data</h1>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <div>{}</div>
        </div>
      )}
    </div>
  );
}

export default App;
