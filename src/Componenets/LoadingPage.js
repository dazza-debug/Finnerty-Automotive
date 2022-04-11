import BlogNavigation from './BlogNavigation';

export default function LoadingPage() {
	return (
		<>
			<BlogNavigation blogPage={false} fake={false} emergency={true}/>
			<div className="App App-NotFound">
				{/*<div className="notFound-content">
					<h3>Please Wait | Loading Page . . .</h3>
				</div>*/}
				<div className="loadingPage-animation">
					<div class="lds-dual-ring"></div>
				</div>
			</div>
		</>
	);
}