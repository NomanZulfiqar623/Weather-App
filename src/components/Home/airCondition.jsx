import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faWind,
  faDroplet,
  faFan,
} from "@fortawesome/free-solid-svg-icons";

export default function TodaysForecast(props = "") {
  return (
    <section
      className={`${props.class} mt-3 p-6 rounded-2xl w-11/12 bg-cyan-600 mx-auto text-gray-300`}
    >
      <section className="flex justify-between items-center">
        <h1 className="ml-2 mb-4 2xl:text-2xl lg:text-base sm:text-sm">
          Air Condition
        </h1>
        <button className="bg-sky-600 text-white lg:text-base sm:text-sm 2xl:text-2xl px-4 py-1 rounded-full mb-4 hover:bg-sky-800 ease-in-out duration-500">
          See More
        </button>
      </section>
      <section className="grid grid-cols-2 gap-4 lg:text-base sm:text-sm 2xl:text-2xl grid-rows-2">
        
        <Box>
          <section className="pl-3 flex flex-row gap-5">
            <FontAwesomeIcon
              className="h-6"
              icon={faTemperatureThreeQuarters}
              style={{
                "--fa-primary-color": "#ffffff",
                "--fa-secondary-color": "#ffffff",
              }}
            />
            <section className="">
              <p>Feels&apos;s Like</p>
              <h1 className="lg:text-2xl sm:text-lg 2xl:text-3xl font-bold text-white">
                {Math.floor(props.loc.list[0].main.feels_like - 273.15)}
                &deg;C
              </h1>
            </section>
          </section>
        </Box>
        <Box>
          <section className="pl-3 flex flex-row gap-5">
            <FontAwesomeIcon
              className="h-6"
              icon={faWind}
              style={{ color: "#ffffff" }}
            />
            <section className="">
              <p>Wind</p>
              <h1 className="lg:text-2xl sm:text-lg 2xl:text-3xl font-bold text-white">
                {props.loc.list[0].wind.speed} km/h
              </h1>
            </section>
          </section>
        </Box>
        <Box>
          <section className="pl-3 flex flex-row gap-5">
            <FontAwesomeIcon
              className="h-6"
              icon={faDroplet}
              style={{ color: "#ffffff" }}
            />
            <section className="">
              <p>Humidity</p>
              <h1 className="lg:text-2xl sm:text-lg 2xl:text-3xl font-bold text-white">
                {Math.floor(props.loc.list[0].main.humidity)}
              </h1>
            </section>
          </section>
        </Box>
        <Box>
          <section className="pl-3 flex flex-row gap-5">
            <FontAwesomeIcon
              className="h-6"
              icon={faFan}
              style={{ color: "#ffffff" }}
            />
            <section className="">
              <p>Gust</p>
              <h1 className="lg:text-2xl sm:text-lg 2xl:text-3xl font-bold text-white">
                {props.loc.list[0].wind.gust}
              </h1>
            </section>
          </section>
        </Box>
      </section>
    </section>
  );
}

function Box(props = '') {
  return <>{props.children}</>
}
