export default function TodaysForecast(props = {}) {
  const infoComponents = [];
  let hour = new Date().getHours(); // Fixed getHours method
  let index = 0;

  while (index < props.box) {
    const className = index >= props.box - 1 ? "" : "border-r-2 border-gray-600";
    infoComponents.push(
      <Info
        indi={index}
        loc={props.loc}
        hour={hour % 24} // Ensure hour wraps around after 24
        className={className}
        key={index}
      />
    );
    hour += 3; // Increment by 3 hours for the next entry
    index += 1;
  }

  return (
    <section className={`${props.class} sm:mx-auto w-11/12 text-gray-300`}>
      <h1 className="2xl:text-2xl ml-2 mb-4">Today's Forecast</h1>
      <section className={`grid grid-cols-${props.box} grid-flow-col`}>
        {infoComponents}
      </section>
    </section>
  );
}

function Info(props = {}) {
  const hour = props.hour || 0; // Default to 0 if hour is not provided
  let formattedHour = hour;
  let unit = ":00 AM";

  // Format hour for 12-hour clock
  if (hour >= 12) {
    unit = ":00 PM";
  }
  if (hour > 12) {
    formattedHour = hour % 12;
  }

  const temp =
    Math.floor(
      props?.loc?.list?.[props.indi]?.main?.temp - 273.15
    ) || "N/A"; // Temperature conversion with safe access
  const icon =
    props?.loc?.list?.[props.indi]?.weather?.[0]?.icon || "01d"; // Default icon if not provided

  return (
    <section
      className={`${props.class} flex flex-col gap-3 justify-center items-center`}
    >
      <p className="lg:text-sm sm:text-[9px] 2xl:text-2xl">{formattedHour + unit}</p>
      <img
        className="w-8 2xl:w-16"
        src={`http://openweathermap.org/img/w/${icon}.png`}
        alt="Weather Icon"
      />
      <h1 className="text-white lg:text-lg sm:text-md 2xl:text-2xl font-bold">
        {temp}&deg;
      </h1>
      
    </section>
  );
}
