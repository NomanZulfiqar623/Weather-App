import CurrentTemperature from "../Global/currentTemperature"
import TodaysForecast from "../Global/todayForecast"
import FutureWeatherReport from "../Global/futureWeatherReport"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"


export default function SelectedCityInfo(props=''){
  function crossFunc() {
    props.setSelectedCity(null);
}

  return(
    <section className={`${props.class} relative`}>
            <button onClick={crossFunc} className='absolute top-2 right-5' ><FontAwesomeIcon icon={faXmark} style={{ fontSize: '25px', color: "#ff0000", }} /></button>
            <CurrentTemperature loc={props.loc} class="w-11/12 mt-16 sm:mt-8 flex justify-between"></CurrentTemperature>
            <TodaysForecast loc={props.loc} box='3' class="my-5 py-5 border-t-2 border-b-2 border-gray-600"></TodaysForecast>
            <FutureWeatherReport loc={props.loc} blocks='3' paddingInBlock="py-3" class="w-11/12 text-gray-400"></FutureWeatherReport>
        </section>
  )
}