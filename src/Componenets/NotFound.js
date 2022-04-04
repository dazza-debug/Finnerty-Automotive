// import './c'
import BlogNavigation from './BlogNavigation';

export default function NotFound(){
	return (
		<>
			<BlogNavigation blogPage={false} fake={false} emergency={true}/>
			<div className="App App-NotFound">
				<div className="notFound-content">
					<h3>404 | Page Not Found</h3>
					<p>Oh no it looks like you</p>
					<p>found a page that doesn't exist!</p>
				</div>
			</div>
		</>
	);
}