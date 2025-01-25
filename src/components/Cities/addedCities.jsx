import Search from "../Global/searchBar";
import Cities from "./cities";


export default function AddedCities(props =''){
  return (
    <section className={`${props.class} py-6 pr-2 w-full`}>
      <Search city ={props.sCity} setSCity = {props.setSCity} btnPress={props.btnPress} setBtnPress={props.setBtnPress} ></Search>
      <Cities selectedCity={props.selectedCity} setSelectedCity={props.setSelectedCity}></Cities>
    </section>
  )
}