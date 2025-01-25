/* eslint-disable react/prop-types */
import Logo from '../Home/logo.jsx'
import Page from '../Home/page.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog, faList, faSliders } from '@fortawesome/free-solid-svg-icons';
import {
  Link
} from "react-router-dom";


export default function Navbar(props) {
  return (
    <section className={`${props.class} lg:h-[100vh] lg:sticky lg:top-0 2xl:text-2xl sm:w-full flex sm:flex-row justify-center lg:py-5 xl:px-2 lg:px-0`} >
      <section className="lg:bg-cyan-600 sm:bg-sky-600 lg:w-4/5 sm:w-full rounded-[20px] flex lg:flex-col sm:flex-row items-center py-6 gap-5" >
        <Logo class="lg:mb-12 lg:block sm:hidden "></Logo>
        <Page class="lg:mb-4 lg:w-full">
          <Link to="/" className="flex justify-center flex-col">
            <FontAwesomeIcon icon={faSmog} style={{ color: "#ffffff", }} />
            <p className={`${props.active == 'Home' ? 'text-white' : 'text-gray-300'} mt-2 mx-auto`}>Weather</p>
          </Link>
        </Page>
        <Page class="lg:mb-4 lg:w-full">
          <Link to="/cities" className="flex justify-center flex-col">
            <FontAwesomeIcon icon={faList} style={{ color: "#ffffff", }} />
            <p className={`${props.active == 'Cities' ? 'text-white' : 'text-gray-300'} mt-2 mx-auto`}>Citites</p>
          </Link>
        </Page>
        <Page class="lg:mb-4 lg:w-full">
          <FontAwesomeIcon icon={faSliders} style={{ color: "#ffffff", }} />
          <p className={`${props.active == 'Settings' ? 'text-white' : 'text-gray-300'} mt-2 mx-auto`}>Settings</p>
        </Page>
      </section>
    </section>
  )
}
