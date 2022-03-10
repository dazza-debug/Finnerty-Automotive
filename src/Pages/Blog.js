import BlogNavigation from '../Componenets/BlogNavigation';
import {useNavigate, Outlet} from 'react-router-dom';
import './blog.css';
import '../App.css';

export default function Blog() {

	const navigate = useNavigate();

	return (
		<div className="blog">
			<BlogNavigation />
			<div className="blog-container">
				<div className="blog-component" onClick={() => navigate('/blog/1')}>
					<div className="blog-date">
						<p>Posted</p>
						<h3>09/03/2022</h3>
					</div>
					<div className="blog-exert">
						<h2>Test Blog_1</h2>
						<p>Hello this is a test/experimental test blog thingy that is being used to see how stuff will work and if they do blah blah blah etc etc etc</p>
						<div className="blog-line"></div>
						<div className="blog-icons">
							<p>10</p>
							<p>5</p>
						</div>
					</div>
				</div>
				<div className="blog-component" onClick={() => navigate('/blog/2')}>
					<div className="blog-date">
						<p>Posted</p>
						<h3>08/03/2022</h3>
					</div>
					<div className="blog-exert">
						<h2>Test Blog_2</h2>
						<p>Hello this is a test/experimental test blog thingy that is being used to see how stuff will work and if they do blah blah blah etc etc etc</p>
						<div className="blog-line"></div>
						<div className="blog-icons">
							<p>4</p>
							<p>2</p>
						</div>
					</div>
				</div>
			</div>
			{/*<Outlet />*/}
		</div>
	)
}