import Sunny from "../../assets/sunny.png";
import Cloudy from "../../assets/cloudy.png";
import Rainy from "../../assets/rainy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function currentTemperature(props = "") {
let el ='';
if(props.page === "Home"){
  el = <button onClick={saveCity} className="ml-2"><FontAwesomeIcon icon={faCirclePlus} style={{color:"slateGray", }} /></button>
}

function saveCity (){
  let ls = localStorage.getItem('CityNames');
  if(!ls){
    localStorage.setItem('CityNames', JSON.stringify([props.loc.city.name]));
  }
  else {
    let cArr = JSON.parse(ls);
    if (!cArr.includes(props.loc.city.name)) {
      cArr.push(props.loc.city.name);
      localStorage.setItem("CityNames", JSON.stringify(cArr));
      alert("City Added To The List");
    } else {
      alert("City is already in the list");
    }
  }
  console.log(props.loc.city.name);
}


  return <section className={`${props.class} sm:mx-auto`}>
<Information loc={props.loc} element={el}></Information>
<Icon loc={props.loc}></Icon>
  </section>;
}

function Information(props = "") {
  const location = props.loc || {};
  const cityName = location.city?.name || "Unknown";
  const country = location.city?.country || "Unknown";
  const weather = location.list?.[0]?.weather?.[0]?.description || "No data";
  return (
    <section
      className={`${props.class} text-white w-3/4 flex flex-col justify-between`}
    >
      <section className="2xl:mb-8">
      <h1 className='2xl:text-5xl lg:text-3xl sm:text-xl font-bold'>{props.loc.city.name + "-" + props.loc.city.country} {props.element}</h1>
        <p className="txet-gray-300 2xl:text-2xl lg:text-lg sm:text-md">
          {props.loc.list[0].weather[0].description}
        </p>
      </section>
      <section>
        <h1 className="2xl:text-5xl lg:text-5xl xm:text-3xl font-bold">{Math.floor(props.loc.list[0].main.temp -273.15)}&deg;C</h1>
      </section>
    </section>
  );
}

function Icon(props =''){
const [icon, setIcon] = useState(Sunny);
useEffect(()=> {
  if (props.loc.list[0].weather[0].main === "Clouds" || props.loc.list[0].weather[0].main === "Clear"){
    setIcon(Cloudy);
  }else if (props.loc.list[0].weather[0].main === "Rain"){
    setIcon(Rainy);
  }
}, [props.loc]);

  return(
    <section className={`${props.class} w-1/4 h-[140px]`}>
      <img className="max-w-1/2 max-h-[140px]" src={icon} alt="image Not Found" />
    </section>
  )
}
