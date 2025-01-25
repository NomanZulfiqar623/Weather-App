import FutureWeatherReport from "../Global/futureWeatherReport";

export default function NextDayForecast(props = "") {
  return (
    <section className={`${props.class}`}>
      <FutureWeatherReport
        btnPress={props.btnPress}
        loc={props.loc}
        blocks ="6"
        paddingInBlock="py-7"
        class="lg:mt-16 sm:mt-8 w-11/12 h-auto p-6 rounded-2xl bg-cyan-600 text-gray-300"
      ></FutureWeatherReport>
    </section>
  );
}


