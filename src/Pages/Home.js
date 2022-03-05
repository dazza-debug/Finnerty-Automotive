import {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
import HomeNavigation from '../Componenets/HomeNavigation';

const times = {
  "mon": "08:00am - 5:00pm",
  "tue": "08:00am - 5:00pm",
  "wed": "08:00am - 5:00pm",
  "thu": "08:00am - 5:00pm",
  "fri": "08:00am - 5:00pm",
  "sat": "closed",
  "sun": "closed"
}

const booked = {
  "booked": "true",
  "until": "2022-03-19T10:10:30Z" //If you put a Z at then end of it then the Time seems to become UTC or Non UTC
}

export default function Home() {
  const [getBooked, setBooked] = useState();
  useEffect(() => {
    setBooked(translateTime(booked));
  }, [])

  console.log(getBooked);

  return (
    <div className="App">
      <HomeNavigation />
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
          <li className="grid-item-left">Tires Fitment and Balancing</li>
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
            We have a combined 84 years of experice within the Automotive industry and 
            we strive to give top level service and performance to our cusomters. 
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
              <li>{times.mon}</li>
              <li>{times.tue}</li>
              <li>{times.wed}</li>
              <li>{times.thu}</li>
              <li>{times.fri}</li>
              <li>{times.sat}</li>
              <li>{times.sun}</li>
            </ul>
          </div>
          <div className="bookings">
            {
              !getBooked || !getBooked.booked?
                (<>
                  <p>Please <a href="#contact">call us here</a> to book your vehicle in.</p>
                  <p>Walk in's are accepted at this time.</p>
                </>):
                (<>
                  <p>We are currently booked out <em>for two weeks</em>.</p>
                  <p>We do not accept walk in's at this time.</p>
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
          <p className="footer-element">* Airconditioning sercicing number: <em>rta au33900</em></p>
          <p className="footer-element">Mecanic License Number: <em>mvrl47366</em></p>
          {/*<p className="footer-element login-tag"><Link to="/login">Login</Link></p>*/}
        </div>
      </div>
      {/*Blogs*/}
    </div>
  );
}

const translateTime = (booked) => {
  if(booked.booked !== "true" || !booked.until) return {booked: false};
  const date = new Date(booked.until);
  const today = new Date();
  // console.log(date, today);
  return date<today?{booked: false}:{booked: true, until: date.toUTCString().slice(0,16)};
}
