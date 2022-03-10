import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function BlogNavigation({blogPage}) {

	const [open, setOpen] = useState(false);

	const closeBar = () => setOpen(false)
	// console.log(blogPage)
	return(
		<nav className="App-navigation">
			<Link to="/" className="company-logo">
			{/*<img src="/logo_transparent.png" alt="logo"/>*/}
			Finnerty Automotive
			</Link>
			{/*<img className="company-logo" src="/logo.svg" alt="logo"/>*/}
			<div className="navigation-list-item nav-drop-down" onClick={() => setOpen(!open)}><a>{open?'↑↑↑':'↓↓↓'}</a></div>
			<ul className={`navigation-list ${open||'close-nav-bar'}`}>
				<li className="navigation-list-item" onClick={closeBar}><Link to="/">Home</Link></li>
				<li className={`navigation-list-item nav-list-blog ${!blogPage||'hide'}`} onClick={closeBar}><a href="#top">Top</a></li>
				<li className={`navigation-list-item nav-list-blog ${blogPage||'hide'}`} onClick={closeBar}><Link to="/blog">Back</Link></li>
			</ul>
		</nav>
		)
}