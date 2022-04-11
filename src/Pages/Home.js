import {useContext} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {loginValidation, logout, useMisc} from '../App';
import HomeNavigation from '../Componenets/HomeNavigation';

export const times = (data:void) => {
  const bob = translateHours({
    "mon": data?.mon?data.mon:"08:00,17:00",
    "tue": data?.tue?data.tue:"08:00,17:00",
    "wed": data?.wed?data.wed:"08:00,17:00",
    "thu": data?.thu?data.thu:"08:00,17:00",
    "fri": data?.fri?data.fri:"08:00,17:00",
    "sat": data?.sat?data.sat:"closed",
    "sun": data?.sun?data.sun:"closed" })
  return bob;
}

export const booked = (data:void) => {
  return translateTime ({
    "booked": data?.isbooked?data.isbooked==='y'?true:false:false,
    "until": data?.booked?data.booked:"2022-03-19",
    "until_raw": data?.booked?data.booked:"2022-03-19" }) //"2022-03-19T10:10:30Z" } //If you put a Z at then end of it then the Time seems to become UTC or Non UTC
}

export default function Home({getUser, setUser, emergency=false}) {
  const {getTimes, getBooked} = useContext(useMisc);
  const navigate = useNavigate();
  // console.log(setUser);
  return (
    <>
      <HomeNavigation emergency={emergency}/>
      <div className="App-Container">
        <Outlet />
        <div className="App">
          <header className="App-header">
            <h1 className="App-Name">Finnerty Automotive</h1>
          </header>
          <div id="services">
            <h3 className="headding">Our Services</h3>
            <ul className="services-list">
              <li className="grid-item-left">Vehicle Servicing</li>
              <li className="grid-item-right">Brake & Clutch</li>
              <li className="grid-item-left">Wheel Alignments</li>
              <li className="grid-item-right">Automotive Repairs</li>
              <li className="grid-item-left">Tyre Fitment and Balancing</li>
              <li className="grid-item-right">Air Conditioning Services <a href="#contact">*</a></li>
              <li className="grid-row-cover">Authorized Inspection Station (including LPG)</li>
              <li className="grid-row-cover">EFI Diagnostics & Tuning Specialist</li>
              <li className="grid-row-cover">Ultra Sonic Fuel Injector Service</li>
              <li className="grid-row-cover">24 Hour Towing Service</li>
            </ul>
          </div>
          <div id="location">
            <h3 className="headding">Where We Are</h3>
            <div className="location-content">
              <iframe 
                title="Finnerty Automotive Location" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1600.1655851205126!2d149.82419663163137!3d-36.66653775415045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b3c29e909d0b783%3A0xd764e1d64c8df041!2sFinnerty%20Automotive!5e0!3m2!1sen!2sau!4v1645762061637!5m2!1sen!2sau" 
                width="400" height="300" 
                allowFullScreen="" loading="lazy"
                samesite="none">
              </iframe>
              <ul className="location-list">
                <li>Find us at </li>
                <li>Corner of West & Ridge Street</li>
                <li>North Bega NSW 2550</li>
              </ul>
            </div>
          </div>
          <div id="about">
            <h3 className="headding">About Finnerty Automotive</h3>
            <div className="about-content">
              <img src={`${process.env.PUBLIC_URL}/IMG_0935.jpeg`} alt="wheel alignemnt" width="400px" height="300px"/>
              <p>
                We have a combined 84 years of experice within the Automotive Industry and 
                we strive to give top level service and performance to our customers. 
                We try to always have a one on one base with our customers.
                Our shop has lived in North Bega for over 14 years, providing the best
                service to the Bega Valley Area. 
              </p>
            </div>
          </div>
          <div id="hours">
            <h3 className="headding">Business Hours</h3>
            <div className="hours-content">
              <div className="business-hours">
                <ul className="column-days">
                  <li>Monday</li>
                  <li>Tuesday</li>
                  <li>Wednesday</li>
                  <li>Thursday</li>
                  <li>Friday</li>
                  <li>Saturday</li>
                  <li>Sunday</li>
                </ul>
                <ul className="column-hours">
                  <li>{hoursToString(getTimes?.mon?getTimes.mon:times().mon)}</li>
                  <li>{hoursToString(getTimes?.tue?getTimes.tue:times().tue)}</li>
                  <li>{hoursToString(getTimes?.wed?getTimes.wed:times().wed)}</li>
                  <li>{hoursToString(getTimes?.thu?getTimes.thu:times().thu)}</li>
                  <li>{hoursToString(getTimes?.fri?getTimes.fri:times().fri)}</li>
                  <li>{hoursToString(getTimes?.sat?getTimes.sat:times().sat)}</li>
                  <li>{hoursToString(getTimes?.sun?getTimes.sun:times().sun)}</li>
                </ul>
              </div>
              <div className="bookings">
                {
                  !getBooked || !getBooked.booked?
                    (<>
                      <p>Please <a href="#contact">call us here</a> to book your vehicle in.</p>
                      <p>Walk in's are accepted at this time however, we may still be very busy and</p>
                      <p>we recommend you to <a href="#contact">call us here</a></p>
                    </>):
                    (<>
                      <p>We are currently booked out until <em>{getBooked.until}</em>.</p>
                      <p>We do not accept walk in's at this time. Please <a href="#contact">call us here</a></p>
                      <p>to book in your vehicle in after {getBooked.until}</p>
                    </>)
                }
              </div>
            </div>
          </div>
          <div id="contact">
            <h3 className="headding">Contact Us</h3>
            <p>Ph: (02) 6492 0245</p>
            <p>Fax: (02) 6492 0250</p>
            <p>Email: finnertyautomotives@bigpond.com.au</p>
            <div className="footer">
              <p className="footer-element">* Airconditioning servicing number: <em>rta au33900</em></p>
              <p className="footer-element">Mechanic License Number: <em>mvrl47366</em></p>
              <p className="footer-element login-tag">
                {loginValidation(getUser, 0)?
                    <strong onClick={() => logout(setUser)}>Logout</strong>
                  :<Link to="/login">Login</Link>}</p>
              {
                loginValidation(getUser)?(
                  <p className="footer-element login-tag">
                    <strong onClick={() => navigate('./editor')}>Open Editor</strong>
                  </p>)
                  :null
              }
            </div>
          </div>
          {/*Blogs*/}
        </div>
      </div>
    </>
  );
}

const translateTime = (booked) => {
  // console.log('2', booked);
  if(!booked.booked || !booked.until) return booked;
  const date = new Date(booked.until);
  const today = new Date();
  // console.log(date, today);
  return date<today?{booked: false, until_raw: booked.until}:
    {booked: true, until: date.toUTCString().slice(0,16), until_raw: booked.until};
}

//automation (may not work with IE<10 and old browsers!)
//Convert an object to an aray with the keys automticaly applied.
const translateHours = (times) => {
  return(
      Object.entries(times)
      .map(([key, value]) => value!=='closed'?([key, value.split(',')]):([key, [value, false]]))//return value and key
      .reduce((pv, [key, value]) => ({...pv, [key]: value}), {})); //pv is previous value //return the array as an object
}

//Convert the hours in 24 hour format to 12 hours and put together in a string nicley for the consumer
const hoursToString = ([start, end]) => {
  //what comes in: ['08:00','17:00']
  //what goes out: '8:00am — 5:00pm'
  const convert24h = (time24:string) => time24.slice(0,2)-12 < 0?time24.slice(0,2)>9?time24+'am'
                                          :time24.slice(0,2)-12===-12?'12'+time24.slice(-3)+'am':time24.slice(-4)+'am'
                                        :time24.slice(0,2)-12===0?'12'+time24.slice(-3)+'pm'
                                          :(time24.slice(0,2)-12)+(`${time24.slice(-3)}pm`);
  return !end?start:(`${convert24h(start)} — ${convert24h(end)}`);
}

