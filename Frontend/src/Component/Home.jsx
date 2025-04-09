import React, { useState } from 'react';
import axios from 'axios';
import Clouds from '../images/clouds.png';
import Rain from '../images/rain.png';
import Drizzle from '../images/drizzle.png';
import Clear from '../images/clear-sky.png';
import Mist from '../images/haze.png';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: Clouds,
  });

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=14f09c5ebb7f6e6d19e170e4625fedab&units=metric`;
      axios
        .get(apiUrl)
        .then((result) => {
          let imagePath = '';
          const main = result.data.weather[0].main;
          if (main === 'Clouds') imagePath = Clouds;
          else if (main === 'Clear') imagePath = Clear;
          else if (main === 'Rain') imagePath = Rain;
          else if (main === 'Drizzle') imagePath = Drizzle;
          else if (main === 'Mist') imagePath = Mist;
          else imagePath = Clouds;

          setData({
            celcius: result.data.main.temp,
            name: result.data.name,
            humidity: result.data.main.humidity,
            speed: result.data.wind.speed,
            image: imagePath,
          });
          setError('');
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setError('City not found. Please enter a valid city name.');
          } else {
            setError('Something went wrong');
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-blue-300 to-sky-200 px-4 py-12 animate-gradient-x">
      <div className="backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-xl text-center space-y-6 border border-white/20">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">🌤️ Weather Forecast</h1>

        <form className="flex gap-2 justify-center">
          <input
            type="text"
            placeholder="Enter city name"
            className="flex-1 bg-white/70 placeholder-gray-500 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleClick}
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 shadow-md transition duration-300"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg transition-all duration-300 text-gray-800 space-y-3">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <img src={data.image} alt="weather icon" className="mx-auto w-24 h-24 animate-pulse" />
          <p className="text-lg font-medium">
            🌡️ <span className="text-4xl font-bold text-blue-700">{Math.round(data.celcius)}°C</span>
          </p>
          <p className="text-sm text-gray-700">💧 Humidity: <strong>{data.humidity}%</strong></p>
          <p className="text-sm text-gray-700">💨 Wind Speed: <strong>{data.speed} m/s</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Home;
