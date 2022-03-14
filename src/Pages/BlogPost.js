import BlogNavigation from '../Componenets/BlogNavigation';
import {useParams} from 'react-router-dom';
import React, {useState, useEffect, Suspense} from 'react';
import './blogpost.css';

const NotFound = React.lazy(() => import('../Componenets/NotFound')); 

export default function BlogPost() {
	let params = useParams();
	const [blogData, setBlogData] = useState(null);
	const [commentData, setCommentData] = useState(null);
	const [notFound, setNotFound] = useState(false);
	const [commentEditor, setCommentEditor] = useState(false);

	useEffect(() => {
		//get blog data
		fetch(`${process.env.REACT_APP_URL}/fa/blog/${params.id}`)
		.then(raw => raw.json())
		.then(resp => resp?.id?setBlogData(resp):setNotFound(true))
		.catch(err => {console.error(err); setNotFound(true)});

		//get comment data
		fetch(`${process.env.REACT_APP_URL}/fa/comments/${params.id}`)
		.then(raw => raw.json())
		.then(resp => resp[0]?.id?setCommentData(resp):Promise.reject(resp))
		.catch(err => console.warn(err)); // say that there are no comments <<<<<<<<<<<<<<<<<<<
	}, [params])

	console.log(params);
	return (
		<div className="bp-container">
			<BlogNavigation blogPage={true}/>
			{!blogData&&!notFound?blogLoading():!notFound?
				blogLoaded(blogData, params, commentEditor, setCommentEditor):blogErrored()}
		</div>
	)
}

const blogLoading = () => {
	return(
		<div className="bp-component">
			<h2>| Loading Blog... |</h2>
		</div>
	);
}

const blogErrored = () => {
	return(
		<div className="bp-component">
			<h2>404 | Blog Post Not Found</h2>
		</div>
	)
}

const blogLoaded = (blogData, params, commentEditor, setCommentEditor) => { //i dont like this many props :(
	return(
		<div className="bp-component">
			<div className="bp-blog-section">
				<h2>{blogData.title}</h2>
				<div className="bp-blog-info">
					<p>{blogData.blog}</p>
					<p>{`Written By: ${blogData.author}`}</p>
				</div>
				<div className="bp-blog-date">
					<p>{blogData.posted}</p>
					{/*<p>05/03/2022</p>*/}
				</div>
			</div>
			<div className="bp-comments-section">
				<h3>Comments</h3>
				<div className="bp-commenter">
					<p>What do you think?</p>
					<button onClick={() => setCommentEditor(!commentEditor)}>{`${commentEditor?'Close Commenter':'Post a comment'}`}</button>
					<form className={`${commentEditor||'hide'} bp-commenter-form `} 
					onSubmit={(event) => postComment(event, params)}>
						<textarea id="commentField" 
							name="commentField" 
							placeholder="Type your comment here..."/>
						<input id="email" 
							name="email" 
							type="email" 
							placeholder="Type your email here..."/>
						<input id="name" 
							name="name" 
							type="text" 
							placeholder="Type your name here..."/>
						<button>Post Comment</button>
					</form>
				</div>
				<div className="bp-comments">
					<div className="bp-comment">
						<h4>29/03/2022</h4>
						<p>this is a comment</p>
						<p>Commented By: Daz Daz</p>
					</div>
					<div className="bp-comment">
						<h4>30/03/2022</h4>
						<p>this is a bad comment</p>
						<p>Commented By: Daz Daz</p>
					</div>
				</div>
			</div>
		</div>
	)
}

const commentComponent = (params) => {
	return (
		<div className="bp-comment">
			<h4>29/03/2022</h4>
			<p>this is a comment</p>
			<p>Commented By: Daz Daz</p>
		</div>
	)
}

const postComment = async (event, params) => {
	event.preventDefault();
	fetch(`${process.env.REACT_APP_URL}/fa/comment`,{
		method: 'POST',
		headers: {"Content-Type": "application/json", 
		"Authorization": window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)},
		body: JSON.stringify({
			idfor: params.id,
			comment: event.target.commentField.value,
			author: event.target.name.value,
			email: event.target.email.value
		})
	}).then(raw => raw.json())
	.then(resp => resp?.id?window.location.reload(true):Promise.reject(resp))
	.catch(err => console.error(err)) // tell the user the issue <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
}