import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function HomeNavigation() {
	const [open, setOpen] = useState(false);

	const closeBar = () => setOpen(false);

	console.log(open); 
	return(
		<nav className="App-navigation">
			<a href="#top" className="company-logo">
			{/*<img src="/logo_transparent.png" alt="logo"/>*/}
			Finnerty Automotive
			</a>
			{/*<img className="company-logo" src="/logo.svg" alt="logo"/>*/}
			<div className="navigation-list-item nav-drop-down" onClick={() => setOpen(!open)}><a>{open?'↑↑↑':'↓↓↓'}</a></div>
			<ul className={`navigation-list ${open||'close-nav-bar'}`}>
				<li className="navigation-list-item" onClick={closeBar}><a href="#services">Our services</a></li>
				<li className="navigation-list-item" onClick={closeBar}><a href="#location">Where we are</a></li>
				<li className="navigation-list-item" onClick={closeBar}><a href="#about">About us</a></li>
				<li className="navigation-list-item" onClick={closeBar}><a href="#hours">Business Hours</a></li>
				<li className="navigation-list-item" onClick={closeBar}><a href="#contact">Contact us</a></li>
				{/*<li className="navigation-list-item nav-list-home"><a href="#top">Home</a></li>*/}
				{/*<li className="navigation-list-item nav-list-blog"><Link to="/blog">Blog</Link></li>*/}
			</ul>
		</nav>
		)
}