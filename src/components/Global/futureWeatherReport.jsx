export default function FutureWeatherReport(props = "") {
  let futureComponents = [];
  let clas = "";
  const Weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = new Date();
  day = day.getDay();
  for (let i = 0; i < Number(props.blocks); i++) {
    i == Number(props.block) - 1
      ? (clas = `${props.paddingInBlock}`)
      : (clas = `${props.paddingInBlock} border-b-2 border-gray-600`);
    futureComponents.push(
      <FutureWeatherReportBlock
        loc={props.loc}
        indi={i * 7}
        day={Weekday[(day + i) % 7]}
        class={clas}
        key={i}
      />
    );
  }

  return (
    <section className={`${props.class} sm:mx-auto`}>
            <h1 className='ml-2 2xl:text-3xl'>{props.blocks}-Day Forecast</h1>
            <section className={`grid grid-cols-1 ${'grid-rows-' + props.blocks}`}>
                {futureComponents}
            </section>
        </section>
  );
}

function FutureWeatherReportBlock(props = "") {
  return (
    <section className={`${props.class} flex justify-between items-center`}>
      <h1 className="2xl:text-2xl ml-2 w-2/6">{props.day}</h1>
      <section className="w-3/6 flex gap-4 justify-start items-center">
        <img
          className="h-8 2xl:h-12"
          src={`http://openweathermap.org/img/w/${
            props.loc.list[props.indi].weather[0].icon
          }.png`}
          alt=""
        />
        <p className="w-1/6 text-white 2xl:text-2xl">{props.loc.list[props.indi].weather[0].main}</p>
      </section>
      <h1 className="2xl:text-2xl">{Math.floor(props.loc.list[props.indi].main.temp -273.15)}&deg;C</h1>
    </section>
  );
}
