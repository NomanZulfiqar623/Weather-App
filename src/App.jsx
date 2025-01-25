/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';  // Updated for React Router v6
import { useEffect, useState } from "react";
import Navbar from './components/Base/navbar';
import TodayReport from './components/Home/todayReport';
import NextDayForecast from './components/Home/nextDayForecast';
import AddedCities from './components/Cities/addedCities';
import SelectedCityInfo from './components/Cities/selectedCityInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Updated for React Router v6
import DotLoader from "react-spinners/DotLoader.js";

export default function App() {
  const API_KEY = "3c42e01c0cf5437c928feb081ca04486";
  const [currLoc, setCurrLoc] = useState(null);
  const [btnPress, setBtnPress] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sCity, setSCity] = useState(null);
  let [selectedCity, setSelectedCity] = useState(false);

  async function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        }, (e) => {
          alert("This website is unable to access your current location.");
          resolve([31.5204, 74.3587]);
        });
      } else {
        reject(new Error("Geolocation is not supported"));
      }
    });
  }

  async function getCurrentWeather() {
    setSCity(null);
    const [lat, long] = await getLocation();
    try {
      let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`);
      if (!resp.ok) {
        throw new Error('You must allow the current location setting!');
      }
      resp = await resp.json();
      setCurrLoc(resp);
      setLoading(false);
    }
    catch (e) {
      console.log(e);
    }
  }

  async function getCityWeather() {
    let resp = null;
    try {
      resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${sCity}&appid=${API_KEY}`);
      if (!resp.ok) {
        throw new Error('Invalid City Name!');
      }
      resp = await resp.json();
    }
    catch (error) {
      resp = currLoc;
      alert(error);
    }
    setCurrLoc(resp);
    setLoading(false);
  }

  useEffect(() => {
    if (btnPress) {
      (async () => {
        try {
          await getCurrentWeather();
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [btnPress]);

  useEffect(() => {
    if (sCity) {
      setBtnPress(false);
      setLoading(true);
      (async () => {
        try {
          await getCityWeather();
        } catch (error) {
          console.warn(error);
        }
      })();
    }
  }, [sCity]);

  return (
    <section className="flex lg:flex-row sm:flex-col bg-cyan-900">
      {loading ? 
        <DotLoader
          color={`#ffffff`}
          loading={true}
          aria-label="Loading Spinner"
          size={150}
          data-testid="loader"
        />
        :
        <Router>
          <Routes>
            <Route path='/' element={
              <>
                <Navbar active={'Home'} class="lg:basis-1/7 lg:static 2xl:basis-1/7 sm:fixed sm:bottom-0" />
                <TodayReport sCity={sCity} setSCity={setSCity} setBtnPress={setBtnPress} btnPress={btnPress} loc={currLoc} class="box-border lg:basis-4/7 sm:basis-full" />
                <NextDayForecast btnPress={btnPress} loc={currLoc} class="lg:basis-2/7 sm:mb-[7rem] lg:mb-0" />
              </>
            } />
            <Route path="/Search/:city" element={
              <>
                <Navbar active={'Home'} class="lg:basis-1/7 lg:static 2xl:basis-1/7 sm:fixed sm:bottom-0" />
                <TodayReport sCity={sCity} setSCity={setSCity} setBtnPress={setBtnPress} btnPress={btnPress} loc={currLoc} class="box-border lg:basis-4/7 sm:basis-full" />
                <NextDayForecast btnPress={btnPress} loc={currLoc} class="lg:basis-2/7 sm:mb-[7rem] lg:mb-0" />
              </>
            } />
            <Route path="/cities" element={
              <>
                <Navbar active={'Cities'} class="lg:basis-1/7 lg:static 2xl:basis-1/7 sm:fixed sm:bottom-0 z-10" />
                <AddedCities setBtnPress={setBtnPress} btnPress={btnPress} sCity={sCity} setSCity={setSCity} selectedCity={selectedCity} setSelectedCity={setSelectedCity} class="basis-4/7" />
                {!selectedCity ?
                  null :
                  <SelectedCityInfo setSelectedCity={setSelectedCity} loc={selectedCity} class="basis-2/7 sm:mb-[7rem] lg:mb-0" />
                }
              </>
            } />
          </Routes>
        </Router>
      }
    </section>
  );
}
