/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function Search({ setSCity = () => {}, setBtnPress = () => {}, btnPress = false, class: className = '' }) {
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const searchCity = () => {
    const cityName = searchInput.current?.value.trim();
    if (cityName) {
      setSCity(cityName); // Update parent state or global state
      navigate(`/Search/${cityName}`); // Navigate to the search route
    }
  };
  return (
    <section className={`${className} 2xl:text-2xl w-11/12 relative mx-auto`}>
      <input
        ref={searchInput}
        type="search"
        className="text-white w-full bg-cyan-600 p-2 pl-4 rounded-lg mx-auto"
        placeholder="Search for cities"
        onKeyUp={(e) => {
          if (e.key === 'Enter') searchCity(); // Trigger search on Enter
        }}
      />
      <Link to="/CurrentLocation" onClick={() => setBtnPress(!btnPress)}>
        <FontAwesomeIcon
          className="absolute bottom-3 right-[3.3rem] 2xl:right-[5rem]"
          icon={faLocationCrosshairs}
          style={{ color: '#ffffff' }}
        />
      </Link>
      <button onClick={searchCity}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute bottom-3 right-7 2xl:right-10"
          style={{ color: '#ffffff' }}
        />
      </button>
    </section>
  );
}
