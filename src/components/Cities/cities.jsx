/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DotLoader from "react-spinners/DotLoader.js";

export default function Cities(props = '') {
  const API_KEY = "3c42e01c0cf5437c928feb081ca04486";
  const [ready, setReady] = useState(false);
  const [citiesArr, setCitiesArr] = useState([]);
  const [locations, setLocations] = useState([]);

  async function getCityWeather(el, i, alengthn) {
    try {
      let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${el}&appid=${API_KEY}`);
      if (!resp.ok) {
        throw new Error('Invalid City Name !!!');
      }
      resp = await resp.json();
      const loc = resp;
      setLocations((prev) => [...prev, loc]);
      return resp;
    } catch (error) {
      console.warn(error);
    } finally {
      if (i === alengthn - 1) {
        setReady(true);
      }
    }
  }

  useEffect(() => {
    if (!ready) {
      let lsArr = localStorage.getItem('CityNames');
      if (lsArr && lsArr != '[]') {
        lsArr = JSON.parse(lsArr);
        lsArr.forEach((el, i) => {
          getCityWeather(el, i, lsArr.length);
        });
      }
      else {
        setReady(true);
      }
    }
  }, [ready]);

  useEffect(() => {
    setCitiesArr([]);
    for (let i = 0; i < locations.length; i++) {
      setCitiesArr((prev) => [...prev, <City selectedCity={props.selectedCity} setSelectedCity={props.setSelectedCity} locations={locations} setLocations={setLocations} loc={locations[i]} class="" key={i} />])
    }
  }, [locations])
  return (
    <>
      {!ready ? (
        <DotLoader
          color={`#ffffff`}
          loading={true}
          aria-label="Loading Spinner"
          size={150}
          data-testid="loader"
        />
      ) : (
        <section className={`${props.class} relative mt-6 mx-auto w-11/12`}>
          {citiesArr.length == 0 ? <p className='absolute top-28 left-28 text-lg text-green-300 border-dashed border-b-2'>Please Add Cities First !</p> : citiesArr}
        </section>
      )}
    </>
  );
}

function City(props = '') {
  function arrayRemove(arr, value) {
    return arr.filter(function (el) {
      return el != value;
    });
  }
  function removeCity(event) {
    let p = event.target.parentNode;
    let city = p.previousElementSibling.lastChild.firstChild.innerHTML;
    let lsArr = localStorage.getItem('CityNames');
    if (lsArr) {
      lsArr = JSON.parse(lsArr);
      if (lsArr.includes(city)) {
        lsArr = arrayRemove(lsArr, city);
        localStorage.setItem('CityNames', JSON.stringify(lsArr));
        props.setLocations((prev) => {
          return prev.filter(function (el) {
            return el.city.name != city;
          })
        });
      }
    }

  }
  function showCity(event) {
    let p = event.target.previousElementSibling.innerHTML;
    let arr = props.locations.filter((function (el) {
      return el.city.name == p;
    }))
    props.setSelectedCity(arr[0]);
  }


  return (
    <section className={`${props.class} city relative rounded-3xl py-6 px-8 my-4  text-white bg-cyan-600 flex justify-between items-center`} >
      <section className={`flex items-center gap-10 sm:gap-3`}>
        <img className='max-w-1/2  max-h-[60px]' src={`http://openweathermap.org/img/w/${props.loc.list[0].weather[0].icon}.png`} alt="Image Not Found" />
        <section>
          <h1 className='text-2xl sm:text-lg font-bold'>{props.loc.city.name}</h1>
          <button onClick={showCity} className='absolute right-2 bottom-1/3'><FontAwesomeIcon className='pointer-events-none' icon={faCaretRight} size="2xl" style={{ color: "#111827", }} /></button>
          <p className='text-gray-300 sm:text-md'>{props.loc.list[0].weather[0].description}</p>
        </section>
      </section>
      <section className='box-border flex flex-col'>
        <h1 className='text-4xl sm:text-2xl font-bold'>{Math.floor(props.loc.list[0].main.temp - 273.15)}&deg;</h1>
        <button onClick={removeCity}><FontAwesomeIcon icon={faTrashCan} className='pointer-events-none pl-3 mt-3 hover:text-red-700' style={{ color: "#ffffff" }} /></button>
      </section>
    </section>
  );
}
