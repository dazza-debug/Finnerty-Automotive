import {Link} from 'react-router-dom';

export default function BlogNavigation() {
	return(
		<nav className="App-navigation">
			<Link to="/" className="company-logo">
			{/*<img src="/logo_transparent.png" alt="logo"/>*/}
			Finnerty Automotive
			</Link>
			{/*<img className="company-logo" src="/logo.svg" alt="logo"/>*/}
			<ul className="navigation-list">
				<li className="navigation-list-item"><Link to="/">Home</Link></li>
				<li className="navigation-list-item nav-list-blog"><a href="#top">Top</a></li>
			</ul>
		</nav>
		)
}