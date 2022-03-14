import BlogNavigation from '../Componenets/BlogNavigation';
import {useNavigate, Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './blog.css';
import '../App.css';

export default function Blog() {

	const navigate = useNavigate();

	const [blogData, setBlogData] = useState(null);

	useEffect(() => {
		fetch(process.env.REACT_APP_URL+'/fa/blogs')
		.then(raw => raw.json())
		.then(resp => resp[0]?.id?setBlogData(resp):Promise.reject(resp))
		.catch(err => console.error(err));
	}, [])

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
				{
					blogData?Array.isArray(blogData)?
					blogData.map((blogObj, key) => blogComponent(blogObj, navigate, key)):
					blogComponent(blogData, navigate):<>No data</>
				}
			</div>
			<Outlet />
		</div>
	)
}


const blogComponent = (blogObj, navigate, key) => {
	return(
		<div key={key} className="blog-component" onClick={() => navigate('/blog/1')}>
			<div className="blog-date">
				<p>Posted</p>
				<h3>{blogObj.posted}</h3>
			</div>
			<div className="blog-exert">
				<h2>{blogObj.title}</h2>
				<p>{blogObj.blog}</p>
				<div className="blog-line"></div>
				<div className="blog-icons">
					<p>{blogObj.likes}</p>
					<p>{0}</p>
				</div>
			</div>
		</div>
	);
}