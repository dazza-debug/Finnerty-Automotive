import BlogNavigation from '../Componenets/BlogNavigation';
// import Banner from '../Componenets/Banner';
import {useNavigate, Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {loginValidation} from '../App';
import './blog.css';
import '../App.css';

export default function Blog({getUser}) {

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
			<Outlet />
			<BlogNavigation />
				{
					loginValidation(getUser)&&<button onClick={() => navigate('/blog/editor')}>Create New Blog</button>
				}
				<div className="blog-container">
				{/*<div className="blog-component" onClick={() => navigate('/blog/1')}>
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
						<div className="blog-exert-para">
							<p>Hello this is a test/experimental test blog thingy that is being used to see how stuff will work and if they do blah blah blah etc etc etc</p>
						</div>
						<div className="blog-line"></div>
						<div className="blog-icons">
							<p>4</p>
							<p>2</p>
						</div>
					</div>
				</div>*/}
				{
					blogData?Array.isArray(blogData)?
					blogData.map((blogObj, key) => blogComponent(blogObj, navigate, key, getUser)):
					blogComponent(blogData, navigate, 0, getUser):<div><h2>No blogs at this time</h2></div>
				}
			</div>
		</div>
	)
}


const blogComponent = (blogObj, navigate, key, getUser) => {
	const nav = () => navigate(`/blog/${blogObj.id}`);
	const convertFromHTMLtoString = html => {
		return new DOMParser().parseFromString(html, "text/html")
			.documentElement.innerHTML.replace(/<[^>]+>/g, " ");
	}
	console.log(convertFromHTMLtoString(blogObj.blog))
	return(
		<div key={key} className="blog-component">
			<div className="blog-date" onClick={nav}>
				<p>Posted</p>
				<h3>{blogObj.posted}</h3>
			</div>
			<div className="blog-exert">
				<h2 onClick={nav}>{blogObj.title}</h2>
				<div className="blog-exert-para">
					{/*<p onClick={nav}>{(blogObj.blog.replace(/<[^>]+>/g, " ")).slice(0, 200) + '...'}</p>*/}
					<p onClick={nav}>{convertFromHTMLtoString(blogObj.blog).slice(0, 200) + '...'}</p>
				</div>
				<div className="blog-line"></div>
				<div className={`blog-delete ${loginValidation(getUser)||'hide'}`} onClick={() => deleteItem(blogObj.id, blogObj.title, 'blog')}>
					<p>Delete</p>
				</div>
				<div className="blog-icons" onClick={nav}>
					<p>{blogObj.likes||0}</p>
					<p>{blogObj.comments||0}</p>
				</div>
			</div>
		</div>
	);
}

export const deleteItem = (id, name, type) => {
	if(window.confirm('Are you sure you want to delete blogPost: ' + name + '?'))
		fetch(process.env.REACT_APP_URL + '/fa/blog/remove', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json", 
				"Authorization":window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)},
			body: JSON.stringify({id: id, type: type})
		}).then(raw => raw.json())
		.then(resp => resp==='ok'?console.log(resp):Promise.reject(resp))
		.catch(err => console.error(err));
}